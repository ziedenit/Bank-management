public ClientParticulier getClient(String idReper) throws IOException, InterruptedException, ExecutionException, ClientNotFoundException {
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

    // Si aucune erreur n'est détectée, continuez le traitement normalement
    ClientResponse personDetails = jsonUtils.covertFromJsonToObject(responseBody, ClientResponse.class);
    if (personDetails == null || personDetails.getEntrepriseDetails() == null) {
        throw new ClientNotFoundException("Client not found");
    }

    // Construction de l'objet ClientParticulier à partir des détails du client
    return ClientParticulier.builder()
            .idReper(personDetails.getEntrepriseDetails().getPersonId())
            .nomUsageClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getUsualLastName())
            .prenomClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getFirstName())
            .dateNaissanceClient(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getBirthDate())
            .civility(personDetails.getEntrepriseDetails().getDescriptiveIndividual().getCivility().getLabel())
            .build();
}
//
@Test
void testGetClient_Success() throws IOException, InterruptedException, ExecutionException, ClientNotFoundException {
    // Mock des données de réponse de l'API
    ClientDetails clientDetails = ClientDetails.builder()
            .personId("12345")
            .descriptiveIndividual(DescriptiveIndividual.builder()
                    .usualLastName("Doe")
                    .firstName("John")
                    .birthDate(Date.valueOf("1990-01-01"))  // Date corrigée
                    .civility(new Civility("Mr"))
                    .build())
            .build();

    ClientResponse clientResponse = ClientResponse.builder()
            .entrepriseDetails(clientDetails)
            .build();

    // Mock des utils JSON
    when(jsonUtils.covertFromJsonToObject(anyString(), any())).thenReturn(clientResponse);

    // Création d'une réponse HTTP simulée
    HttpResponse<String> httpResponse = mock(HttpResponse.class);
    when(httpResponse.statusCode()).thenReturn(200);
    when(httpResponse.body()).thenReturn("{\"person_details\":{\"person_id\":\"12345\",\"descriptive_individual\":{\"usual_last_name\":\"Doe\",\"first_name\":\"John\",\"birth_date\":\"01/01/1990\",\"civility\":{\"label\":\"Mr\"}}}}");

    when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
            .thenReturn(CompletableFuture.completedFuture(httpResponse));

    // Test de la méthode getClient
    ClientParticulier clientParticulier = clientService.getClient("12345");

    assertEquals("12345", clientParticulier.getIdReper());
    assertEquals("Doe", clientParticulier.getNomUsageClient());
    assertEquals("John", clientParticulier.getPrenomClient());
    assertEquals(Date.valueOf("1990-01-01"), clientParticulier.getDateNaissanceClient());
    assertEquals("Mr", clientParticulier.getCivility());
}
//
@Test
void testGetClient_ClientNotFound() throws IOException, InterruptedException, ExecutionException {
    // Mock des données d'erreur de l'API
    Error error = new Error();
    error.setCode("B801");
    error.setMessage("Client not found");

    String responseBody = "[{\"code\":\"B801\",\"message\":\"Client not found\"}]";
    HttpResponse<String> httpResponse = mock(HttpResponse.class);
    when(httpResponse.statusCode()).thenReturn(404);
    when(httpResponse.body()).thenReturn(responseBody);

    when(httpClient.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
            .thenReturn(CompletableFuture.completedFuture(httpResponse));

    // Test de la méthode getClient en cas d'erreur
    assertThrows(ClientNotFoundException.class, () -> clientService.getClient("12345"));
}
