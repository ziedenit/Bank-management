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
            Thread.currentThread().interrupt();
            return ResponseEntity.status(500).body(null);
        } catch (ExecutionException ee) {
            commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().error("ExecutionException: ", ee);
            return ResponseEntity.status(500).body(null);
        } catch (DpeAdemeNotFoundException ademeE) {
            // Si DpeAdemeNotFoundException est levée par getDpe, appeler getDpeNeuf
            try {
                DpeAdeme dpeAdemeNeuf = dpeAdemeService.getDpeNeuf(numDpe);
                return ResponseEntity.ok(dpeAdemeNeuf);
            } catch (Exception e) {
                return ResponseEntity.status(500).body(null);
            }
        }
    }
}
//
package com.cl.msofd.controller;

import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.service.DpeAdemeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AdemeControllerTest {

    private MockMvc mockMvc;

    @Mock
    private DpeAdemeService dpeAdemeService;

    @InjectMocks
    private AdemeController ademeController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(ademeController).build();
    }

    @Test
    public void testGetDpe_Success() throws Exception {
        DpeAdeme dpeAdeme = new DpeAdeme(); // Create a dummy DpeAdeme object

        given(dpeAdemeService.getDpe(anyString())).willReturn(dpeAdeme);

        mockMvc.perform(get("/api/v1/ademe/dpe/{numDpe}", "12345"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetDpe_NotFound() throws Exception {
        given(dpeAdemeService.getDpe(anyString())).willThrow(new DpeAdemeNotFoundException("Not found"));

        DpeAdeme dpeAdemeNeuf = new DpeAdeme(); // Create a dummy DpeAdemeNeuf object
        given(dpeAdemeService.getDpeNeuf(anyString())).willReturn(dpeAdemeNeuf);

        mockMvc.perform(get("/api/v1/ademe/dpe/{numDpe}", "12345"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetDpe_InternalServerError() throws Exception {
        given(dpeAdemeService.getDpe(anyString())).willThrow(new ExecutionException("Execution error", new Throwable()));

        mockMvc.perform(get("/api/v1/ademe/dpe/{numDpe}", "12345"))
                .andExpect(status().isInternalServerError());
    }
}
