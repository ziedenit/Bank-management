@RestController
@RequestMapping("/acquisition")
public class AcquisitionController {

    @Autowired
    private ExcelToDroolsService excelToDroolsService;

    @Autowired
    private DroolsService droolsService;

    @Autowired
    private DroolsConfig droolsConfig;

    @GetMapping("/generate-rules")
    public String generateRules() {
        try {
            excelToDroolsService.generateDroolsFile("src/main/resources/rules.drl");
            droolsConfig.reloadContainer(); // Reload the KieContainer after generating the rules
            return "Rules generated successfully!";
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return "Error generating rules: " + e.getMessage();
        }
    }

    @PostMapping("/apply-rules")
    public AcquisitionResponse applyRules(@RequestBody Acquisition acquisition) {
        return droolsService.applyRules(acquisition);
    }
}
