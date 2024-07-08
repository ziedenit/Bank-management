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
            // Si DpeAdemeNotFoundException est levée par getDpe, appeler getDpeNeuf
            try {
                DpeAdeme dpeAdemeNeuf = dpeAdemeService.getDpeNeuf(numDpe);
                return ResponseEntity.ok(dpeAdemeNeuf);
            } catch (Exception e) {
                // Si InterruptedException est capturée ici, réinterrompre le thread
                if (e instanceof InterruptedException) {
                    Thread.currentThread().interrupt();
                }
                commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().error("Exception: ", e);
                return ResponseEntity.status(500).body(null);
            }
        }
    }
}
