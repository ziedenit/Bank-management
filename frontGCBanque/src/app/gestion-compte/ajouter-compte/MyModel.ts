package com.cl.msofd.engineRules;

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
              excelToDroolsService.generateDroolsFile("src/main/resources/rules.drl");
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
package com.cl.msofd.engineRules;

import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import com.cl.msofd.model.Referentiel;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
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
    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(ExcelToDroolsService.class);
    private final MongoTemplate mongoTemplate;

    @Autowired
    public ExcelToDroolsService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    private static final String RULES_TEMPLATE =
            "package com.cl.msofd.engineRules.rules;\n" +
                    "import com.cl.msofd.engineRules.Acquisition;\n" +
                    "import com.cl.msofd.engineRules.AcquisitionResponse;\n" +
                    "global java.util.List responses;\n\n";

    public List<Acquisition> readAcquisitionData() throws IOException, ParseException {
        List<Acquisition> acquisitions = new ArrayList<>();
        try (InputStream excelFile = excelResource.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet sheet = workbook.getSheet("ACQUISITION");


            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;
                Acquisition acquisition = new Acquisition();
                acquisition.setEligibileDPE("Autre bien immobilier".equals(getStringValue(row, 0)));
                acquisition.setDateDepotPc(parseDate(getStringValue(row, 1)));
                acquisition.setDateDepotPcStr(getStringValue(row, 1)); // Store raw date string
                acquisition.setDpePresent("Oui".equalsIgnoreCase(getStringValue(row, 2)));
                acquisition.setPresenceDpeJustificatif("Oui".equalsIgnoreCase(getStringValue(row, 3)));
                acquisition.setDateConstructionDpe(parseDate(getStringValue(row, 4)));
                acquisition.setDateConstructionDpeStr(getStringValue(row, 4)); // Store raw date string
                acquisition.setEtiquetteDpe(getStringValue(row, 5));
                acquisition.setValeurCepStr(getStringValue(row, 6));
                acquisition.setPresenceNormeThermiqueJustificatif("Oui".equalsIgnoreCase(getStringValue(row, 7)));
                acquisition.setNormeThermique(getStringValue(row, 8));
                acquisition.setXtra248(getStringValue(row, 9));
                acquisition.setXtra249(getStringValue(row, 10));
                acquisition.setXtra250(getStringValue(row, 11));
                acquisition.setXtra251(getStringValue(row, 12));
                acquisition.setXtra275(getStringValue(row, 13));

                acquisitions.add(acquisition);
            }

            workbook.close();
        }

        return acquisitions;
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
        String dateDepotPcCondition = generateDateCondition("dateDepotPc", acquisition.getDateDepotPcStr());
        String dateConstructionDpeCondition = generateDateCondition("dateConstructionDpe", acquisition.getDateConstructionDpeStr());
        String etiquetteDpeCondition = generateEtiquetteDpeCondition(acquisition.getEtiquetteDpe());
        String valeurCepCondition = generateValeurCepCondition(acquisition.getValeurCepStr());

        return String.format(
                "rule \"Rule %d\"\n" +
                        "when\n" +
                        "    $acquisition : Acquisition(\n" +
                        "        eligibileDPE == %s,\n" +
                        "        %s,\n" +
                        "        dpePresent == %s,\n" +
                        "        presenceDpeJustificatif == %s,\n" +
                        "        %s,\n" +
                        "        %s,\n" +
                        "        %s,\n" +
                        "        normeThermique == \"%s\",\n" +
                        "        presenceNormeThermiqueJustificatif == %s\n" +
                        "    )\n" +
                        "then\n" +
                        "    AcquisitionResponse response = new AcquisitionResponse(\"%s\", \"%s\", \"%s\", \"%s\", \"%s\");\n" +
                        "    responses.add(response);\n" +
                        "end\n",
                ruleNumber,
                acquisition.isEligibileDPE(),
                dateDepotPcCondition,
                acquisition.isDpePresent(),
                acquisition.isPresenceDpeJustificatif(),
                dateConstructionDpeCondition,
                etiquetteDpeCondition,
                valeurCepCondition,
                acquisition.getNormeThermique(),
                acquisition.isPresenceNormeThermiqueJustificatif(),
                acquisition.getXtra248(),
                acquisition.getXtra249(),
                acquisition.getXtra250(),
                acquisition.getXtra251(),
                acquisition.getXtra275()
        );
    }


    private String getStringValue(Row row, int cellIndex) {
        Cell cell = row.getCell(cellIndex, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
        if (cell == null) {
            return "";
        } else {
            cell.setCellType(CellType.STRING);
            return cell.getStringCellValue().trim();
        }
    }

    private String generateDateCondition(String fieldName, String dateStr) {
        if (dateStr == null || dateStr.isEmpty() || "inconnu".equalsIgnoreCase(dateStr)) {
            return fieldName + " == null";
        }

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String condition = "";
        try {
            if (dateStr.startsWith("avant ")) {
                String datePart = dateStr.substring("avant ".length()).trim();
                Date date = sdf.parse(datePart);
                condition = fieldName + " != null && " + fieldName + ".before(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
            } else if (dateStr.startsWith("du ")) {
                String[] parts = dateStr.split(" au ");
                String startDateStr = parts[0].substring("du ".length()).trim();
                String endDateStr = parts[1].trim();
                Date startDate = sdf.parse(startDateStr);
                Date endDate = sdf.parse(endDateStr);
                condition = fieldName + " != null && " + fieldName + ".after(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(startDate) + "\")) && " + fieldName + ".before(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(endDate) + "\"))";
            } else if (dateStr.startsWith("apres ")) {
                String datePart = dateStr.substring("apres ".length()).trim();
                Date date = sdf.parse(datePart);
                condition = fieldName + " != null && " + fieldName + ".after(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
            } else {
                Date date = sdf.parse(dateStr);
                condition = fieldName + " != null && " + fieldName + ".equals(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return condition;
    }

    private String generateEtiquetteDpeCondition(String etiquetteDpe) {
        if (etiquetteDpe == null || etiquetteDpe.isEmpty() || "inconnu".equalsIgnoreCase(etiquetteDpe)) {
            return "etiquetteDpe == null";
        }

        if (etiquetteDpe.startsWith("<>")) {
            String value = etiquetteDpe.substring(2).trim();
            return "etiquetteDpe != \"" + value + "\"";
        } else {
            return "etiquetteDpe == \"" + etiquetteDpe + "\"";
        }
    }

    private Date parseDate(String dateStr) throws ParseException {
        if (dateStr == null || dateStr.isEmpty() || "inconnu".equalsIgnoreCase(dateStr.trim())) {
            return null;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

        if (dateStr.startsWith("avant ")) {
            String datePart = dateStr.substring("avant ".length()).trim();
            return sdf.parse(datePart);
        } else if (dateStr.startsWith("apres ")) {
            String datePart = dateStr.substring("apres ".length()).trim();
            return sdf.parse(datePart);
        } else if (dateStr.startsWith("du ")) {
            String[] parts = dateStr.split(" au ");
            String startDateStr = parts[0].substring("du ".length()).trim();
            return sdf.parse(startDateStr);
        } else if (dateStr.startsWith("<")) {
            String datePart = dateStr.substring(1).trim();
            return sdf.parse(datePart);
        } else {
            return sdf.parse(dateStr);
        }
    }

    private String extractCodeRecherche(String valeurCepStr) {
        if (valeurCepStr != null && valeurCepStr.length() > 5) {
            return valeurCepStr.substring(valeurCepStr.length() - 5);
        }
        return "";
    }

    ////////////::
    private String generateValeurCepCondition(String valeurCepStr) {
        if (valeurCepStr == null || valeurCepStr.isEmpty() || "inconnu".equalsIgnoreCase(valeurCepStr)) {
            return "valeurCep == 0.0";
        }

        String codeRecherche = extractCodeRecherche(valeurCepStr);
        String condition = "";
        try {
            if (valeurCepStr.startsWith("≤ TXENEM15")) {
                double valeurCepTop = obtenirValeurCepTop(codeRecherche);
                condition = "valeurCep <= " + valeurCepTop;
            } else if (valeurCepStr.startsWith("> TXENEM15")) {
                double valeurCepTop = obtenirValeurCepTop(codeRecherche);
                condition = "valeurCep > " + valeurCepTop;
            } else if (valeurCepStr.startsWith("≤ TXENEMAX")) {
                double valeurCepMax = obtenirValeurCepMax(codeRecherche);
                condition = "valeurCep <= " + valeurCepMax;
            } else if (valeurCepStr.startsWith("> TXENEMAX")) {
                double valeurCepMax = obtenirValeurCepMax(codeRecherche);
                condition = "valeurCep > " + valeurCepMax;
            } else {
                condition = "valeurCep == " + Double.parseDouble(valeurCepStr);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return condition;
    }

    //
///////////////////////////////////obtenirValeurCepTop///////////////////////////////////////////////////
    public double obtenirValeurCepTop(String codeRecherche) {
        Query query = new Query(Criteria.where("table").is("seuil_cep_top").and("code").is(codeRecherche));
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("searching ValeurCepTop by code : {}", codeRecherche);
        Referentiel referentiel = mongoTemplate.findOne(query, Referentiel.class);
        return checkRefValue(referentiel);
    }

    ////////////////////////////////obtenirValeurCepMax///////////////////////////////////////////////////////
    public double obtenirValeurCepMax(String codeRecherche) {
        Query query = new Query(Criteria.where("table").is("seuil_cep_max").and("code").is(codeRecherche));
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("searching ValeurCepMax by code : {}", codeRecherche);
        Referentiel referentiel = mongoTemplate.findOne(query, Referentiel.class);
        return checkRefValue(referentiel);
    }
    private double checkRefValue(Referentiel referentiel)
    {
        if (referentiel != null) {
            return Double.parseDouble(referentiel.getValeur1());
        } else {
            return 0;
        }
    }
}
//
package com.cl.msofd.engineRules;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DroolsService {
    @Autowired
    private KieContainer kieContainer;


    public AcquisitionResponse applyRules(Acquisition acquisition) {
        List<AcquisitionResponse> responses = new ArrayList<>();
        KieSession kieSession = kieContainer.newKieSession();
        kieSession.insert(acquisition);
        kieSession.setGlobal("responses", responses);
        kieSession.fireAllRules();
        return responses.isEmpty() ? null : responses.get(0);
    }
}//
package com.cl.msofd.engineRules;

import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieModule;
import org.kie.api.runtime.KieContainer;
import org.kie.internal.io.ResourceFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DroolsConfig {

    @Value("${spring.drools.rules-file}")
    private String rulesFile;
    private static final KieServices kieServices = KieServices.Factory.get();

    @Bean
    public KieContainer kieContainer() {
        KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newClassPathResource(rulesFile));
        KieBuilder kb = kieServices.newKieBuilder(kieFileSystem);
        kb.buildAll();
        KieModule kieModule = kb.getKieModule();

        return kieServices.newKieContainer(kieModule.getReleaseId());
    }
}
// maintenant pour mon application qui est spring boot je veux a chaque fois que l'application ce lance le service generate rules s'excute automatiquement et le fichier drl se remplie automatiquement sans besoin d'excuter sur postman http://localhost:8081/acquisition/generate-rules 
