package com.cl.msofd.engineRules;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class Acquisition {
    private boolean eligibileDPE;
    private Date dateDepotPc;
    private boolean presenceDpe;
    private boolean presenceDpeJustificatif;
    private Date dateConstructionDpe;
    private String etiquetteDpe;
    private double valeurCep;
    private String normeThermique;
    private boolean presenceNormeThermiqueJustificatif;
    private String xtra248;
    private String xtra249;
    private String xtra250;
    private String xtra251;
    private String xtra275;


}
//
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
package com.cl.msofd.engineRules;

public class AcquisitionResponse {
    private String xtra248;
    private String xtra249;
    private String xtra250;
    private String xtra251;
    private String xtra275;

    // Constructors, getters, and setters
    public AcquisitionResponse() {}

    public AcquisitionResponse(String xtra248, String xtra249, String xtra250, String xtra251, String xtra275) {
        this.xtra248 = xtra248;
        this.xtra249 = xtra249;
        this.xtra250 = xtra250;
        this.xtra251 = xtra251;
        this.xtra275 = xtra275;
    }

    // Getters and Setters
    public String getXtra248() { return xtra248; }
    public void setXtra248(String xtra248) { this.xtra248 = xtra248; }

    public String getXtra249() { return xtra249; }
    public void setXtra249(String xtra249) { this.xtra249 = xtra249; }

    public String getXtra250() { return xtra250; }
    public void setXtra250(String xtra250) { this.xtra250 = xtra250; }

    public String getXtra251() { return xtra251; }
    public void setXtra251(String xtra251) { this.xtra251 = xtra251; }

    public String getXtra275() { return xtra275; }
    public void setXtra275(String xtra275) { this.xtra275 = xtra275; }
}
//
package com.cl.msofd.engineRules;

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
        KieSession kieSession = kieContainer().newKieSession(droolsFile);
        return kieSession;
    }
}
//
package com.cl.msofd.engineRules;

import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DroolsService {

    @Autowired
    private KieSession kieSession;

    public AcquisitionResponse applyRules(Acquisition acquisition) {
        List<AcquisitionResponse> responses = new ArrayList<>();

        kieSession.insert(acquisition);
        kieSession.setGlobal("responses", responses);
        kieSession.fireAllRules();

        return responses.isEmpty() ? null : responses.get(0);
    }
}
//
package com.cl.msofd.engineRules;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
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
-06-18T02:06:45.578+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Unknown KieSession name: rules.drl
time=2024-06-18T02:06:45.581+02:00|level=WARN |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'acquisitionController': Unsatisfied dependency expressed through field 'droolsService': Error creating bean with name 'droolsService': Unsatisfied dependency expressed through field 'kieSession': No qualifying bean of type 'org.kie.api.runtime.KieSession' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}
time=2024-06-18T02:06:45.643+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Closing JPA EntityManagerFactory for persistence unit 'default'
time=2024-06-18T02:06:45.648+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown initiated...
time=2024-06-18T02:06:45.653+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown completed.
time=2024-06-18T02:06:45.657+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Stopping service [Tomcat]
time=2024-06-18T02:06:45.680+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=

Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
time=2024-06-18T02:06:45.715+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Unknown KieSession name: rules.drl
time=2024-06-18T02:06:45.717+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=

***************************
APPLICATION FAILED TO START
***************************

Description:

Field kieSession in com.cl.msofd.engineRules.DroolsService required a bean of type 'org.kie.api.runtime.KieSession' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)

The following candidates were found but could not be injected:
	- User-defined bean method 'kieSession' in 'DroolsConfig' ignored as the bean value is null


Action:

Consider revisiting the entries above or defining a bean of type 'org.kie.api.runtime.KieSession' in your configuration.


Process finished with exit code 1




