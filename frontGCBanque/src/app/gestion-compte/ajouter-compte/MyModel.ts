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
    private String referentielPersonne;


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
//
package com.cl.msofd.clients;

import java.io.Serializable;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@JsonIgnoreProperties(ignoreUnknown=true)
public class ClientDetails  implements Serializable {
	private static final long serialVersionUID = 1L;
	  @JsonProperty("person_type")
	    private String personType;
	  
	  @JsonProperty("person_id")
	    private String personId;
	    	    
	  @JsonProperty("descriptive_individual")
	    private DescriptiveIndividual descriptiveIndividual;
     
      @JsonProperty("casa_data")
       private DescriptiveCompany casaData;
      
      @JsonProperty("representatives_legals")
      private List <DescriptiveIndividual>  representativesLegals;
     
}
//
package com.cl.msofd.clients;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@JsonIgnoreProperties(ignoreUnknown=true)
public class DescriptiveIndividual implements Serializable {
	
	
    @JsonProperty("usual_last_name")
    private String usualLastName;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("civility")
    private Civility civility;
    
    @JsonProperty("birth_date")
    private java.sql.Date birthDate;

}
//
package com.cl.msofd.clients;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@JsonIgnoreProperties(ignoreUnknown=true)
public class Civility implements Serializable {
    private int code;
    private String label;
}
//
package com.cl.msofd.clients;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@JsonIgnoreProperties(ignoreUnknown=true)
public class DescriptiveCompany implements Serializable {

	@JsonProperty("siren")
    private String siren;
	
	@JsonProperty("legal_name")
    private String legalName;

}

//
package com.cl.msofd.clients;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@JsonIgnoreProperties(ignoreUnknown=true)
public class DescriptiveIndividual implements Serializable {
	
	
    @JsonProperty("usual_last_name")
    private String usualLastName;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("civility")
    private Civility civility;
    
    @JsonProperty("birth_date")
    private java.sql.Date birthDate;

}

Bonjour je veux creer une classe de test pour le service ci dessus sanchant que je dois mocker referentielPersonne merc 


