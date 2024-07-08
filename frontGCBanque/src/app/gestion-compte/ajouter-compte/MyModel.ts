package com.cl.msofd.service;

import com.cl.msofd.exception.DpeAdemeExistingException;
import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.Ademe;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.repository.DpeAdemeRepository;
import com.cl.msofd.repository.DpeAdemeRepositoryCustom;
import com.cl.msofd.utility.Constants;
import com.cl.msofd.utility.JSONUtilOFD;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class DpeAdemeServiceTest {

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
    void testCreate_DpeAdemeExists_ThrowsException() {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("123");

        when(dpeAdemeRepositoryCustom.findByNumDpe(anyString())).thenReturn(Optional.of(dpeAdeme));

        DpeAdemeExistingException thrown = assertThrows(DpeAdemeExistingException.class, () -> {
            dpeAdemeService.create(dpeAdeme);
        });

        assertEquals("le numéro DPE 123 est déjà créé ", thrown.getMessage());
    }

    @Test
    void testCreate_DpeAdemeDoesNotExist_Success() {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("123");

        when(dpeAdemeRepositoryCustom.findByNumDpe(anyString())).thenReturn(Optional.empty());
        when(dpeAdemeRepository.save(any(DpeAdeme.class))).thenReturn(dpeAdeme);

        DpeAdeme result = dpeAdemeService.create(dpeAdeme);

        assertEquals(dpeAdeme, result);
    }

    @Test
    void testGetDpe_Success() throws IOException, InterruptedException, ExecutionException {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("123");
        Ademe ademe = new Ademe();
        ademe.setResults(java.util.List.of(dpeAdeme));

        HttpResponse<String> response = mock(HttpResponse.class);
        when(response.body()).thenReturn("{\"results\": [{\"numDpe\": \"123\"}]}");

        when(ademeHttpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(CompletableFuture.completedFuture(response));
        when(jsonUtils.covertFromJsonToObject(anyString(), eq(Ademe.class))).thenReturn(ademe);

        DpeAdeme result = dpeAdemeService.getDpe("123");

        assertEquals(dpeAdeme, result);
    }

    @Test
    void testGetDpe_NotFound() throws IOException, InterruptedException, ExecutionException {
        Ademe ademe = new Ademe();
        ademe.setResults(java.util.List.of());

        HttpResponse<String> response = mock(HttpResponse.class);
        when(response.body()).thenReturn("{\"results\": []}");

        when(ademeHttpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(CompletableFuture.completedFuture(response));
        when(jsonUtils.covertFromJsonToObject(anyString(), eq(Ademe.class))).thenReturn(ademe);

        DpeAdemeNotFoundException thrown = assertThrows(DpeAdemeNotFoundException.class, () -> {
            dpeAdemeService.getDpe("123");
        });

        assertEquals("Le DPE 123 est inexistant", thrown.getMessage());
    }

    @Test
    void testGetDpeByUrl_Success() throws IOException, InterruptedException, ExecutionException {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("123");
        Ademe ademe = new Ademe();
        ademe.setResults(java.util.List.of(dpeAdeme));

        HttpResponse<String> response = mock(HttpResponse.class);
        when(response.body()).thenReturn("{\"results\": [{\"numDpe\": \"123\"}]}");

        when(ademeHttpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(CompletableFuture.completedFuture(response));
        when(jsonUtils.covertFromJsonToObject(anyString(), eq(Ademe.class))).thenReturn(ademe);

        DpeAdeme result = dpeAdemeService.getDpeByUrl(Constants.ADEME_URL, "123");

        assertEquals(dpeAdeme, result);
    }

    @Test
    void testGetDpeByUrl_NotFound() throws IOException, InterruptedException, ExecutionException {
        Ademe ademe = new Ademe();
        ademe.setResults(java.util.List.of());

        HttpResponse<String> response = mock(HttpResponse.class);
        when(response.body()).thenReturn("{\"results\": []}");

        when(ademeHttpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(CompletableFuture.completedFuture(response));
        when(jsonUtils.covertFromJsonToObject(anyString(), eq(Ademe.class))).thenReturn(ademe);

        DpeAdemeNotFoundException thrown = assertThrows(DpeAdemeNotFoundException.class, () -> {
            dpeAdemeService.getDpeByUrl(Constants.ADEME_URL, "123");
        });

        assertEquals("Le DPE 123 est inexistant", thrown.getMessage());
    }
}
