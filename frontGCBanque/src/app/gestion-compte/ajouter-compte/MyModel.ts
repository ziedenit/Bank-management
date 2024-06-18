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
            acquisition.setPresenceDpe("oui".equalsIgnoreCase(getStringValue(row, 2)));
            acquisition.setPresenceDpeJustificatif("oui".equalsIgnoreCase(getStringValue(row, 3)));
            acquisition.setDateConstructionDpe(parseDate(getStringValue(row, 4)));
            acquisition.setEtiquetteDpe(getStringValue(row, 5));
            acquisition.setValeurCep(parseDouble(getStringValue(row, 6)));
            acquisition.setNormeThermique(getStringValue(row, 7));
            acquisition.setPresenceNormeThermiqueJustificatif("oui".equalsIgnoreCase(getStringValue(row, 8)));
            acquisition.setXtra248(getStringValue(row, 9));
            acquisition.setXtra249(getStringValue(row, 10));
            acquisition.setXtra250(getStringValue(row, 11));
            acquisition.setXtra251(getStringValue(row, 12));
            acquisition.setXtra275(getStringValue(row, 13));

            acquisitions.add(acquisition);
        }

        workbook.close();
    }

    return acquisitions;
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

private Date parseDate(String dateStr) throws ParseException {
    // Your existing parseDate method implementation
    // Make sure it handles various date formats as discussed earlier
}
