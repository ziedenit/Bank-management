   @Test
    void should_call_and_return_dpe_from_ademe_public_service() throws Exception {
        Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 3128));
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setProxy(proxy);
        RestTemplate restTemplate = new RestTemplate(requestFactory);
        String url = "http://localhost:8081/api/v1/ademe/dpe/2095V1001813O";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        // Vérifiez le statut de la réponse et le contenu si nécessaire
        assertEquals(200, response.getStatusCodeValue());
        // ...
    }
