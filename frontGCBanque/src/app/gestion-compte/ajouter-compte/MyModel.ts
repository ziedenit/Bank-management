package com.cl.msofd.engineRules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.text.ParseException;

@Configuration
public class AutoGenerateRulesConfig {

    @Autowired
    private ExcelToDroolsService excelToDroolsService;

    @PostConstruct
    public void generateRulesOnStartup() {
        try {
            excelToDroolsService.generateDroolsFile("src/main/resources/rules.drl");
            System.out.println("Rules generated successfully on startup!");
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            System.err.println("Error generating rules on startup: " + e.getMessage());
        }
    }
}
