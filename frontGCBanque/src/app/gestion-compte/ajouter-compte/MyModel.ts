package com.cl.msofd.service;

import com.cl.msofd.clients.*;
import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientParticulier;
import com.cl.msofd.utility.JSONUtilOFD;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class ClientServiceTest {

    @Autowired
    private ClientService clientService;

    @MockBean(name = "httpClient")
    private HttpClient httpClient;

    @MockBean
    private JSONUtilOFD jsonUtils;

    @Value("${referentiel.personne.url}")
    private String referentielPersonne;

    @BeforeEach
    void setUp() {
        Mockito.when(jsonUtils.basicAuthReferentiel()).thenReturn("Basic Auth");
    }

    @Test
    void should_return_ClientParticulier_for_INDIVIDUAL() throws Exception {
        ClientDetails clientDetails = new ClientDetails();
        clientDetails.setPersonType("INDIVIDUAL");
        clientDetails.setPersonId("12345");
        DescriptiveIndividual descriptiveIndividual = new DescriptiveIndividual();
        descriptiveIndividual.setFirstName("John");
        descriptiveIndividual.setUsualLastName("Doe");
        Civility civility = new Civility();
        civility.setLabel("Mr");
        descriptiveIndividual.setCivility(civility);
        descriptiveIndividual.setBirthDate(java.sql.Date.valueOf("2000-01-01"));
        clientDetails.setDescriptiveIndividual(descriptiveIndividual);

        ClientResponse clientResponse = new ClientResponse();
        clientResponse.setEntrepriseDetails(clientDetails);

        String responseBody = new ObjectMapper().writeValueAsString(clientResponse);
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn(responseBody);

        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        when(jsonUtils.covertFromJsonToObject(responseBody, ClientResponse.class)).thenReturn(clientResponse);

        ClientParticulier expectedClient = ClientParticulier.builder()
                .idReper("12345")
                .nomUsageClient("Doe")
                .prenomClient("John")
                .dateNaissanceClient(java.sql.Date.valueOf("2000-01-01"))
                .civility("Mr")
                .build();

        ClientParticulier actualClient = clientService.getClient("12345");

        assertThat(actualClient).isEqualTo(expectedClient);
    }

    @Test
    void should_throw_ClientNotFoundException_for_unknown_id() throws Exception {
        // Mock the HttpClient response with an error
        Error error = new Error();
        error.setCode("B801");
        error.setMessage("Client not found");
        Error[] errors = {error};
        String errorResponse = new ObjectMapper().writeValueAsString(errors);

        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(404);
        when(httpResponse.body()).thenReturn(errorResponse);

        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        assertThatThrownBy(() -> clientService.getClient("unknownId"))
                .isInstanceOf(ClientNotFoundException.class)
                .hasMessage("Client not found");
    }
}
