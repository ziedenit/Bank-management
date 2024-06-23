@Configuration
public class DroolsConfig {

    @Value("${spring.drools.rules-file}")
    private String rulesFile;

    private static final KieServices kieServices = KieServices.Factory.get();

    private KieContainer kieContainer;

    @Bean
    public KieContainer kieContainer() {
        loadContainer();
        return kieContainer;
    }

    public void reloadContainer() {
        loadContainer();
    }

    private void loadContainer() {
        KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newClassPathResource(rulesFile));
        KieBuilder kieBuilder = kieServices.newKieBuilder(kieFileSystem);
        kieBuilder.buildAll();
        KieModule kieModule = kieBuilder.getKieModule();
        this.kieContainer = kieServices.newKieContainer(kieModule.getReleaseId());
    }
}
