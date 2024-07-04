 @Test
    void should_return_ClientEntreprise_for_LEGAL_PERSON() throws Exception {
        // Create and populate a mock ClientResponse object
        ClientResponse clientResponse = new ClientResponse();
        
        // Set up necessary fields and nested objects
        ClientResponse.EntrepriseDetails entrepriseDetails = new ClientResponse.EntrepriseDetails();
        entrepriseDetails.setPersonType("LEGAL_PERSON");
        entrepriseDetails.setPersonId("12345");
        
        DescriptiveCompany casaData = new DescriptiveCompany();
        casaData.setSiren("123456789");
        casaData.setLegalName("Mock Company");
        entrepriseDetails.setCasaData(casaData);
        
        ClientResponse.Representative representative = new ClientResponse.Representative();
        representative.setFirstName("John");
        representative.setUsualLastName("Doe");
        
        Civility civility = new Civility();
        civility.setLabel("Mr.");
        representative.setCivility(civility);
        
        entrepriseDetails.setRepresentativesLegals(Collections.singletonList(representative));
        clientResponse.setEntrepriseDetails(entrepriseDetails);

        // Convert to JSON and mock HttpResponse
        String responseBody = new ObjectMapper().writeValueAsString(clientResponse);
        HttpResponse<String> httpResponse = Mockito.mock(HttpResponse.class);
        when(httpResponse.statusCode()).thenReturn(200);
        when(httpResponse.body()).thenReturn(responseBody);

        // Mock HttpClient response
        CompletableFuture<HttpResponse<String>> response = CompletableFuture.completedFuture(httpResponse);
        when(httpClient.sendAsync(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()))
                .thenReturn(response);

        // Mock JSON utility method
        when(jsonUtils.covertFromJsonToObject(responseBody, ClientResponse.class)).thenReturn(clientResponse);

        // Expected result
        ClientEntreprise expectedClient = ClientEntreprise.builder()
                .idReper("12345")
                .typePerson("LEGAL_PERSON")
                .siren("123456789")
                .legalName("Mock Company")
                .firstName("John")
                .usuaLastName("Doe")
                .civilite("Mr.")
                .build();

        // Actual result
        ClientEntreprise actualClient = entrepriseService.getClient("12345");

        // Assertion
        assertThat(actualClient).isEqualTo(expectedClient);
    }
