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
je veux faire une classe de test unitaire a ce service en se basant sur ce que je fait niveau controlleur ca je mock deja la reponse je prevoir la reponse car j'ai pas acces total a ca referentiel.personne.url 
