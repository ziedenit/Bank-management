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
