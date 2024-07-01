 @Test
    void testGetListObjectFinancementByIdFinancementNotFound() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.empty());

        assertThrows(ListObjetNotFoundException.class, () -> {
            financementService.getListObjectFinancementByIdFinancement("FR51TLJ5K");
        });
    }
//
   public List<ObjetFinancement> getListObjectFinancementByIdFinancement(String idFinancement) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("recherche de la liste de objets...");

        List<ObjetFinancement> listObjetsFinancement = financementRepository.findByidFinancement(idFinancement).get().getObjetFinancement();

        if (listObjetsFinancement==null||listObjetsFinancement.isEmpty()) {
            throw new ListObjetNotFoundException(
                    String.format("Pas de liste d'objet financement pour ce le financement ayant comme id  ", idFinancement));

        }
        return listObjetsFinancement;
    }
//
time=2024-07-01T15:02:07.562+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=recherche de la liste de objets...

org.opentest4j.AssertionFailedError: Unexpected exception type thrown, 
Expected :class com.cl.msofd.exception.ListObjetNotFoundException
Actual   :class java.util.NoSuchElementException
<Click to see difference>


	at org.junit.jupiter.api.AssertionFailureBuilder.build(AssertionFailureBuilder.java:151)
	at org.junit.jupiter.api.AssertThrows.assertThrows(AssertThrows.java:67)
	at org.junit.jupiter.api.AssertThrows.assertThrows(AssertThrows.java:35)
	at org.junit.jupiter.api.Assertions.assertThrows(Assertions.java:3115)
	at com.cl.msofd.service.FinancementServiceTest.testGetListObjectFinancementByIdFinancementNotFound(FinancementServiceTest.java:138)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
Caused by: java.util.NoSuchElementException: No value present
	at java.base/java.util.Optional.get(Optional.java:143)
	at com.cl.msofd.service.FinancementService.getListObjectFinancementByIdFinancement(FinancementService.java:93)
	at com.cl.msofd.service.FinancementServiceTest.lambda$testGetListObjectFinancementByIdFinancementNotFound$3(FinancementServiceTest.java:139)
	at org.junit.jupiter.api.AssertThrows.assertThrows(AssertThrows.java:53)
	... 6 more

