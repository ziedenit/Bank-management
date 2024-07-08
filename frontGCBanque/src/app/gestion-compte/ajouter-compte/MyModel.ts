package com.cl.msofd.service;

import com.cl.logs.commun.CommonLogger;
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
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
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
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void create_whenDpeAdemeExists_thenThrowDpeAdemeExistingException() {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("12345");
        when(dpeAdemeRepositoryCustom.findByNumDpe(dpeAdeme.getNumDpe())).thenReturn(Optional.of(dpeAdeme));

        assertThrows(DpeAdemeExistingException.class, () -> dpeAdemeService.create(dpeAdeme));
    }

    @Test
    void create_whenDpeAdemeDoesNotExist_thenSaveDpeAdeme() {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("12345");
        when(dpeAdemeRepositoryCustom.findByNumDpe(dpeAdeme.getNumDpe())).thenReturn(Optional.empty());
        when(dpeAdemeRepository.save(dpeAdeme)).thenReturn(dpeAdeme);

        DpeAdeme result = dpeAdemeService.create(dpeAdeme);
        assertEquals(dpeAdeme, result);
    }

    @Test
    void getDpe_whenDpeAdemeExists_thenReturnDpeAdeme() throws Exception {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("12345");
        Ademe ademe = new Ademe();
        ademe.setResults(List.of(dpeAdeme));

        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.body()).thenReturn("{\"results\": [{\"numDpe\": \"12345\"}]}");

        when(ademeHttpClient.sendAsync(any(HttpRequest.class), any(BodyHandlers.ofString().getClass()))
                .thenAnswer(invocation -> CompletableFuture.completedFuture(httpResponse));
        when(jsonUtils.covertFromJsonToObject(any(String.class), eq(Ademe.class))).thenReturn(ademe);

        DpeAdeme result = dpeAdemeService.getDpe("12345");
        assertEquals(dpeAdeme, result);
    }

    @Test
    void getDpe_whenDpeAdemeDoesNotExist_thenThrowDpeAdemeNotFoundException() throws Exception {
        Ademe ademe = new Ademe();
        ademe.setResults(List.of());

        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.body()).thenReturn("{\"results\": []}");

        when(ademeHttpClient.sendAsync(any(HttpRequest.class), any(BodyHandlers.ofString().getClass()))
                .thenAnswer(invocation -> CompletableFuture.completedFuture(httpResponse));
        when(jsonUtils.covertFromJsonToObject(any(String.class), eq(Ademe.class))).thenReturn(ademe);

        assertThrows(DpeAdemeNotFoundException.class, () -> dpeAdemeService.getDpe("12345"));
    }

    @Test
    void getDpeByUrl_whenDpeAdemeIsReplaced_thenReturnDpeAdeme() throws Exception {
        DpeAdeme dpeAdeme = new DpeAdeme();
        dpeAdeme.setNumDpe("12345");
        dpeAdeme.setNumDpeRemplace("12345");
        Ademe ademe = new Ademe();
        ademe.setResults(List.of(dpeAdeme));

        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.body()).thenReturn("{\"results\": [{\"numDpe\": \"12345\", \"numDpeRemplace\": \"12345\"}]}");

        when(ademeHttpClient.sendAsync(any(HttpRequest.class), any(BodyHandlers.ofString().getClass()))
                .thenAnswer(invocation -> CompletableFuture.completedFuture(httpResponse));
        when(jsonUtils.covertFromJsonToObject(any(String.class), eq(Ademe.class))).thenReturn(ademe);
        when(dpeAdemeRepository.save(dpeAdeme)).thenReturn(dpeAdeme);

        DpeAdeme result = dpeAdemeService.getDpeByUrl(Constants.ADEME_URL, "12345");
        assertEquals(dpeAdeme, result);
    }

    // Ajoutez plus de tests pour couvrir d'autres cas d'erreur et la méthode getDpeNeuf
}
