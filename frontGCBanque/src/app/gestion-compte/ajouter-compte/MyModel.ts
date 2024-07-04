package com.cl.msofd.controller;

import com.cl.msofd.model.ContextXTRA;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Date;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class AlignementXtraControllerTest {

    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    public void setUp() throws Exception {

        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void should_return_01_as_alignementXtra_result() throws Exception {
        // Mock Contexte AlignementXtra
        Date dateDepotPc = new Date(2022, 02, 12);
        ContextXTRA contextAlignementXtra = new ContextXTRA();
        contextAlignementXtra.setTypeObjetFinancement("02");
        contextAlignementXtra.setCodeBatiment("00001");
        contextAlignementXtra.setPresenceDateDepotPc(true);
        contextAlignementXtra.setPresenceDateDepotPcJustificatif(true);
        contextAlignementXtra.setDateDepotPc(dateDepotPc);
        contextAlignementXtra.setPresenceDpe(false);
        contextAlignementXtra.setPresenceDpeJustificatif(false);
        contextAlignementXtra.setPresenceNormeThermique(true);
        contextAlignementXtra.setNormeThermique("2025");
        contextAlignementXtra.setAnneeConstruction(0);
        contextAlignementXtra.setEtiquetteDpe("");
        contextAlignementXtra.setValeurCep(0.0);
        contextAlignementXtra.setPresenceDpeAvantTravaux(true);
        contextAlignementXtra.setPresenceDpeApresTravaux(true);
        contextAlignementXtra.setGainCep(0.0);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        MvcResult result = this.mockMvc.perform(post("/api/v1/alignement_xtra").content(asJsonString(contextAlignementXtra))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.ALL_VALUE))
                .andExpect(status().isOk())
                .andReturn();
        // Assert alignementXtra result
        assertThat(result.getResponse().getContentAsString().equals("01"));
    }

    public static String asJsonString(final Object obj) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

package com.cl.msofd.service;
import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import com.cl.msofd.model.ContextXTRA;
import com.cl.msofd.model.Referentiel;
import com.cl.msofd.utility.CalculAlignementStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
@Service
public class AlignementXtraService {
    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(AlignementXtraService.class);
   private final SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
    private final MongoTemplate mongoTemplate;
    @Autowired
    public AlignementXtraService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
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
/////////////////////////////////calcul de l'alignement//////////////////////////////////////////////////
    public String alignement(ContextXTRA ligneContext) {
        try {
            String typeObjetFinancement = ligneContext.getTypeObjetFinancement();
            if (typeObjetFinancement == null || !isAcquisition(typeObjetFinancement)) {
                return "07";
            }
            if (isAcquisitionInNewBuild(ligneContext)) {
                return alignForAcquisitionInNewBuild(ligneContext);
            }
            if (isAcquisitionInOldBuild(ligneContext)) {
                return alignForAcquisitionInOldBuild(ligneContext);
            }
            return "07"; // Default case
        } catch (Exception e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
            return "07";
        }
    }
    private boolean isAcquisition(String typeObjetFinancement) {
        return typeObjetFinancement.equals("02");
    }
    private boolean isAcquisitionInNewBuild(ContextXTRA ligneContext) {
        return ligneContext.isPresenceDateDepotPc() && ligneContext.isPresenceDateDepotPcJustificatif();
    }
    private String alignForAcquisitionInNewBuild(ContextXTRA ligneContext) {
        try {
            Date startDate = formatDate.parse("01/01/1700");
            Date endDate = formatDate.parse("31/12/2012");
            Date dateDepotPc = ligneContext.getDateDepotPc();
            if (dateDepotPc.compareTo(endDate) <= 0 && dateDepotPc.compareTo(startDate) > 0) {
                CalculAlignementStrategy calculAlignementFirstStrategy = new CalculAlignementStrategy();
                return calculAlignementFirstStrategy.aligneDpeCep(
                        ligneContext.getEtiquetteDpe(),
                        ligneContext.getValeurCep(),
                        obtenirValeurCepTop(ligneContext.getCodeBatiment())
                );
            } else if (dateDepotPc.compareTo(formatDate.parse("31/12/2020")) <= 0) {
                CalculAlignementStrategy calculAlignementSecondStrategy = new CalculAlignementStrategy();
                return calculAlignementSecondStrategy.alignCepDpeEtNormeTh(
                        ligneContext.getEtiquetteDpe(),
                        ligneContext.getValeurCep(),
                        obtenirValeurCepTop(ligneContext.getCodeBatiment()),
                        ligneContext.getNormeThermique(),
                        endDate
                );
            } else if (dateDepotPc.compareTo(formatDate.parse("31/12/2021")) <= 0) {
                CalculAlignementStrategy calculAlignementThirdStrategy = new CalculAlignementStrategy();
                return calculAlignementThirdStrategy.aligneCepCepmax(
                        ligneContext.getValeurCep(),
                        obtenirValeurCepMax(ligneContext.getCodeBatiment())
                );
            } else {
                return "01";
            }
        } catch (ParseException e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error aquisition in new build");
            return "07";
        }
    }
    private boolean isAcquisitionInOldBuild(ContextXTRA ligneContext) {
        return !ligneContext.isPresenceDateDepotPc() || !ligneContext.isPresenceDateDepotPcJustificatif();
    }
    private String alignForAcquisitionInOldBuild(ContextXTRA ligneContext) {
        try {
            Date endDate = formatDate.parse("31/12/2012");
            Date dateDepotPc = ligneContext.getDateDepotPc();
            if (dateDepotPc != null && dateDepotPc.compareTo(endDate) > 0) {
                return "07";
            }
            return "07";
        } catch (Exception e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error aquisition in old build");
            return "07";
        }
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
je veux ajouter des test unitaires pour couvrir tous le service ci dessus 
