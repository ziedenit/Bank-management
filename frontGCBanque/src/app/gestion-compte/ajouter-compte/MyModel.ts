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
            throw new DpeAdemeExistingException(String.format("le numéro DPE %s est déja crée ", dpeAdeme.getNumDpe()));
        }).orElseGet(() -> dpeAdemeRepository.save(dpeAdeme));
    }
    public DpeAdeme getDpe(String numDpe) throws ExecutionException, InterruptedException, IOException {
        DpeAdeme dpeAdemePersist = null;
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("OFD : Requête Ademe numéro DPE : {}", numDpe);
        String url = Constants.ADEME_URL + numDpe;
        HttpRequest request = HttpRequest.
                newBuilder()
                .uri(URI.create(url))
                .build();
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
                 dpeAdemePersist = create(dpeAdeme);
            }
            return dpeAdemePersist;
        } else {
            throw new DpeAdemeNotFoundException(String.format("Le DPE %s est inexistant", numDpe));
        }
    }
    
    
 
    
    public DpeAdeme getDpeNeuf(String numDpe) throws ExecutionException, InterruptedException, IOException {
   DpeAdeme dpeAdemePersistNeuf = null;
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("OFD : Requête Ademe numéro DPE : {}", numDpe);
        String url = Constants.URL_NEUF + numDpe;
        HttpRequest request = HttpRequest.
                newBuilder()
                .uri(URI.create(url))
                .build();
       
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
                dpeAdemePersistNeuf = create(dpeAdeme);
            }
            return dpeAdemePersistNeuf;
        } else {
            throw new DpeAdemeNotFoundException(String.format("Le DPE %s est inexistant", numDpe));
        }
    }
       
}
//
package com.cl.msofd.controller;

import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.exception.ErrorResponse;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.service.DpeAdemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/v1")
public class AdemeController {


    @Resource
    private DpeAdemeService dpeAdemeService;

    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(AdemeController.class);


    @Operation(summary = "Get ademe dpe", description = "Returns a dpe object retrieved from the ademe API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })

    @GetMapping("ademe/dpe/{numDpe}")
    public ResponseEntity<DpeAdeme> getDpe(
            @Parameter(description = "ademe number = dpe number: unique identifier for each dpe document", required = true)
            @PathVariable(value = "numDpe") String numDpe) throws IOException, ExecutionException, InterruptedException {
        ResponseEntity<DpeAdeme> responseEntity = ResponseEntity.noContent().build();
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("getDpeAdeme : {}", numDpe);

        try {
            DpeAdeme dpeAdeme = dpeAdemeService.getDpe(numDpe);
            responseEntity = ResponseEntity.ok(dpeAdeme);
            return responseEntity;
        } catch (InterruptedException ie) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().error("InterruptedException: ", ie);
            Thread.currentThread().interrupt();
        } catch (ExecutionException ee) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().error("ExecutionException: ", ee);
        } catch (DpeAdemeNotFoundException ademeE) {
            // Si DpeAdemeNotFoundException est levée par getDpe, appeler getDpeNeuf
            DpeAdeme dpeAdemeNeuf = dpeAdemeService.getDpeNeuf(numDpe);
            responseEntity = ResponseEntity.ok(dpeAdemeNeuf);
            return responseEntity;
        }

        return responseEntity;
    }
}
//
je veux tester le service et el controlleur si dessussachant que l'appel à l'ademe utilise sur un proxy qui doit etre mocké ok 
   voila le proxy utlisé 
   # ademe info
ademe.proxy.host=127.0.0.1
ademe.proxy.port=3128
