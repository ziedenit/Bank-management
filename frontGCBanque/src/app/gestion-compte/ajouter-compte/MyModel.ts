package com.cl.msofd.engineRules;

import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
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
    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(RulesGeneratorRunner.class);
    @Override
    public void run(ApplicationArguments args) throws Exception {
        try {
            excelToDroolsService.generateDroolsFile("src/main/resources/rules.drl");
            commonLogger.eventTyp(EventTyp.APPLICATIVE).
                    secEventTyp(SecEventTyp.METIER).
                    logger().info("Rules generated successfully on startup!");
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            commonLogger.eventTyp(EventTyp.APPLICATIVE).
                    secEventTyp(SecEventTyp.METIER).
                    logger().info("Error generating rules on startup:  " + e.getMessage());
        }
    }
}
