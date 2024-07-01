public List<ObjetFinancement> getListObjectFinancementByIdFinancement(String idFinancement) {
    commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Recherche de la liste des objets de financement pour l'ID : " + idFinancement);

    // Trouve un financement par ID
    Financement financement = financementRepository.findByidFinancement(idFinancement)
            .orElseThrow(() -> new ListObjetNotFoundException(
                    String.format("Pas de financement trouvé pour l'ID : %s", idFinancement)
            ));

    // Récupère la liste des objets de financement
    List<ObjetFinancement> listObjetsFinancement = financement.getObjetFinancement();

    // Vérifie si la liste est vide et lance une exception le cas échéant
    if (listObjetsFinancement == null || listObjetsFinancement.isEmpty()) {
        throw new ListObjetNotFoundException(
                String.format("Pas de liste d'objets de financement pour le financement ayant comme ID : %s", idFinancement)
        );
    }

    return listObjetsFinancement;
}
