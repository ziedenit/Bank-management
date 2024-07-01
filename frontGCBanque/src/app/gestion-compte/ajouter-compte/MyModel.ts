  @Test
    void testGetListObjectFinancementByIdFinancementNotFound() {
        when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.empty());

        assertThrows(ListObjetNotFoundException.class, () -> {
            financementService.getListObjectFinancementByIdFinancement("FR51TLJ5K");
        });
    }
//
time=2024-07-01T13:53:07.314+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=recherche de la liste de objets...

org.opentest4j.AssertionFailedError: Unexpected exception type thrown, 
Expected :class com.cl.msofd.exception.ListObjetNotFoundException
Actual   :class java.util.NoSuchElementException
<Click to see difference>
