package com.cl.msofd.controller;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientEntreprise;
import com.cl.msofd.service.EntrepriseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EntrepriseController.class)
public class EntrepriseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EntrepriseService entrepriseService;

    private ClientEntreprise clientEntreprise;

    @BeforeEach
    void setUp() {
        clientEntreprise = ClientEntreprise.builder()
                .idReper("12345")
                .typePerson("LEGAL_PERSON")
                .siren("123456789")
                .legalName("Mock Company")
                .firstName("John")
                .usuaLastName("Doe")
                .civilite("Mr.")
                .build();
    }

    @Test
    void should_return_ClientEntreprise_when_idReper_exists() throws Exception {
        Mockito.when(entrepriseService.getClient(anyString())).thenReturn(clientEntreprise);

        mockMvc.perform(get("/api/v1/clients/entreprise/12345")
                .header(HttpHeaders.ORIGIN, "http://localhost:8081")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.idReper").value("12345"))
                .andExpect(jsonPath("$.typePerson").value("LEGAL_PERSON"))
                .andExpect(jsonPath("$.siren").value("123456789"))
                .andExpect(jsonPath("$.legalName").value("Mock Company"))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.usuaLastName").value("Doe"))
                .andExpect(jsonPath("$.civilite").value("Mr."));
    }

    @Test
    void should_return_404_when_idReper_does_not_exist() throws Exception {
        Mockito.when(entrepriseService.getClient(anyString())).thenThrow(new ClientNotFoundException("Client not found"));

        mockMvc.perform(get("/api/v1/clients/entreprise/unknownId")
                .header(HttpHeaders.ORIGIN, "http://localhost:8081")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Client not found"));
    }

    @Test
    void should_return_500_when_service_throws_Exception() throws Exception {
        Mockito.when(entrepriseService.getClient(anyString())).thenThrow(new ExecutionException("Internal error", new Throwable()));

        mockMvc.perform(get("/api/v1/clients/entreprise/12345")
                .header(HttpHeaders.ORIGIN, "http://localhost:8081")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());
    }
}
