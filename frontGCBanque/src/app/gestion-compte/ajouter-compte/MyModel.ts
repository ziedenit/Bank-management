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
import java.lang.reflect.Method;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FinancementService {
    private final ObjectMapper objectMapper;
    private static final CommonLogger commonLogger = CommonLoggerFactory.getLogger(FinancementService.class);

    @Autowired
    private FinancementRepository financementRepository;

    @Autowired
    private FinancementMapper financementMapper;

    @Autowired
    private IdGeneratorService idGeneratorService;

    public FinancementService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

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

    public List<ObjetFinancement> getListObjectFinancementByIdFinancement(String idFinancement) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Recherche de la liste des objets de financement pour l'ID : {}", idFinancement);
        Financement financement = getFinancementByIdFinancement(idFinancement);
        List<ObjetFinancement> listObjetsFinancement = financement.getObjetFinancement();
        if (listObjetsFinancement == null || listObjetsFinancement.isEmpty()) {
            throw new ListObjetNotFoundException(
                    String.format("Pas de liste d'objets de financement pour le financement ayant comme ID : %s", idFinancement));
        }
        return listObjetsFinancement;
    }

    public String createFinancementReturnId(FinancementDto financementDto) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("create financement from  {} :", financementDto);
        Financement financement = financementMapper.createFinancementFromFinancementDto(financementDto);
        Financement savedFinancement = financementRepository.save(financement);
        return savedFinancement.getIdFinancement();
    }

    public String createGarantieFromGarantieDto(GarantieDto garantieDto) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("create garantie from  {} :", garantieDto);
        Financement financementGarantie = getFinancementByIdFinancement(garantieDto.getIdFinancement());
        List<Garantie> garantieList = new ArrayList<>();
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
                    .bien(buildBienFromDto(garantieDto))
                    .build();
            garantieList.add(garantie);
            financementGarantie.getObjetFinancement().get(0).setGarantie(garantieList);
        }
        financementRepository.save(financementGarantie);
        financementRepository.deleteByIdFinancement(financementGarantie.getIdFinancement());
        return financementGarantie.getObjetFinancement().get(0).getGarantie().get(0).getIdGarantie();
    }

    private Bien buildBienFromDto(GarantieDto garantieDto) {
        return Bien.builder()
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
                .dpeActuel(Dpe.builder().classeCep(garantieDto.getClasseCep()).build())
                .build();
    }

    public Garantie getGarantie(String idFinancement, String idGarantie) {
        Financement existingFinancement = getFinancementByIdFinancement(idFinancement);
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("recherche de la garantie...");
        List<Garantie> garantieList = existingFinancement.getObjetFinancement().get(0).getGarantie();
        if (garantieList.isEmpty() || !garantieIdExist(idGarantie, garantieList)) {
            throw new GarantieNotFoundException(
                    String.format("Le financement %s ne possède aucune garantie associée ", idFinancement));
        }
        return garantieList.stream()
                .filter(garantie -> garantie.getIdGarantie().equals(idGarantie))
                .findFirst()
                .orElse(null);
    }

    public boolean garantieIdExist(String idGarantie, List<Garantie> garantieList) {
        return garantieList.stream()
                .anyMatch(garantie -> garantie.getIdGarantie().equals(idGarantie));
    }

    public ResponseFinancementGarantieDto createFinancementGarantie(FinancementGarantieDto financementGarantieDto) {
        Financement financement = financementMapper.createFinancementFromFinancementGarantieDto(financementGarantieDto);
        Financement savedFinancement = financementRepository.save(financement);
        List<String> idGaranties = savedFinancement.getObjetFinancement().get(0).getGarantie()
                .stream()
                .map(Garantie::getIdGarantie)
                .collect(Collectors.toList());
        return ResponseFinancementGarantieDto.builder()
                .idFinancement(savedFinancement.getIdFinancement())
                .idGarantie(idGaranties)
                .build();
    }

    public Financement patchFinancement(String idFinancement, Financement financementToUpdate) {
        Financement existingFinancement = financementRepository.findByidFinancement(idFinancement)
                .orElseThrow(() -> new FinancementNotFoundException(
                        String.format("Le financement à modifier %s est inexistant", idFinancement)));

        Arrays.stream(Financement.class.getDeclaredFields())
                .forEach(field -> updateFieldIfNotNull(existingFinancement, financementToUpdate, field));

        return financementRepository.save(existingFinancement);
    }

    private void updateFieldIfNotNull(Financement existingFinancement, Financement financementToUpdate, Field field) {
        try {
            field.setAccessible(true);
            Object newValue = field.get(financementToUpdate);
            if (newValue != null) {
                field.set(existingFinancement, newValue);
            }
        } catch (IllegalAccessException e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Erreur lors de l'update du financement causé par: {}", e.getMessage());
        }
    }

    public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) {
        Financement existingFinancement = getFinancementByIdFinancement(idFinancement);
        if (financementToUpdate.getObjetFinancement() != null) {
            for (ObjetFinancement updatedObjet : financementToUpdate.getObjetFinancement()) {
                boolean found = false;
                for (ObjetFinancement existingObjet : existingFinancement.getObjetFinancement()) {
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
        Financement savedFinancement = financementRepository.save(existingFinancement);
        financementRepository.deleteByIdFinancement(existingFinancement.getIdFinancement());
        return savedFinancement;
    }

    private void merge(Object target, Object source) {
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
