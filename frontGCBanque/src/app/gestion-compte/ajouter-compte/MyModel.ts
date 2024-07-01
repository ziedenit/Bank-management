@Test
void should_patch_financement_champs() throws Exception {
    // Create initial Financement
    Dpe dpeInitial = Dpe.builder()
            .classeCep("A")
            .classeGes("C")
            .estimationCep(60.0)
            .estimationGes(80.0)
            .numeroDpe("DDD7E1287825F")
            .build();

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

    List<Garantie> listGarantieInitial = new ArrayList<>();
    Garantie garantieInitial = Garantie.builder()
            .idGarantie("G12345678")
            .bien(bienInitial)
            .build();
    listGarantieInitial.add(garantieInitial);

    ObjetFinancement objetInitial = ObjetFinancement.builder()
            .codeObjetFinancement("02")
            .quotePartObjet(100.0)
            .bien(bienInitial)
            .garantie(listGarantieInitial)
            .build();

    List<String> idRepersInitial = new ArrayList<>();
    idRepersInitial.add("8415595180");
    Intervenant intervenantInitial = Intervenant.builder()
            .idReper(idRepersInitial)
            .build();
    List<ObjetFinancement> listObjetFinancementInitial = new ArrayList<>();
    listObjetFinancementInitial.add(objetInitial);
    Financement financementInitial = Financement.builder()
            .objetFinancement(listObjetFinancementInitial)
            .intervenant(intervenantInitial)
            .build();

    Financement createdFinancement = financementService.createFinancement(financementInitial);

    // Create updated Financement
    Dpe dpeUpdated = Dpe.builder()
            .classeCep("B")
            .build();

    Bien bienUpdated = Bien.builder()
            .codePostal("75018")
            .surfaceBien(120.0)
            .dpeActuel(dpeUpdated)
            .build();

    ObjetFinancement objetUpdated = ObjetFinancement.builder()
            .idObjetFinancement(createdFinancement.getObjetFinancement().get(0).getIdObjetFinancement())
            .bien(bienUpdated)
            .build();

    List<ObjetFinancement> listObjetFinancementUpdated = new ArrayList<>();
    listObjetFinancementUpdated.add(objetUpdated);

    Financement patchedFinancement = Financement.builder()
            .objetFinancement(listObjetFinancementUpdated)
            .build();

    Financement result = financementService.patchFinancementChamps(createdFinancement.getIdFinancement(), patchedFinancement);

    assertEquals(result.getObjetFinancement().get(0).getBien().getCodePostal(), "75018");
    assertEquals(result.getObjetFinancement().get(0).getBien().getSurfaceBien(), 120.0);
    assertEquals(result.getObjetFinancement().get(0).getBien().getDpeActuel().getClasseCep(), "B");
}

java.lang.NullPointerException: Cannot invoke "com.cl.msofd.model.Financement.getObjetFinancement()" because "createdFinancement" is null

	at com.cl.msofd.service.FinancementServiceTest.should_patch_financement_champs(FinancementServiceTest.java:204)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
    public Financement createFinancement(Financement financement) {

        financement.setIdFinancement(idGeneratorService.generateId("F"));

        if (financement.getObjetFinancement() != null) {
            financement.getObjetFinancement().forEach(objetFinancement -> {
                objetFinancement.setIdObjetFinancement(idGeneratorService.generateId("O"));

                if (objetFinancement.getGarantie() != null) {
                    objetFinancement.getGarantie().forEach(garantie -> {
                        garantie.setIdGarantie(idGeneratorService.generateId("G"));
                    });
                }
            });
        }
        return financementRepository.save(financement);
    }
