
ime=2024-10-22T08:00:44.467Z|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=getClient Particulier ayant l'id : 9587775720
time=2024-10-22T08:00:44.554Z|level=ERROR|event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception - com.fasterxml.jackson.core.JsonParseException: Unexpected character ('<' (code 60)): expected a valid value (JSON String, Number, Array, Object or token 'null', 'true' or 'false')
 at [Source: REDACTED (`StreamReadFeature.INCLUDE_SOURCE_IN_LOCATION` disabled); line: 1, column: 1]
	at com.fasterxml.jackson.core.JsonParser._constructReadException(JsonParser.java:2648)
	at com.fasterxml.jackson.core.base.ParserMinimalBase._reportUnexpectedChar(ParserMinimalBase.java:685)
	at com.fasterxml.jackson.core.json.ReaderBasedJsonParser._handleOddValue(ReaderBasedJsonParser.java:2055)
	at com.fasterxml.jackson.core.json.ReaderBasedJsonParser.nextToken(ReaderBasedJsonParser.java:780)
	at com.fasterxml.jackson.databind.ObjectMapper._initForReading(ObjectMapper.java:4992)
	at com.fasterxml.jackson.databind.ObjectMapper._readMapAndClose(ObjectMapper.java:4898)
	at com.fasterxml.jackson.databind.ObjectMapper.readValue(ObjectMapper.java:3848)
	at com.fasterxml.jackson.databind.ObjectMapper.readValue(ObjectMapper.java:3816)
	at com.cl.msofd.service.ClientService.getClient(ClientService.java:51)
	at com.cl.msofd.controller.ClientController.getClient(ClientController.java:51)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)
	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:255)
	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:188)
	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:926)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:831)
	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
	at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:903)
	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:564)
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:195)
