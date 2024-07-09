@Test
public void testGetClient_InternalServerError() throws Exception {
    when(entrepriseService.getClient(anyString())).thenThrow(new RuntimeException("Internal server error"));

    mockMvc.perform(get("/api/v1/clients/entreprise/123")
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isInternalServerError())
            .andExpect(content().string("Internal server error"));  // Check that the response message matches the expected exception message
}
