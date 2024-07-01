public List<ObjetFinancement> getListObjectFinancementByIdFinancement(String idFinancement) {
    // Cherche un Financement par son ID
    Financement financement = financementRepository.findByidFinancement(idFinancement)
            .orElseThrow(() -> new ListObjetNotFoundException("Financement not found with id: " + idFinancement));
    
    // Retourne la liste des objets de financement
    return financement.getObjetFinancement();
}
