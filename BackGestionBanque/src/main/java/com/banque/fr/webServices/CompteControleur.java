import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.*;

@Test
void should_call_and_return_dpe_from_ademe_public_service() throws Exception {
    String username = "user1";
    String password = "user1Pass";
    String auth = username + ":" + password;
    byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
    String authHeader = "Basic " + new String(encodedAuth);

    // Créer un serveur MockRestServiceServer
    MockRestServiceServer mockServer = MockRestServiceServer.createServer(restTemplate);

    // Définir une réponse simulée
    String responseBody = "Your mock response here";
    mockServer.expect(requestTo("http://localhost:8081/api/v1/ademe/dpe/2095V1001813O"))
            .andExpect(method(HttpMethod.GET))
            .andExpect(header("Authorization", authHeader))
            .andRespond(withSuccess(responseBody, MediaType.APPLICATION_JSON));

    // Effectuer la demande à l'API simulée
    MvcResult result = mockMvc.perform(get("/api/v1/ademe/dpe/2095V1001813O")
            .header("Authorization", authHeader))
            .andExpect(status().isOk())
            .andReturn();

    // Assurez-vous que la réponse est correcte
    String content = result.getResponse().getContentAsString();
    // Faire d'autres vérifications si nécessaire
}
