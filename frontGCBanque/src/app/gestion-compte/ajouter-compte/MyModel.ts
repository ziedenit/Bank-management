package com.cl.msofd.controller;

import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.service.DpeAdemeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AdemeController.class,
            excludeAutoConfiguration = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
class AdemeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DpeAdemeService dpeAdemeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldReturnDpeAdeme_whenDpeExists() throws Exception {
        String numDpe = "123456";
        DpeAdeme dpeAdeme = DpeAdeme.builder().numDpe(numDpe).build();

        when(dpeAdemeService.getDpe(anyString())).thenReturn(dpeAdeme);

        mockMvc.perform(get("/api/v1/ademe/dpe/{numDpe}", numDpe))
               .andExpect(status().isOk());
    }

    @Test
    void shouldReturnNotFound_whenDpeDoesNotExist() throws Exception {
        String numDpe = "123456";

        when(dpeAdemeService.getDpe(anyString())).thenThrow(new DpeAdemeNotFoundException("Dpe not found"));

        mockMvc.perform(get("/api/v1/ademe/dpe/{numDpe}", numDpe))
               .andExpect(status().isNotFound());
    }
}
