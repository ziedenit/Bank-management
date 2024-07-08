package com.cl.msofd.service;

import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import com.cl.msofd.exception.DpeAdemeExistingException;
import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.Ademe;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.repository.DpeAdemeRepository;
import com.cl.msofd.repository.DpeAdemeRepositoryCustom;
import com.cl.msofd.utility.Constants;
import com.cl.msofd.utility.JSONUtilOFD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class DpeAdemeService {

    @Autowired
    private DpeAdemeRepository dpeAdemeRepository;

    @Autowired
    private DpeAdemeRepositoryCustom dpeAdemeRepositoryCustom;

    @Autowired
    private HttpClient ademeHttpClient;

    @Autowired
    private JSONUtilOFD jsonUtils;

    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(DpeAdemeService.class);

    public DpeAdeme create(DpeAdeme dpeAdeme) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("create dpeAdeme : {}", dpeAdeme);
        Optional<DpeAdeme> existingDpe = dpeAdemeRepositoryCustom.findByNumDpe(dpeAdeme.getNumDpe());
        return (DpeAdeme) existingDpe.map(dpe -> {
            throw new DpeAdemeExistingException(String.format("le numéro DPE %s est déjà créé ", dpeAdeme.getNumDpe()));
        }).orElseGet(() -> dpeAdemeRepository.save(dpeAdeme));
    }

    public DpeAdeme getDpe(String numDpe) throws ExecutionException, InterruptedException, IOException {
        return getDpeByUrl(Constants.ADEME_URL, numDpe);
    }

    public DpeAdeme getDpeNeuf(String numDpe) throws ExecutionException, InterruptedException, IOException {
        return getDpeByUrl(Constants.URL_NEUF, numDpe);
    }

    private DpeAdeme getDpeByUrl(String urlPrefix, String numDpe) throws ExecutionException, InterruptedException, IOException {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("OFD : Requête Ademe numéro DPE : {}", numDpe);
        String url = urlPrefix + numDpe;
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).build();
        CompletableFuture<HttpResponse<String>> response = ademeHttpClient.sendAsync(request, BodyHandlers.ofString());
        Ademe ademe = jsonUtils.covertFromJsonToObject(response.get().body(), Ademe.class);
        if (!ademe.getResults().isEmpty()) {
            DpeAdeme dpeAdeme = ademe.getResults().get(0);
            if (dpeAdeme.getNumDpe().equals(numDpe)) {
                return dpeAdeme;
            }
            if (dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                dpeAdeme.setNumDpeRemplace(dpeAdeme.getNumDpe());
                dpeAdeme.setNumDpe(numDpe);
            }
            if (dpeAdeme.getNumDpe().equals(numDpe) || dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                return create(dpeAdeme);
            }
        }
        throw new DpeAdemeNotFoundException(String.format("Le DPE %s est inexistant", numDpe));
    }
}
//
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
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
        CompletableFuture<HttpResponse<String>> responseFuture = CompletableFuture.completedFuture(httpResponse);
        when(ademeHttpClient.sendAsync(any(), any())).thenReturn(responseFuture);
        when(jsonUtils.covertFromJsonToObject(any(), eq(Ademe.class))).thenReturn(ademe);

        DpeAdeme result = dpeAdemeService.getDpe("12345");
        assertEquals(dpeAdeme, result);
    }

    @Test
    void getDpe_whenDpeAdemeDoesNotExist_thenThrowDpeAdemeNotFoundException() throws Exception {
        Ademe ademe = new Ademe();
        ademe.setResults(List.of());

        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.body()).thenReturn("{\"results\": []}");
        CompletableFuture<HttpResponse<String>> responseFuture = CompletableFuture.completedFuture(httpResponse);
        when(ademeHttpClient.sendAsync(any(), any())).thenReturn(responseFuture);
        when(jsonUtils.covertFromJsonToObject(any(), eq(Ademe.class))).thenReturn(ademe);

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
        CompletableFuture<HttpResponse<String>> responseFuture = CompletableFuture.completedFuture(httpResponse);
        when(ademeHttpClient.sendAsync(any(), any())).thenReturn(responseFuture);
        when(jsonUtils.covertFromJsonToObject(any(), eq(Ademe.class))).thenReturn(ademe);
        when(dpeAdemeRepository.save(dpeAdeme)).thenReturn(dpeAdeme);

        DpeAdeme result = dpeAdemeService.getDpeByUrl(Constants.ADEME_URL, "12345");
        assertEquals(dpeAdeme, result);
    }

    // Ajoutez plus de tests pour couvrir d'autres cas d'erreur et la méthode getDpeNeuf
}
