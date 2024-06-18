lorsque je lance l'api 
  j'ai cette erreur
  <ErrorResponse>
    <code>TECHNICAL_EXCEPTION_OCCURED </code>
    <message>
        <message>Unexpected global [responses]</message>
    </message>
</ErrorResponse>

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
}
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
    private String classeCep;
    private double valeurCep;
    private String normeThermique;
    private boolean presenceNormeThermiqueJustificatif;
    private String xtra248;
    private String xtra249;
    private String xtra250;
    private String xtra251;
    private String xtra275;


}
