
java.lang.NullPointerException: Cannot invoke "com.cl.msofd.clients.ClientDetails.getPersonType()" because the return value of "com.cl.msofd.clients.ClientResponse.getEntrepriseDetails()" is null

	at com.cl.msofd.service.EntrepriseService.getClient(EntrepriseService.java:68)
	at com.cl.msofd.service.EntrepriseServiceTest.should_return_ClientEntreprise_for_LEGAL_PERSON(EntrepriseServiceTest.java:67)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
