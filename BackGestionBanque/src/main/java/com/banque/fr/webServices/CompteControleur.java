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
    SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
    Date startDate;
    Date endDate;
    Integer anneeDebutConstruction;
    Integer anneeFinConstruction;
    Integer anneeConstruction;
    double valeurCeptop;
    private final MongoTemplate mongoTemplate;
    double valeurCepmax;

    @Autowired
    public AlignementService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    ///////////////////////////////////obtenirValeurCepTop///////////////////////////////////////////////////
    public double obtenirValeurCepTop(String codeRecherche) {
        Query query = new Query(Criteria.where("table").is("seuil_cep_top").and("code").is(codeRecherche));
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("searching ValeurCepTop by code : {}", codeRecherche);
        Referentiel referentiel = mongoTemplate.findOne(query, Referentiel.class);
        if (referentiel != null) {
            return Double.parseDouble(referentiel.getValeur1());
        } else {
            return 0;
        }
    }

    ////////////////////////////////obtenirValeurCepMax///////////////////////////////////////////////////////
    public double obtenirValeurCepMax(String codeRecherche) {
        Query query = new Query(Criteria.where("table").is("seuil_cep_max").and("code").is(codeRecherche));
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("searching ValeurCepMax by code : {}", codeRecherche);
        Referentiel referentiel = mongoTemplate.findOne(query, Referentiel.class);
        if (referentiel != null) {
            return Double.parseDouble(referentiel.getValeur1());
        } else {
            return 0;
        }
    }

/////////////////////////////////calcul de l'alignement//////////////////////////////////////////////////

    public String alignement(ContextAlignement ligneContext) {
        String aligne = "07";
        try {
            initializeDateRange(); // Initialize start and end dates

            String typeObjetFinancement = ligneContext.getTypeObjetFinancement();
            anneeConstruction = ligneContext.getAnneeConstruction();
            String etiquetteDpe = (ligneContext.getEtiquetteDpe() == null ? "NC" : ligneContext.getEtiquetteDpe());
            double valeurCep = ligneContext.getValeurCep();
            Date dateDepotPc = ligneContext.getDateDepotPc();
            boolean presenceDpe = ligneContext.isPresenceDpe();
            boolean presenceDateDepotPc = ligneContext.isPresenceDateDepotPc();
            String normeThermique = (ligneContext.getNormeThermique() == null ? "NC" : ligneContext.getNormeThermique());
            String codeBatiment = ligneContext.getCodeBatiment();
            valeurCeptop = obtenirValeurCepTop(codeBatiment);
            valeurCepmax = obtenirValeurCepMax(codeBatiment);


            // Update valeurCep if it's 0
            if (valeurCep == 0.0) {
                valeurCep = 10000.0;
            }

            if (typeObjetFinancement != null && typeObjetFinancement.equals("02")) {
                aligne = alignementAcquisition(presenceDpe, presenceDateDepotPc, etiquetteDpe, valeurCep, dateDepotPc, normeThermique);
            }
        } catch (Exception e) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
            aligne = "07";
        }
        return aligne;
    }

    private void initializeDateRange() throws ParseException {
        startDate = formatDate.parse("01/01/1700");
        endDate = formatDate.parse("31/12/2012");
        anneeDebutConstruction = 1700;
        anneeFinConstruction = 2012;
    }

    private String alignementAcquisition(boolean presenceDpe, boolean presenceDateDepotPc, String etiquetteDpe,
                                         double valeurCep, Date dateDepotPc, String normeThermique) throws ParseException {
        if (presenceDateDepotPc) {
            if (presenceDpe) {
                return alignementAcquisitionDpePresent(etiquetteDpe, valeurCep, dateDepotPc, normeThermique);
            } else {
                return alignementAcquisitionDpeAbsent(dateDepotPc);
            }
        } else {
            return alignementAcquisitionAncien(presenceDpe, etiquetteDpe, valeurCep, normeThermique);
        }
    }

    private String alignementAcquisitionDpePresent(String etiquetteDpe, double valeurCep, Date dateDepotPc,
                                                   String normeThermique) throws ParseException {
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

    private String alignementAcquisitionAncien(boolean presenceDpe, String etiquetteDpe, double valeurCep,
                                               String normeThermique) {
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



}

