 private final KieContainer kieContainer;
    private final KieServices kieServices;

    @Autowired
    public ExcelToDroolsService(MongoTemplate mongoTemplate, KieContainer kieContainer) {
        this.mongoTemplate = mongoTemplate;
        this.kieContainer = kieContainer;
        this.kieServices = KieServices.Factory.get();
    }

    private void reloadDroolsFile(String outputDroolsFile) {
        KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newFileResource(outputDroolsFile));
        KieBuilder kieBuilder = kieServices.newKieBuilder(kieFileSystem);
        kieBuilder.buildAll();
        ReleaseId releaseId = kieBuilder.getKieModule().getReleaseId();
        kieContainer.updateToVersion(releaseId);
    }
