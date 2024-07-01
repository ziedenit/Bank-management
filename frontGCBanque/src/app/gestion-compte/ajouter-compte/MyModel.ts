    @Test
    void should_throw_list_objet_not_found_exception () throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        Dpe dpeActuel = Dpe.builder()
                .classeCep("A")
                .classeGes("B")
                .estimationCep(100.0)
                .estimationGes(60.0)
                .numeroDpe("2337E1287825F")
                .build();

        Bien firstBien = Bien.builder()
                .codeBatiment("00001")
                .typeBatiment("Appartement")
                .codePostal("75016")
                .surfaceBien(79.0)
                .anneeConstruction(2000)
                .dpeActuel(dpeActuel)
                .montantFinanceLCL(10000.00)
                .build();
        List<String> idRepers = new ArrayList<>();
        idRepers.add("8415595180");
        Intervenant intervenant = Intervenant.builder()
                .idReper(idRepers)
                .build();
        ArrayList<ObjetFinancement> listObjets = new ArrayList<>();
        Financement financement = Financement.builder()
                .objetFinancement(listObjets)
                .intervenant(intervenant)
                .build();
        Financement createdFinancement = financementService.createFinancement(financement);
        String idFinancement = createdFinancement.getIdFinancement();

        MvcResult result = mockMvc.perform(get("/api/v1/financement/listObjetFinancement/" + idFinancement)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andReturn();
        assertTrue(result.getResolvedException() instanceof ListObjetNotFoundException);

    }
//
time=2024-07-01T14:11:37.392+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Initializing Spring TestDispatcherServlet ''
time=2024-07-01T14:11:37.393+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Initializing Servlet ''
time=2024-07-01T14:11:37.402+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Completed initialization in 9 ms
time=2024-07-01T14:11:37.488+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=List Objets Financement: get by idFinancement FE3XG7F4I

java.lang.AssertionError: Status expected:<404> but was:<200>
Expected :404
Actual   :200
<Click to see difference>


	at org.springframework.test.util.AssertionErrors.fail(AssertionErrors.java:59)
	at org.springframework.test.util.AssertionErrors.assertEquals(AssertionErrors.java:122)
	at org.springframework.test.web.servlet.result.StatusResultMatchers.lambda$matcher$9(StatusResultMatchers.java:637)
	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:214)
	at com.cl.msofd.controller.FinancementControllerTest.should_throw_list_objet_not_found_exception(FinancementControllerTest.java:149)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
commentr je fixe ce test sachant que le service et les suivant  public List<ObjetFinancement> getListObjectFinancementByIdFinancement(String idFinancement) {
        return financementRepository.findByidFinancement(idFinancement)
                .orElseThrow(() -> new ListObjetNotFoundException("Financement not found with id: " + idFinancement))
                .getObjetFinancement();
    }
