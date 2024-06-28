 private static final String RULES_TEMPLATE =
            "package com.cl.msofd.enginerules.rules;\n" +
                    "import com.cl.msofd.enginerules.Acquisition;\n" +
                    "import com.cl.msofd.enginerules.AcquisitionResponse;\n" +
                    "global java.util.List responses;\n\n";

Replace this String concatenation with Text block.

         return String.format(
                "rule \"Rule %d\"\n" +
                        "when\n" +
                        "    $acquisition : Acquisition(\n" +
                        "        eligibileDPE == %s,\n" +
                        "        %s,\n" +
Define a constant instead of duplicating this literal " %s, " 4 times.
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
Replace this String concatenation with Text block.
    private String getStringValue(Row row, int cellIndex) {
        Cell cell = row.getCell(cellIndex, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
        if (cell == null) {
            return "";
        } else {
            cell.setCellType(CellType.STRING);
Remove this use of "setCellType"; it is deprecated.
            return cell.getStringCellValue().trim();
        }
    }
