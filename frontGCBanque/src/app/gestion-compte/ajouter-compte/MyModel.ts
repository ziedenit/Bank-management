  @Test
    void should_return_ClientEntreprise_for_LEGAL_PERSON() throws Exception {
        // Create and populate a mock ClientResponse object
        ClientResponse clientResponse = new ClientResponse();
        EntrepriseDetails entrepriseDetails = new EntrepriseDetails();
        entrepriseDetails.setPersonType("LEGAL_PERSON");
        entrepriseDetails.setPersonId("12345");
        entrepriseDetails.setCasaData(new CasaData("123456789", "Mock Company"));

        Representative representative = new Representative();
        representative.setFirstName("John");
        representative.setUsualLastName("Doe");
        Civility civility = new Civility();
        civility.setLabel("Mr.");
        representative.setCivility(civility);

        entrepriseDetails.setRepresentativesLegals(Collections.singletonList(representative));
        clientResponse.setEntrepriseDetails(entrepriseDetails);

        String responseBody = new ObjectMapper().writeValueAsString(clientResponse);
        HttpResponse<String> httpResponse = Mockito.mock(HttpResponse.class);
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
                .civilite("Mr.")
                .build();

        ClientEntreprise actualClient = entrepriseService.getClient("12345");

        assertThat(actualClient).isEqualTo(expectedClient);
    }
