import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.concurrent.CompletableFuture;

import static org.mockito.Mockito.*;

@Test
void testGetClient_Success() throws IOException, InterruptedException, ExecutionException, ClientNotFoundException {
    // Mock des données de réponse de l'API
    ClientDetails clientDetails = ClientDetails.builder()
            .personId("12345")
            .descriptiveIndividual(DescriptiveIndividual.builder()
                    .usualLastName("Doe")
                    .firstName("John")
                    .birthDate(new Date(90, 0, 1))  // Date exemple
                    .civility(new Civility("Mr"))
                    .build())
            .build();

    ClientResponse clientResponse = ClientResponse.builder()
            .entrepriseDetails(clientDetails)
            .build();

    // Mock des utils JSON
    when(jsonUtils.covertFromJsonToObject(anyString(), any())).thenReturn(clientResponse);

    // Création d'une réponse HTTP simulée
    HttpResponse<String> httpResponse = mock(HttpResponse.class);
    when(httpResponse.statusCode()).thenReturn(200);
    when(httpResponse.body()).thenReturn("{\"person_details\":{\"person_id\":\"12345\",\"descriptive_individual\":{\"usual_last_name\":\"Doe\",\"first_name\":\"John\",\"birth_date\":\"01/01/1990\",\"civility\":{\"label\":\"Mr\"}}}}");
    
    when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
            .thenReturn(CompletableFuture.completedFuture(httpResponse));

    // Test de la méthode getClient
    ClientParticulier clientParticulier = clientService.getClient("12345");

    assertEquals("12345", clientParticulier.getIdReper());
    assertEquals("Doe", clientParticulier.getNomUsageClient());
    assertEquals("John", clientParticulier.getPrenomClient());
    assertEquals(new Date(90, 0, 1), clientParticulier.getDateNaissanceClient());
    assertEquals("Mr", clientParticulier.getCivility());
}
