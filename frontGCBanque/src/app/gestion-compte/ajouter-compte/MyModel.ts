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
                        .civility(new Civility())
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

    }
    //
    @Test
    void testGetClient_ClientNotFound() throws IOException, InterruptedException, ExecutionException {
        // Mock des données d'erreur de l'API
        Error error = new Error();
        error.setCode("B801");
        error.setMessage("Client not found");

        String responseBody = "[{\"code\":\"B801\",\"message\":\"Client not found\"}]";
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(404);
        when(httpResponse.body()).thenReturn(responseBody);

        when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(CompletableFuture.completedFuture(httpResponse));

        // Test de la méthode getClient en cas d'erreur
        assertThrows(ClientNotFoundException.class, () -> clientService.getClient("12345"));
    }
}
//
package com.cl.msofd.service;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.clients.ClientResponse;
import com.cl.msofd.clients.Error;
import com.cl.msofd.model.ClientParticulier;
import com.cl.msofd.utility.JSONUtilOFD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ClientService {
    public static final String AUTHORIZATION = "Authorization";

    @Autowired
    private HttpClient httpClient;

    @Autowired
    private JSONUtilOFD jsonUtils;

    @Value("${referentiel.personne.url}")
    private String referentielPersonne;


    public ClientParticulier getClient(String idReper) throws IOException, InterruptedException, ExecutionException, ClientNotFoundException {
        String url = String.format(referentielPersonne, idReper).concat("&person_type=INDIVIDUAL");
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header(AUTHORIZATION, jsonUtils.basicAuthReferentiel())
                .build();
        CompletableFuture<HttpResponse<String>> response = httpClient.sendAsync(request, BodyHandlers.ofString());
        HttpResponse<String> httpResponse = response.get();
        String responseBody = httpResponse.body();

        // Vérifiez si la réponse est un tableau d'erreurs
        if (httpResponse.statusCode() != 200 || responseBody.startsWith("[")) {
            // Parsez le tableau d'erreurs
            ObjectMapper objectMapper = new ObjectMapper();
            Error[] errors = objectMapper.readValue(responseBody, Error[].class);
            for (Error error : errors) {
                if (error.getCode().equals("B801")) {
                    throw new ClientNotFoundException(error.getMessage());
                }
            }
        }


        ClientResponse personDetails = jsonUtils.covertFromJsonToObject(responseBody, ClientResponse.class);
        if (personDetails == null || personDetails.getEntrepriseDetails() == null) {
            throw new ClientNotFoundException("Client not found");
        }


        return ClientParticulier.builder()
                .idReper(personDetails.getEntrepriseDetails().getPersonId())
                .nomUsageClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getUsualLastName())
                .prenomClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getFirstName())
                .dateNaissanceClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getBirthDate())
                .civility(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getCivility().getLabel())
                .build();
    }

}
//
Java HotSpot(TM) 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended

org.opentest4j.AssertionFailedError: Unexpected exception type thrown, 
Expected :class com.cl.msofd.exception.ClientNotFoundException
Actual   :class java.lang.NullPointerException
<Click to see difference>


	at org.junit.jupiter.api.AssertionFailureBuilder.build(AssertionFailureBuilder.java:151)
	at org.junit.jupiter.api.AssertThrows.assertThrows(AssertThrows.java:67)
	at org.junit.jupiter.api.AssertThrows.assertThrows(AssertThrows.java:35)
	at org.junit.jupiter.api.Assertions.assertThrows(Assertions.java:3115)
	at com.cl.msofd.service.ClientServiceTest.testGetClient_ClientNotFound(ClientServiceTest.java:102)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
Caused by: java.lang.NullPointerException: Cannot invoke "String.length()" because "s" is null
	at java.base/java.util.Formatter.parse(Formatter.java:2717)
	at java.base/java.util.Formatter.format(Formatter.java:2671)
	at java.base/java.util.Formatter.format(Formatter.java:2625)
	at java.base/java.lang.String.format(String.java:4147)
	at com.cl.msofd.service.ClientService.getClient(ClientService.java:36)
	at com.cl.msofd.service.ClientServiceTest.lambda$testGetClient_ClientNotFound$0(ClientServiceTest.java:102)
	at org.junit.jupiter.api.AssertThrows.assertThrows(AssertThrows.java:53)
	... 6 more


java.lang.NullPointerException: Cannot invoke "String.length()" because "s" is null

	at java.base/java.util.Formatter.parse(Formatter.java:2717)
	at java.base/java.util.Formatter.format(Formatter.java:2671)
	at java.base/java.util.Formatter.format(Formatter.java:2625)
	at java.base/java.lang.String.format(String.java:4147)
	at com.cl.msofd.service.ClientService.getClient(ClientService.java:36)
	at com.cl.msofd.service.ClientServiceTest.testGetClient_Success(ClientServiceTest.java:77)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)


Process finished with exit code -1
