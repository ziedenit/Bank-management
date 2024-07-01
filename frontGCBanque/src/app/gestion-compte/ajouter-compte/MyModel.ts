
  @Test
    void testDeleteFinancementByIdFinancement() {
        doNothing().when(financementRepository).deleteByIdFinancement("FR51TLJ5K");

        financementService.deleteFinancementByIdFinancement("FR51TLJ5K");

        verify(financementRepository, times(1)).deleteByIdFinancement("FR51TLJ5K");
    }

org.mockito.exceptions.base.MockitoException: 
Only void methods can doNothing()!
Example of correct use of doNothing():
    doNothing().
    doThrow(new RuntimeException())
    .when(mock).someVoidMethod();
Above means:
someVoidMethod() does nothing the 1st time but throws an exception the 2nd time is called

	at com.cl.msofd.service.FinancementServiceTest.testDeleteFinancementByIdFinancement(FinancementServiceTest.java:97)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
