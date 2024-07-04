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

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
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

    public String createFinancementReturnId(FinancementDto financementDto) throws Exception {
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

    public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws InvocationTargetException, IllegalAccessException {
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

    private void merge(Object target, Object source) throws InvocationTargetException, IllegalAccessException {
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
//
package com.cl.msofd.service;

import com.cl.msofd.exception.FinancementNotFoundException;
import com.cl.msofd.exception.GarantieNotFoundException;
import com.cl.msofd.exception.ListObjetNotFoundException;
import com.cl.msofd.model.*;
import com.cl.msofd.repository.FinancementRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class FinancementServiceTest {

    @Mock
    private FinancementRepository financementRepository;

    @Mock
    private IdGeneratorService idGeneratorService;

    @InjectMocks
    private FinancementService financementService;

    private Financement financement;
    private Financement emptyFinancement;

    private Garantie garantie;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        garantie = Garantie.builder()
                .idGarantie("GR51TLJ5G")
                .bien(Bien.builder().bienFinanceLCL(true).build())
                .build();

        ObjetFinancement objetFinancement = ObjetFinancement.builder()
                .idObjetFinancement("OBJ1")
                .garantie(Collections.singletonList(garantie))
                .build();

        financement = Financement.builder()
                .idFinancement("FR51TLJ5K")
                .objetFinancement(Collections.singletonList(objetFinancement))
                .build();

        emptyFinancement = Financement.builder()
                .idFinancement("FR51TLJ5Z")
                .build();


    }

    @Test
    void testCreateFinancement() {
        when(idGeneratorService.generateId("F")).thenReturn("FR51TLJ5K");
        when(idGeneratorService.generateId("O")).thenReturn("OBJ1");
        when(idGeneratorService.generateId("G")).thenReturn("GR51TLJ5G");
        when(financementRepository.save(any(Financement.class))).thenReturn(financement);

        Financement result = financementService.createFinancement(financement);



        assertNotNull(result);
        assertEquals("FR51TLJ5K", result.getIdFinancement());
        assertEquals("OBJ1", result.getObjetFinancement().get(0).getIdObjetFinancement());
        assertEquals("GR51TLJ5G", result.getObjetFinancement().get(0).getGarantie().get(0).getIdGarantie());
    }

    @Test
    void testGetFinancementByIdFinancement() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(financement));

        Financement result = financementService.getFinancementByIdFinancement("FR51TLJ5K");

        assertNotNull(result);
        assertEquals("FR51TLJ5K", result.getIdFinancement());
    }

    @Test
    void testGetFinancementByIdFinancementNotFound() {
        when(financementRepository.findByidFinancement("INVALID")).thenReturn(Optional.empty());

        assertThrows(FinancementNotFoundException.class, () -> {
            financementService.getFinancementByIdFinancement("INVALID");
        });
    }



    @Test
    void testGetGarantie() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(financement));

        Garantie result = financementService.getGarantie("FR51TLJ5K", "GR51TLJ5G");

        assertNotNull(result);
        assertEquals("GR51TLJ5G", result.getIdGarantie());
    }

    @Test
    void testGetGarantieNotFound() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(financement));

        assertThrows(GarantieNotFoundException.class, () -> {
            financementService.getGarantie("FR51TLJ5K", "INVALID");
        });
    }

    @Test
    void testGetListObjectFinancementByIdFinancement() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(financement));

        List<ObjetFinancement> result = financementService.getListObjectFinancementByIdFinancement("FR51TLJ5K");

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals("OBJ1", result.get(0).getIdObjetFinancement());
    }

    @Test
    void testGetListObjectFinancementByIdFinancementNotFound() {

        when(financementRepository.findByidFinancement("FR51TLJ5Z")).thenReturn(Optional.of(emptyFinancement));
        assertThrows(ListObjetNotFoundException.class, () -> {
            financementService.getListObjectFinancementByIdFinancement("FR51TLJ5Z");
        });
    }

    @Test
    void should_patch_financement_champs() throws Exception {
        // Création du DPE initial
        Dpe dpeInitial = Dpe.builder()
                .classeCep("A")
                .classeGes("C")
                .estimationCep(60.0)
                .estimationGes(80.0)
                .numeroDpe("DDD7E1287825F")
                .build();

        // Création du Bien initial
        Bien bienInitial = Bien.builder()
                .bienFinanceLCL(true)
                .codeBatiment("00001")
                .typeBatiment("Appartement")
                .codePostal("75016")
                .surfaceBien(79.0)
                .anneeConstruction(2000)
                .dpeActuel(dpeInitial)
                .montantFinanceLCL(900000.00)
                .build();

        // Création de la Garantie initiale
        List<Garantie> listGarantieInitial = new ArrayList<>();
        Garantie garantieInitial = Garantie.builder()
                .idGarantie("G12345678")
                .bien(bienInitial)
                .build();
        listGarantieInitial.add(garantieInitial);

        // Création de l'ObjetFinancement initial
        ObjetFinancement objetInitial = ObjetFinancement.builder()
                .codeObjetFinancement("02")
                .quotePartObjet(100.0)
                .bien(bienInitial)
                .garantie(listGarantieInitial)
                .build();

        // Création de l'Intervenant initial
        List<String> idRepersInitial = new ArrayList<>();
        idRepersInitial.add("8415595180");
        Intervenant intervenantInitial = Intervenant.builder()
                .idReper(idRepersInitial)
                .build();

        // Création de la liste d'ObjetsFinancement initiale
        List<ObjetFinancement> listObjetFinancementInitial = new ArrayList<>();
        listObjetFinancementInitial.add(objetInitial);

        // Création du Financement initial
        Financement financementInitial = Financement.builder()
                .objetFinancement(listObjetFinancementInitial)
                .intervenant(intervenantInitial)
                .build();

        // Création d'un Financement pour test
        Financement createdFinancement = Financement.builder()
                .idFinancement("F0001")
                .objetFinancement(listObjetFinancementInitial)
                .intervenant(intervenantInitial)
                .build();

        // Configuration des mocks
        when(idGeneratorService.generateId("F")).thenReturn("F0001");
        when(idGeneratorService.generateId("O")).thenReturn("O0001");
        when(idGeneratorService.generateId("G")).thenReturn("G0001");
        when(financementRepository.save(any(Financement.class))).thenReturn(createdFinancement);

        // Création du Financement via le service
        financementService.createFinancement(financementInitial);

        // Création du DPE mis à jour
        Dpe dpeUpdated = Dpe.builder()
                .classeCep("B")
                .build();

        // Création du Bien mis à jour
        Bien bienUpdated = Bien.builder()
                .codePostal("75018")
                .surfaceBien(120.0)
                .dpeActuel(dpeUpdated)
                .build();

        // Création de l'ObjetFinancement mis à jour
        ObjetFinancement objetUpdated = ObjetFinancement.builder()
                .idObjetFinancement(createdFinancement.getObjetFinancement().get(0).getIdObjetFinancement())
                .bien(bienUpdated)
                .build();

        List<ObjetFinancement> listObjetFinancementUpdated = new ArrayList<>();
        listObjetFinancementUpdated.add(objetUpdated);

        // Création du Financement mis à jour
        Financement patchedFinancement = Financement.builder()
                .objetFinancement(listObjetFinancementUpdated)
                .build();

        // Configuration du mock pour le patch!
        when(financementRepository.findByidFinancement("F0001")).thenReturn(Optional.of(createdFinancement));
        when(financementRepository.save(any(Financement.class))).thenAnswer(invocation -> invocation.getArguments()[0]);

        // Application du patch
        Financement result = financementService.patchFinancementChamps("F0001", patchedFinancement);

        // Assertions
        assertNotNull(result);
        assertEquals("75018", result.getObjetFinancement().get(0).getBien().getCodePostal());
        assertEquals(120.0, result.getObjetFinancement().get(0).getBien().getSurfaceBien());
        assertEquals("B", result.getObjetFinancement().get(0).getBien().getDpeActuel().getClasseCep());
    }
    @Test
    void testDeleteFinancementByIdFinancement() {
        doAnswer(invocation -> {
            return null;
        }).when(financementRepository).deleteByIdFinancement("FR51TLJ5K");

        financementService.deleteFinancementByIdFinancement("FR51TLJ5K");

        verify(financementRepository, times(1)).deleteByIdFinancement("FR51TLJ5K");
    }
    @AfterEach
    public void tearDown() {
        financement = null;
        garantie = null;
    }
}
// sonar remonte ca :
- Remove useless curly braces around statement line 53  objetFinancement.getGarantie().forEach(garantie -> {
-  if (garantieList.isEmpty() || !garantieIdExist(idGarantie, garantieList)) { Partially covered by tests (3 of 4 conditions).
- Replace this usage of 'Stream.collect(Collectors.toList())' with 'Stream.toList()' for this portion of code   List<String> idGaranties = savedFinancement.getObjetFinancement().get(0).getGarantie()
                .stream()
                .map(Garantie::getIdGarantie)
                .collect(Collectors.toList());
-    private void updateFieldIfNotNull(Financement existingFinancement, Financement financementToUpdate, Field field) {
        try {
            field.setAccessible(true); This accessibility update should be removed.
            Object newValue = field.get(financementToUpdate); 
            if (newValue != null) {
                field.set(existingFinancement, newValue); This accessibility bypass should be removed.
            }
        } catch (IllegalAccessException e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Erreur lors de l'update du financement causé par: {}", e.getMessage());
        }
    }
