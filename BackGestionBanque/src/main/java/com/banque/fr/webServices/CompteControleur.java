    @Test
    void should_call_and_return_dpe_from_ademe_public_service() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        this.mockMvc.perform(get("api/v1/ademe/dpe/2095V1001813O"))
                .andExpect(status().isOk())
                .andDo(httpResult -> {
                    DpeAdeme result = objectMapper.readValue(httpResult.getResponse().getContentAsString(),
                            new TypeReference<DpeAdeme>() {
                            });
                });
    }



    # ademe info
    ademe.proxy.host=127.0.0.1
    ademe.proxy.port=3128
