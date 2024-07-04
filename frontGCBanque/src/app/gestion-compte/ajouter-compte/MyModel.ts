
    @Test
    void should_return_ClientEntreprise_for_LEGAL_PERSON() throws Exception {
        ClientDetails clientDetails = new ClientDetails();
        clientDetails.setPersonType("LEGAL_PERSON");
        clientDetails.setPersonId("12345");
        clientDetails.setCasaData(new DescriptiveCompany("123456789", "Mock Company"));
        DescriptiveIndividual representative = new DescriptiveIndividual();
        representative.setFirstName("John");
        representative.setUsualLastName("Doe");
        representative.setCivility(new Civility());
        clientDetails.setRepresentativesLegals(Collections.singletonList(representative));

        ClientResponse clientResponse = new ClientResponse();
        clientResponse.setEntrepriseDetails(clientDetails);

        String responseBody = new ObjectMapper().writeValueAsString(clientResponse);
        HttpResponse<String> httpResponse = mock(HttpResponse.class);
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
                .civilite(representative.getCivility().getLabel())
                .build();

        ClientEntreprise actualClient = entrepriseService.getClient("12345");

        assertThat(actualClient).isEqualTo(expectedClient);
    }
