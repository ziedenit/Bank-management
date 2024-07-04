  @Test
    void should_return_ClientEntreprise_for_LEGAL_PERSON() throws Exception {
        ClientResponse clientResponse = new ClientResponse();
        clientResponse.getEntrepriseDetails().setPersonType("LEGAL_PERSON");
        clientResponse.getEntrepriseDetails().setPersonId("12345");
        clientResponse.getEntrepriseDetails().setCasaData(new DescriptiveCompany("123456789", "Mock Company"));

        clientResponse.getEntrepriseDetails().getRepresentativesLegals().get(0).setFirstName("John");
        clientResponse.getEntrepriseDetails().getRepresentativesLegals().get(0).setUsualLastName("Doe");
        clientResponse.getEntrepriseDetails().getRepresentativesLegals().get(0).setCivility(new Civility());
        clientResponse.getEntrepriseDetails().setRepresentativesLegals(Collections.singletonList( clientResponse.getEntrepriseDetails().getRepresentativesLegals().get(0)));
        clientResponse.setEntrepriseDetails(clientResponse.getEntrepriseDetails());

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
                .build();

        ClientEntreprise actualClient = entrepriseService.getClient("12345");

        assertThat(actualClient).isEqualTo(expectedClient);
    }
//

time=2024-07-04T11:47:53.474+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Started EntrepriseServiceTest in 15.637 seconds (process running for 18.202)

java.lang.NullPointerException: Cannot invoke "com.cl.msofd.clients.ClientDetails.setPersonType(String)" because the return value of "com.cl.msofd.clients.ClientResponse.getEntrepriseDetails()" is null

	at com.cl.msofd.service.EntrepriseServiceTest.should_return_ClientEntreprise_for_LEGAL_PERSON(EntrepriseServiceTest.java:54)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)

