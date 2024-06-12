@SpringBootApplication
public class MsofdApplication extends SpringBootServletInitializer {
    @Autowired
    private JobLauncher jobLauncher;
    public static void main(String[] args) {
        SpringApplication.run(MsofdApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(MsofdApplication.class);
    }

    @Autowired
    private Job job;

    @Override
    public void run(String... args) throws Exception {
        jobLauncher.run(job, new JobParametersBuilder().toJobParameters());
    }

}
c'est la classe boot de mon appli mais j'ai ce probleme 
Method does not override method from its superclass pour la méthode run
