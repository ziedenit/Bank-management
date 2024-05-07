private String alignForAcquisitionInNewBuild(ContextXTRA ligneContext) {
    if (ligneContext.isPresenceDateDepotPc() && ligneContext.isPresenceDateDepotPcJustificatif()) {
        if (ligneContext.isPresenceDpe() && ligneContext.isPresenceDpeJustificatif()) {
            return alignForDateDepotAndDpe(ligneContext);
        } else {
            return alignForDateDepotWithoutDpe(ligneContext);
        }
    } else {
        return alignForOldBuild(ligneContext);
    }
}

private String alignForDateDepotAndDpe(ContextXTRA ligneContext) {
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

private String alignForDateDepotWithoutDpe(ContextXTRA ligneContext) {
    try {
        Date dateDepotPc = ligneContext.getDateDepotPc();
        if (dateDepotPc.compareTo(startDate) >= 0) {
            return "01";
        } else {
            return "07";
        }
    } catch (ParseException e) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
        return "07";
    }
}

private String alignForOldBuild(ContextXTRA ligneContext) {
    try {
        Date dateDepotPc = ligneContext.getDateDepotPc();
        if (!ligneContext.isPresenceDateDepotPc() || !ligneContext.isPresenceDateDepotPcJustificatif()) {
            if (dateDepotPc != null && dateDepotPc.compareTo(endDate) > 0) {
                return "07";
            }
        }
        // Add logic for old build alignment
        return "07";
    } catch (ParseException e) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Calcul : update error");
        return "07";
    }
}
