Description:

Field kieSession in com.cl.msofd.engineRules.DroolsService required a bean of type 'org.kie.api.runtime.KieSession' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)

The following candidates were found but could not be injected:
	- User-defined bean method 'kieSession' in 'DroolsConfig' ignored as the bean value is null


Action:

Consider revisiting the entries above or defining a bean of type 'org.kie.api.runtime.KieSession' in your configuration.

Disconnected from the target VM, address: '127.0.0.1:52569', transport: 'socket'

Process finished with exit code 1

j'ai debuggé KieContainer est non null mais c'est le bean KieSession qui est null 
@Bean
    public KieSession kieSession() {
        KieSession kieSession = kieContainer().newKieSession(droolsFile);
        return kieSession;
    }
en appelant : public KieSession newKieSession(String kSessionName) {
        return this.newKieSession(kSessionName, (Environment)null, (KieSessionConfiguration)null);
    } ca retourne null 

mais dans la classe mere il y'a pluseurs implemnatation
