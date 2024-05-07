import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.repository.DpeAdemeRepository;
import com.cl.msofd.repository.DpeAdemeRepositoryCustom;
import com.cl.msofd.utility.JSONUtilOFD;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.stubbing.Answer;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

public class DpeAdemeServiceTest {

    @Mock
    private DpeAdemeRepository dpeAdemeRepository;

    @Mock
    private DpeAdemeRepositoryCustom dpeAdemeRepositoryCustom;

    @Mock
    private JSONUtilOFD jsonUtils;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private DpeAdemeService dpeAdemeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        ReflectionTestUtils.setField(dpeAdemeService, "ademeHttpClient", restTemplate);
    }

    @Test
    public void testGetDpeWithProxy() throws ExecutionException, InterruptedException, IOException {
        String numDpe = "dummyNumDpe";
        String expectedUrl = Constants.ADEME_URL + numDpe;

        // Mock response from Ademe service
        DpeAdeme dpeAdeme = new DpeAdeme(); // Create a dummy DpeAdeme object
        String jsonBody = "{\"results\": [{\"numDpe\": \"" + numDpe + "\"}]}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> responseEntity = new HttpEntity<>(jsonBody, headers);
        ResponseEntity<String> responseEntityMock = new ResponseEntity<>(jsonBody, headers, HttpStatus.OK);

        // Mock RestTemplate behavior
        when(restTemplate.exchange(eq(expectedUrl), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class)))
                .thenReturn(responseEntityMock);

        // Mock JSONUtilOFD conversion
        when(jsonUtils.covertFromJsonToObject(eq(jsonBody), eq(DpeAdeme.class))).thenReturn(dpeAdeme);

        // Test the method
        DpeAdeme result = dpeAdemeService.getDpe(numDpe);

        // Verify the result
        assertEquals(dpeAdeme, result);
    }
}
