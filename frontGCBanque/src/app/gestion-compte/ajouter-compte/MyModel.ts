package com.cl.msofd.service;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.clients.ClientResponse;
import com.cl.msofd.clients.DescriptiveIndividual;
import com.cl.msofd.clients.Civility;
import com.cl.msofd.model.ClientParticulier;
import com.cl.msofd.utility.JSONUtilOFD;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Date;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.*;
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
        // Configurez l'URL du référentiel personne pour le test
        clientService.referentielPersonne = "http://mocked-url/%s";
    }

    @Test
    public void testGetClient_Success() throws IOException, InterruptedException, ExecutionException, ClientNotFoundException {
        // Mock de la réponse HTTP
        HttpResponse<String> httpResponse = (HttpResponse<String>) mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn("{ \"entrepriseDetails\": { \"personId\": \"12345\", \"descriptiveIndividual\": { \"usualLastName\": \"Doe\", \"firstName\": \"John\", \"birthDate\": \"2000-01-01\", \"civility\": { \"label\": \"Mr.\" } } } }");
        CompletableFuture<HttpResponse<String>> responseFuture = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class))).thenReturn(responseFuture);

        // Mock de la méthode d'authentification
        when(jsonUtils.basicAuthReferentiel()).thenReturn("Basic mockAuth");

        // Mock de la conversion JSON
        ClientResponse clientResponse = ClientResponse.builder()
            .entrepriseDetails(ClientDetails.builder()
                .personId("12345")
                .descriptiveIndividual(DescriptiveIndividual.builder()
                    .usualLastName("Doe")
                    .firstName("John")
                    .birthDate(Date.valueOf("2000-01-01"))
                    .civility(Civility.builder().label("Mr.").build())
                    .build())
                .build())
            .build();
        when(jsonUtils.covertFromJsonToObject(anyString(), any())).thenReturn(clientResponse);

        // Appel du service et assertions
        ClientParticulier client = clientService.getClient("12345");
        assertNotNull(client);
        assertEquals("12345", client.getIdReper());
        assertEquals("Doe", client.getNomUsageClient());
        assertEquals("John", client.getPrenomClient());
        assertEquals(Date.valueOf("2000-01-01"), client.getDateNaissanceClient());
        assertEquals("Mr.", client.getCivility());
    }

    @Test
    public void testGetClient_ClientNotFound() throws IOException, InterruptedException, ExecutionException {
        // Mock de la réponse HTTP avec une erreur
        HttpResponse<String> httpResponse = (HttpResponse<String>) mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(404);
        when(httpResponse.body()).thenReturn("[{ \"code\": \"B801\", \"message\": \"Client not found\" }]");
        CompletableFuture<HttpResponse<String>> responseFuture = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class))).thenReturn(responseFuture);

        // Mock de la méthode d'authentification
        when(jsonUtils.basicAuthReferentiel()).thenReturn("Basic mockAuth");

        // Attendez-vous à ce qu'une exception soit levée
        assertThrows(ClientNotFoundException.class, () -> {
            clientService.getClient("invalid-id");
        });
    }

    private HttpResponse<String> mock(Class<HttpResponse> httpResponseClass) {
        // TODO Auto-generated method stub
        return null;
    }
}
