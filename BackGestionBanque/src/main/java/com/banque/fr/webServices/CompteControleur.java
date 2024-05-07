public DpeAdeme getDpe(String numDpe) throws ExecutionException, InterruptedException, IOException {

        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("OFD : Requête Ademe numéro DPE : {}", numDpe);

        String url = Constants.ADEME_URL + numDpe;

        HttpRequest request = HttpRequest.
                newBuilder()
                .uri(URI.create(url))
                .build();

        CompletableFuture<HttpResponse<String>> response = ademeHttpClient.sendAsync(request, BodyHandlers.ofString());
        Ademe ademe = jsonUtils.covertFromJsonToObject(response.get().body(), Ademe.class);

        if (!ademe.getResults().isEmpty()) {

            DpeAdeme dpeAdeme = ademe.getResults().get(0);

            if (dpeAdeme.getNumDpe().equals(numDpe)) {
                return dpeAdeme;
            }

            if (dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                dpeAdeme.setNumDpeRemplace(dpeAdeme.getNumDpe());
                dpeAdeme.setNumDpe(numDpe);
            }
            if (dpeAdeme.getNumDpe().equals(numDpe) || dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                 dpeAdemePersist = create(dpeAdeme);

            }
            return dpeAdemePersist;
        } else {
            throw new DpeAdemeNotFoundException(String.format("Le DPE %s est inexistant", numDpe));
        }
    }
    
    
 
    
    public DpeAdeme getDpeNeuf(String numDpe) throws ExecutionException, InterruptedException, IOException {

        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("OFD : Requête Ademe numéro DPE : {}", numDpe);

        String url = Constants.URL_NEUF + numDpe;

        HttpRequest request = HttpRequest.
                newBuilder()
                .uri(URI.create(url))
                .build();
       
        CompletableFuture<HttpResponse<String>> response = ademeHttpClient.sendAsync(request, BodyHandlers.ofString());
        Ademe ademe = jsonUtils.covertFromJsonToObject(response.get().body(), Ademe.class);

        if (!ademe.getResults().isEmpty()) {

            DpeAdeme dpeAdeme = ademe.getResults().get(0);

            if (dpeAdeme.getNumDpe().equals(numDpe)) {
                return dpeAdeme;
            }

            if (dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                dpeAdeme.setNumDpeRemplace(dpeAdeme.getNumDpe());
                dpeAdeme.setNumDpe(numDpe);
            }
            if (dpeAdeme.getNumDpe().equals(numDpe) || dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                 dpeAdemePersist = create(dpeAdeme);

            }
            return dpeAdemePersist;
        } else {
            throw new DpeAdemeNotFoundException(String.format("Le DPE %s est inexistant", numDpe));
        }
    }
       
}
