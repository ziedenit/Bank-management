j'ai Cannot resolve method 'newBuilder' in 'HttpResponse' pour cette partie du code

 HttpResponse<String> httpResponse = HttpResponse.newBuilder()
                .statusCode(404)
                .body(responseBody)
                .build();
