
    public List<ObjetFinancement> getListObjectFinancementByIdFinancement(String idFinancement) {
        return financementRepository.findByidFinancement(idFinancement)
                .orElseThrow(() -> new ListObjetNotFoundException("Financement not found with id: " + idFinancement))
                .getObjetFinancement();
    }
