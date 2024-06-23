package com.cl.msofd.engineRules;

import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.IOException;
import java.nio.file.*;

@Service
public class ExcelFileWatcherService {

    @Autowired
    private ExcelToDroolsService excelToDroolsService;

    @Autowired
    private KieContainer kieContainer;

    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(ExcelFileWatcherService.class);

    private WatchService watchService;
    private Thread watcherThread;
    private Path pathToWatch;

    @PostConstruct
    public void init() {
        try {
            watchService = FileSystems.getDefault().newWatchService();
            pathToWatch = Paths.get("path/to/your/excel/file"); // Remplacez par le chemin vers votre fichier Excel
            pathToWatch.getParent().register(watchService, StandardWatchEventKinds.ENTRY_MODIFY);

            watcherThread = new Thread(this::watchFile);
            watcherThread.start();

            commonLogger.eventTyp(EventTyp.APPLICATIVE)
                        .secEventTyp(SecEventTyp.METIER)
                        .logger()
                        .info("Started watching Excel file for changes.");
        } catch (IOException e) {
            e.printStackTrace();
            commonLogger.eventTyp(EventTyp.APPLICATIVE)
                        .secEventTyp(SecEventTyp.METIER)
                        .logger()
                        .info("Error initializing Excel file watcher: " + e.getMessage());
        }
    }

    @PreDestroy
    public void cleanup() {
        try {
            watchService.close();
            if (watcherThread != null) {
                watcherThread.interrupt();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void watchFile() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                WatchKey key = watchService.take();
                for (WatchEvent<?> event : key.pollEvents()) {
                    WatchEvent.Kind<?> kind = event.kind();

                    if (kind == StandardWatchEventKinds.OVERFLOW) {
                        continue;
                    }

                    WatchEvent<Path> ev = (WatchEvent<Path>) event;
                    Path fileName = ev.context();

                    if (fileName.toString().equals(pathToWatch.getFileName().toString())) {
                        commonLogger.eventTyp(EventTyp.APPLICATIVE)
                                    .secEventTyp(SecEventTyp.METIER)
                                    .logger()
                                    .info("Detected change in Excel file. Regenerating rules.");

                        // Recharger les règles
                        excelToDroolsService.generateDroolsFile("src/main/resources/rules.drl");
                        reloadKieContainer("src/main/resources/rules.drl");
                    }
                }
                key.reset();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } catch (IOException | ParseException e) {
                e.printStackTrace();
                commonLogger.eventTyp(EventTyp.APPLICATIVE)
                            .secEventTyp(SecEventTyp.METIER)
                            .logger()
                            .info("Error regenerating rules: " + e.getMessage());
            }
        }
    }

    private void reloadKieContainer(String rulesFilePath) {
        KieFileSystem kieFileSystem = KieServices.Factory.get().newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newFileResource(rulesFilePath));
        KieBuilder kieBuilder = KieServices.Factory.get().newKieBuilder(kieFileSystem);
        kieBuilder.buildAll();
        KieModule kieModule = kieBuilder.getKieModule();
        kieContainer.updateToVersion(kieModule.getReleaseId());
    }
}
