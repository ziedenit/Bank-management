package com.cl.msofd.controller;

import com.cl.msofd.exception.ErrorResponse;
import com.cl.msofd.model.ClientEntreprise;
import com.cl.msofd.service.EntrepriseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import java.io.IOException;
import java.util.concurrent.ExecutionException;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/v1")
public class EntrepriseController{

    @Autowired
    private EntrepriseService entrepriseService;

    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(EntrepriseController.class);
    
    @Operation(description = "returns the legal_name and siren of professional and business client")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "404", description = "Not Found",content = @Content(schema = @Schema(implementation =ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized",content = @Content(schema = @Schema())),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content(schema = @Schema(implementation =ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation =ErrorResponse.class))),
    })
    
    @GetMapping("/clients/entreprise/{idReper}")
    public ResponseEntity<ClientEntreprise> getClient(
    		@Parameter(description = "unique client identifier", required = true)
    		@PathVariable(value = "idReper") String idReper) throws IOException, ExecutionException, InterruptedException {
    	commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("getClient Entreprise ayant l'id : {}", idReper);
            ClientEntreprise entrepriseByIdReper = entrepriseService.getClient(idReper);
            return ResponseEntity.ok(entrepriseByIdReper);


    }
}	

je veux creer une classe de teste pour ce controlleur de la meme analogie que la classe de test du service que j'ai pour le moment 
    //
package com.cl.msofd.service;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.clients.*;
import com.cl.msofd.model.ClientEntreprise;
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
import com.cl.msofd.clients.Error;

@Service
public class EntrepriseService {

    public static final String AUTHORIZATION = "Authorization";

    @Autowired
    private HttpClient httpClient;

    @Autowired
    private JSONUtilOFD jsonUtils;

    @Value("${referentiel.personne.url}")
    private String referentielPersonne;

    public ClientEntreprise getClient(String idReper) throws IOException, InterruptedException, ExecutionException {

        String url = String.format(referentielPersonne, idReper).concat("&person_type=INDIVIDUAL_COMPANY");
        ClientEntreprise rep = null;
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

            // Vérifiez si l'erreur est due à un ID reper inconnu
            for (Error error : errors) {
                if (error.getCode().equals("B801")) {
                    throw new ClientNotFoundException(error.getMessage());
                }
            }
        }

     // Si aucune erreur n'est détectée, continuez le traitement normalement
        ClientResponse personDetails = jsonUtils.covertFromJsonToObject(responseBody, ClientResponse.class);
        if (personDetails == null) {
            throw new ClientNotFoundException("Client not found");
        }

        String typePersonne = personDetails.getEntrepriseDetails().getPersonType();

        if (typePersonne == null) {
            throw new ClientNotFoundException("Client not found");
        } else if (typePersonne.equals("LEGAL_PERSON")) { 
        	// si entreprise==> raison social, siren, civilite, nom,prenom 
            rep = ClientEntreprise.builder()
                    .idReper(personDetails.getEntrepriseDetails().getPersonId())
                    .typePerson(typePersonne)
                    
                    .siren(personDetails.getEntrepriseDetails().getCasaData().getSiren())
                    .legalName(personDetails.getEntrepriseDetails().getCasaData().getLegalName())
                    .firstName(personDetails.getEntrepriseDetails().getRepresentativesLegals().get(0).getFirstName())
                    .usuaLastName(personDetails.getEntrepriseDetails().getRepresentativesLegals().get(0).getUsualLastName())
                    .civilite(personDetails.getEntrepriseDetails().getRepresentativesLegals().get(0).getCivility().getLabel())
                    .build();
            
            
        } else if (typePersonne.equals("INDIVIDUAL_COMPANY")) {
        	// si INDIVIDUAL_COMPANY ==> siren, civilite, nom,prenom 
            rep = ClientEntreprise.builder()
                    .idReper(personDetails.getEntrepriseDetails().getPersonId())
                    .typePerson(typePersonne)
                    
                    .siren(personDetails.getEntrepriseDetails().getCasaData().getSiren())
                    .legalName(personDetails.getEntrepriseDetails().getCasaData().getLegalName())
                    .usuaLastName(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getUsualLastName())
                    .firstName(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getFirstName())
                    .civilite(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getCivility().getLabel())
                    .build();
        }
        return rep;
    }
}
//
classe de test service que j'ai package com.cl.msofd.service;

import com.cl.msofd.clients.*;
import com.cl.msofd.clients.Error;
import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientEntreprise;
import com.cl.msofd.utility.JSONUtilOFD;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Collections;
import java.util.concurrent.CompletableFuture;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class EntrepriseServiceTest {

    @Autowired
    private EntrepriseService entrepriseService;

    @MockBean(name = "httpClient")
    private HttpClient httpClient;

    @MockBean
    private JSONUtilOFD jsonUtils;


    @BeforeEach
    void setUp() {
        Mockito.when(jsonUtils.basicAuthReferentiel()).thenReturn("Basic Auth");
    }

    @Test
    void should_return_ClientEntreprise_for_LEGAL_PERSON() throws Exception {
        ClientDetails clientDetails = new ClientDetails();
        clientDetails.setPersonType("LEGAL_PERSON");
        clientDetails.setPersonId("12345");
        clientDetails.setCasaData(new DescriptiveCompany("123456789", "Mock Company"));
        DescriptiveIndividual representative = new DescriptiveIndividual();
        representative.setFirstName("John");
        representative.setUsualLastName("Doe");
        representative.setCivility(new Civility());
        clientDetails.setRepresentativesLegals(Collections.singletonList(representative));

        ClientResponse clientResponse = new ClientResponse();
        clientResponse.setEntrepriseDetails(clientDetails);

        String responseBody = new ObjectMapper().writeValueAsString(clientResponse);
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn(responseBody);

        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        when(jsonUtils.covertFromJsonToObject(responseBody, ClientResponse.class)).thenReturn(clientResponse);

        ClientEntreprise expectedClient = ClientEntreprise.builder()
                .idReper("12345")
                .typePerson("LEGAL_PERSON")
                .siren("123456789")
                .legalName("Mock Company")
                .firstName("John")
                .usuaLastName("Doe")
                .civilite(representative.getCivility().getLabel())
                .build();

        ClientEntreprise actualClient = entrepriseService.getClient("12345");

        assertThat(actualClient.getLegalName()).isEqualTo("Mock Company");
    }

    @Test
    void should_throw_ClientNotFoundException_for_unknown_id() throws Exception {
        // Mock the HttpClient response with an error
        Error error = new Error();
        error.setCode("B801");
        error.setMessage("Client not found");
        Error[] errors = {error};
        String errorResponse = new ObjectMapper().writeValueAsString(errors);

        HttpResponse<String> httpResponse = mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(404);
        when(httpResponse.body()).thenReturn(errorResponse);

        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        assertThatThrownBy(() -> entrepriseService.getClient("unknownId"))
                .isInstanceOf(ClientNotFoundException.class)
                .hasMessage("Client not found");
    }

}/
merci de me fournier une classe de test pour le controlleur 
//
package com.cl.msofd.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientEntreprise implements Serializable {
    private static final long serialVersionUID = 1L;

    private String idReper;
    private String typePerson;

    private String siren;
    private String legalName;

    private String usuaLastName;
    private String firstName;
    private String civilite;

}
