@Test
void should_patch_financement_champs() throws Exception {
    // Création du DPE initial
    Dpe dpeInitial = Dpe.builder()
            .classeCep("A")
            .classeGes("C")
            .estimationCep(60.0)
            .estimationGes(80.0)
            .numeroDpe("DDD7E1287825F")
            .build();

    // Création du Bien initial
    Bien bienInitial = Bien.builder()
            .bienFinanceLCL(true)
            .codeBatiment("00001")
            .typeBatiment("Appartement")
            .codePostal("75016")
            .surfaceBien(79.0)
            .anneeConstruction(2000)
            .dpeActuel(dpeInitial)
            .montantFinanceLCL(900000.00)
            .build();

    // Création de la Garantie initiale
    List<Garantie> listGarantieInitial = new ArrayList<>();
    Garantie garantieInitial = Garantie.builder()
            .idGarantie("G12345678")
            .bien(bienInitial)
            .build();
    listGarantieInitial.add(garantieInitial);

    // Création de l'ObjetFinancement initial
    ObjetFinancement objetInitial = ObjetFinancement.builder()
            .codeObjetFinancement("02")
            .quotePartObjet(100.0)
            .bien(bienInitial)
            .garantie(listGarantieInitial)
            .build();

    // Création de l'Intervenant initial
    List<String> idRepersInitial = new ArrayList<>();
    idRepersInitial.add("8415595180");
    Intervenant intervenantInitial = Intervenant.builder()
            .idReper(idRepersInitial)
            .build();

    // Création de la liste d'ObjetsFinancement initiale
    List<ObjetFinancement> listObjetFinancementInitial = new ArrayList<>();
    listObjetFinancementInitial.add(objetInitial);

    // Création du Financement initial
    Financement financementInitial = Financement.builder()
            .objetFinancement(listObjetFinancementInitial)
            .intervenant(intervenantInitial)
            .build();

    // Création d'un Financement pour test
    Financement createdFinancement = Financement.builder()
            .idFinancement("F0001")
            .objetFinancement(listObjetFinancementInitial)
            .intervenant(intervenantInitial)
            .build();

    // Configuration des mocks
    when(idGeneratorService.generateId("F")).thenReturn("F0001");
    when(idGeneratorService.generateId("O")).thenReturn("O0001");
    when(idGeneratorService.generateId("G")).thenReturn("G0001");
    when(financementRepository.save(any(Financement.class))).thenReturn(createdFinancement);

    // Création du Financement via le service
    financementService.createFinancement(financementInitial);

    // Création du DPE mis à jour
    Dpe dpeUpdated = Dpe.builder()
            .classeCep("B")
            .build();

    // Création du Bien mis à jour
    Bien bienUpdated = Bien.builder()
            .codePostal("75018")
            .surfaceBien(120.0)
            .dpeActuel(dpeUpdated)
            .build();

    // Création de l'ObjetFinancement mis à jour
    ObjetFinancement objetUpdated = ObjetFinancement.builder()
            .idObjetFinancement(createdFinancement.getObjetFinancement().get(0).getIdObjetFinancement())
            .bien(bienUpdated)
            .build();

    List<ObjetFinancement> listObjetFinancementUpdated = new ArrayList<>();
    listObjetFinancementUpdated.add(objetUpdated);

    // Création du Financement mis à jour
    Financement patchedFinancement = Financement.builder()
            .objetFinancement(listObjetFinancementUpdated)
            .build();

    // Configuration du mock pour le patch
    when(financementRepository.findByIdFinancement("F0001")).thenReturn(Optional.of(createdFinancement));
    when(financementRepository.save(any(Financement.class))).thenAnswer(invocation -> invocation.getArguments()[0]);

    // Application du patch
    Financement result = financementService.patchFinancementChamps("F0001", patchedFinancement);

    // Assertions
    assertNotNull(result);
    assertEquals("75018", result.getObjetFinancement().get(0).getBien().getCodePostal());
    assertEquals(120.0, result.getObjetFinancement().get(0).getBien().getSurfaceBien());
    assertEquals("B", result.getObjetFinancement().get(0).getBien().getDpeActuel().getClasseCep());
}
