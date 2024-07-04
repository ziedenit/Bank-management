package com.cl.msofd.service;

import com.cl.msofd.clients.ClientDetails;
import com.cl.msofd.clients.ClientResponse;
import com.cl.msofd.clients.DescriptiveIndividual;
import com.cl.msofd.clients.Error;
import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.utility.JSONUtilOFD;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
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
    }

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

        // Mock des appels HTTP
        HttpResponse<String> httpResponse = HttpResponse.newBuilder()
                .statusCode(200)
                .body("{\"person_details\":{\"person_id\":\"12345\",\"descriptive_individual\":{\"usual_last_name\":\"Doe\",\"first_name\":\"John\",\"birth_date\":\"01/01/1990\",\"civility\":{\"label\":\"Mr\"}}}}")
                .build();
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

    @Test
    void testGetClient_ClientNotFound() throws IOException, InterruptedException, ExecutionException {
        // Mock des données d'erreur de l'API
        Error error = new Error();
        error.setCode("B801");
        error.setMessage("Client not found");

        String responseBody = "[{\"code\":\"B801\",\"message\":\"Client not found\"}]";
        HttpResponse<String> httpResponse = HttpResponse.newBuilder()
                .statusCode(404)
                .body(responseBody)
                .build();

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

        // Mock des appels HTTP
        HttpResponse<String> httpResponse = HttpResponse.newBuilder()
                .statusCode(200)
                .body("{\"person_details\":null}")
                .build();
        when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(CompletableFuture.completedFuture(httpResponse));

        // Test de la méthode getClient en cas de détails de personne null
        assertThrows(ClientNotFoundException.class, () -> clientService.getClient("12345"));
    }
}
