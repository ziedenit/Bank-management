public String alignement(ContextAlignement ligneContext) {
    String aligne = "07";
    try {
        initializeDateRange(); // Initialize start and end dates

        String typeObjetFinancement = ligneContext.getTypeObjetFinancement();
        Integer anneeConstruction = ligneContext.getAnneeConstruction();
        String etiquetteDpe = (ligneContext.getEtiquetteDpe() == null ? "NC" : ligneContext.getEtiquetteDpe());
        double valeurCep = ligneContext.getValeurCep();
        Date dateDepotPc = ligneContext.getDateDepotPc();
        boolean presenceDpe = ligneContext.isPresenceDpe();
        boolean presenceDateDepotPc = ligneContext.isPresenceDateDepotPc();
        String normeThermique = (ligneContext.getNormeThermique() == null ? "NC" : ligneContext.getNormeThermique());

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
    if (dateDepotPc.compareTo(endDate) <= 0 && dateDepotPc.compareTo(startDate) > 0) {
        return alignementDpeCep(etiquetteDpe, valeurCep, valeurCeptop);
    } else if (dateDepotPc.compareTo(formatDate.parse("31/12/2020")) <= 0) {
        return alignementCepDpeEtNormeTh(etiquetteDpe, valeurCep, valeurCeptop, normeThermique, endDate);
    } else if (dateDepotPc.compareTo(formatDate.parse("31/12/2021")) <= 0) {
        return alignementCepCepmax(valeurCep, valeurCepmax);
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
                                           String normeThermique) throws ParseException {
    if (presenceDpe && anneeConstruction > 1700 && anneeConstruction <= 2012) {
        return alignementCepDpeEtNormeTh(etiquetteDpe, valeurCep, valeurCeptop, normeThermique, endDate);
    } else if (anneeConstruction <= 2020) {
        return alignementCepDpeEtNormeTh(etiquetteDpe, valeurCep, valeurCeptop, normeThermique, endDate);
    } else if (anneeConstruction.equals(2021)) {
        return alignementCepCepmax(valeurCep, valeurCepmax);
    } else if (anneeConstruction >= 2022) {
        return alignementCepCepmaxNorm(valeurCep, valeurCepmax, normeThermique);
    } else {
        return "07";
    }
}
