time=2024-06-18T02:16:02.699+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Unknown KieSession name: rules.drl
time=2024-06-18T02:16:02.701+02:00|level=WARN |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'acquisitionController': Unsatisfied dependency expressed through field 'droolsService': Error creating bean with name 'droolsService': Unsatisfied dependency expressed through field 'kieSession': No qualifying bean of type 'org.kie.api.runtime.KieSession' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}
time=2024-06-18T02:16:02.766+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Closing JPA EntityManagerFactory for persistence unit 'default'
time=2024-06-18T02:16:02.770+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown initiated...
time=2024-06-18T02:16:02.773+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown completed.
time=2024-06-18T02:16:02.775+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Stopping service [Tomcat]
time=2024-06-18T02:16:02.794+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=

Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
time=2024-06-18T02:16:02.824+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Unknown KieSession name: rules.drl
time=2024-06-18T02:16:02.826+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=

***************************
APPLICATION FAILED TO START
***************************

Description:

Field kieSession in com.cl.msofd.engineRules.DroolsService required a bean of type 'org.kie.api.runtime.KieSession' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)

The following candidates were found but could not be injected:
	- User-defined bean method 'kieSession' in 'AppConfiguration' ignored as the bean value is null


Action:

Consider revisiting the entries above or defining a bean of type 'org.kie.api.runtime.KieSession' in your configuration.


Process finished with exit code 1
