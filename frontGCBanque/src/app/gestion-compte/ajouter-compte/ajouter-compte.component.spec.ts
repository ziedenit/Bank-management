@Autowired
		private ObjectMapper objectMapper;

		@Test
		public void testSerializationDeserialization() throws Exception {
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

			ObjetFinancement firstObject = ObjetFinancement.builder()
					.codeObjetFinancement("02")
					.quotePartObjet(100.0)
					.bien(firstBien)
					.build();

			List<String> idRepers = new ArrayList<>();
			idRepers.add("8415595180");
			Intervenant intervenant = Intervenant.builder()
					.idReper(idRepers)
					.build();
			ArrayList<ObjetFinancement> listObjets = new ArrayList<>();
			listObjets.add(firstObject);
			Financement financement = Financement.builder()
					.idFinancement("F11222333")
					.objetFinancement(listObjets)
					.intervenant(intervenant)
					.build();
			Financement financementtest = financementService.createFinancement(financement);

			// Serialization
			String jsonString = objectMapper.writeValueAsString(financementtest);
			System.out.println(jsonString);

			// Deserialization
			Financement deserializedFinancement = objectMapper.readValue(jsonString, Financement.class);
			assertEquals(financementtest, deserializedFinancement);
		}
ava HotSpot(TM) 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
{"idFinancement":"F11222333","objetFinancement":[{"idObjetFinancement":null,"codeObjetFinancement":"02","quotePartObjet":100.0,"codeFamilleObjet":null,"gainCEP":null,"dateFinTravaux":null,"bien":{"idBien":null,"codeBatiment":"00001","typeBatiment":"Appartement","numeroVoie":null,"typeVoie":null,"nomRue":null,"batiment":null,"escalier":null,"etage":null,"porte":null,"codePostal":"75016","nomCommune":null,"paysBien":null,"adresseComplete":null,"codeNormeThermique":null,"etatBien":null,"typeEnergie":null,"codeTypeEnergie":null,"codeDepartement":null,"codeInseeCommune":null,"numeroLot":null,"numeroNomRue":null,"typeUsage":null,"anneeConstruction":2000,"periodeConstruction":null,"dateDepotPc":null,"dateDebutConstruction":null,"surfaceBien":79.0,"bienFinanceLCL":false,"numeroFiscalLocal":null,"eligibleDpe":null,"labelBien":null,"coordonneeCartographiqueX":null,"coordonneeCartographiqueY":null,"prixBien":null,"montantFinanceLCL":10000.0,"partLCL":null,"dpeActuel":{"idDpe":null,"numeroDpe":"2337E1287825F","codeModeleDpeType":null,"estimationCep":100.0,"classeCep":"A","estimationGes":60.0,"classeGes":"B","dateEtablissementDpe":null,"dateReceptionDpe":null,"dateFinValiditeDpe":null,"sirenDiagnostiqueur":null,"modelDpe":null,"numeroDpeRemplace":null,"versionDpe":null,"methodeDpeApplique":null}},"dpeAvantTravaux":null,"dpeApresTravaux":null,"alignement":null,"eligibilite":null,"garantie":null,"piecesJustificatives":null,"statut":0}],"alignement":null,"eligibilite":null,"intervenant":{"idIntervenant":null,"idReper":["8415595180"]},"indicateurFinancementDedie":null,"indicateurNatureDurable":null,"typeRisqueClimatiqueAttenue":null,"codeApplicatifOrigine":null,"indicateurReprise":false,"statut":0,"agenceCompte":null,"valeurTravaux":null}

org.opentest4j.AssertionFailedError: 
Expected :com.cl.msofd.model.Financement@8658594e
Actual   :com.cl.msofd.model.Financement@5ae28a42
<Click to see difference>


	at org.junit.jupiter.api.AssertionFailureBuilder.build(AssertionFailureBuilder.java:151)
	at org.junit.jupiter.api.AssertionFailureBuilder.buildAndThrow(AssertionFailureBuilder.java:132)
	at org.junit.jupiter.api.AssertEquals.failNotEqual(AssertEquals.java:197)
	at org.junit.jupiter.api.AssertEquals.assertEquals(AssertEquals.java:182)
	at org.junit.jupiter.api.AssertEquals.assertEquals(AssertEquals.java:177)
	at org.junit.jupiter.api.Assertions.assertEquals(Assertions.java:1145)
	at com.cl.msofd.service.FinancementServiceTest.testSerializationDeserialization(FinancementServiceTest.java:454)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)

time=2024-06-06T17:37:01.912+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Closing JPA EntityManagerFactory for persistence unit 'default'
time=2024-06-06T17:37:01.915+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown initiated...
time=2024-06-06T17:37:01.917+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown completed.

Process finished with exit code -1
