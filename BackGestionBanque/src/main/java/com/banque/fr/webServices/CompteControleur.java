import org.junit.jupiter.api.Test;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MyApiTest {

    private final RestTemplate restTemplate;

    public MyApiTest() {
        // Configuration du proxy dans RestTemplate
        this.restTemplate = new RestTemplateBuilder()
                .proxy("127.0.0.1", 3128)
                .build();
    }

    @Test
    void testApiCallWithProxy() {
        String url = "http://example.com/api/v1/ademe/dpe/2095V1001813O";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        // Vérifiez le statut de la réponse et le contenu si nécessaire
        assertEquals(200, response.getStatusCodeValue());
        // ...
    }
}
