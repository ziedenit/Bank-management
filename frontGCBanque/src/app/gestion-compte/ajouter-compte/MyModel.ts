package com.cl.msofd.engineRules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.*;

@Component
public class FileWatcherService {

    @Autowired
    private ExcelToDroolsService excelToDroolsService;

    @PostConstruct
    public void watchFile() throws IOException, InterruptedException {
        Path path = Paths.get("path/to/your/xls/directory");
        WatchService watchService = FileSystems.getDefault().newWatchService();
        path.register(watchService, StandardWatchEventKinds.ENTRY_MODIFY);

        System.out.println("Watching directory: " + path);

        new Thread(() -> {
            while (true) {
                WatchKey key;
                try {
                    key = watchService.take();
                } catch (InterruptedException ex) {
                    return;
                }

                for (WatchEvent<?> event : key.pollEvents()) {
                    WatchEvent.Kind<?> kind = event.kind();

                    if (kind == StandardWatchEventKinds.OVERFLOW) {
                        continue;
                    }

                    WatchEvent<Path> ev = (WatchEvent<Path>) event;
                    Path fileName = ev.context();

                    if (fileName.toString().equals("240506_OFD_Abres de décision_Version travail.xlsx")) {
                        System.out.println("File modified: " + fileName);
                        try {
                            excelToDroolsService.generateDroolsFile("src/main/resources/rules.drl");
                            System.out.println("Rules generated successfully after file modification!");
                        } catch (IOException | ParseException e) {
                            e.printStackTrace();
                            System.err.println("Error generating rules after file modification: " + e.getMessage());
                        }
                    }
                }

                boolean valid = key.reset();
                if (!valid) {
                    break;
                }
            }
        }).start();
    }
}
