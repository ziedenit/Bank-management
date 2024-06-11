public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws Exception {
    // Récupère le financement existant
    Financement existingFinancement = financementRepository.findByidFinancement(idFinancement)
            .orElseThrow(() -> new FinancementNotFoundException(String.format("Le financement à modifier %s est inexistant", idFinancement)));

    // Met à jour les objets de financement
    if (financementToUpdate.getObjetFinancement() != null) {
        for (ObjetFinancement updatedObjet : financementToUpdate.getObjetFinancement()) {
            boolean found = false;
            for (int i = 0; i < existingFinancement.getObjetFinancement().size(); i++) {
                ObjetFinancement existingObjet = existingFinancement.getObjetFinancement().get(i);
                if (existingObjet.getIdObjetFinancement().equals(updatedObjet.getIdObjetFinancement())) {
                    merge(existingObjet, updatedObjet);
                    found = true;
                    break;
                }
            }
            if (!found) {
                existingFinancement.getObjetFinancement().add(updatedObjet);
            }
        }
    }

    // Met à jour les autres champs de financement
    mergeNonListFields(existingFinancement, financementToUpdate);

    // Sauvegarde le financement mis à jour
    return financementRepository.save(existingFinancement);
}

private void merge(Object target, Object source) throws Exception {
    Field[] fields = source.getClass().getDeclaredFields();
    for (Field field : fields) {
        field.setAccessible(true);
        Object value = field.get(source);
        if (value != null) {
            field.set(target, value);
        }
    }
}

private void mergeNonListFields(Object target, Object source) throws Exception {
    Field[] fields = source.getClass().getDeclaredFields();
    for (Field field : fields) {
        if (!field.getName().equals("objetFinancement")) { // Ignore the objetFinancement field
            field.setAccessible(true);
            Object value = field.get(source);
            if (value != null) {
                field.set(target, value);
            }
        }
    }
}
