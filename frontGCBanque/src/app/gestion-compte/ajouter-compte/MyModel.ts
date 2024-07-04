package com.cl.msofd.service;
import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import com.cl.msofd.model.ContextAlignement;
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
public class AlignementService {
    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(AlignementService.class);
    private final SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
    private final MongoTemplate mongoTemplate;
    @Autowired
    public AlignementService(MongoTemplate mongoTemplate) {
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
    public synchronized String alignement(ContextAlignement ligneContext) {
        String aligne = "07";
        try {
            String typeObjetFinancement = ligneContext.getTypeObjetFinancement();
            Integer anneeConstruction = ligneContext.getAnneeConstruction();
            String etiquetteDpe = (ligneContext.getEtiquetteDpe() == null ? "NC" : ligneContext.getEtiquetteDpe());
            double valeurCep = ligneContext.getValeurCep();
            Date dateDepotPc = ligneContext.getDateDepotPc();
            boolean presenceDpe = ligneContext.isPresenceDpe();
            boolean presenceDateDepotPc = ligneContext.isPresenceDateDepotPc();
            String normeThermique = (ligneContext.getNormeThermique() == null ? "NC" : ligneContext.getNormeThermique());
            String codeBatiment = ligneContext.getCodeBatiment();
            Double valeurCeptop = obtenirValeurCepTop(codeBatiment);
            Double valeurCepmax = obtenirValeurCepMax(codeBatiment);
            // Update valeurCep if it's 0
            if (valeurCep == 0.0) {
                valeurCep = 10000.0;
            }
            if (typeObjetFinancement != null && typeObjetFinancement.equals("02")) {
                aligne = alignementAcquisition(presenceDpe, presenceDateDepotPc, etiquetteDpe, valeurCep, valeurCeptop, valeurCepmax, dateDepotPc, normeThermique, anneeConstruction);
            }
        } catch (Exception e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
            aligne = "07";
        }
        return aligne;
    }
    private String alignementAcquisition(boolean presenceDpe, boolean presenceDateDepotPc, String etiquetteDpe,
                                         double valeurCep, double valeurCeptop, double valeurCepmax, Date dateDepotPc, String normeThermique, Integer anneeConstruction) throws ParseException {
        if (presenceDateDepotPc) {
            if (presenceDpe) {
                return alignementAcquisitionDpePresent(etiquetteDpe, valeurCep, valeurCeptop, valeurCepmax, dateDepotPc, normeThermique);
            } else {
                return alignementAcquisitionDpeAbsent(dateDepotPc);
            }
        } else {
            return alignementAcquisitionAncien(presenceDpe, etiquetteDpe, valeurCep, valeurCeptop, valeurCepmax, normeThermique, anneeConstruction);
        }
    }
    private String alignementAcquisitionDpePresent(String etiquetteDpe, double valeurCep, double valeurCeptop, double valeurCepmax, Date dateDepotPc,
                                                   String normeThermique) throws ParseException {
        Date startDate = formatDate.parse("01/01/1700");
        Date endDate = formatDate.parse("31/12/2012");
        CalculAlignementStrategy calculAlignementFirstStrategy = new CalculAlignementStrategy();
        if (dateDepotPc.compareTo(endDate) <= 0 && dateDepotPc.compareTo(startDate) > 0) {
            return calculAlignementFirstStrategy.aligneDpeCep(etiquetteDpe, valeurCep, valeurCeptop);
        } else if (dateDepotPc.compareTo(formatDate.parse("31/12/2020")) <= 0) {
            return calculAlignementFirstStrategy.alignCepDpeEtNormeTh(etiquetteDpe, valeurCep, valeurCeptop, normeThermique, endDate);
        } else if (dateDepotPc.compareTo(formatDate.parse("31/12/2021")) <= 0) {
            return calculAlignementFirstStrategy.aligneCepCepmax(valeurCep, valeurCepmax);
        } else {
            return "01";
        }
    }
    private String alignementAcquisitionDpeAbsent(Date dateDepotPc) throws ParseException {
        if (dateDepotPc.compareTo(formatDate.parse("01/01/2022")) >= 0) {
            return "01";
        } else {
            return "07";
        }
    }
    private String alignementAcquisitionAncien(boolean presenceDpe, String etiquetteDpe, double valeurCep, double valeurCeptop, double valeurCepmax
            , String normeThermique, Integer anneeConstruction) throws ParseException {
        Date endDate = formatDate.parse("31/12/2012");
        CalculAlignementStrategy calculAlignementFirstStrategy = new CalculAlignementStrategy();
        if (presenceDpe && anneeConstruction > 1700 && anneeConstruction <= 2012) {
            return calculAlignementFirstStrategy.alignCepDpeEtNormeTh(etiquetteDpe, valeurCep, valeurCeptop, normeThermique, endDate);
        } else if (anneeConstruction <= 2020) {
            return calculAlignementFirstStrategy.alignCepDpeEtNormeTh(etiquetteDpe, valeurCep, valeurCeptop, normeThermique, endDate);
        } else if (anneeConstruction.equals(2021)) {
            return calculAlignementFirstStrategy.aligneCepCepmax(valeurCep, valeurCepmax);
        } else if (anneeConstruction >= 2022) {
            return calculAlignementFirstStrategy.aligneCepCepmaxNorm(valeurCep, valeurCepmax, normeThermique);
        } else {
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
