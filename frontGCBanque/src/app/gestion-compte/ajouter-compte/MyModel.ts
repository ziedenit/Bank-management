  public List<ObjetFinancement> getListObjectFinancementByIdFinancement(String idFinancement) {
        return financementRepository.findByidFinancement(idFinancement).get().getObjetFinancement()
                .orElseThrow(() -> new ListObjetNotFoundException("Financement not found with id: " + idFinancement))
                .getObjetFinancement();
    }
