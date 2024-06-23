package com.cl.msofd.engineRules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class FileWatcherRunner implements CommandLineRunner {

    @Autowired
    private FileWatcherService fileWatcherService;

    @Override
    public void run(String... args) throws Exception {
        fileWatcherService.watchFile();
    }
}
