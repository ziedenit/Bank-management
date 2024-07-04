package com.cl.msofd.service;

import com.cl.msofd.clients.Error;
import com.cl.msofd.clients.*;
import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientParticulier;
import com.cl.msofd.utility.JSONUtilOFD;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Date;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ClientServiceTest {

    @Mock
    private HttpClient httpClient;

    @Mock
    private JSONUtilOFD jsonUtils;

    @InjectMocks
    private ClientService clientService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(clientService.referentielPersonne).thenReturn("http://example.com/api/client/%s");
        when(jsonUtils.basicAuthReferentiel()).thenReturn("Basic dGVzdDp0ZXN0"); // Exemple d'un auth header Basic
    }

    @Test
    void testGetClient_Success() throws IOException, InterruptedException, ExecutionException, ClientNotFoundException {
        // Mock des données de réponse de l'API
        ClientDetails clientDetails = ClientDetails.builder()
                .personId("12345")
                .descriptiveIndividual(DescriptiveIndividual.builder()
                        .usualLastName("Doe")
                        .firstName("John")
                        .birthDate(Date.valueOf("1990-01-01"))  // Date corrigée
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
        assertEquals(Date.valueOf("1990-01-01"), clientParticulier.getDateNaissanceClient());
        assertEquals("Mr", clientParticulier.getCivility());
    }

    @Test
    void testGetClient_ClientNotFound() throws IOException, InterruptedException, ExecutionException {
        // Mock des données d'erreur de l'API
        String responseBody = "[{\"code\":\"B801\",\"message\":\"Client not found\"}]";
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(404);
        when(httpResponse.body()).thenReturn(responseBody);

        when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(CompletableFuture.completedFuture(httpResponse));

        // Test de la méthode getClient en cas d'erreur
        assertThrows(ClientNotFoundException.class, () -> clientService.getClient("12345"));
    }

    @Test
    void testGetClient_NoPersonDetails() throws IOException, InterruptedException, ExecutionException {
        // Mock des données de réponse sans détails de personne
        ClientResponse clientResponse = ClientResponse.builder()
                .entrepriseDetails(null)
                .build();

        // Mock des utils JSON
        when(jsonUtils.covertFromJsonToObject(anyString(), any())).thenReturn(clientResponse);

        // Création d'une réponse HTTP simulée
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn("{\"person_details\":null}");

        when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(CompletableFuture.completedFuture(httpResponse));

        // Test de la méthode getClient en cas de détails de personne null
        assertThrows(ClientNotFoundException.class, () -> clientService.getClient("12345"));
    }
}
