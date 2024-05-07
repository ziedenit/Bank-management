private boolean isAcquisition(String typeObjetFinancement) {
    return typeObjetFinancement.equals("02");
}

private boolean isAcquisitionInNewBuild(ContextXTRA ligneContext) {
    return ligneContext.isPresenceDateDepotPc() && ligneContext.isPresenceDateDepotPcJustificatif();
}

private String alignForAcquisitionInNewBuild(ContextXTRA ligneContext) {
    try {
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
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
        return "07";
    }
}

private boolean isAcquisitionInOldBuild(ContextXTRA ligneContext) {
    return !ligneContext.isPresenceDateDepotPc() || !ligneContext.isPresenceDateDepotPcJustificatif();
}

private String alignForAcquisitionInOldBuild(ContextXTRA ligneContext) {
    try {
        Date dateDepotPc = ligneContext.getDateDepotPc();
        if (dateDepotPc != null && dateDepotPc.compareTo(endDate) > 0) {
            return "07";
        }
        // Add logic for old build alignment
        return "07";
    } catch (ParseException e) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
        return "07";
    }
}
