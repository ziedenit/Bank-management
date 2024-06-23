package com.cl.msofd.engineRules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.ApplicationArguments;

import java.io.IOException;
import java.text.ParseException;

@Component
public class RulesGeneratorRunner implements ApplicationRunner {

    @Autowired
    private ExcelToDroolsService excelToDroolsService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        try {
            excelToDroolsService.generateDroolsFile("src/main/resources/rules.drl");
            System.out.println("Rules generated successfully on startup!");
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            System.err.println("Error generating rules on startup: " + e.getMessage());
        }
    }
}
