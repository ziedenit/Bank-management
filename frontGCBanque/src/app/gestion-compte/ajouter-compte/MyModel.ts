time=2024-07-09T13:22:16.563+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Initializing Spring TestDispatcherServlet ''
time=2024-07-09T13:22:16.564+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Initializing Servlet ''
time=2024-07-09T13:22:16.568+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Completed initialization in 4 ms
time=2024-07-09T13:22:16.874+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=getClient Entreprise ayant l'id : 123

jakarta.servlet.ServletException: Request processing failed: java.lang.RuntimeException: Internal server error

	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1022)
	at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:903)
	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:564)
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
	at org.springframework.test.web.servlet.TestDispatcherServlet.service(TestDispatcherServlet.java:72)
	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
	at org.springframework.mock.web.MockFilterChain$ServletFilterProxy.doFilter(MockFilterChain.java:165)
	at org.springframework.mock.web.MockFilterChain.doFilter(MockFilterChain.java:132)
	at org.springframework.test.web.servlet.MockMvc.perform(MockMvc.java:201)
	at com.cl.msofd.controller.EntrepriseControllerTest.testGetClient_InternalServerError(EntrepriseControllerTest.java:72)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
Caused by: java.lang.RuntimeException: Internal server error
	at com.cl.msofd.service.EntrepriseService.getClient(EntrepriseService.java:37)
	at com.cl.msofd.controller.EntrepriseController.getClient(EntrepriseController.java:47)
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
	... 12 more

