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

        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("getDpeAdeme : {}", numDpe);

        try {
            DpeAdeme dpeAdeme = dpeAdemeService.getDpe(numDpe);
            return ResponseEntity.ok(dpeAdeme);
        } catch (InterruptedException ie) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().error("InterruptedException: ", ie);
            Thread.currentThread().interrupt();  // Réinterrompre le thread
            return ResponseEntity.status(500).body(null);
        } catch (ExecutionException ee) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().error("ExecutionException: ", ee);
            return ResponseEntity.status(500).body(null);
        } catch (DpeAdemeNotFoundException ademeE) {
            try {
                DpeAdeme dpeAdemeNeuf = dpeAdemeService.getDpeNeuf(numDpe);
                return ResponseEntity.ok(dpeAdemeNeuf);
            } catch (Exception e) {
                 if (e instanceof InterruptedException) {
                    Thread.currentThread().interrupt();
                }
                commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().error("Exception: ", e);
                return ResponseEntity.status(500).body(null);
            }
        }
    }
}
je veux modifier ce controlleur pour faire appel a ce deux aussi dans ce controlleur apres l'appel   DpeAdeme dpeAdemeNeuf = dpeAdemeService.getDpeNeuf(numDpe);
    public DpeAdeme getDpeNeufTertiaire(String numDpe) throws ExecutionException, InterruptedException, IOException {
        return getDpeByUrl(Constants.ADEME_URL_Tertiaire_Neuf, numDpe);
    }
    
    public DpeAdeme getDpeAncienTertiaire(String numDpe) throws ExecutionException, InterruptedException, IOException {
        return getDpeByUrl(Constants.ADEME_URL_Tertiaire_Ancien, numDpe);
    }
