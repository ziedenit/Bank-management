***************************
APPLICATION FAILED TO START
***************************

Description:

Field kieSession in com.cl.msofd.engineRules.DroolsService required a bean of type 'org.kie.api.runtime.KieSession' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)

The following candidates were found but could not be injected:
	- User-defined bean method 'kieSession' in 'DroolsConfig' ignored as the bean value is null


Action:

Consider revisiting the entries above or defining a bean of type 'org.kie.api.runtime.KieSession' in your configuration.


Process finished with exit code 1
