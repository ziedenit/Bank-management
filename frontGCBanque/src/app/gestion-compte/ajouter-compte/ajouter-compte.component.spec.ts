@Test
    public void testSerializationDeserialization() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        Financement financement = new Financement();
        financement.setIdFinancement("testId");
        financement.setObjetFinancement(new ArrayList<>());  // Ajoutez des objets `ObjetFinancement` si nécessaire
        financement.setAlignement(new Alignement());
        financement.setEligibilite(new Eligibilite());
        financement.setIntervenant(new Intervenant());
        financement.setIndicateurFinancementDedie("dedicated");
        financement.setIndicateurNatureDurable("durable");
        financement.setTypeRisqueClimatiqueAttenue("climaticRisk");
        financement.setCodeApplicatifOrigine("01");
        financement.setIndicateurReprise(true);
        financement.setStatut(1);
        financement.setAgenceCompte("1234567890123456");
        financement.setValeurTravaux(1000.0);

        // Serialization
        String jsonString = objectMapper.writeValueAsString(financement);
        System.out.println(jsonString);

        // Deserialization
        Financement deserializedFinancement = objectMapper.readValue(jsonString, Financement.class);
        assertEquals(financement, deserializedFinancement);
    }
