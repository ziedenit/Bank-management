package com.cl.msofd.controller;

import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.service.DpeAdemeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AdemeController.class)
class AdemeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DpeAdemeService dpeAdemeService;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new AdemeController()).build();
    }

    @Test
    void shouldReturnDpeAdemeWhenExists() throws Exception {
        DpeAdeme dpeAdeme = DpeAdeme.builder().numDpe("123456").build();
        Mockito.when(dpeAdemeService.getDpe(anyString())).thenReturn(dpeAdeme);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numDpe").value("123456"));
    }

    @Test
    void shouldReturnDpeAdemeFromNeufWhenNotFound() throws Exception {
        DpeAdeme dpeAdemeNeuf = DpeAdeme.builder().numDpe("123456").build();
        Mockito.when(dpeAdemeService.getDpe(anyString())).thenThrow(DpeAdemeNotFoundException.class);
        Mockito.when(dpeAdemeService.getDpeNeuf(anyString())).thenReturn(dpeAdemeNeuf);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numDpe").value("123456"));
    }

    @Test
    void shouldReturnNotFoundWhenDpeAdemeDoesNotExist() throws Exception {
        Mockito.when(dpeAdemeService.getDpe(anyString())).thenThrow(DpeAdemeNotFoundException.class);
        Mockito.when(dpeAdemeService.getDpeNeuf(anyString())).thenThrow(DpeAdemeNotFoundException.class);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldReturnInternalServerErrorOnExecutionException() throws Exception {
        Mockito.when(dpeAdemeService.getDpe(anyString())).thenThrow(ExecutionException.class);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void shouldReturnInternalServerErrorOnInterruptedException() throws Exception {
        Mockito.when(dpeAdemeService.getDpe(anyString())).thenThrow(InterruptedException.class);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());
    }
}
