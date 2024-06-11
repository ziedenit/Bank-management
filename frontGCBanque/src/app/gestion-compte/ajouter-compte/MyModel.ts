public Financement patchFinancementChamps(String idFinancement, Financement financementToUpdate) throws Exception {
    // Récupérer le financement existant
    Financement existingFinancement = financementRepository.findById(idFinancement)
            .orElseThrow(() -> new FinancementNotFoundException(String.format("Le financement à modifier %s est inexistant", idFinancement)));

    // Log l'état initial
    System.out.println("Financement initial: " + existingFinancement);

    // Mettre à jour les objets de financement
    if (financementToUpdate.getObjetFinancement() != null) {
        for (ObjetFinancement updatedObjet : financementToUpdate.getObjetFinancement()) {
            boolean found = false;
            for (ObjetFinancement existingObjet : existingFinancement.getObjetFinancement()) {
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

    // Mettre à jour les autres champs du financement
    mergeNonListFields(existingFinancement, financementToUpdate);

    // Log l'état final avant la sauvegarde
    System.out.println("Financement mis à jour: " + existingFinancement);

    // Sauvegarder le financement mis à jour
    Financement savedFinancement = financementRepository.save(existingFinancement);

    // Log l'état final après la sauvegarde
    System.out.println("Financement sauvegardé: " + savedFinancement);

    return savedFinancement;
}
