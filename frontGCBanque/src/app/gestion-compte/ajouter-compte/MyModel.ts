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

je veux creer une classe de test pour ce controlleur qui utilise un proxy pour envoyer et recevoir les requette 
# ademe info
ademe.proxy.host=127.0.0.1
ademe.proxy.port=3128



