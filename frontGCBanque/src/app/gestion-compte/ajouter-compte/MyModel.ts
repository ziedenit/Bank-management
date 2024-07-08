package com.cl.msofd.service;

import com.cl.msofd.model.ContextXTRA;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class AlignementXtraServiceTest {

    @Autowired
    AlignementXtraService alignementXtraService;

    private final SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");

    @Test
    void should_return_07_for_non_acquisition_type() {
        ContextXTRA context = new ContextXTRA();
        context.setTypeObjetFinancement("01");
        String result = alignementXtraService.alignement(context);
        assertThat(result).isEqualTo("07");
    }

    @Test
    void should_return_07_for_null_typeObjetFinancement() {
        ContextXTRA context = new ContextXTRA();
        String result = alignementXtraService.alignement(context);
        assertThat(result).isEqualTo("07");
    }

    @Test
    void should_return_01_for_acquisition_new_build_after_2021() throws Exception {
        Date dateDepotPc = formatDate.parse("15/01/2022");
        ContextXTRA context = new ContextXTRA();
        context.setTypeObjetFinancement("02");
        context.setCodeBatiment("00001");
        context.setPresenceDateDepotPc(true);
        context.setPresenceDateDepotPcJustificatif(true);
        context.setDateDepotPc(dateDepotPc);
        context.setPresenceDpe(false);
        context.setNormeThermique("RE2020");

        String result = alignementXtraService.alignement(context);
        assertThat(result).isEqualTo("01");
    }

    @Test
    void should_return_correct_alignment_for_acquisition_new_build_before_2012() throws Exception {
        Date dateDepotPc = formatDate.parse("15/05/2010");
        ContextXTRA context = new ContextXTRA();
        context.setTypeObjetFinancement("02");
        context.setCodeBatiment("00001");
        context.setPresenceDateDepotPc(true);
        context.setPresenceDateDepotPcJustificatif(true);
        context.setDateDepotPc(dateDepotPc);
        context.setPresenceDpe(true);
        context.setEtiquetteDpe("A");
        context.setValeurCep(50);

        String result = alignementXtraService.alignement(context);
        assertThat(result).isEqualTo("01");
    }

    @Test
    void should_return_correct_alignment_for_acquisition_new_build_between_2012_and_2021() throws Exception {
        Date dateDepotPc = formatDate.parse("15/05/2020");
        ContextXTRA context = new ContextXTRA();
        context.setTypeObjetFinancement("02");
        context.setCodeBatiment("00001");
        context.setPresenceDateDepotPc(true);
        context.setPresenceDateDepotPcJustificatif(true);
        context.setDateDepotPc(dateDepotPc);
        context.setPresenceDpe(true);
        context.setEtiquetteDpe("B");
        context.setValeurCep(80);
        context.setNormeThermique("RT2012");

        String result = alignementXtraService.alignement(context);
        assertThat(result).isEqualTo("01");
    }

    @Test
    void should_return_correct_alignment_for_acquisition_between_2020_and_2021() throws Exception {
        Date dateDepotPc = formatDate.parse("15/05/2021");
        ContextXTRA context = new ContextXTRA();
        context.setTypeObjetFinancement("02");
        context.setCodeBatiment("00001");
        context.setPresenceDateDepotPc(true);
        context.setPresenceDateDepotPcJustificatif(true);
        context.setDateDepotPc(dateDepotPc);
        context.setPresenceDpe(true);
        context.setEtiquetteDpe("B");
        context.setValeurCep(80);
        context.setNormeThermique("RT2012");

        String result = alignementXtraService.alignement(context);
        assertThat(result).isEqualTo("01");
    }

    @Test
    void should_return_correct_alignment_for_acquisition_old_build() {
        ContextXTRA context = new ContextXTRA();
        context.setTypeObjetFinancement("02");
        context.setCodeBatiment("00001");
        context.setPresenceDateDepotPc(false);
        context.setPresenceDateDepotPcJustificatif(false);
        context.setPresenceDpe(true);
        context.setEtiquetteDpe("C");
        context.setValeurCep(100);
        context.setNormeThermique("RT2005");

        String result = alignementXtraService.alignement(context);
        assertThat(result).isEqualTo("07");
    }

    @Test
    void should_return_valeurCepTop() {
        String codeRecherche = "00004";
        // request the Referential Casa
        Double returnedValue = alignementXtraService.obtenirValeurCepTop(codeRecherche);
        // mock and assert returned CepTop based on casa Ref
        assertThat(returnedValue.equals(197.0));
    }

    @Test
    void should_return_valeurCepMax() {
        String codeRecherche = "00001";
        // request the Referential Casa
        Double returnedValue = alignementXtraService.obtenirValeurCepMax(codeRecherche);
        // mock and assert returned CepMax based on casa Ref
        assertThat(returnedValue.equals(45.0));
    }

    @Test
    void should_handle_parse_exception() {
        ContextXTRA context = new ContextXTRA();
        context.setTypeObjetFinancement("02");
        context.setCodeBatiment("00001");
        context.setPresenceDateDepotPc(true);
        context.setPresenceDateDepotPcJustificatif(true);
        context.setDateDepotPc(new Date());  // This will cause ParseException because it's not properly formatted

        String result = alignementXtraService.alignement(context);
        assertThat(result).isEqualTo("07");
    }
}
