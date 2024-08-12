@Test
void should_patch_existing_financement_par_champs() throws Exception {
    mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

    Dpe dpeActuel = Dpe.builder()
            .classeCep("A")
            .classeGes("C")
            .estimationCep(60.0)
            .estimationGes(80.0)
            .numeroDpe("DDD7E1287825F")
            .build();

    Bien bien = Bien.builder()
            .bienFinanceLCL(true)
            .codeBatiment("00001")
            .typeBatiment("Appartement")
            .codePostal("75016")
            .surfaceBien(79.0)
            .anneeConstruction(2000)
            .dpeActuel(dpeActuel)
            .montantFinanceLCL(900000.00)
            .build();

    List<Garantie> listGarantie = new ArrayList<>();
    Garantie garantie = Garantie.builder()
            .idGarantie("G12345678")
            .bien(bien)
            .build();
    listGarantie.add(garantie);

    ObjetFinancement object = ObjetFinancement.builder()
            .idObjetFinancement("O12345678")
            .codeObjetFinancement("02")
            .quotePartObjet(100.0)
            .bien(bien)
            .garantie(listGarantie)
            .build();

    List<String> idRepers = new ArrayList<>();
    idRepers.add("8415595180");
    Intervenant intervenant = Intervenant.builder()
            .idReper(idRepers)
            .build();
    ArrayList<ObjetFinancement> listObjets = new ArrayList<>();
    listObjets.add(object);

    Financement financementExistant = Financement.builder()
            .idFinancement("F12345670")
            .objetFinancement(listObjets)
            .intervenant(intervenant)
            .build();

    Financement createdFiancement = financementService.createFinancement(financementExistant);

    Dpe dpeAct = Dpe.builder()
            .classeCep("A")
            .estimationCep(60.0)
            .build();

    Bien bienObjet = Bien.builder()
            .codePostal("75018")
            .surfaceBien(120.0)
            .dpeActuel(dpeAct)
            .build();

    ObjetFinancement objectFinancement = ObjetFinancement.builder()
            .idObjetFinancement("O12345678")
            .codeObjetFinancement("02")
            .quotePartObjet(100.0)
            .bien(bienObjet)
            .build();
    ArrayList<ObjetFinancement> listObjetsTest = new ArrayList<>();
    listObjetsTest.add(objectFinancement);

    Financement patchedFinancement = Financement.builder()
            .indicateurFinancementDedie("Y")
            .alignement(Alignement.builder()
                    .topAlignement("01")
                    .topAlignementXtra("06")
                    .build())
            .objetFinancement(listObjetsTest)
            .build();

    MvcResult result = mockMvc.perform(patch("/api/v1/financement/champs/" + createdFiancement.getIdFinancement())
                    .content(asJsonString(patchedFinancement))
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();

    JSONObject jsonObject = new JSONObject(result.getResponse().getContentAsString());
    assertNotNull(jsonObject.getString("objetFinancement"));
    assertNotNull(jsonObject.getString("alignement"));
    assertNotNull(jsonObject.getString("indicateurFinancementDedie"));
    
    // Assertion pour vérifier la valeur de topAlignementXtra
    JSONObject alignement = jsonObject.getJSONObject("alignement");
    assertEquals("06", alignement.getString("topAlignementXtra"));
}
