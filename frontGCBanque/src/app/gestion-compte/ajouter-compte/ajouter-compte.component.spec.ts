  @Autowired
    private MongoTemplate mongoTemplate;

    public List<Dpe> findDpeActuelByIdReper(List<String> ids) {
        if (ids == null || ids.isEmpty()) {
            return Collections.emptyList();
        }

        Query query = new Query();
        query.addCriteria(Criteria.where("intervenant.idReper").in(ids));

        List<Financement> financements = mongoTemplate.find(query, Financement.class);

        if (financements == null || financements.isEmpty()) {
            return Collections.emptyList();
        }

        return financements.stream()
                .filter(financement -> financement.getObjetFinancement() != null && !financement.getObjetFinancement().isEmpty())
                .flatMap(financement -> financement.getObjetFinancement().stream())
                .map(ObjetFinancement::getBien)
                .filter(bien -> bien != null && bien.getDpeActuel() != null)
                .map(Bien::getDpeActuel)
                .collect(Collectors.toList());
    }
