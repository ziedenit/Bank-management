public List<Acquisition> readAcquisitionData() throws IOException, ParseException {
    List<Acquisition> acquisitions = new ArrayList<>();
    try (InputStream excelFile = excelResource.getInputStream()) {
        Workbook workbook = new XSSFWorkbook(excelFile);
        Sheet sheet = workbook.getSheet("ACQUISITION");

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // Skip header row

            Acquisition acquisition = new Acquisition();
            acquisition.setEligibileDPE("Autre bien immobilier".equals(row.getCell(0).getStringCellValue()));
            acquisition.setDateDepotPc(parseDate(row.getCell(1).getStringCellValue()));
            acquisition.setPresenceDpe("oui".equalsIgnoreCase(row.getCell(2).getStringCellValue()));
            acquisition.setPresenceDpeJustificatif("oui".equalsIgnoreCase(row.getCell(3).getStringCellValue()));
            acquisition.setDateConstructionDpe(parseDate(row.getCell(4).getStringCellValue()));
            acquisition.setEtiquetteDpe(row.getCell(5).getStringCellValue());
            acquisition.setValeurCep(parseDouble(row.getCell(6).getStringCellValue()));
            acquisition.setNormeThermique(row.getCell(7).getStringCellValue());
            acquisition.setPresenceNormeThermiqueJustificatif("oui".equalsIgnoreCase(row.getCell(8).getStringCellValue()));
            acquisition.setXtra248(row.getCell(9).getStringCellValue());
            acquisition.setXtra249(row.getCell(10).getStringCellValue());
            acquisition.setXtra250(row.getCell(11).getStringCellValue());
            acquisition.setXtra251(row.getCell(12).getStringCellValue());
            acquisition.setXtra275(row.getCell(13).getStringCellValue());

            acquisitions.add(acquisition);
        }

        workbook.close();
    }

    return acquisitions;
}

private Date parseDate(String dateStr) throws ParseException {
    if (dateStr == null || dateStr.isEmpty()) {
        return null;
    }
    
    // Traitement des valeurs spéciales
    if (dateStr.toLowerCase().contains("avant")) {
        return new SimpleDateFormat("yyyy-MM-dd").parse("2012-12-31");
    }
    
    // Exemple de gestion d'une chaîne non parsable
    if (dateStr.equals("Date de dépôt de PC")) {
        // Traitement spécifique si nécessaire
        return null; // Ou une autre valeur par défaut
    }
    
    // Tentative de parser la date avec le format attendu
    try {
        return new SimpleDateFormat("dd/MM/yyyy").parse(dateStr);
    } catch (ParseException e) {
        // Gestion des erreurs de format de date
        throw new ParseException("Unparseable date: " + dateStr, e.getErrorOffset());
    }
}
