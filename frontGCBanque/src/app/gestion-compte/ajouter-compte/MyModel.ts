Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug' enabled.
time=2024-06-18T02:09:06.913+02:00|level=ERROR|event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Application run failed - org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'acquisitionController': Unsatisfied dependency expressed through field 'droolsService': Error creating bean with name 'droolsService': Unsatisfied dependency expressed through field 'kieSession': Error creating bean with name 'kieSession' defined in class path resource [com/cl/msofd/engineRules/DroolsConfig.class]: Failed to instantiate [org.kie.api.runtime.KieSession]: Factory method 'kieSession' threw exception with message: Cannot find a default KieSession
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:787)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:767)
	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:145)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessProperties(AutowiredAnnotationBeanPostProcessor.java:508)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1419)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:599)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:522)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:975)
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:959)
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:624)
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146)
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:754)
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:456)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:334)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1354)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1343)
	at com.cl.msofd.MsofdApplication.main(MsofdApplication.java:22)
Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'droolsService': Unsatisfied dependency expressed through field 'kieSession': Error creating bean with name 'kieSession' defined in class path resource [com/cl/msofd/engineRules/DroolsConfig.class]: Failed to instantiate [org.kie.api.runtime.KieSession]: Factory method 'kieSession' threw exception with message: Cannot find a default KieSession
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:787)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:767)
	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:145)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessProperties(AutowiredAnnotationBeanPostProcessor.java:508)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1419)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:599)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:522)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199)
	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:254)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1443)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1353)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:784)
	... 20 common frames omitted
Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'kieSession' defined in class path resource [com/cl/msofd/engineRules/DroolsConfig.class]: Failed to instantiate [org.kie.api.runtime.KieSession]: Factory method 'kieSession' threw exception with message: Cannot find a default KieSession
	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:651)
	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:485)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1335)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1165)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:562)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:522)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:325)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:323)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199)
	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:254)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1443)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1353)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.resolveFieldValue(AutowiredAnnotationBeanPostProcessor.java:784)
	... 34 common frames omitted
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.kie.api.runtime.KieSession]: Factory method 'kieSession' threw exception with message: Cannot find a default KieSession
	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:177)
	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:647)
	... 47 common frames omitted
Caused by: java.lang.RuntimeException: Cannot find a default KieSession
	at org.drools.compiler.kie.builder.impl.KieContainerImpl.findKieSessionModel(KieContainerImpl.java:546)
	at org.drools.compiler.kie.builder.impl.KieContainerImpl.newKieSession(KieContainerImpl.java:589)
	at org.drools.compiler.kie.builder.impl.KieContainerImpl.newKieSession(KieContainerImpl.java:519)
	at org.drools.compiler.kie.builder.impl.KieContainerImpl.newKieSession(KieContainerImpl.java:502)
	at com.cl.msofd.engineRules.DroolsConfig.kieSession(DroolsConfig.java:23)
	at com.cl.msofd.engineRules.DroolsConfig$$SpringCGLIB$$0.CGLIB$kieSession$1(<generated>)
	at com.cl.msofd.engineRules.DroolsConfig$$SpringCGLIB$$FastClass$$1.invoke(<generated>)
	at org.springframework.cglib.proxy.MethodProxy.invokeSuper(MethodProxy.java:258)
	at org.springframework.context.annotation.ConfigurationClassEnhancer$BeanMethodInterceptor.intercept(ConfigurationClassEnhancer.java:331)
	at com.cl.msofd.engineRules.DroolsConfig$$SpringCGLIB$$0.kieSession(<generated>)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:140)
	... 48 common frames omitted


Process finished with exit code 1
//
mon application prepoerties est 
server.port=8081
spring.data.mongodb.uri=mongodb://user-rw:ShxzBCVWKrhXEYDNiX4k@mongodb-201.dbaas-mongodb.iaas.cagip.group.gca:27017,mongodb-202.dbaas-mongodb.iaas.cagip.group.gca:27017,mongodb-203.dbaas-mongodb.iaas.cagip.group.gca:27017/scripta-lcl-ofd-dev?authSource=scripta-lcl-ofd-dev&appname=scripta-lcl-ofd-dev&w=majority&tls=true&tlscafile=tlsCAFile=./certificats/carioca-bundle.crt&replicaSet=mutu-200
spring.profiles.active=prod
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=always
server.error.include-message=always
msofd.users=user1:user1Pass;user2:user2Pass
retry=3
logs.app=MSOFD
logs.uomCod=20001
# ademe info
ademe.proxy.host=127.0.0.1
ademe.proxy.port=3128
# referentiel info
referentiel.personne.url=https://rct-reper-rp.hors-prod.caas.lcl.gca/msreperperson/person?person_id=%s

referentiel.user=user1
referentiel.password=password1
arbre.url=src/main/resources/arbre.xlsx

# swagger-ui custom path
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.packagesToScan=com.cl.msofd.controller
#springdoc.pathsToMatch=/api/v1
spring.drools.rules-file=rules.drl
arbre.rules=classpath:arbreAcquistion.xlsx

ademe.dpe.save.enabled=true
msofd.version=1.0.1
msofd.date=14/11/2023

