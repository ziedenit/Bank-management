private Date parseDate(String dateStr) throws ParseException {
    if (dateStr == null || dateStr.isEmpty()) {
        return null;
    }
    
    // Gestion des valeurs spéciales
    if (dateStr.startsWith("avant")) {
        String datePart = dateStr.substring("avant ".length()).trim();
        return new SimpleDateFormat("dd/MM/yyyy").parse(datePart);
    } else if (dateStr.startsWith("du")) {
        // Exemple: "du 01/01/2013 au 31/12/2020"
        String[] parts = dateStr.split(" au ");
        String startDateStr = parts[0].substring("du ".length()).trim();
        return new SimpleDateFormat("dd/MM/yyyy").parse(startDateStr);
        // Vous pouvez également gérer la fin de la période si nécessaire
    } else if (dateStr.startsWith("> au")) {
        // Exemple: "> au 01/01/2022"
        String datePart = dateStr.substring("> au ".length()).trim();
        return new SimpleDateFormat("dd/MM/yyyy").parse(datePart);
    } else {
        // Gestion par défaut pour les autres cas
        throw new ParseException("Unparseable date: " + dateStr, 0);
    }
}
