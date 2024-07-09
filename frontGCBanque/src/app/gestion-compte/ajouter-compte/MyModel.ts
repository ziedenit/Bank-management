package com.cl.msofd.controller;

import com.cl.msofd.exception.ClientNotFoundException;
import com.cl.msofd.model.ClientParticulier;
import com.cl.msofd.service.ClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Date;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class ClientControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private ClientService clientService;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testGetClient_Success() throws Exception {
        ClientParticulier clientParticulier = ClientParticulier.builder()
                .idReper("123")
                .nomUsageClient("Doe")
                .prenomClient("John")
                .dateNaissanceClient(Date.valueOf("1990-01-01"))
                .civility("Mr.")
                .build();

        when(clientService.getClient(anyString())).thenReturn(clientParticulier);

        mockMvc.perform(get("/api/v1/clients/particulier/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"idReper\":\"123\",\"nomUsageClient\":\"Doe\",\"prenomClient\":\"John\",\"dateNaissanceClient\":\"1990-01-01\",\"civility\":\"Mr.\"}"));
    }

    @Test
    public void testGetClient_NotFound() throws Exception {
        when(clientService.getClient(anyString())).thenThrow(new ClientNotFoundException("Client not found"));

        mockMvc.perform(get("/api/v1/clients/particulier/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }


}//
time=2024-07-09T14:03:05.301+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Started ClientControllerTest in 15.311 seconds (process running for 19.232)
time=2024-07-09T14:03:05.470+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Initializing Spring TestDispatcherServlet ''
time=2024-07-09T14:03:05.470+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Initializing Servlet ''
time=2024-07-09T14:03:05.474+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Completed initialization in 4 ms
time=2024-07-09T14:03:05.669+02:00|level=INFO |event_cod=empty|event_typ=APPLICATIVE|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=getClient Particulier ayant l'id : 123

java.lang.AssertionError: dateNaissanceClient
Expected: 1990-01-01
     got: 31/12/1989

<Click to see difference>


	at org.skyscreamer.jsonassert.JSONAssert.assertEquals(JSONAssert.java:417)
	at org.skyscreamer.jsonassert.JSONAssert.assertEquals(JSONAssert.java:394)
	at org.skyscreamer.jsonassert.JSONAssert.assertEquals(JSONAssert.java:336)
	at org.springframework.test.util.JsonExpectationsHelper.assertJsonEqual(JsonExpectationsHelper.java:61)
	at org.springframework.test.web.servlet.result.ContentResultMatchers.lambda$json$9(ContentResultMatchers.java:227)
	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:214)
	at com.cl.msofd.controller.ClientControllerTest.testGetClient_Success(ClientControllerTest.java:56)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)

time=2024-07-09T14:03:05.962+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=Closing JPA EntityManagerFactory for persistence unit 'default'
time=2024-07-09T14:03:05.965+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown initiated...
time=2024-07-09T14:03:05.968+02:00|level=INFO |event_cod=empty|event_typ=TECHNICAL|sec_event_typ=METIER|usr_id=empty|uom_cod=20001|app_id=TestApp|component_id=empty|corr_id=empty|sess_id=empty|src_client_id=empty|layer_id=empty|httpMethod=empty|httpStatus=empty|httpRoute=empty|httpRoutePattern=empty|msg=HikariPool-1 - Shutdown completed.

Process finished with exit code -1
