Exemple des valeurs Date de construction a parser en Date 

avant 31/12/2012 
avant 31/12/2012 
avant 31/12/2012 
avant 31/12/2012 
avant 31/12/2012 
du 01/01/2013 au 31/12/2020 
du 01/01/2013 au 31/12/2020 
du 01/01/2013 au 31/12/2020 
du 01/01/2013 au 31/12/2020 
du 01/01/2013 au 31/12/2020 
du 01/01/2021 au 31/12/2021
du 01/01/2021 au 31/12/2021
> au 01/01/2022
> au 01/01/2022
> au 01/01/2022
> au 01/01/2022

Exemple des valeurs de date de depot de pc a parser en Date 
avant 31/12/2012 
avant 31/12/2012 
avant 31/12/2012 
du 01/01/2013 au 31/12/2020 
du 01/01/2013 au 31/12/2020 
du 01/01/2013 au 31/12/2020 
du 01/01/2021 au 31/12/2021
du 01/01/2021 au 31/12/2021
> au 01/01/2022
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
Inconnu
java.text.ParseException: Unparseable date: Date de construction (DPE)
	at com.cl.msofd.engineRules.ExcelToDroolsService.parseDate(ExcelToDroolsService.java:141)
	at com.cl.msofd.engineRules.ExcelToDroolsService.readAcquisitionData(ExcelToDroolsService.java:45)
	at com.cl.msofd.engineRules.ExcelToDroolsService.generateDroolsFile(ExcelToDroolsService.java:68)
	at com.cl.msofd.engineRules.AcquisitionController.generateRules(AcquisitionController.java:23)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:259)
	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:192)
	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:920)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:830)
	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
	at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:903)
	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:564)
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:205)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149)
	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149)
	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
	at org.springframework.security.web.ObservationFilterChainDecorator$FilterObservation$SimpleFilterObservation.lambda$wrap$1(ObservationFilterChainDecorator.java:479)
	at org.springframework.security.web.ObservationFilterChainDecorator$AroundFilterObservation$SimpleAroundFilterObservation.lambda$wrap$1(ObservationFilterChainDecorator.java:340)
	at org.springframework.security.web.ObservationFilterChainDecorator.lambda$wrapSecured$0(ObservationFilterChainDecorator.java:82)
	at org.springframework.security.web.ObservationFilterChainDecorator$VirtualFilterChain.doFilter(ObservationFilterChainDecorator.java:128)
