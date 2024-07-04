org.opentest4j.AssertionFailedError: 
expected: com.cl.msofd.model.ClientEntreprise@7e2ff255
 but was: com.cl.msofd.model.ClientEntreprise@ccd3e52
Expected :com.cl.msofd.model.ClientEntreprise@7e2ff255
Actual   :com.cl.msofd.model.ClientEntreprise@ccd3e52
<Click to see difference>


	at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	at java.base/java.lang.reflect.Constructor.newInstanceWithCaller(Constructor.java:499)
	at com.cl.msofd.service.EntrepriseServiceTest.should_return_ClientEntreprise_for_LEGAL_PERSON(EntrepriseServiceTest.java:88)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)

time=2024-07-04T12:00:33.605+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Closing JPA EntityManagerFactory for persistence unit 'default'
time=2024-07-04T12:00:33.609+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown initiated...
time=2024-07-04T12:00:33.614+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown completed.

Process finished with exit code -1
