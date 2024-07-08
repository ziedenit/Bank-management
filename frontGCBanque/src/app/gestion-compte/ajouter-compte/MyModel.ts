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
j'ai le service ci haut et j'ai cette classe de test que je vais amelior pour mieux courvir le service 
package com.cl.msofd.service;

import com.cl.msofd.model.ContextXTRA;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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


}
// ca sonar me remonte que cette partie n'est pas couvert else if (dateDepotPc.compareTo(formatDate.parse("31/12/2021")) <= 0) {
                CalculAlignementStrategy calculAlignementThirdStrategy = new CalculAlignementStrategy();
                return calculAlignementThirdStrategy.aligneCepCepmax(
                        ligneContext.getValeurCep(),
                        obtenirValeurCepMax(ligneContext.getCodeBatiment())
                );
            } else {
                return "01";
            }
et aussi catch (ParseException e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error aquisition in new build");
            return "07";
        }
