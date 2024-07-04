package com.cl.msofd.service;

import com.cl.msofd.model.ContextAlignement;
import com.cl.msofd.model.Referentiel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class AlignementServiceTest {

    @Autowired
    AlignementService alignementService;

    private final SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");

    @Test
    void should_calculate_alignement_and_return_07() throws Exception {
        ContextAlignement context = ContextAlignement.builder()
                .typeObjetFinancement("04")
                .codeBatiment("00001")
                .presenceDateDepotPc(false)
                .dateDepotPc(null)
                .presenceDpe(true)
                .presenceNormeThermique(false)
                .normeThermique("2012")
                .anneeConstruction(2000)
                .etiquetteDpe("C")
                .valeurCep(110)
                .presenceDpeAvantTravaux(false)
                .presenceDpeApresTravaux(false)
                .gainCep(12.0)
                .build();
        assertEquals("07", alignementService.alignement(context));
    }

    @Test
    void should_calculate_alignement_and_return_01_when_dpe_is_absent_and_date_depot_pc_is_after_2022() throws Exception {
        Date dateDepotPc = formatDate.parse("02/01/2022");
        ContextAlignement context = ContextAlignement.builder()
                .typeObjetFinancement("02")
                .codeBatiment("00001")
                .presenceDateDepotPc(true)
                .dateDepotPc(dateDepotPc)
                .presenceDpe(false)
                .anneeConstruction(2022)
                .build();
        assertEquals("01", alignementService.alignement(context));
    }

    @Test
    void should_calculate_alignement_and_return_aligned_value_for_dpe_present_before_2012() throws Exception {
        Date dateDepotPc = formatDate.parse("15/05/2010");
        ContextAlignement context = ContextAlignement.builder()
                .typeObjetFinancement("02")
                .codeBatiment("00001")
                .presenceDateDepotPc(true)
                .dateDepotPc(dateDepotPc)
                .presenceDpe(true)
                .etiquetteDpe("A")
                .valeurCep(50)
                .anneeConstruction(2010)
                .build();
        assertEquals("Expected Aligned Value", alignementService.alignement(context));  // Replace with actual expected value
    }

    @Test
    void should_calculate_alignement_and_return_aligned_value_for_cepmax_between_2012_and_2021() throws Exception {
        Date dateDepotPc = formatDate.parse("15/05/2020");
        ContextAlignement context = ContextAlignement.builder()
                .typeObjetFinancement("02")
                .codeBatiment("00001")
                .presenceDateDepotPc(true)
                .dateDepotPc(dateDepotPc)
                .presenceDpe(true)
                .etiquetteDpe("B")
                .valeurCep(80)
                .normeThermique("RT2012")
                .anneeConstruction(2020)
                .build();
        assertEquals("Expected Aligned Value", alignementService.alignement(context));  // Replace with actual expected value
    }

    @Test
    void should_calculate_alignement_and_return_aligned_value_for_cepmax_after_2021() throws Exception {
        Date dateDepotPc = formatDate.parse("15/01/2022");
        ContextAlignement context = ContextAlignement.builder()
                .typeObjetFinancement("02")
                .codeBatiment("00001")
                .presenceDateDepotPc(true)
                .dateDepotPc(dateDepotPc)
                .presenceDpe(true)
                .etiquetteDpe("A")
                .valeurCep(50)
                .anneeConstruction(2022)
                .normeThermique("RE2020")
                .build();
        assertEquals("Expected Aligned Value", alignementService.alignement(context));  // Replace with actual expected value
    }

    @Test
    void should_return_valeurCepTop() {
        String codeRecherche = "00005";
        Double returnedValue = alignementService.obtenirValeurCepTop(codeRecherche);
        assertThat(returnedValue).isEqualTo(282.0);
    }

    @Test
    void should_return_valeurCepMax() {
        String codeRecherche = "00004";
        Double returnedValue = alignementService.obtenirValeurCepMax(codeRecherche);
        assertThat(returnedValue).isEqualTo(247.0);
    }
}
