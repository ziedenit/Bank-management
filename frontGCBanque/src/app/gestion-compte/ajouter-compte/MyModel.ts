      reloadKieContainer(outputDroolsFile);
    }

    private void reloadKieContainer(String rulesFilePath) {
        KieFileSystem kieFileSystem = KieServices.Factory.get().newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newFileResource(rulesFilePath));
        KieBuilder kieBuilder = KieServices.Factory.get().newKieBuilder(kieFileSystem);
        kieBuilder.buildAll();
        KieModule kieModule = kieBuilder.getKieModule();
        KieContainer newKieContainer = KieServices.Factory.get().newKieContainer(kieModule.getReleaseId());
        kieContainer.updateToVersion(kieModule.getReleaseId());
    }
//
@Configuration
public class DroolsConfig {

    @Value("${spring.drools.rules-file}")
    private String rulesFile;

    private static final KieServices kieServices = KieServices.Factory.get();

    @Bean
    public KieContainer kieContainer() {
        return loadKieContainer();
    }

    private KieContainer loadKieContainer() {
        KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newClassPathResource(rulesFile));
        KieBuilder kieBuilder = kieServices.newKieBuilder(kieFileSystem);
        kieBuilder.buildAll();
        KieModule kieModule = kieBuilder.getKieModule();
        return kieServices.newKieContainer(kieModule.getReleaseId());
    }
}
//
@Service
public class DroolsService {
    @Autowired
    private KieContainer kieContainer;

    public AcquisitionResponse applyRules(Acquisition acquisition) {
        List<AcquisitionResponse> responses = new ArrayList<>();
        KieSession kieSession = kieContainer.newKieSession();
        kieSession.setGlobal("responses", responses); // Définir global avant d'insérer les faits
        kieSession.insert(acquisition);
        kieSession.fireAllRules();
        kieSession.dispose();
        return responses.isEmpty() ? null : responses.get(0);
    }
}
