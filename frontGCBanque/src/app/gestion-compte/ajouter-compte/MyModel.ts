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
je veux creer une classe de teste pour ce controlleur EntrepriseController
