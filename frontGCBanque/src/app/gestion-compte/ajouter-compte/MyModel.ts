private Date parseDate(String dateStr) throws ParseException {
    if (dateStr == null || dateStr.isEmpty() || "inconnu".equalsIgnoreCase(dateStr.trim())) {
        return null;
    }

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

    if (dateStr.startsWith("avant ")) {
        String datePart = dateStr.substring("avant ".length()).trim();
        return sdf.parse(datePart);
    } else if (dateStr.startsWith("du ")) {
        String[] parts = dateStr.split(" au ");
        String startDateStr = parts[0].substring("du ".length()).trim();
        return sdf.parse(startDateStr);
    } else if (dateStr.startsWith("<")) {
        String datePart = dateStr.substring(1).trim();
        return sdf.parse(datePart);
    } else {
        return sdf.parse(dateStr);
    }
}
//
private String generateRule(Acquisition acquisition, int ruleNumber) {
    String dateDepotPcCondition = generateDateCondition("dateDepotPc", acquisition.getDateDepotPcStr());
    String dateConstructionDpeCondition = generateDateCondition("dateConstructionDpe", acquisition.getDateConstructionDpeStr());

    return String.format(
            "rule \"Rule %d\"\n" +
                    "when\n" +
                    "    $acquisition : Acquisition(\n" +
                    "        eligibileDPE == %s,\n" +
                    "        %s,\n" +
                    "        presenceDpe == %s,\n" +
                    "        presenceDpeJustificatif == %s,\n" +
                    "        %s,\n" +
                    "        etiquetteDpe == \"%s\",\n" +
                    "        (valeurCep == 0.0 || valeurCep == %s),\n" +
                    "        normeThermique == \"%s\",\n" +
                    "        presenceNormeThermiqueJustificatif == %s\n" +
                    "    )\n" +
                    "then\n" +
                    "    AcquisitionResponse response = new AcquisitionResponse(\"%s\", \"%s\", \"%s\", \"%s\", \"%s\");\n" +
                    "    insert(response);\n" +
                    "end\n",
            ruleNumber,
            acquisition.isEligibileDPE(),
            dateDepotPcCondition,
            acquisition.isPresenceDpe(),
            acquisition.isPresenceDpeJustificatif(),
            dateConstructionDpeCondition,
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
//
private String generateDateCondition(String fieldName, String dateStr) {
    if (dateStr == null || dateStr.isEmpty() || "inconnu".equalsIgnoreCase(dateStr)) {
        return fieldName + " == null";
    }

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    String condition = "";
    try {
        if (dateStr.startsWith("avant ")) {
            String datePart = dateStr.substring("avant ".length()).trim();
            Date date = sdf.parse(datePart);
            condition = fieldName + " != null && " + fieldName + ".before(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
        } else if (dateStr.startsWith("du ")) {
            String[] parts = dateStr.split(" au ");
            String startDateStr = parts[0].substring("du ".length()).trim();
            String endDateStr = parts[1].trim();
            Date startDate = sdf.parse(startDateStr);
            Date endDate = sdf.parse(endDateStr);
            condition = fieldName + " != null && " + fieldName + ".after(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(startDate) + "\")) && " + fieldName + ".before(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(endDate) + "\"))";
        } else if (dateStr.startsWith("<")) {
            String datePart = dateStr.substring(1).trim();
            Date date = sdf.parse(datePart);
            condition = fieldName + " != null && " + fieldName + ".before(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
        } else {
            Date date = sdf.parse(dateStr);
            condition = fieldName + " != null && " + fieldName + ".equals(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
        }
    } catch (ParseException e) {
        e.printStackTrace();
    }

    return condition;
}
//
public void generateDroolsFile(String outputDroolsFile) throws IOException, ParseException {
    List<Acquisition> acquisitions = readAcquisitionData();
    StringBuilder rulesContent = new StringBuilder(RULES_TEMPLATE);

    int ruleNumber = 1;
    for (Acquisition acquisition : acquisitions) {
        String rule = generateRule(acquisition, ruleNumber++);
        rulesContent.append(rule).append("\n");
    }

    try (FileWriter writer = new FileWriter(outputDroolsFile)) {
        writer.write(rulesContent.toString());
    }
}
//
example rules
package com.example.rules;
import com.example.Acquisition;
import com.example.AcquisitionResponse;

rule "Rule 1"
when
    $acquisition : Acquisition(
        eligibileDPE == true,
        dateDepotPc != null && dateDepotPc.before(new java.text.SimpleDateFormat("dd/MM/yyyy").parse("31/12/2012")),
        presenceDpe == true,
        presenceDpeJustificatif == true,
        (dateConstructionDpe == null || dateConstructionDpe == "01/01/2000"),
        etiquetteDpe == "A",
        (valeurCep == 0.0 || valeurCep == 50.0),
        normeThermique == "RT2012",
        presenceNormeThermiqueJustificatif == true
    )
then
    AcquisitionResponse response = new AcquisitionResponse("Extra248", "Extra249", "Extra250", "Extra251", "Extra275");
    insert(response);
end
//
genrate rules pour etiquette dpe y compris
private String generateRule(Acquisition acquisition, int ruleNumber) {
    String dateDepotPcCondition = generateDateCondition("dateDepotPc", acquisition.getDateDepotPcStr());
    String dateConstructionDpeCondition = generateDateCondition("dateConstructionDpe", acquisition.getDateConstructionDpeStr());
    String etiquetteDpeCondition = generateEtiquetteDpeCondition(acquisition.getEtiquetteDpe());

    return String.format(
            "rule \"Rule %d\"\n" +
                    "when\n" +
                    "    $acquisition : Acquisition(\n" +
                    "        eligibileDPE == %s,\n" +
                    "        %s,\n" +
                    "        presenceDpe == %s,\n" +
                    "        presenceDpeJustificatif == %s,\n" +
                    "        %s,\n" +
                    "        %s,\n" +
                    "        (valeurCep == 0.0 || valeurCep == %s),\n" +
                    "        normeThermique == \"%s\",\n" +
                    "        presenceNormeThermiqueJustificatif == %s\n" +
                    "    )\n" +
                    "then\n" +
                    "    AcquisitionResponse response = new AcquisitionResponse(\"%s\", \"%s\", \"%s\", \"%s\", \"%s\");\n" +
                    "    insert(response);\n" +
                    "end\n",
            ruleNumber,
            acquisition.isEligibileDPE(),
            dateDepotPcCondition,
            acquisition.isPresenceDpe(),
            acquisition.isPresenceDpeJustificatif(),
            dateConstructionDpeCondition,
            etiquetteDpeCondition,
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

private String generateDateCondition(String fieldName, String dateStr) {
    if (dateStr == null || dateStr.isEmpty() || "inconnu".equalsIgnoreCase(dateStr)) {
        return fieldName + " == null";
    }

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    String condition = "";
    try {
        if (dateStr.startsWith("avant ")) {
            String datePart = dateStr.substring("avant ".length()).trim();
            Date date = sdf.parse(datePart);
            condition = fieldName + " != null && " + fieldName + ".before(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
        } else if (dateStr.startsWith("du ")) {
            String[] parts = dateStr.split(" au ");
            String startDateStr = parts[0].substring("du ".length()).trim();
            String endDateStr = parts[1].trim();
            Date startDate = sdf.parse(startDateStr);
            Date endDate = sdf.parse(endDateStr);
            condition = fieldName + " != null && " + fieldName + ".after(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(startDate) + "\")) && " + fieldName + ".before(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(endDate) + "\"))";
        } else if (dateStr.startsWith("<")) {
            String datePart = dateStr.substring(1).trim();
            Date date = sdf.parse(datePart);
            condition = fieldName + " != null && " + fieldName + ".before(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
        } else {
            Date date = sdf.parse(dateStr);
            condition = fieldName + " != null && " + fieldName + ".equals(new java.text.SimpleDateFormat(\"dd/MM/yyyy\").parse(\"" + sdf.format(date) + "\"))";
        }
    } catch (ParseException e) {
        e.printStackTrace();
    }

    return condition;
}

private String generateEtiquetteDpeCondition(String etiquetteDpe) {
    if (etiquetteDpe == null || etiquetteDpe.isEmpty() || "inconnu".equalsIgnoreCase(etiquetteDpe)) {
        return "etiquetteDpe == null";
    }

    if (etiquetteDpe.startsWith("<>")) {
        String value = etiquetteDpe.substring(2).trim();
        return "etiquetteDpe != \"" + value + "\"";
    } else {
        return "etiquetteDpe == \"" + etiquetteDpe + "\"";
    }
}
//
public List<Acquisition> readAcquisitionData() throws IOException, ParseException {
    List<Acquisition> acquisitions = new ArrayList<>();
    try (InputStream excelFile = excelResource.getInputStream()) {
        Workbook workbook = new XSSFWorkbook(excelFile);
        Sheet sheet = workbook.getSheet("ACQUISITION");

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // Skip header row
            Acquisition acquisition = new Acquisition();
            acquisition.setEligibileDPE("Autre bien immobilier".equals(getStringValue(row, 0)));
            acquisition.setDateDepotPc(parseDate(getStringValue(row, 1)));
            acquisition.setDateDepotPcStr(getStringValue(row, 1)); // Store raw date string
            acquisition.setPresenceDpe("Oui".equalsIgnoreCase(getStringValue(row, 2)));
            acquisition.setPresenceDpeJustificatif("Oui".equalsIgnoreCase(getStringValue(row, 3)));
            acquisition.setDateConstructionDpe(parseDate(getStringValue(row, 4)));
            acquisition.setDateConstructionDpeStr(getStringValue(row, 4)); // Store raw date string
            acquisition.setClasseCep(getStringValue(row, 5));
            acquisition.setValeurCep(getStringValue(row, 6).isEmpty() ? 0.0 : Double.parseDouble(getStringValue(row, 6)));
            acquisition.setPresenceNormeThermiqueJustificatif("Oui".equalsIgnoreCase(getStringValue(row, 7)));
            acquisition.setNormeThermique(getStringValue(row, 8));
            acquisition.setEtiquetteDpe(getStringValue(row, 9)); // Store raw etiquetteDpe string
            acquisition.setXtra248(getStringValue(row, 10));
            acquisition.setXtra249(getStringValue(row, 11));
            acquisition.setXtra250(getStringValue(row, 12));
            acquisition.setXtra251(getStringValue(row, 13));
            acquisition.setXtra275(getStringValue(row, 14));

            acquisitions.add(acquisition);
        }

        workbook.close();
    }

    return acquisitions;
}
//
private Date parseDate(String dateStr) throws ParseException {
    if (dateStr == null || dateStr.isEmpty() || "inconnu".equalsIgnoreCase(dateStr)) {
        return null;
    }

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    if (dateStr.startsWith("avant ")) {
        String datePart = dateStr.substring("avant ".length()).trim();
        return sdf.parse(datePart);
    } else if (dateStr.startsWith("du ")) {
        String[] parts = dateStr.split(" au ");
        String startDateStr = parts[0].substring("du ".length()).trim();
        return sdf.parse(startDateStr);
    } else if (dateStr.startsWith("<")) {
        String datePart = dateStr.substring(1).trim();
        return sdf.parse(datePart);
    } else {
        return sdf.parse(dateStr);
    }
}

private String getStringValue(Row row, int cellIndex) {
    Cell cell = row.getCell(cellIndex, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
    if (cell == null) {
        return ""; // or handle null case as per your requirement
    } else {
        cell.setCellType(CellType.STRING); // Ensure the cell type is String
        return cell.getStringCellValue().trim(); // Get string value and trim whitespace
    }
}
//
public class Acquisition {
    private boolean eligibileDPE;
    private Date dateDepotPc;
    private String dateDepotPcStr; // Add this field
    private boolean presenceDpe;
    private boolean presenceDpeJustificatif;
    private Date dateConstructionDpe;
    private String dateConstructionDpeStr; // Add this field
    private String classeCep;
    private double valeurCep;
    private boolean presenceNormeThermiqueJustificatif;
    private String normeThermique;
    private String etiquetteDpe;
    private String xtra248;
    private String xtra249;
    private String xtra250;
    private String xtra251;
    private String xtra275;

    // Getters and setters
    public boolean isEligibileDPE() { return eligibileDPE; }
    public void setEligibileDPE(boolean eligibileDPE) { this.eligibileDPE = eligibileDPE; }

    public Date getDateDepotPc() { return dateDepotPc; }
    public void setDateDepotPc(Date dateDepotPc) { this.dateDepotPc = dateDepotPc; }

    public String getDateDepotPcStr() { return dateDepotPcStr; }
    public void setDateDepotPcStr(String dateDepotPcStr) { this.dateDepotPcStr = dateDepotPcStr; }

    public boolean isPresenceDpe() { return presenceDpe; }
    public void setPresenceDpe(boolean presenceDpe) { this.presenceDpe = presenceDpe; }

    public boolean isPresenceDpeJustificatif() { return presenceDpeJustificatif; }
    public void setPresenceDpeJustificatif(boolean presenceDpeJustificatif) { this.presenceDpeJustificatif = presenceDpeJustificatif; }

    public Date getDateConstructionDpe() { return dateConstructionDpe; }
    public void setDateConstructionDpe(Date dateConstructionDpe) { this.dateConstructionDpe = dateConstructionDpe; }

    public String getDateConstructionDpeStr() { return dateConstructionDpeStr; }
    public void setDateConstructionDpeStr(String dateConstructionDpeStr) { this.dateConstructionDpeStr = dateConstructionDpeStr; }

    public String getClasseCep() { return classeCep; }
    public void setClasseCep(String classeCep) { this.classeCep = classeCep; }

    public double getValeurCep() { return valeurCep; }
    public void setValeurCep(double valeurCep) { this.valeurCep = valeurCep; }

    public boolean isPresenceNormeThermiqueJustificatif() { return presenceNormeThermiqueJustificatif; }
    public void setPresenceNormeThermiqueJustificatif(boolean presenceNormeThermiqueJustificatif) { this.presenceNormeThermiqueJustificatif = presenceNormeThermiqueJustificatif; }

    public String getNormeThermique() { return normeThermique; }
    public void setNormeThermique(String normeThermique) { this.normeThermique = normeThermique; }

    public String getEtiquetteDpe() { return etiquetteDpe; }
    public void setEtiquetteDpe(String etiquetteDpe) { this.etiquetteDpe = etiquetteDpe; }

    public String getXtra248() { return xtra248; }
    public void setXtra248(String xtra248) { this.xtra248 = xtra248; }

    public String getXtra249() { return xtra249; }
    public void setXtra249(String xtra249) { this.xtra249 = xtra249; }

    public String getXtra250() { return xtra250; }
    public void setXtra250(String xtra250) { this.xtra250 = xtra250; }

    public String getXtra251() { return xtra251; }
    public void setXtra251(String xtra251) { this.xtra251 = xtra251; }

    public String getXtra275() { return xtra275; }
    public void setXtra275(String xtra275) { this.xtra275 = xtra275; }
}
