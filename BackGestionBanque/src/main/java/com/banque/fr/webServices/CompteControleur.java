 public Bien createBienFromFinancementGarantieDto(FinancementGarantieDto financementGarantieDto, BienGarantieDto bienGarantieDto) {
Refactor this method to reduce its Cognitive Complexity from 30 to the 15 allowed.
        Bien bien = Bien.builder()
                .idBien(IdGeneratorService.generateId("B"))
                .adresseComplete(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getAdresseBien() : bienGarantieDto.getAdresseBien())
                .codePostal(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getCodePostalBien() : bienGarantieDto.getCodePostalBien())
                .codeNormeThermique(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getCodeNormeThermique() : bienGarantieDto.getCodeNormeThermique())
                .nomCommune(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getVilleBien() : bienGarantieDto.getVilleBien())
                .paysBien(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getPaysBien() : bienGarantieDto.getPaysBien())
                .surfaceBien(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getSurfaceBien() : bienGarantieDto.getSurfaceBien() == null ? 0.00 : bienGarantieDto.getSurfaceBien())
Extract this nested ternary operation into an independent statement.
                .typeEnergie(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getTypeEnergie() : bienGarantieDto.getTypeEnergie())
                .typeBatiment(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getTypeBatiment() : bienGarantieDto.getTypeBatiment())
                .codeBatiment(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getCodeBatiment() : bienGarantieDto.getCodeBatiment())
                .etatBien(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getEtatBien() : bienGarantieDto.getEtatBien())
                .bienFinanceLCL(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.isBienFinanceLCL() : bienGarantieDto.isBienFinanceLCL())
                .prixBien(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getPrixBien() : bienGarantieDto.getPrixBien() == null ? 0.00 : bienGarantieDto.getPrixBien())
Extract this nested ternary operation into an independent statement.
                .montantFinanceLCL(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getMontantFinanceLCL() : bienGarantieDto.getMontantFinanceLCL() == null ? 0.00 : bienGarantieDto.getMontantFinanceLCL())
Extract this nested ternary operation into an independent statement.
                .partLCL(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getPartLCL() : bienGarantieDto.getPartLCL() == null ? 0.00 : bienGarantieDto.getPartLCL())
Extract this nested ternary operation into an independent statement.
                .dpeActuel(Dpe.builder()
                        .numeroDpe(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getNumeroDpe() : bienGarantieDto.getNumeroDpe())
                        .estimationCep(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getEstimationCep() : bienGarantieDto.getEstimationCep())
                        .classeCep(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getClasseCep() : bienGarantieDto.getClasseCep())
                        .estimationGes(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getEstimationGes() : bienGarantieDto.getEstimationGes())
                        .classeGes(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getClasseGes() : bienGarantieDto.getClasseGes())
                        .dateEtablissementDpe(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getDateEtablissementDpe() : bienGarantieDto.getDateEtablissementDpe())
                        .dateFinValiditeDpe(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getDateFinValiditeDpe() : bienGarantieDto.getDateFinValiditeDpe())
                        .sirenDiagnostiqueur(bienGarantieDto.isBienFinanceLCL() ? financementGarantieDto.getSirenDiagnostiqueur() : bienGarantieDto.getSirenDiagnostiqueur())
                        .build())
                .build();
Immediately return this expression instead of assigning it to the temporary variable "bien".
        return bien;
