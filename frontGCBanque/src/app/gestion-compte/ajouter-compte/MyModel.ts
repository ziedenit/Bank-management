private String extractCodeRecherche(String valeurCepStr) {
    if (valeurCepStr != null && valeurCepStr.length() > 5) {
        return valeurCepStr.substring(valeurCepStr.length() - 5);
    }
    return "";
}
////////////::
private String generateValeurCepCondition(String valeurCepStr) {
    if (valeurCepStr == null || valeurCepStr.isEmpty() || "inconnu".equalsIgnoreCase(valeurCepStr)) {
        return "valeurCep == 0.0";
    }

    String codeRecherche = extractCodeRecherche(valeurCepStr);
    String condition = "";
    try {
        if (valeurCepStr.startsWith("≤ TXENEM15")) {
            double valeurCepTop = obtenirValeurCepTop(codeRecherche);
            condition = "valeurCep <= " + valeurCepTop;
        } else if (valeurCepStr.startsWith("> TXENEM15")) {
            double valeurCepTop = obtenirValeurCepTop(codeRecherche);
            condition = "valeurCep > " + valeurCepTop;
        } else if (valeurCepStr.startsWith("≤ TXENEMAX")) {
            double valeurCepMax = obtenirValeurCepMax(codeRecherche);
            condition = "valeurCep <= " + valeurCepMax;
        } else if (valeurCepStr.startsWith("> TXENEMAX")) {
            double valeurCepMax = obtenirValeurCepMax(codeRecherche);
            condition = "valeurCep > " + valeurCepMax;
        } else {
            condition = "valeurCep == " + Double.parseDouble(valeurCepStr);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }

    return condition;
}
//
private String generateRule(Acquisition acquisition, int ruleNumber) {
    String dateDepotPcCondition = generateDateCondition("dateDepotPc", acquisition.getDateDepotPcStr());
    String dateConstructionDpeCondition = generateDateCondition("dateConstructionDpe", acquisition.getDateConstructionDpeStr());
    String etiquetteDpeCondition = generateEtiquetteDpeCondition(acquisition.getEtiquetteDpe());
    String valeurCepCondition = generateValeurCepCondition(acquisition.getValeurCepStr());

    return String.format(
            "rule \"Rule %d\"\n" +
                    "when\n" +
                    "    $acquisition : Acquisition(\n" +
                    "        eligibileDPE == %s,\n" +
                    "        %s,\n" +
                    "        dpePresent == %s,\n" +
                    "        presenceDpeJustificatif == %s,\n" +
                    "        %s,\n" +
                    "        %s,\n" +
                    "        %s,\n" +
                    "        normeThermique == \"%s\",\n" +
                    "        presenceNormeThermiqueJustificatif == %s\n" +
                    "    )\n" +
                    "then\n" +
                    "    AcquisitionResponse response = new AcquisitionResponse(\"%s\", \"%s\", \"%s\", \"%s\", \"%s\");\n" +
                    "    responses.add(response);\n" +
                    "end\n",
            ruleNumber,
            acquisition.isEligibileDPE(),
            dateDepotPcCondition,
            acquisition.isDpePresent(),
            acquisition.isPresenceDpeJustificatif(),
            dateConstructionDpeCondition,
            etiquetteDpeCondition,
            valeurCepCondition,
            acquisition.getNormeThermique(),
            acquisition.isPresenceNormeThermiqueJustificatif(),
            acquisition.getXtra248(),
            acquisition.getXtra249(),
            acquisition.getXtra250(),
            acquisition.getXtra251(),
            acquisition.getXtra275()
    );
}
