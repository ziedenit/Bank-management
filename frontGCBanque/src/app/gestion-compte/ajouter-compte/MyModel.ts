package com.cl.msofd.controller;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientEntreprise;
import com.cl.msofd.service.EntrepriseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class EntrepriseControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private EntrepriseService entrepriseService;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testGetClient_Success() throws Exception {
        ClientEntreprise clientEntreprise = ClientEntreprise.builder()
                .idReper("123")
                .typePerson("LEGAL_PERSON")
                .siren("123456789")
                .legalName("Test Legal Name")
                .firstName("John")
                .usuaLastName("Doe")
                .civilite("Mr.")
                .build();

        when(entrepriseService.getClient(anyString())).thenReturn(clientEntreprise);

        mockMvc.perform(get("/api/v1/clients/entreprise/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"idReper\":\"123\",\"typePerson\":\"LEGAL_PERSON\",\"siren\":\"123456789\",\"legalName\":\"Test Legal Name\",\"usuaLastName\":\"Doe\",\"firstName\":\"John\",\"civilite\":\"Mr.\"}"));
    }

    @Test
    public void testGetClient_NotFound() throws Exception {
        when(entrepriseService.getClient(anyString())).thenThrow(new ClientNotFoundException("Client not found"));

        mockMvc.perform(get("/api/v1/clients/entreprise/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetClient_InternalServerError() throws Exception {
        when(entrepriseService.getClient(anyString())).thenThrow(new RuntimeException("Internal server error"));

        mockMvc.perform(get("/api/v1/clients/entreprise/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());
    }
}
