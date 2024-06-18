private static final String RULES_TEMPLATE =
    "package com.example.rules;\n" +
    "import com.example.Acquisition;\n" +
    "import com.example.AcquisitionResponse;\n" +
    "global java.util.List responses;\n\n";
//
private String generateRule(Acquisition acquisition, int ruleNumber) {
    return String.format(
        "rule \"Rule %d\"\n" +
        "when\n" +
        "    $acquisition : Acquisition(\n" +
        "        eligibileDPE == %s,\n" +
        "        dateDepotPc == \"%s\",\n" +
        "        presenceDpe == %s,\n" +
        "        presenceDpeJustificatif == %s,\n" +
        "        (dateConstructionDpe == null || dateConstructionDpe == \"%s\"),\n" +
        "        etiquetteDpe == \"%s\",\n" +
        "        (valeurCep == 0.0 || valeurCep == %s),\n" +
        "        normeThermique == \"%s\",\n" +
        "        presenceNormeThermiqueJustificatif == %s\n" +
        "    )\n" +
        "then\n" +
        "    AcquisitionResponse response = new AcquisitionResponse(\"%s\", \"%s\", \"%s\", \"%s\", \"%s\");\n" +
        "    responses.add(response);\n" + // Ajouter à la liste globale responses
        "end\n",
        ruleNumber,
        acquisition.isEligibileDPE(),
        acquisition.getDateDepotPc() != null ? new SimpleDateFormat("dd/MM/yyyy").format(acquisition.getDateDepotPc()) : "",
        acquisition.isPresenceDpe(),
        acquisition.isPresenceDpeJustificatif(),
        acquisition.getDateConstructionDpe() != null ? new SimpleDateFormat("dd/MM/yyyy").format(acquisition.getDateConstructionDpe()) : "",
        acquisition.getClasseCep(),
        acquisition.getValeurCep() != 0.0 ? acquisition.getValeurCep() : "0.0",
        acquisition.getNormeThermique(),
        acquisition.isPresenceNormeThermiqueJustificatif(),
        acquisition.getXtra248(),
        acquisition.getXtra249(),
        acquisition.getXtra250(),
        acquisition.getXtra251(),
        acquisition.getXtra275()
    );
}
