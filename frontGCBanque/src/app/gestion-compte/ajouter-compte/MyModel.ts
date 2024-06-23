    private final KieContainer kieContainer;

    @Autowired
    public ExcelToDroolsService(MongoTemplate mongoTemplate, KieContainer kieContainer) {
        this.mongoTemplate = mongoTemplate;
        this.kieContainer = kieContainer;
    
