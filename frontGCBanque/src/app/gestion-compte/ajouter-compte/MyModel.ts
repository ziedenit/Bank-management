package com.cl.msofd.service;

import com.cl.msofd.model.ContextXTRA;
import com.cl.msofd.model.Referentiel;
import com.cl.msofd.utility.CalculAlignementStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class AlignementXtraServiceTest {

    @Autowired
    private AlignementXtraService alignementXtraService;

    @MockBean
    private MongoTemplate mongoTemplate;

    private final SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");

    @BeforeEach
    void setUp() {
        Referentiel referentielTop = new Referentiel();
        referentielTop.setValeur1("100.0");

        Referentiel referentielMax = new Referentiel();
        referentielMax.setValeur1("200.0");

        when(mongoTemplate.findOne(any(Query.class), Mockito.eq(Referentiel.class)))
                .thenReturn(referentielTop)
                .thenReturn(referentielMax);
    }

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
        assertThat(result).isEqualTo("Expected Aligned Value");  // Replace with actual expected value
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
        assertThat(result).isEqualTo("Expected Aligned Value");  // Replace with actual expected value
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
        assertThat(result).isEqualTo("Expected Aligned Value");  // Replace with actual expected value
    }

    @Test
    void should_return_valeurCepTop() {
        String codeRecherche = "00005";
        Double returnedValue = alignementXtraService.obtenirValeurCepTop(codeRecherche);
        assertThat(returnedValue).isEqualTo(100.0);
    }

    @Test
    void should_return_valeurCepMax() {
        String codeRecherche = "00004";
        Double returnedValue = alignementXtraService.obtenirValeurCepMax(codeRecherche);
        assertThat(returnedValue).isEqualTo(200.0);
    }
}
