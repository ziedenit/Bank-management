package com.cl.msofd.controller;

import com.cl.msofd.MsofdApplication;
import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.service.DpeAdemeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = MsofdApplication.class, 
                excludeAutoConfiguration = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
@AutoConfigureMockMvc
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
