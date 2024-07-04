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
import java.lang.reflect.Method;
import java.util.*;


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
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Recherche de la liste des objets de financement pour l'ID : {}", idFinancement);

        // Trouve un financement par ID
        Financement financement = financementRepository.findByidFinancement(idFinancement)
                .orElseThrow(() -> new FinancementNotFoundException(
                        String.format("Pas de financement trouvé pour l'ID : %s", idFinancement)
                ));

        // Récupère la liste des objets de financement
        List<ObjetFinancement> listObjetsFinancement = financement.getObjetFinancement();

        // Vérifie si la liste est vide et lance une exception le cas échéant
        if (listObjetsFinancement == null || listObjetsFinancement.isEmpty()) {
            throw new ListObjetNotFoundException(
                    String.format("Pas de liste d'objets de financement pour le financement ayant comme ID : %s", idFinancement)
            );
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

        Map<String, Method> targetSetters = new HashMap<>();
        for (Method method : target.getClass().getMethods()) {
            if (method.getName().startsWith("set") && method.getParameterCount() == 1) {
                targetSetters.put(method.getName().substring(3).toLowerCase(), method);
            }
        }

        for (Method method : source.getClass().getMethods()) {
            if (method.getName().startsWith("get") && method.getParameterCount() == 0) {
                String fieldName = method.getName().substring(3).toLowerCase();
                Object value = method.invoke(source);

                if (value != null && targetSetters.containsKey(fieldName)) {
                      Method setter = targetSetters.get(fieldName);
                    setter.invoke(target, value);
                }
            }
        }
    }


}
