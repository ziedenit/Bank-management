@Configuration
public class RestTemplateConfig {

    @Value("${ademe.proxy.host}")
    private String proxyHost;

    @Value("${ademe.proxy.port}")
    private int proxyPort;

    @Bean
    public RestTemplate restTemplate() {
        SimpleClientHttpRequestFactory clientHttpRequestFactory = new SimpleClientHttpRequestFactory();
        Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress(proxyHost, proxyPort));
        clientHttpRequestFactory.setProxy(proxy);
        return new RestTemplate(clientHttpRequestFactory);
    }
}
//
package com.cl.msofd.controller;

import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.service.DpeAdemeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AdemeControllerTest {

    private MockMvc mockMvc;

    @Mock
    private DpeAdemeService dpeAdemeService;

    @InjectMocks
    private AdemeController ademeController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(ademeController).build();
    }

    @Test
    public void testGetDpe_Success() throws Exception {
        DpeAdeme dpeAdeme = new DpeAdeme(); // Create a dummy DpeAdeme object

        given(dpeAdemeService.getDpe(anyString())).willReturn(dpeAdeme);

        mockMvc.perform(get("/api/v1/ademe/dpe/{numDpe}", "12345"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetDpe_NotFound() throws Exception {
        given(dpeAdemeService.getDpe(anyString())).willThrow(new DpeAdemeNotFoundException("Not found"));

        DpeAdeme dpeAdemeNeuf = new DpeAdeme(); // Create a dummy DpeAdemeNeuf object
        given(dpeAdemeService.getDpeNeuf(anyString())).willReturn(dpeAdemeNeuf);

        mockMvc.perform(get("/api/v1/ademe/dpe/{numDpe}", "12345"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetDpe_InternalServerError() throws Exception {
        given(dpeAdemeService.getDpe(anyString())).willThrow(new ExecutionException("Execution error", new Throwable()));

        mockMvc.perform(get("/api/v1/ademe/dpe/{numDpe}", "12345"))
                .andExpect(status().isInternalServerError());
    }
}
