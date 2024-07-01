@WebMvcTest(FinancementController.class)
public class FinancementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FinancementService financementService;

    @Test
    void should_throw_list_objet_not_found_exception() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        // ID qui n'existe pas dans le contexte du test
        String idFinancement = "F99999999";

        // Configuration du mock pour simuler une exception lorsque le financement n'existe pas
        when(financementService.getListObjectFinancementByIdFinancement(idFinancement))
                .thenThrow(new ListObjetNotFoundException("Financement not found with id: " + idFinancement));

        // Appel du endpoint avec l'ID qui devrait déclencher l'exception
        MvcResult result = mockMvc.perform(get("/api/v1/financement/listObjetFinancement/" + idFinancement)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andReturn();

        // Vérification que l'exception est de type ListObjetNotFoundException
        assertTrue(result.getResolvedException() instanceof ListObjetNotFoundException);
        assertEquals("Financement not found with id: " + idFinancement, result.getResolvedException().getMessage());
    }
}
