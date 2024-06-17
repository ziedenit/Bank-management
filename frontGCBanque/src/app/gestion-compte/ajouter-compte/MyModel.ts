
 import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ExcelToDroolsService {

    @Value("${arbre.rules}")
    private Resource excelResource;

    private static final String RULES_TEMPLATE = 
        "package com.example.rules;\n" +
        "import com.example.Acquisition;\n" +
        "import com.example.AcquisitionResponse;\n\n";

    public List<Acquisition> readAcquisitionData() throws IOException, ParseException {
        List<Acquisition> acquisitions = new ArrayList<>();
        try (InputStream excelFile = excelResource.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet sheet = workbook.getSheet("ACQUISITION");

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Skip header row

                Acquisition acquisition = new Acquisition();
                acquisition.setEligibileDPE("Autre bien immobilier".equals(row.getCell(0).getStringCellValue()));
                acquisition.setDateDepotPc(parseDate(row.getCell(1).getStringCellValue()));
                acquisition.setPresenceDpe("oui".equalsIgnoreCase(row.getCell(2).getStringCellValue()));
                acquisition.setPresenceDpeJustificatif("oui".equalsIgnoreCase(row.getCell(3).getStringCellValue()));
                acquisition.setDateConstructionDpe(parseDate(row.getCell(4).getStringCellValue()));
                acquisition.setEtiquetteDpe(row.getCell(5).getStringCellValue());
                acquisition.setValeurCep(parseDouble(row.getCell(6).getStringCellValue()));
                acquisition.setNormeThermique(row.getCell(7).getStringCellValue());
                acquisition.setPresenceNormeThermiqueJustificatif("oui".equalsIgnoreCase(row.getCell(8).getStringCellValue()));
                acquisition.setXtra248(row.getCell(9).getStringCellValue());
                acquisition.setXtra249(row.getCell(10).getStringCellValue());
                acquisition.setXtra250(row.getCell(11).getStringCellValue());
                acquisition.setXtra251(row.getCell(12).getStringCellValue());
                acquisition.setXtra275(row.getCell(13).getStringCellValue());

                acquisitions.add(acquisition);
            }

            workbook.close();
        }

        return acquisitions;
    }

    private Date parseDate(String dateStr) throws ParseException {
        if (dateStr == null || dateStr.isEmpty()) {
            return null;
        }
        if (dateStr.toLowerCase().contains("avant")) {
            return new SimpleDateFormat("yyyy-MM-dd").parse("2012-12-31");
        }
        return new SimpleDateFormat("dd/MM/yyyy").parse(dateStr);
    }

    private double parseDouble(String doubleStr) {
        if (doubleStr == null || doubleStr.isEmpty()) {
            return 0.0;
        }
        return Double.parseDouble(doubleStr);
    }

    public void generateDroolsFile(String outputDroolsFile) throws IOException, ParseException {
        List<Acquisition> acquisitions = readAcquisitionData();
        StringBuilder rulesContent = new StringBuilder(RULES_TEMPLATE);

        int ruleNumber = 1;
        for (Acquisition acquisition : acquisitions) {
            String rule = generateRule(acquisition, ruleNumber++);
            rulesContent.append(rule).append("\n");
        }

        try (FileWriter writer = new FileWriter(outputDroolsFile)) {
            writer.write(rulesContent.toString());
        }
    }

    private String generateRule(Acquisition acquisition, int ruleNumber) {
        return String.format(
            "rule \"Rule %d\"\n" +
            "when\n" +
            "    $acquisition : Acquisition(\n" +
            "        eligibileDPE == %s,\n" +
            "        dateDepotPc == \"%s\",\n" +
            "        presenceDpe == %s,\n" +
            "        presenceDpeJustificatif == %s,\n" +
            "        (dateConstructionDpe == null || dateConstructionDpe == \"%s\"),\n" +
            "        etiquetteDpe == \"%s\",\n" +
            "        (valeurCep == 0.0 || valeurCep == %s),\n" +
            "        normeThermique == \"%s\",\n" +
            "        presenceNormeThermiqueJustificatif == %s\n" +
            "    )\n" +
            "then\n" +
            "    AcquisitionResponse response = new AcquisitionResponse(\"%s\", \"%s\", \"%s\", \"%s\", \"%s\");\n" +
            "    insert(response);\n" +
            "end\n",
            ruleNumber,
            acquisition.isEligibileDPE(),
            acquisition.getDateDepotPc() != null ? new SimpleDateFormat("dd/MM/yyyy").format(acquisition.getDateDepotPc()) : "",
            acquisition.isPresenceDpe(),
            acquisition.isPresenceDpeJustificatif(),
            acquisition.getDateConstructionDpe() != null ? new SimpleDateFormat("dd/MM/yyyy").format(acquisition.getDateConstructionDpe()) : "",
            acquisition.getEtiquetteDpe(),
            acquisition.getValeurCep() != 0.0 ? acquisition.getValeurCep() : "0.0",
            acquisition.getNormeThermique(),
            acquisition.isPresenceNormeThermiqueJustificatif(),
            acquisition.getXtra248(),
            acquisition.getXtra249(),
            acquisition.getXtra250(),
            acquisition.getXtra251(),
            acquisition.getXtra275()
        );
    }
}
//
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DroolsConfig {

    @Value("${spring.drools.rules-file}")
    private String droolsFile;

    @Bean
    public KieContainer kieContainer() {
        return KieServices.Factory.get().getKieClasspathContainer();
    }

    @Bean
    public KieSession kieSession() {
        return kieContainer().newKieSession(droolsFile);
    }
}
//
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;

@RestController
@RequestMapping("/acquisition")
public class AcquisitionController {

    @Autowired
    private ExcelToDroolsService excelToDroolsService;

    @Autowired
    private DroolsService droolsService;

    @GetMapping("/generate-rules")
    public String generateRules() {
        try {
            // Utilisez un chemin temporaire ou un emplacement spécifique pour stocker le fichier rules.drl généré
            excelToDroolsService.generateDroolsFile("target/classes/rules.drl");
            return "Rules generated successfully!";
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return "Error generating rules: " + e.getMessage();
        }
    }

    @PostMapping("/apply-rules")
    public AcquisitionResponse applyRules(@RequestBody Acquisition acquisition) {
        return droolsService.applyRules(acquisition);
    }
}
//
spring.drools.rules-file=rules.drl
arbre.rules=classpath:fichier.xlsx
