package com.cl.msofd.controller;

import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import com.cl.msofd.model.ClientParticulier;
import com.cl.msofd.service.ClientService;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import com.cl.msofd.exception.ErrorResponse;

@RestController
@RequestMapping("/api/v1")
public class ClientController {
    @Resource
    private ClientService clientService;
    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(ClientController.class);

    

    
    @Operation(description = "returns the name, first name and date of birth of particular client")
    @ApiResponses(value = {
    		
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "404", description = "Not Found",content = @Content(schema = @Schema(implementation =ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized",content = @Content(schema = @Schema())),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content(schema = @Schema(implementation =ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation =ErrorResponse.class))),
    }) 
    
    @GetMapping("clients/particulier/{idReper}")
    public ResponseEntity<ClientParticulier> getClient(
    		@Parameter(description = "unique client identifier", required = true)
    		@PathVariable(value = "idReper") String idReper) throws IOException, ExecutionException, InterruptedException {

        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("getClient Particulier ayant l'id : {}", idReper);
        ClientParticulier clientByIdReper = clientService.getClient(idReper);
        return ResponseEntity.ok(clientByIdReper);
    }
}
//
package com.cl.msofd.service;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.clients.ClientResponse;
import com.cl.msofd.clients.Error;
import com.cl.msofd.model.ClientParticulier;
import com.cl.msofd.utility.JSONUtilOFD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ClientService {
    public static final String AUTHORIZATION = "Authorization";

    @Autowired
    private HttpClient httpClient;

    @Autowired
    private JSONUtilOFD jsonUtils;

    @Value("${referentiel.personne.url}")
    String referentielPersonne;


    public ClientParticulier getClient(String idReper) throws IOException, InterruptedException, ExecutionException , ClientNotFoundException {
        String url = String.format(referentielPersonne, idReper).concat("&person_type=INDIVIDUAL");
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header(AUTHORIZATION, jsonUtils.basicAuthReferentiel())
                .build();

        CompletableFuture<HttpResponse<String>> response = httpClient.sendAsync(request, BodyHandlers.ofString());
        HttpResponse<String> httpResponse = response.get();
        String responseBody = httpResponse.body();

        
        // Vérifiez si la réponse est un tableau d'erreurs
        if (httpResponse.statusCode() != 200 || responseBody.startsWith("[")) {
            // Parsez le tableau d'erreurs
            ObjectMapper objectMapper = new ObjectMapper();
            Error[] errors = objectMapper.readValue(responseBody, Error[].class);
            for (Error error : errors) {
                if (error.getCode().equals("B801")) {
                    throw new ClientNotFoundException(error.getMessage());
                }
            }
        }

        ClientResponse personDetails = jsonUtils.covertFromJsonToObject(responseBody, ClientResponse.class);
        if (personDetails == null) {
            throw new ClientNotFoundException("Client not found");
        }
        return ClientParticulier.builder()
                .idReper(personDetails.getEntrepriseDetails().getPersonId())
                .nomUsageClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getUsualLastName())
                .prenomClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getFirstName())
                .dateNaissanceClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getBirthDate())
                .civility(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getCivility().getLabel())
                .build();
    }
}
//

package com.cl.msofd.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ClientParticulier implements Serializable {

    private static final long serialVersionUID = 1L;

    private String idReper;

    private String nomUsageClient;

    private String prenomClient;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private java.sql.Date dateNaissanceClient;

    private String civility;
}


// par analogie example de class de test 
package com.cl.msofd.controller;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientEntreprise;
import com.cl.msofd.service.EntrepriseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class EntrepriseControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private EntrepriseService entrepriseService;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testGetClient_Success() throws Exception {
        ClientEntreprise clientEntreprise = ClientEntreprise.builder()
                .idReper("123")
                .typePerson("LEGAL_PERSON")
                .siren("123456789")
                .legalName("Test Legal Name")
                .firstName("John")
                .usuaLastName("Doe")
                .civilite("Mr.")
                .build();

        when(entrepriseService.getClient(anyString())).thenReturn(clientEntreprise);

        mockMvc.perform(get("/api/v1/clients/entreprise/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"idReper\":\"123\",\"typePerson\":\"LEGAL_PERSON\",\"siren\":\"123456789\",\"legalName\":\"Test Legal Name\",\"usuaLastName\":\"Doe\",\"firstName\":\"John\",\"civilite\":\"Mr.\"}"));
    }

    @Test
    public void testGetClient_NotFound() throws Exception {
        when(entrepriseService.getClient(anyString())).thenThrow(new ClientNotFoundException("Client not found"));

        mockMvc.perform(get("/api/v1/clients/entreprise/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }


}
je veux creer une classe de test pour le controlleur si dessus 
