package com.cl.msofd.controller;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientParticulier;
import com.cl.msofd.service.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Date;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class ClientControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private ClientService clientService;

    @BeforeEach
    public void setup() {
        // Configure MockMvc with the WebApplicationContext
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testGetClient_Success() throws Exception {
        ClientParticulier clientParticulier = ClientParticulier.builder()
                .idReper("123")
                .nomUsageClient("Doe")
                .prenomClient("John")
                .dateNaissanceClient(Date.valueOf("1990-01-01"))
                .civility("Mr.")
                .build();

        when(clientService.getClient(anyString())).thenReturn(clientParticulier);

        mockMvc.perform(get("/api/v1/clients/particulier/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"idReper\":\"123\",\"nomUsageClient\":\"Doe\",\"prenomClient\":\"John\",\"dateNaissanceClient\":\"01/01/1990\",\"civility\":\"Mr.\"}"));
    }

    @Test
    public void testGetClient_NotFound() throws Exception {
        when(clientService.getClient(anyString())).thenThrow(new ClientNotFoundException("Client not found"));

        mockMvc.perform(get("/api/v1/clients/particulier/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().json("{\"message\":\"Client not found\"}"));
    }

    @Test
    public void testGetClient_BadRequest() throws Exception {
        when(clientService.getClient(anyString())).thenThrow(new IllegalArgumentException("Bad request"));

        mockMvc.perform(get("/api/v1/clients/particulier/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().json("{\"message\":\"Bad request\"}"));
    }

    @Test
    public void testGetClient_InternalServerError() throws Exception {
        when(clientService.getClient(anyString())).thenThrow(new RuntimeException("Internal server error"));

        mockMvc.perform(get("/api/v1/clients/particulier/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError())
                .andExpect(content().json("{\"message\":\"Internal server error\"}"));
    }

    @Test
    public void testGetClient_ExecutionException() throws Exception {
        when(clientService.getClient(anyString())).thenThrow(new ExecutionException(new RuntimeException("Execution error")));

        mockMvc.perform(get("/api/v1/clients/particulier/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError())
                .andExpect(content().json("{\"message\":\"Execution error\"}"));
    }
}
