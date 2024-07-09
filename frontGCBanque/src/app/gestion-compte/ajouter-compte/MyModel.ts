@SpringBootTest
public class EntrepriseControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private EntrepriseService entrepriseService;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testGetClient_Success() throws Exception {
        ClientEntreprise clientEntreprise = ClientEntreprise.builder()
                .idReper("123")
                .typePerson("LEGAL_PERSON")
                .siren("123456789")
                .legalName("Test Legal Name")
                .firstName("John")
                .usuaLastName("Doe")
                .civilite("Mr.")
                .build();

        when(entrepriseService.getClient(anyString())).thenReturn(clientEntreprise);

        mockMvc.perform(get("/api/v1/clients/entreprise/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"idReper\":\"123\",\"typePerson\":\"LEGAL_PERSON\",\"siren\":\"123456789\",\"legalName\":\"Test Legal Name\",\"usuaLastName\":\"Doe\",\"firstName\":\"John\",\"civilite\":\"Mr.\"}"));
    }

    @Test
    public void testGetClient_NotFound() throws Exception {
        when(entrepriseService.getClient(anyString())).thenThrow(new ClientNotFoundException("Client not found"));

        mockMvc.perform(get("/api/v1/clients/entreprise/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetClient_InternalServerError() throws Exception {
        when(entrepriseService.getClient(anyString())).thenThrow(new RuntimeException("Internal server error"));

        mockMvc.perform(get("/api/v1/clients/entreprise/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());
    }
}
