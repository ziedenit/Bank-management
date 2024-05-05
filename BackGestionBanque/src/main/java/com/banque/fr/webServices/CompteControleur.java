@Test
void should_call_and_return_dpe_from_ademe_public_service() throws Exception {
    Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 3128));
    SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
    requestFactory.setProxy(proxy);
    
    RestTemplate restTemplate = new RestTemplate(requestFactory);

    // Ajoutez les informations d'authentification Basic
    String username = "user1";
    String password = "user1Pass";
    String auth = username + ":" + password;
    byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
    String authHeader = "Basic " + new String(encodedAuth);
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", authHeader);
    HttpEntity<String> entity = new HttpEntity<>(headers);

    // Utilisez l'entité HTTP avec les en-têtes d'authentification
    String url = "http://localhost:8081/api/v1/ademe/dpe/2095V1001813O";
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

    // Vérifiez le statut de la réponse et le contenu si nécessaire
    assertEquals(HttpStatus.OK, response.getStatusCode());
    // ...
}
