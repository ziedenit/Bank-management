time=2024-06-06T17:17:17.959+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Started FinancementServiceTest in 10.975 seconds (process running for 13.155)
Java HotSpot(TM) 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
{"idFinancement":"testId","objetFinancement":[],"alignement":{"topAlignement":null,"topAlignementXtra":null},"eligibilite":{"topEligibilite":null},"intervenant":{"idIntervenant":null,"idReper":null},"indicateurFinancementDedie":"dedicated","indicateurNatureDurable":"durable","typeRisqueClimatiqueAttenue":"climaticRisk","codeApplicatifOrigine":"01","indicateurReprise":true,"statut":1,"agenceCompte":"1234567890123456","valeurTravaux":1000.0}

org.opentest4j.AssertionFailedError: 
Expected :com.cl.msofd.model.Financement@b4ccf305
Actual   :com.cl.msofd.model.Financement@6723a14b
<Click to see difference>


	at org.junit.jupiter.api.AssertionFailureBuilder.build(AssertionFailureBuilder.java:151)
	at org.junit.jupiter.api.AssertionFailureBuilder.buildAndThrow(AssertionFailureBuilder.java:132)
	at org.junit.jupiter.api.AssertEquals.failNotEqual(AssertEquals.java:197)
	at org.junit.jupiter.api.AssertEquals.assertEquals(AssertEquals.java:182)
	at org.junit.jupiter.api.AssertEquals.assertEquals(AssertEquals.java:177)
	at org.junit.jupiter.api.Assertions.assertEquals(Assertions.java:1145)
	at com.cl.msofd.service.FinancementServiceTest.testSerializationDeserialization(FinancementServiceTest.java:430)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)

time=2024-06-06T17:17:20.978+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Closing JPA EntityManagerFactory for persistence unit 'default'
time=2024-06-06T17:17:20.980+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown initiated...
time=2024-06-06T17:17:20.982+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown completed.

Process finished with exit code -1
