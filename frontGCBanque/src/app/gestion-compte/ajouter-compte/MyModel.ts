// 1. Replace RULES_TEMPLATE String concatenation with Text block
private static final String RULES_TEMPLATE = """
        package com.cl.msofd.enginerules.rules;
        import com.cl.msofd.enginerules.Acquisition;
        import com.cl.msofd.enginerules.AcquisitionResponse;
        global java.util.List responses;

        """;

// 2. Define a constant for "%s, "
private static final String TEMPLATE_PLACEHOLDER = "%s, ";

// 3. Replace String concatenation with Text block
return String.format(
    """
    rule "Rule %d"
    when
        $acquisition : Acquisition(
            eligibileDPE == %s,
            %s
            dpePresent == %s,
            presenceDpeJustificatif == %s,
            %s
            %s
            %s
            normeThermique == "%s",
            presenceNormeThermiqueJustificatif == %s
        )
    then
        AcquisitionResponse response = new AcquisitionResponse("%s", "%s", "%s", "%s", "%s");
        responses.add(response);
    end
    """,
    ruleNumber, eligibleDPE, TEMPLATE_PLACEHOLDER, dpePresent, presenceDpeJustificatif, 
    TEMPLATE_PLACEHOLDER, TEMPLATE_PLACEHOLDER, TEMPLATE_PLACEHOLDER, normeThermique, 
    presenceNormeThermiqueJustificatif, response1, response2, response3, response4, response5
);

// 4. Remove deprecated use of setCellType in getStringValue
private String getStringValue(Row row, int cellIndex) {
    Cell cell = row.getCell(cellIndex, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
    if (cell == null) {
        return "";
    } else {
        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue().trim();
        } else {
            cell.setCellType(CellType.STRING);
            return cell.getStringCellValue().trim();
        }
    }
}
