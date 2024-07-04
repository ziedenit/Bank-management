package com.cl.msofd.service;

import com.cl.msofd.clients.ClientResponse;
import com.cl.msofd.clients.Error;
import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientEntreprise;
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

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class EntrepriseServiceTest {

    @Autowired
    private EntrepriseService entrepriseService;

    @MockBean(name = "httpClient")
    private HttpClient httpClient;

    @MockBean
    private JSONUtilOFD jsonUtils;

    @Value("${referentiel.personne.url}")
    private String referentielPersonne;

    @BeforeEach
    void setUp() {
        // Mock the URL value
        Mockito.when(jsonUtils.basicAuthReferentiel()).thenReturn("Basic Auth");
    }

    @Test
    void should_return_ClientEntreprise_for_LEGAL_PERSON() throws Exception {
        // Mock the HttpClient response
        ClientResponse clientResponse = new ClientResponse(); // Populate with necessary mock data
        String responseBody = new ObjectMapper().writeValueAsString(clientResponse);
        HttpResponse<String> httpResponse = Mockito.mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn(responseBody);

        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        when(jsonUtils.covertFromJsonToObject(responseBody, ClientResponse.class)).thenReturn(clientResponse);

        // Create a sample ClientResponse for LEGAL_PERSON
        ClientEntreprise expectedClient = new ClientEntreprise(); // Populate with expected data

        ClientEntreprise actualClient = entrepriseService.getClient("12345");

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

        HttpResponse<String> httpResponse = Mockito.mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(404);
        when(httpResponse.body()).thenReturn(errorResponse);

        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        assertThatThrownBy(() -> entrepriseService.getClient("unknownId"))
                .isInstanceOf(ClientNotFoundException.class)
                .hasMessage("Client not found");
    }

    // Add more tests to cover different scenarios, e.g. for INDIVIDUAL_COMPANY and other edge cases.
}
