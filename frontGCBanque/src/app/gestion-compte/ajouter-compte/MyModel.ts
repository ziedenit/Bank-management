public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws Exception {
    // Récupère le financement existant
    Financement existingFinancement = financementRepository.findByidFinancement(idFinancement)
            .orElseThrow(() -> new FinancementNotFoundException(String.format("Le financement à modifier %s est inexistant", idFinancement)));

    // Met à jour les objets de financement
    if (financementToUpdate.getObjetFinancement() != null) {
        for (ObjetFinancement updatedObjet : financementToUpdate.getObjetFinancement()) {
            for (int i = 0; i < existingFinancement.getObjetFinancement().size(); i++) {
                ObjetFinancement existingObjet = existingFinancement.getObjetFinancement().get(i);
                if (existingObjet.getIdObjetFinancement().equals(updatedObjet.getIdObjetFinancement())) {
                    merge(existingObjet, updatedObjet);
                    break;
                }
            }
        }
    }

    // Met à jour les autres champs de financement
    mergeNonListFields(existingFinancement, financementToUpdate);

    // Sauvegarde le financement mis à jour
    return financementRepository.save(existingFinancement);
}

private void mergeNonListFields(Object target, Object source) throws Exception {
    Field[] fields = source.getClass().getDeclaredFields();
    ArrayList<String> bienFields = new ArrayList<>(
            Arrays.asList(
                    "codeBatiment", "typeBatiment", "numeroVoie", "typeVoie", "nomRue", "batiment", "escalier", "etage", "porte", "codePostal", "nomCommune",
                    "paysBien", "adresseComplete", "codeNormeThermique", "etatBien", "typeEnergie", "codeTypeEnergie", "codeDepartement", "codeInseeCommune",
                    "numeroLot", "numeroNomRue", "typeUsage", "anneeConstruction", "periodeConstruction", "dateDepotPc", "dateDebutConstruction", "surfaceBien",
                    "numeroFiscalLocal", "coordonneeCartographiqueX", "coordonneeCartographiqueY", "prixBien", "montantFinanceLCL", "partLCL"));

    ArrayList<String> dpeFields = new ArrayList<>(
            Arrays.asList("numeroDpe", "estimationCep", "classeCep", "estimationGes", "classeGes", "dateEtablissementDpe",
                    "dateReceptionDpe", "dateFinValiditeDpe", "sirenDiagnostiqueur"));

    for (Field field : fields) {
        if (!field.getName().equals("objetFinancement")) { // Ignore the objetFinancement field
            field.setAccessible(true);
            try {
                Object value = field.get(source);
                if (value != null) {
                    if (isComplexObject(field.getType())) {
                        Object targetValue = field.get(target);
                        if (targetValue == null) {
                            field.set(target, value);
                        } else {
                            mergeNonListFields(targetValue, value);
                        }
                    } else {
                        field.set(target, value);
                    }
                } else {
                    if (field.getType().equals(Date.class) || bienFields.contains(field.getName()) || dpeFields.contains(field.getName())) {
                        field.set(target, null);
                    }
                }
            } catch (IllegalAccessException e) {
                throw new Exception("Impossible de fusionner le champ: " + e.getMessage());
            }
        }
    }
}

private boolean isComplexObject(Class<?> type) {
    return !type.isPrimitive() && !type.equals(String.class) && !type.equals(Integer.class) && !type.equals(Long.class)
            && !type.equals(Double.class) && !type.equals(Float.class) && !type.equals(Boolean.class) && !type.equals(Byte.class)
            && !type.equals(Character.class) && !type.equals(Short.class) && !type.equals(Date.class) && !type.equals(List.class);
}
