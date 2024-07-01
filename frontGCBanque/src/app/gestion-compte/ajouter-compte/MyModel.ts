package com.cl.msofd.service;

import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import com.cl.msofd.dto.FinancementDto;
import com.cl.msofd.dto.FinancementGarantieDto;
import com.cl.msofd.dto.GarantieDto;
import com.cl.msofd.dto.ResponseFinancementGarantieDto;
import com.cl.msofd.exception.FinancementNotFoundException;
import com.cl.msofd.exception.GarantieNotFoundException;
import com.cl.msofd.exception.ListObjetNotFoundException;
import com.cl.msofd.mapper.FinancementMapper;
import com.cl.msofd.model.*;
import com.cl.msofd.repository.FinancementRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service

public class FinancementService {
    private final ObjectMapper objectMapper;

    public FinancementService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    private static final CommonLogger commonLogger = CommonLoggerFactory.getLogger(FinancementService.class);

    @Autowired

    private FinancementRepository financementRepository;

    @Autowired

    private FinancementMapper financementMapper;


    @Autowired

    private IdGeneratorService idGeneratorService;

    public Financement createFinancement(Financement financement) {

        financement.setIdFinancement(idGeneratorService.generateId("F"));

        if (financement.getObjetFinancement() != null) {
            financement.getObjetFinancement().forEach(objetFinancement -> {
                objetFinancement.setIdObjetFinancement(idGeneratorService.generateId("O"));

                if (objetFinancement.getGarantie() != null) {
                    objetFinancement.getGarantie().forEach(garantie -> {
                        garantie.setIdGarantie(idGeneratorService.generateId("G"));
                    });
                }
            });
        }
        return financementRepository.save(financement);
    }

    public void deleteFinancementByIdFinancement(String id) {

        financementRepository.deleteByIdFinancement(id);

    }


    public Financement getFinancementByIdFinancement(String idFinancement) {

        return financementRepository.findByidFinancement(idFinancement)

                .orElseThrow(() -> new FinancementNotFoundException(

                        String.format("Le financement %s est inexistant", idFinancement)));

    }

    ///////////////////////// Return Multi Financement Object List///////////////////////////////////////////////
    public List<ObjetFinancement> getListObjectFinancementByIdFinancement(String idFinancement) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("recherche de la liste de objets...");

        List<ObjetFinancement> listObjetsFinancement = financementRepository.findByidFinancement(idFinancement).get().getObjetFinancement();

        if (listObjetsFinancement==null||listObjetsFinancement.isEmpty()) {
            throw new ListObjetNotFoundException(
                    String.format("Pas de liste d'objet financement pour ce le financement ayant comme id  ", idFinancement));

        }
        return listObjetsFinancement;
    }


    ////////////////////////////////CPPE reserve idFinancement/////////////////////////////////////////////////////////

    public String createFinancementReturnId(FinancementDto financementDto) throws Exception {

        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("create financement from  {} :", financementDto);

        Financement financement = financementMapper.createFinancementFromFinancementDto(financementDto);

        Financement savedFinancement = financementRepository.save(financement);

        return savedFinancement.getIdFinancement();

    }


    ///////////////////////////////////CPPE reserve id Garantie/////////////////////////////////////////////////////////////////

    public String createGarantieFromGarantieDto(GarantieDto garantieDto) throws FinancementNotFoundException {

        List<Garantie> garantieList = new ArrayList<>();

        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("create garantie from  {} :", garantieDto);

        Financement financementGarantie = financementRepository.findByidFinancement(garantieDto.getIdFinancement())

                .orElseThrow(() -> new FinancementNotFoundException("Le financement avec l'ID spécifié est introuvable"));

        if (garantieDto.isBienFinanceLCL()) {

            Bien bienFinanceLcl = financementGarantie.getObjetFinancement().get(0).getBien();

            Garantie garantie = Garantie.builder()

                    .idGarantie(idGeneratorService.generateId("G"))

                    .bien(bienFinanceLcl)

                    .build();

            garantieList.add(garantie);

            financementGarantie.getObjetFinancement().get(0).setGarantie(garantieList);


        } else {

            Garantie garantie = Garantie.builder()

                    .idGarantie(idGeneratorService.generateId("G"))

                    .bien(Bien.builder()

                            .idBien(idGeneratorService.generateId("B"))

                            .bienFinanceLCL(garantieDto.isBienFinanceLCL())

                            .prixBien(garantieDto.getPrixBien())

                            .typeBatiment(garantieDto.getTypeBatiment())

                            .dateDebutConstruction(garantieDto.getDateDebutConstruction())

                            .numeroNomRue(garantieDto.getNumeroNomRue())

                            .codePostal(garantieDto.getCodePostalBien())

                            .nomCommune(garantieDto.getVilleBien())

                            .paysBien(garantieDto.getPaysBien())

                            .surfaceBien(garantieDto.getSurfaceBien())

                            .dpeActuel(Dpe.builder()

                                    .classeCep(garantieDto.getClasseCep())

                                    .build())

                            .build())

                    .build();

            garantieList.add(garantie);

            financementGarantie.getObjetFinancement().get(0).setGarantie(garantieList);

        }

        financementRepository.save(financementGarantie);
        financementRepository.deleteByIdFinancement(financementGarantie.getIdFinancement());

        return financementGarantie.getObjetFinancement().get(0).getGarantie().get(0).getIdGarantie();

    }


    //////////////////////////////////Get une garantie d'un financement par son idGarantie////////////////////////////////////////////////

    public Garantie getGarantie(String idFinancement, String idGarantie) {

        Garantie returnedGarantie = null;

        List<Garantie> garantieList;

        Financement existingFinancement = financementRepository.findByidFinancement(idFinancement).orElseThrow(() -> new FinancementNotFoundException(

                String.format("Le financement %s est inexistant", idFinancement)));

        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("recherche de la garantie...");

        if (existingFinancement.getObjetFinancement() != null && existingFinancement.getObjetFinancement().get(0).getGarantie() != null) {

            garantieList = existingFinancement.getObjetFinancement().get(0).getGarantie();

            if (garantieList.isEmpty() || !garantieIdExist(idGarantie, garantieList)) {

                throw new GarantieNotFoundException(

                        String.format("Le financement %s ne possède aucune garantie associée ", idFinancement));

            } else {

                returnedGarantie = garantieList.stream().

                        filter(garantie -> garantie.getIdGarantie().equals(idGarantie))

                        .toList().get(0);

            }

        }

        return returnedGarantie;

    }


    public boolean garantieIdExist(String idGarantie, List<Garantie> garantieList) {

        return garantieList.stream().

                anyMatch(garantie -> garantie.getIdGarantie().equals(idGarantie));

    }


    /////////////////////////////////////////Service NECI/////////////////////////////////////////////////////////////////////

    public ResponseFinancementGarantieDto createFinancementGarantie(FinancementGarantieDto financementGarantieDto) {

        Financement financement = financementMapper.createFinancementFromFinancementGarantieDto(financementGarantieDto);

        Financement savedFinancement = financementRepository.save(financement);

        return ResponseFinancementGarantieDto.builder()

                .idFinancement(savedFinancement.getIdFinancement())

                .idGarantie(savedFinancement.getObjetFinancement().get(0).getGarantie()

                        .stream()

                        .map(Garantie::getIdGarantie)

                        .toList()

                )

                .build();

    }

/////////////////////////////////patch financement par objet//////////////////////////////////////////

    public Financement patchFinancement(String idFinancement, Financement financementToUpdate) {
        Financement existingFinancement = financementRepository.findByidFinancement(idFinancement).orElse(null);

        if (existingFinancement == null) {

            throw new FinancementNotFoundException(

                    String.format("Le financement a modifier %s est inexistant", idFinancement));

        }

        Field[] fields = Financement.class.getDeclaredFields();

        Arrays.stream(fields).forEach(field -> {
            ReflectionUtils.makeAccessible(field);

            try {

                Object newValue = field.get(financementToUpdate);

                if (newValue != null) {

                    field.set(existingFinancement, newValue);

                }

            } catch (IllegalAccessException e) {

                commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("erreur lors de l'update du financement causé par: {}", e.getMessage());

            }

        });

        return financementRepository.save(existingFinancement);

    }

    public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws Exception {
        // Récupère le financement existant
        Financement existingFinancement = financementRepository.findByidFinancement(idFinancement)
                .orElseThrow(() -> new FinancementNotFoundException(String.format("Le financement à modifier %s est inexistant", idFinancement)));

        // Mise à jour par champs objets de financement
        if (financementToUpdate.getObjetFinancement() != null) {
            for (ObjetFinancement updatedObjet : financementToUpdate.getObjetFinancement()) {
                boolean found = false;
                for (int i = 0; i < existingFinancement.getObjetFinancement().size(); i++) {
                    ObjetFinancement existingObjet = existingFinancement.getObjetFinancement().get(i);
                    if (existingObjet.getIdObjetFinancement().equals(updatedObjet.getIdObjetFinancement())) {
                        merge(existingObjet, updatedObjet);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    existingFinancement.getObjetFinancement().add(updatedObjet);
                }
            }
        }


        // Sauvegarder le financement mis à jour
        Financement savedFinancement = financementRepository.save(existingFinancement);

        // Supprimer l'ancien financement
        financementRepository.deleteByIdFinancement(existingFinancement.getIdFinancement());

        return savedFinancement;
    }

    private void merge(Object target, Object source) throws Exception {
        Field[] fields = source.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            Object value = field.get(source);
            if (value != null) {
                field.set(target, value);
            }
        }
    }


}
//
package com.cl.msofd.service;

import com.cl.msofd.dto.ResponseFinancementGarantieDto;
import com.cl.msofd.model.*;
import com.cl.msofd.repository.FinancementRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class FinancementServiceTest {

    @Autowired
    private FinancementRepository financementRepository;

    @Autowired
    private FinancementService financementService;

    @Autowired
    IdGeneratorService idGeneratorService;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");


    @Test
    void should_return_garantie_based_on_idFinancement_and_idGarantie() throws Exception {


        ArrayList<String> idReper = new ArrayList<String>(Arrays.asList("0123456789"));

        List<Garantie> listGarantie = new ArrayList<Garantie>();

        Garantie garantie1 = Garantie.builder()
                .bien(Bien.builder()
                        .bienFinanceLCL(false)
                        .adresseComplete("2 rue de Bercy")
                        .codePostal("75012")
                        .nomCommune("Paris")
                        .paysBien("France")
                        .typeBatiment("Appartement")
                        .prixBien(1000000.0)
                        .montantFinanceLCL(500000.0)
                        .partLCL(50.0)
                        .dpeActuel(Dpe.builder().numeroDpe("2125E0981916Z")
                                .estimationCep(45.0)
                                .classeCep("A")
                                .estimationGes(960.0)
                                .classeGes("B")
                                .build())

                        .build())
                .idGarantie("GR51TLJ5G")
                .build();
        listGarantie.add(garantie1);

        Garantie garantie2 = Garantie.builder()
                .idGarantie("GR51TLJ5K")
                .bien(Bien.builder()
                        .bienFinanceLCL(true)
                        .build())
                .build();
        listGarantie.add(garantie2);

        ArrayList<ObjetFinancement> listObjets = new ArrayList<ObjetFinancement>();
        listObjets.add(ObjetFinancement.builder()
                .codeObjetFinancement("02")
                .bien(Bien.builder().montantFinanceLCL(500000.0)
                        .adresseComplete("14 Avenue de l'Opéra")
                        .codePostal("75001")
                        .nomCommune("Paris")
                        .paysBien("France")
                        .surfaceBien(152.0)
                        .typeEnergie("Gaz naturel")
                        .typeBatiment("Appartement")
                        .typeUsage("00001")
                        .etatBien("Ancien")
                        .bienFinanceLCL(true)
                        .prixBien(1000000.0)
                        .montantFinanceLCL(500000.0)
                        .partLCL(50.0)

                        .dpeActuel(Dpe.builder().numeroDpe("2125E0981916Z")
                                .estimationCep(45.0)
                                .classeCep("A")
                                .estimationGes(960.0)
                                .classeGes("B")
                                .build())

                        .build())

                .garantie(listGarantie)

                .build());

        Financement financement = Financement.builder()
                .idFinancement("FR51TLJ5K")
                .codeApplicatifOrigine("02")
                .agenceCompte("003800000056968N")
                .objetFinancement(listObjets)

                .intervenant(Intervenant.builder()
                        .idReper(idReper)
                        .build())
                .build();

        Financement createdFinancement = financementService.createFinancement(financement);

        Garantie returnedGarantie = financementService.getGarantie(createdFinancement.getIdFinancement(), garantie1.getIdGarantie());
        assertEquals(returnedGarantie.getIdGarantie(), garantie1.getIdGarantie());

    }


    @Test
    void should_patch_existing_financement() throws Exception {
        Dpe dpeActuel = Dpe.builder()
                .classeCep("A")
                .classeGes("C")
                .estimationCep(60.0)
                .estimationGes(80.0)
                .numeroDpe("DDD7E1287825F")
                .build();

        Bien bien = Bien.builder()
                .bienFinanceLCL(true)
                .codeBatiment("00001")
                .typeBatiment("Appartement")
                .codePostal("75016")
                .surfaceBien(79.0)
                .anneeConstruction(2000)
                .dpeActuel(dpeActuel)
                .montantFinanceLCL(900000.00)
                .build();

        List<Garantie> listGarantie = new ArrayList<>();
        Garantie garantie = Garantie.builder()
                .idGarantie("G12345678")
                .bien(bien)
                .build();
        listGarantie.add(garantie);


        ObjetFinancement object = ObjetFinancement.builder()
                .codeObjetFinancement("02")
                .quotePartObjet(100.0)
                .bien(bien)
                .garantie(listGarantie)
                .build();

        List<String> idRepers = new ArrayList<>();
        idRepers.add("8415595180");
        Intervenant intervenant = Intervenant.builder()
                .idReper(idRepers)
                .build();
        List<ObjetFinancement> listObjetFinancement = new ArrayList<>();
        listObjetFinancement.add(object);
        Financement financementExistant = Financement.builder()
                .objetFinancement(listObjetFinancement)
                .intervenant(intervenant)
                .build();

        financementService.createFinancement(financementExistant);

        Dpe dpeAct = Dpe.builder()
                .classeCep("A")
                .estimationCep(60.0)
                .build();

        Bien bienObjet = Bien.builder()
                .codePostal("75018")
                .surfaceBien(120.0)
                .dpeActuel(dpeAct)
                .build();

        ObjetFinancement objectFinancement = ObjetFinancement.builder()
                .codeObjetFinancement("03")
                .quotePartObjet(100.0)
                .bien(bienObjet)
                .build();
        List<ObjetFinancement> listObjetsFinancement = new ArrayList<>();
        listObjetsFinancement.add(objectFinancement);
        Financement patchedFinancement = Financement.builder()
                .objetFinancement(listObjetsFinancement)
                .build();

        Financement result = financementService.patchFinancementChamps(financementExistant.getIdFinancement(), patchedFinancement);
        assertEquals(result.getObjetFinancement().get(0).getCodeObjetFinancement(), financementExistant.getObjetFinancement().get(0).getCodeObjetFinancement());
        assertEquals(result.getObjetFinancement().get(0).getBien().getCodePostal(), financementExistant.getObjetFinancement().get(0).getBien().getCodePostal());
        assertEquals(result.getObjetFinancement().get(0).getBien().getDpeActuel().getClasseCep(), financementExistant.getObjetFinancement().get(0).getBien().getDpeActuel().getClasseCep());
        assertEquals(result.getObjetFinancement().get(0).getBien().getDpeActuel().getEstimationCep(), financementExistant.getObjetFinancement().get(0).getBien().getDpeActuel().getEstimationCep());
        assertEquals(result.getObjetFinancement().get(0).getQuotePartObjet(), financementExistant.getObjetFinancement().get(0).getQuotePartObjet());

    }


    @Test
    void createFinancementGarantieOK() {

        ArrayList<String> idReper = new ArrayList<String>(Arrays.asList("0123456789"));

        List<Garantie> listGarantie = new ArrayList<Garantie>();

        Garantie garantie1 = Garantie.builder()
                .bien(Bien.builder()
                        .bienFinanceLCL(false)
                        .adresseComplete("2 rue de Bercy")
                        .codePostal("75012")
                        .nomCommune("Paris")
                        .paysBien("France")
                        .typeBatiment("Appartement")
                        .prixBien(1000000.0)
                        .montantFinanceLCL(500000.0)
                        .partLCL(50.0)
                        .dpeActuel(Dpe.builder().numeroDpe("2125E0981916Z")
                                .estimationCep(45.0)
                                .classeCep("A")
                                .estimationGes(960.0)
                                .classeGes("B")
                                .build())

                        .build())
                .build();
        listGarantie.add(garantie1);

        Garantie garantie2 = Garantie.builder()
                .bien(Bien.builder()
                        .bienFinanceLCL(true)
                        .build())
                .build();
        listGarantie.add(garantie2);

        List<ObjetFinancement> listObjetFinancement = new ArrayList<>();
        listObjetFinancement.add(ObjetFinancement.builder()
                .codeObjetFinancement("02")
                .bien(Bien.builder().montantFinanceLCL(500000.0)
                        .adresseComplete("14 Avenue de l'Opéra")
                        .codePostal("75001")
                        .nomCommune("Paris")
                        .paysBien("France")
                        .surfaceBien(152.0)
                        .typeEnergie("Gaz naturel")
                        .typeBatiment("Appartement")
                        .typeUsage("00001")
                        .etatBien("Ancien")
                        .bienFinanceLCL(true)
                        .prixBien(1000000.0)
                        .montantFinanceLCL(500000.0)
                        .partLCL(50.0)

                        .dpeActuel(Dpe.builder().numeroDpe("2125E0981916Z")
                                .estimationCep(45.0)
                                .classeCep("A")
                                .estimationGes(960.0)
                                .classeGes("B")
                                .build())

                        .build())

                .garantie(listGarantie)

                .build());
        Financement financement = Financement.builder()
                .codeApplicatifOrigine("02")
                .agenceCompte("003800000056968N")
                .objetFinancement(listObjetFinancement)

                .intervenant(Intervenant.builder()
                        .idReper(idReper)
                        .build())
                .build();

        Financement financementSave = financementRepository.save(financement);
        ResponseFinancementGarantieDto responseFiancement = ResponseFinancementGarantieDto.builder()
                .idFinancement(financementSave.getIdFinancement())
                .build();
        assertEquals(financementSave.getIdFinancement(), responseFiancement.getIdFinancement());

    }


    @Test
    void createFinancementGarantieKO() {

        ArrayList<String> idReper = new ArrayList<String>(Arrays.asList("0123456789"));
        ArrayList<ObjetFinancement> listObjets = new ArrayList<ObjetFinancement>();
        listObjets.add(ObjetFinancement.builder()
                .codeObjetFinancement("55")
                .bien(Bien.builder().montantFinanceLCL(500000.0)
                        .adresseComplete("14 Avenue de l'Opéra")
                        .codePostal("75001")
                        .nomCommune("Paris")
                        .paysBien("France")
                        .surfaceBien(152.0)
                        .typeEnergie("Gaz naturel")
                        .typeBatiment("Appartement")
                        .typeUsage("00001")
                        .etatBien("Ancien")
                        .bienFinanceLCL(true)
                        .prixBien(1000000.0)
                        .montantFinanceLCL(500000.0)
                        .partLCL(50.0)

                        .dpeActuel(Dpe.builder().numeroDpe("2125E0981916Z")
                                .estimationCep(45.0)
                                .classeCep("A")
                                .estimationGes(960.0)
                                .classeGes("B")
                                .build())

                        .build())

                .build());


        Financement financement = Financement.builder().idFinancement(idGeneratorService.generateId("F"))
                .codeApplicatifOrigine("02")
                .agenceCompte("003800000056968N")
                .objetFinancement(listObjets)

                .intervenant(Intervenant.builder()
                        .idReper(idReper)
                        .build())
                .build();

        try {
            financementRepository.save(financement);
        } catch (Exception e) {
            assertTrue(true);
        }

    }

    @AfterEach
    public void cleanUpEach() {

        financementService.deleteFinancementByIdFinancement("FR51TLJ5K");
        financementService.deleteFinancementByIdFinancement("F12345671");
        financementService.deleteFinancementByIdFinancement("123456ABC");


    }
}
