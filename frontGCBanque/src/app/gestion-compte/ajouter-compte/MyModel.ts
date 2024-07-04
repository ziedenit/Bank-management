package com.cl.msofd.controller;

import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.service.DpeAdemeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AdemeControllerTest {

    @Mock
    private DpeAdemeService dpeAdemeService;

    @InjectMocks
    private AdemeController ademeController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(ademeController).build();
    }

    @Test
    void testGetDpeSuccess() throws Exception {
        DpeAdeme dpeAdeme = DpeAdeme.builder().numDpe("123456").build();
        when(dpeAdemeService.getDpe(anyString())).thenReturn(dpeAdeme);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numDpe").value("123456"));
        
        verify(dpeAdemeService, times(1)).getDpe(anyString());
    }

    @Test
    void testGetDpeNotFound() throws Exception {
        when(dpeAdemeService.getDpe(anyString())).thenThrow(new DpeAdemeNotFoundException("Le DPE 123456 est inexistant"));

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(dpeAdemeService, times(1)).getDpe(anyString());
    }

    @Test
    void testGetDpeNeufSuccess() throws Exception {
        DpeAdeme dpeAdeme = DpeAdeme.builder().numDpe("123456").build();
        when(dpeAdemeService.getDpe(anyString())).thenThrow(new DpeAdemeNotFoundException("Le DPE 123456 est inexistant"));
        when(dpeAdemeService.getDpeNeuf(anyString())).thenReturn(dpeAdeme);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numDpe").value("123456"));

        verify(dpeAdemeService, times(1)).getDpe(anyString());
        verify(dpeAdemeService, times(1)).getDpeNeuf(anyString());
    }

    @Test
    void testGetDpeInternalServerError() throws Exception {
        when(dpeAdemeService.getDpe(anyString())).thenThrow(new ExecutionException("Execution exception", new Throwable()));

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(dpeAdemeService, times(1)).getDpe(anyString());
    }
}
