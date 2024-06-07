  // Generate an ID for the Financement
        financement.setIdFinancement(idGeneratorService.generateId("F"));

        // Loop through each ObjetFinancement and set its ID
        if (financement.getObjetFinancement() != null) {
            financement.getObjetFinancement().forEach(objetFinancement -> {
                objetFinancement.setIdObjetFinancement(idGeneratorService.generateId("O"));

                // Loop through each Garantie within the ObjetFinancement and set its ID
                if (objetFinancement.getGarantie() != null) {
                    objetFinancement.getGarantie().forEach(garantie -> {
                        garantie.setIdGarantie(idGeneratorService.generateId("G"));
                    });
                }
            });
        }
