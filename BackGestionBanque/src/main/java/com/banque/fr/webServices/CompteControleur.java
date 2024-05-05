public Bien createBienFromFinancementGarantieDto(FinancementGarantieDto financementGarantieDto, BienGarantieDto bienGarantieDto) {
    Bien.BienBuilder bienBuilder = Bien.builder()
            .idBien(IdGeneratorService.generateId("B"))
            .adresseComplete(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getAdresseBien() : bienGarantieDto.getAdresseBien())
            .codePostal(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getCodePostalBien() : bienGarantieDto.getCodePostalBien())
            .codeNormeThermique(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getCodeNormeThermique() : bienGarantieDto.getCodeNormeThermique())
            .nomCommune(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getVilleBien() : bienGarantieDto.getVilleBien())
            .paysBien(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getPaysBien() : bienGarantieDto.getPaysBien())
            .typeEnergie(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getTypeEnergie() : bienGarantieDto.getTypeEnergie())
            .typeBatiment(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getTypeBatiment() : bienGarantieDto.getTypeBatiment())
            .codeBatiment(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getCodeBatiment() : bienGarantieDto.getCodeBatiment())
            .etatBien(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getEtatBien() : bienGarantieDto.getEtatBien())
            .bienFinanceLCL(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.isBienFinanceLCL() : bienGarantieDto.isBienFinanceLCL())
            .prixBien(getPrixBien(financementGarantieDto, bienGarantieDto))
            .montantFinanceLCL(getMontantFinanceLCL(financementGarantieDto, bienGarantieDto))
            .partLCL(getPartLCL(financementGarantieDto, bienGarantieDto))
            .dpeActuel(getDpeActuel(financementGarantieDto, bienGarantieDto));

    return bienBuilder.build();
}

private double getPrixBien(FinancementGarantieDto financementGarantieDto, BienGarantieDto bienGarantieDto) {
    Double prixBien = bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getPrixBien() : bienGarantieDto.getPrixBien();
    return prixBien == null ? 0.00 : prixBien;
}

private double getMontantFinanceLCL(FinancementGarantieDto financementGarantieDto, BienGarantieDto bienGarantieDto) {
    Double montantFinanceLCL = bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getMontantFinanceLCL() : bienGarantieDto.getMontantFinanceLCL();
    return montantFinanceLCL == null ? 0.00 : montantFinanceLCL;
}

private double getPartLCL(FinancementGarantieDto financementGarantieDto, BienGarantieDto bienGarantieDto) {
    Double partLCL = bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getPartLCL() : bienGarantieDto.getPartLCL();
    return partLCL == null ? 0.00 : partLCL;
}

private Dpe getDpeActuel(FinancementGarantieDto financementGarantieDto, BienGarantieDto bienGarantieDto) {
    return Dpe.builder()
            .numeroDpe(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getNumeroDpe() : bienGarantieDto.getNumeroDpe())
            .estimationCep(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getEstimationCep() : bienGarantieDto.getEstimationCep())
            .classeCep(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getClasseCep() : bienGarantieDto.getClasseCep())
            .estimationGes(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getEstimationGes() : bienGarantieDto.getEstimationGes())
            .classeGes(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getClasseGes() : bienGarantieDto.getClasseGes())
            .dateEtablissementDpe(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getDateEtablissementDpe() : bienGarantieDto.getDateEtablissementDpe())
            .dateFinValiditeDpe(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getDateFinValiditeDpe() : bienGarantieDto.getDateFinValiditeDpe())
            .sirenDiagnostiqueur(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getSirenDiagnostiqueur() : bienGarantieDto.getSirenDiagnostiqueur())
            .build();
}
