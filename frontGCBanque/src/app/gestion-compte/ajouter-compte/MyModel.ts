package com.cl.msofd.service;

import com.cl.msofd.exception.DpeAdemeExistingException;
import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.Ademe;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.repository.DpeAdemeRepository;
import com.cl.msofd.repository.DpeAdemeRepositoryCustom;
import com.cl.msofd.utility.JSONUtilOFD;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Collections;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class DpeAdemeServiceTest {

    @Mock
    private DpeAdemeRepository dpeAdemeRepository;

    @Mock
    private DpeAdemeRepositoryCustom dpeAdemeRepositoryCustom;

    @Mock
    private HttpClient ademeHttpClient;

    @Mock
    private JSONUtilOFD jsonUtils;

    @InjectMocks
    private DpeAdemeService dpeAdemeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void should_create_DpeAdeme_when_not_exists() {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("123456");
        
        when(dpeAdemeRepositoryCustom.findByNumDpe(dpeAdeme.getNumDpe())).thenReturn(Optional.empty());
        when(dpeAdemeRepository.save(dpeAdeme)).thenReturn(dpeAdeme);
        
        DpeAdeme result = dpeAdemeService.create(dpeAdeme);
        assertThat(result).isEqualTo(dpeAdeme);
    }

    @Test
    void should_throw_DpeAdemeExistingException_when_dpe_exists() {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("123456");
        
        when(dpeAdemeRepositoryCustom.findByNumDpe(dpeAdeme.getNumDpe())).thenReturn(Optional.of(dpeAdeme));
        
        assertThrows(DpeAdemeExistingException.class, () -> dpeAdemeService.create(dpeAdeme));
    }

    @Test
    void should_get_DpeAdeme_when_exists() throws Exception {
        String numDpe = "123456";
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe(numDpe);
        Ademe ademe = new Ademe(Collections.singletonList(dpeAdeme));
        String responseBody = new ObjectMapper().writeValueAsString(ademe);
        
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn(responseBody);
        
        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(ademeHttpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        when(jsonUtils.covertFromJsonToObject(responseBody, Ademe.class)).thenReturn(ademe);

        DpeAdeme result = dpeAdemeService.getDpe(numDpe);
        assertThat(result).isEqualTo(dpeAdeme);
    }

    @Test
    void should_throw_DpeAdemeNotFoundException_when_dpe_does_not_exist() throws Exception {
        String numDpe = "123456";
        Ademe ademe = new Ademe(Collections.emptyList());
        String responseBody = new ObjectMapper().writeValueAsString(ademe);
        
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn(responseBody);
        
        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(ademeHttpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        when(jsonUtils.covertFromJsonToObject(responseBody, Ademe.class)).thenReturn(ademe);
        
        assertThrows(DpeAdemeNotFoundException.class, () -> dpeAdemeService.getDpe(numDpe));
    }

    @Test
    void should_get_DpeAdeme_from_neuf() throws Exception {
        String numDpe = "123456";
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe(numDpe);
        Ademe ademe = new Ademe(Collections.singletonList(dpeAdeme));
        String responseBody = new ObjectMapper().writeValueAsString(ademe);
        
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn(responseBody);
        
        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(ademeHttpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        when(jsonUtils.covertFromJsonToObject(responseBody, Ademe.class)).thenReturn(ademe);
        
        when(dpeAdemeRepositoryCustom.findByNumDpe(numDpe)).thenReturn(Optional.empty());
        when(dpeAdemeRepository.save(dpeAdeme)).thenReturn(dpeAdeme);
        
        DpeAdeme result = dpeAdemeService.getDpeNeuf(numDpe);
        assertThat(result).isEqualTo(dpeAdeme);
    }

    @Test
    void should_throw_DpeAdemeNotFoundException_when_dpe_does_not_exist_in_neuf() throws Exception {
        String numDpe = "123456";
        Ademe ademe = new Ademe(Collections.emptyList());
        String responseBody = new ObjectMapper().writeValueAsString(ademe);
        
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn(responseBody);
        
        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(ademeHttpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        when(jsonUtils.covertFromJsonToObject(responseBody, Ademe.class)).thenReturn(ademe);
        
        assertThrows(DpeAdemeNotFoundException.class, () -> dpeAdemeService.getDpeNeuf(numDpe));
    }
}
