
package com.cl.msofd.service;

import com.cl.logs.commun.CommonLogger;
import com.cl.logs.commun.CommonLoggerFactory;
import com.cl.logs.types.EventTyp;
import com.cl.logs.types.SecEventTyp;
import com.cl.msofd.exception.DpeAdemeExistingException;
import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.Ademe;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.repository.DpeAdemeRepository;
import com.cl.msofd.repository.DpeAdemeRepositoryCustom;
import com.cl.msofd.utility.Constants;
import com.cl.msofd.utility.JSONUtilOFD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class DpeAdemeService {

    @Autowired
    private DpeAdemeRepository dpeAdemeRepository;

    @Autowired
    private DpeAdemeRepositoryCustom dpeAdemeRepositoryCustom;

    @Autowired
    private HttpClient ademeHttpClient;

    @Autowired
    private JSONUtilOFD jsonUtils;


    private final CommonLogger commonLogger = CommonLoggerFactory.getLogger(DpeAdemeService.class);




    public DpeAdeme create(DpeAdeme dpeAdeme) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("create dpeAdeme : {}", dpeAdeme);
        Optional<DpeAdeme> existingDpe = dpeAdemeRepositoryCustom.findByNumDpe(dpeAdeme.getNumDpe());
        return (DpeAdeme) existingDpe.map(dpe -> {
            throw new DpeAdemeExistingException(String.format("le numéro DPE %s est déja crée ", dpeAdeme.getNumDpe()));
        }).orElseGet(() -> dpeAdemeRepository.save(dpeAdeme));
    }


    public DpeAdeme getDpe(String numDpe) throws ExecutionException, InterruptedException, IOException {
        DpeAdeme dpeAdemePersist = null;
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("OFD : Requête Ademe numéro DPE : {}", numDpe);

        String url = Constants.ADEME_URL + numDpe;

        HttpRequest request = HttpRequest.
                newBuilder()
                .uri(URI.create(url))
                .build();

        CompletableFuture<HttpResponse<String>> response = ademeHttpClient.sendAsync(request, BodyHandlers.ofString());
        Ademe ademe = jsonUtils.covertFromJsonToObject(response.get().body(), Ademe.class);

        if (!ademe.getResults().isEmpty()) {

            DpeAdeme dpeAdeme = ademe.getResults().get(0);

            if (dpeAdeme.getNumDpe().equals(numDpe)) {
                return dpeAdeme;
            }

            if (dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                dpeAdeme.setNumDpeRemplace(dpeAdeme.getNumDpe());
                dpeAdeme.setNumDpe(numDpe);
            }
            if (dpeAdeme.getNumDpe().equals(numDpe) || dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                 dpeAdemePersist = create(dpeAdeme);

            }
            return dpeAdemePersist;
        } else {
            throw new DpeAdemeNotFoundException(String.format("Le DPE %s est inexistant", numDpe));
        }
    }
    
    
 
    
    public DpeAdeme getDpeNeuf(String numDpe) throws ExecutionException, InterruptedException, IOException {
   DpeAdeme dpeAdemePersistNeuf = null;
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("OFD : Requête Ademe numéro DPE : {}", numDpe);

        String url = Constants.URL_NEUF + numDpe;

        HttpRequest request = HttpRequest.
                newBuilder()
                .uri(URI.create(url))
                .build();
       
        CompletableFuture<HttpResponse<String>> response = ademeHttpClient.sendAsync(request, BodyHandlers.ofString());
        Ademe ademe = jsonUtils.covertFromJsonToObject(response.get().body(), Ademe.class);

        if (!ademe.getResults().isEmpty()) {

            DpeAdeme dpeAdeme = ademe.getResults().get(0);

            if (dpeAdeme.getNumDpe().equals(numDpe)) {
                return dpeAdeme;
            }

            if (dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                dpeAdeme.setNumDpeRemplace(dpeAdeme.getNumDpe());
                dpeAdeme.setNumDpe(numDpe);
            }
            if (dpeAdeme.getNumDpe().equals(numDpe) || dpeAdeme.getNumDpeRemplace().equals(numDpe)) {
                dpeAdemePersistNeuf = create(dpeAdeme);

            }
            return dpeAdemePersistNeuf;
        } else {
            throw new DpeAdemeNotFoundException(String.format("Le DPE %s est inexistant", numDpe));
        }
    }
       
}

package com.cl.msofd.controller;

import com.cl.msofd.exception.DpeAdemeNotFoundException;
import com.cl.msofd.model.DpeAdeme;
import com.cl.msofd.service.DpeAdemeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.concurrent.ExecutionException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AdemeControllerTest {

    @Mock
    private DpeAdemeService dpeAdemeService;

    @InjectMocks
    private AdemeController ademeController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(ademeController).build();
    }

    @Test
    void testGetDpeSuccess() throws Exception {
        DpeAdeme dpeAdeme = DpeAdeme.builder().numDpe("123456").build();
        when(dpeAdemeService.getDpe(anyString())).thenReturn(dpeAdeme);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numDpe").value("123456"));

        verify(dpeAdemeService, times(1)).getDpe(anyString());
    }

    @Test
    void testGetDpeNotFound() throws Exception {
        when(dpeAdemeService.getDpe(anyString())).thenThrow(new DpeAdemeNotFoundException("Le DPE 123456 est inexistant"));

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(dpeAdemeService, times(1)).getDpe(anyString());
    }

    @Test
    void testGetDpeNeufSuccess() throws Exception {
        DpeAdeme dpeAdeme = DpeAdeme.builder().numDpe("123456").build();
        when(dpeAdemeService.getDpe(anyString())).thenThrow(new DpeAdemeNotFoundException("Le DPE 123456 est inexistant"));
        when(dpeAdemeService.getDpeNeuf(anyString())).thenReturn(dpeAdeme);

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numDpe").value("123456"));

        verify(dpeAdemeService, times(1)).getDpe(anyString());
        verify(dpeAdemeService, times(1)).getDpeNeuf(anyString());
    }

    @Test
    void testGetDpeInternalServerError() throws Exception {
        when(dpeAdemeService.getDpe(anyString())).thenThrow(new ExecutionException("Execution exception", new Throwable()));

        mockMvc.perform(get("/api/v1/ademe/dpe/123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());

        verify(dpeAdemeService, times(1)).getDpe(anyString());
    }
}

C:\Users\guendil_z\Documents\jdk-17.0.9\bin\java.exe -ea -Didea.test.cyclic.buffer.size=1048576 "-javaagent:C:\Users\guendil_z\Documents\IntelliJ IDEA Community Edition 2023.3.4\lib\idea_rt.jar=49240:C:\Users\guendil_z\Documents\IntelliJ IDEA Community Edition 2023.3.4\bin" -Dfile.encoding=UTF-8 -classpath "C:\Users\guendil_z\.m2\repository\org\junit\platform\junit-platform-launcher\1.10.2\junit-platform-launcher-1.10.2.jar;C:\Users\guendil_z\Documents\IntelliJ IDEA Community Edition 2023.3.4\lib\idea_rt.jar;C:\Users\guendil_z\Documents\IntelliJ IDEA Community Edition 2023.3.4\plugins\junit\lib\junit5-rt.jar;C:\Users\guendil_z\Documents\IntelliJ IDEA Community Edition 2023.3.4\plugins\junit\lib\junit-rt.jar;C:\Users\guendil_z\Documents\workspace\msofd\target\test-classes;C:\Users\guendil_z\Documents\workspace\msofd\target\classes;C:\Users\guendil_z\.m2\repository\com\fasterxml\jackson\core\jackson-databind\2.15.4\jackson-databind-2.15.4.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\jackson\core\jackson-annotations\2.15.4\jackson-annotations-2.15.4.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\jackson\core\jackson-core\2.15.4\jackson-core-2.15.4.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\jackson\module\jackson-module-parameter-names\2.15.4\jackson-module-parameter-names-2.15.4.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-spring\7.60.0.Final\kie-spring-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\jbpm\jbpm-flow\7.60.0.Final\jbpm-flow-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-mvel\7.60.0.Final\drools-mvel-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-serialization-protobuf\7.60.0.Final\drools-serialization-protobuf-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\soup\kie-soup-commons\7.60.0.Final\kie-soup-commons-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\soup\kie-soup-project-datamodel-commons\7.60.0.Final\kie-soup-project-datamodel-commons-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\soup\kie-soup-project-datamodel-api\7.60.0.Final\kie-soup-project-datamodel-api-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-dmn-api\7.60.0.Final\kie-dmn-api-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-dmn-feel\7.60.0.Final\kie-dmn-feel-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-dmn-model\7.60.0.Final\kie-dmn-model-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\com\github\javaparser\javaparser-core\3.13.10\javaparser-core-3.13.10.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-mvel-parser\7.60.0.Final\drools-mvel-parser-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\ch\obermuhlner\big-math\2.0.1\big-math-2.0.1.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-dmn-core\7.60.0.Final\kie-dmn-core-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-dmn-backend\7.60.0.Final\kie-dmn-backend-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-ruleunit\7.60.0.Final\drools-ruleunit-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-canonical-model\7.60.0.Final\drools-canonical-model-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-model-compiler\7.60.0.Final\drools-model-compiler-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-mvel-compiler\7.60.0.Final\drools-mvel-compiler-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-alphanetwork-compiler\7.60.0.Final\drools-alphanetwork-compiler-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\jpmml\pmml-model\1.5.1\pmml-model-1.5.1.jar;C:\Users\guendil_z\.m2\repository\org\jpmml\pmml-agent\1.5.1\pmml-agent-1.5.1.jar;C:\Users\guendil_z\.m2\repository\com\google\protobuf\protobuf-java\3.6.1\protobuf-java-3.6.1.jar;C:\Users\guendil_z\.m2\repository\org\mvel\mvel2\2.4.13.Final\mvel2-2.4.13.Final.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-tx\6.1.4\spring-tx-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-api\7.60.0.Final\kie-api-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\soup\kie-soup-maven-support\7.60.0.Final\kie-soup-maven-support-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-internal\7.60.0.Final\kie-internal-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-core\7.60.0.Final\drools-core-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\soup\kie-soup-xstream\7.60.0.Final\kie-soup-xstream-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-core-reflective\7.60.0.Final\drools-core-reflective-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\kie\kie-memory-compiler\7.60.0.Final\kie-memory-compiler-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-core-dynamic\7.60.0.Final\drools-core-dynamic-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-compiler\7.60.0.Final\drools-compiler-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-ecj\7.60.0.Final\drools-ecj-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\antlr\antlr-runtime\3.5.2\antlr-runtime-3.5.2.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-core\6.1.4\spring-core-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-jcl\6.1.4\spring-jcl-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-beans\6.1.4\spring-beans-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-context\6.1.4\spring-context-6.1.4.jar;C:\Users\guendil_z\.m2\repository\com\thoughtworks\xstream\xstream\1.4.18\xstream-1.4.18.jar;C:\Users\guendil_z\.m2\repository\io\github\x-stream\mxparser\1.2.2\mxparser-1.2.2.jar;C:\Users\guendil_z\.m2\repository\xmlpull\xmlpull\1.1.3.1\xmlpull-1.1.3.1.jar;C:\Users\guendil_z\.m2\repository\org\slf4j\slf4j-api\2.0.12\slf4j-api-2.0.12.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-decisiontables\7.60.0.Final\drools-decisiontables-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\drools\drools-templates\7.60.0.Final\drools-templates-7.60.0.Final.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-web\3.2.3\spring-boot-starter-web-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter\3.2.3\spring-boot-starter-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot\3.2.3\spring-boot-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-autoconfigure\3.2.3\spring-boot-autoconfigure-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-logging\3.2.3\spring-boot-starter-logging-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\apache\logging\log4j\log4j-to-slf4j\2.21.1\log4j-to-slf4j-2.21.1.jar;C:\Users\guendil_z\.m2\repository\org\apache\logging\log4j\log4j-api\2.21.1\log4j-api-2.21.1.jar;C:\Users\guendil_z\.m2\repository\jakarta\annotation\jakarta.annotation-api\2.1.1\jakarta.annotation-api-2.1.1.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-json\3.2.3\spring-boot-starter-json-3.2.3.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jdk8\2.15.4\jackson-datatype-jdk8-2.15.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-tomcat\3.2.3\spring-boot-starter-tomcat-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\apache\tomcat\embed\tomcat-embed-core\10.1.19\tomcat-embed-core-10.1.19.jar;C:\Users\guendil_z\.m2\repository\org\apache\tomcat\embed\tomcat-embed-websocket\10.1.19\tomcat-embed-websocket-10.1.19.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-web\6.1.4\spring-web-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-webmvc\6.1.4\spring-webmvc-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-security\3.2.3\spring-boot-starter-security-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-aop\6.1.4\spring-aop-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\security\spring-security-config\6.2.2\spring-security-config-6.2.2.jar;C:\Users\guendil_z\.m2\repository\org\springframework\security\spring-security-web\6.2.2\spring-security-web-6.2.2.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-actuator\3.2.3\spring-boot-starter-actuator-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-actuator-autoconfigure\3.2.3\spring-boot-actuator-autoconfigure-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-actuator\3.2.3\spring-boot-actuator-3.2.3.jar;C:\Users\guendil_z\.m2\repository\io\micrometer\micrometer-observation\1.12.3\micrometer-observation-1.12.3.jar;C:\Users\guendil_z\.m2\repository\io\micrometer\micrometer-commons\1.12.3\micrometer-commons-1.12.3.jar;C:\Users\guendil_z\.m2\repository\io\micrometer\micrometer-jakarta9\1.12.3\micrometer-jakarta9-1.12.3.jar;C:\Users\guendil_z\.m2\repository\io\micrometer\micrometer-core\1.12.3\micrometer-core-1.12.3.jar;C:\Users\guendil_z\.m2\repository\org\hdrhistogram\HdrHistogram\2.1.12\HdrHistogram-2.1.12.jar;C:\Users\guendil_z\.m2\repository\org\latencyutils\LatencyUtils\2.0.3\LatencyUtils-2.0.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-validation\3.2.3\spring-boot-starter-validation-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\apache\tomcat\embed\tomcat-embed-el\10.1.19\tomcat-embed-el-10.1.19.jar;C:\Users\guendil_z\.m2\repository\org\hibernate\validator\hibernate-validator\8.0.1.Final\hibernate-validator-8.0.1.Final.jar;C:\Users\guendil_z\.m2\repository\jakarta\validation\jakarta.validation-api\3.0.2\jakarta.validation-api-3.0.2.jar;C:\Users\guendil_z\.m2\repository\org\jboss\logging\jboss-logging\3.5.3.Final\jboss-logging-3.5.3.Final.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\classmate\1.6.0\classmate-1.6.0.jar;C:\Users\guendil_z\.m2\repository\org\apache\httpcomponents\core5\httpcore5\5.2.4\httpcore5-5.2.4.jar;C:\Users\guendil_z\.m2\repository\org\apache\httpcomponents\client5\httpclient5\5.2.3\httpclient5-5.2.3.jar;C:\Users\guendil_z\.m2\repository\org\apache\httpcomponents\core5\httpcore5-h2\5.2.4\httpcore5-h2-5.2.4.jar;C:\Users\guendil_z\.m2\repository\com\h2database\h2\2.2.224\h2-2.2.224.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-data-jpa\3.2.3\spring-boot-starter-data-jpa-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-aop\3.2.3\spring-boot-starter-aop-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\aspectj\aspectjweaver\1.9.21\aspectjweaver-1.9.21.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-jdbc\3.2.3\spring-boot-starter-jdbc-3.2.3.jar;C:\Users\guendil_z\.m2\repository\com\zaxxer\HikariCP\5.0.1\HikariCP-5.0.1.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-jdbc\6.1.4\spring-jdbc-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\hibernate\orm\hibernate-core\6.4.4.Final\hibernate-core-6.4.4.Final.jar;C:\Users\guendil_z\.m2\repository\jakarta\persistence\jakarta.persistence-api\3.1.0\jakarta.persistence-api-3.1.0.jar;C:\Users\guendil_z\.m2\repository\jakarta\transaction\jakarta.transaction-api\2.0.1\jakarta.transaction-api-2.0.1.jar;C:\Users\guendil_z\.m2\repository\org\hibernate\common\hibernate-commons-annotations\6.0.6.Final\hibernate-commons-annotations-6.0.6.Final.jar;C:\Users\guendil_z\.m2\repository\io\smallrye\jandex\3.1.2\jandex-3.1.2.jar;C:\Users\guendil_z\.m2\repository\net\bytebuddy\byte-buddy\1.14.12\byte-buddy-1.14.12.jar;C:\Users\guendil_z\.m2\repository\org\glassfish\jaxb\jaxb-runtime\4.0.4\jaxb-runtime-4.0.4.jar;C:\Users\guendil_z\.m2\repository\org\glassfish\jaxb\jaxb-core\4.0.4\jaxb-core-4.0.4.jar;C:\Users\guendil_z\.m2\repository\org\eclipse\angus\angus-activation\2.0.1\angus-activation-2.0.1.jar;C:\Users\guendil_z\.m2\repository\org\glassfish\jaxb\txw2\4.0.4\txw2-4.0.4.jar;C:\Users\guendil_z\.m2\repository\com\sun\istack\istack-commons-runtime\4.1.2\istack-commons-runtime-4.1.2.jar;C:\Users\guendil_z\.m2\repository\jakarta\inject\jakarta.inject-api\2.0.1\jakarta.inject-api-2.0.1.jar;C:\Users\guendil_z\.m2\repository\org\antlr\antlr4-runtime\4.13.0\antlr4-runtime-4.13.0.jar;C:\Users\guendil_z\.m2\repository\org\springframework\data\spring-data-jpa\3.2.3\spring-data-jpa-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\data\spring-data-commons\3.2.3\spring-data-commons-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-orm\6.1.4\spring-orm-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-aspects\6.1.4\spring-aspects-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-test\3.2.3\spring-boot-starter-test-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-test\3.2.3\spring-boot-test-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-test-autoconfigure\3.2.3\spring-boot-test-autoconfigure-3.2.3.jar;C:\Users\guendil_z\.m2\repository\com\jayway\jsonpath\json-path\2.9.0\json-path-2.9.0.jar;C:\Users\guendil_z\.m2\repository\jakarta\xml\bind\jakarta.xml.bind-api\4.0.1\jakarta.xml.bind-api-4.0.1.jar;C:\Users\guendil_z\.m2\repository\jakarta\activation\jakarta.activation-api\2.1.2\jakarta.activation-api-2.1.2.jar;C:\Users\guendil_z\.m2\repository\net\minidev\json-smart\2.5.0\json-smart-2.5.0.jar;C:\Users\guendil_z\.m2\repository\net\minidev\accessors-smart\2.5.0\accessors-smart-2.5.0.jar;C:\Users\guendil_z\.m2\repository\org\ow2\asm\asm\9.3\asm-9.3.jar;C:\Users\guendil_z\.m2\repository\org\assertj\assertj-core\3.24.2\assertj-core-3.24.2.jar;C:\Users\guendil_z\.m2\repository\org\awaitility\awaitility\4.2.0\awaitility-4.2.0.jar;C:\Users\guendil_z\.m2\repository\org\hamcrest\hamcrest\2.2\hamcrest-2.2.jar;C:\Users\guendil_z\.m2\repository\org\junit\jupiter\junit-jupiter\5.10.2\junit-jupiter-5.10.2.jar;C:\Users\guendil_z\.m2\repository\org\junit\jupiter\junit-jupiter-api\5.10.2\junit-jupiter-api-5.10.2.jar;C:\Users\guendil_z\.m2\repository\org\opentest4j\opentest4j\1.3.0\opentest4j-1.3.0.jar;C:\Users\guendil_z\.m2\repository\org\junit\platform\junit-platform-commons\1.10.2\junit-platform-commons-1.10.2.jar;C:\Users\guendil_z\.m2\repository\org\apiguardian\apiguardian-api\1.1.2\apiguardian-api-1.1.2.jar;C:\Users\guendil_z\.m2\repository\org\junit\jupiter\junit-jupiter-params\5.10.2\junit-jupiter-params-5.10.2.jar;C:\Users\guendil_z\.m2\repository\org\junit\jupiter\junit-jupiter-engine\5.10.2\junit-jupiter-engine-5.10.2.jar;C:\Users\guendil_z\.m2\repository\org\junit\platform\junit-platform-engine\1.10.2\junit-platform-engine-1.10.2.jar;C:\Users\guendil_z\.m2\repository\org\mockito\mockito-core\5.7.0\mockito-core-5.7.0.jar;C:\Users\guendil_z\.m2\repository\net\bytebuddy\byte-buddy-agent\1.14.12\byte-buddy-agent-1.14.12.jar;C:\Users\guendil_z\.m2\repository\org\objenesis\objenesis\3.3\objenesis-3.3.jar;C:\Users\guendil_z\.m2\repository\org\mockito\mockito-junit-jupiter\5.7.0\mockito-junit-jupiter-5.7.0.jar;C:\Users\guendil_z\.m2\repository\org\skyscreamer\jsonassert\1.5.1\jsonassert-1.5.1.jar;C:\Users\guendil_z\.m2\repository\com\vaadin\external\google\android-json\0.0.20131108.vaadin1\android-json-0.0.20131108.vaadin1.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-test\6.1.4\spring-test-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\xmlunit\xmlunit-core\2.9.1\xmlunit-core-2.9.1.jar;C:\Users\guendil_z\.m2\repository\org\apache\commons\commons-collections4\4.4\commons-collections4-4.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-cache\3.2.3\spring-boot-starter-cache-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-context-support\6.1.4\spring-context-support-6.1.4.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\jackson\dataformat\jackson-dataformat-xml\2.15.4\jackson-dataformat-xml-2.15.4.jar;C:\Users\guendil_z\.m2\repository\org\codehaus\woodstox\stax2-api\4.2.1\stax2-api-4.2.1.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\woodstox\woodstox-core\6.5.1\woodstox-core-6.5.1.jar;C:\Users\guendil_z\.m2\repository\org\yaml\snakeyaml\2.0\snakeyaml-2.0.jar;C:\Users\guendil_z\.m2\repository\org\springframework\security\spring-security-core\6.2.2\spring-security-core-6.2.2.jar;C:\Users\guendil_z\.m2\repository\org\springframework\security\spring-security-crypto\6.2.2\spring-security-crypto-6.2.2.jar;C:\Users\guendil_z\.m2\repository\org\springframework\spring-expression\6.1.4\spring-expression-6.1.4.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-data-mongodb\3.2.3\spring-boot-starter-data-mongodb-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\mongodb\mongodb-driver-sync\4.11.1\mongodb-driver-sync-4.11.1.jar;C:\Users\guendil_z\.m2\repository\org\mongodb\bson\4.11.1\bson-4.11.1.jar;C:\Users\guendil_z\.m2\repository\org\mongodb\mongodb-driver-core\4.11.1\mongodb-driver-core-4.11.1.jar;C:\Users\guendil_z\.m2\repository\org\mongodb\bson-record-codec\4.11.1\bson-record-codec-4.11.1.jar;C:\Users\guendil_z\.m2\repository\org\springframework\data\spring-data-mongodb\4.2.3\spring-data-mongodb-4.2.3.jar;C:\Users\guendil_z\.m2\repository\org\projectlombok\lombok\1.18.30\lombok-1.18.30.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-starter-data-rest\3.2.3\spring-boot-starter-data-rest-3.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\data\spring-data-rest-webmvc\4.2.3\spring-data-rest-webmvc-4.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\data\spring-data-rest-core\4.2.3\spring-data-rest-core-4.2.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\hateoas\spring-hateoas\2.2.0\spring-hateoas-2.2.0.jar;C:\Users\guendil_z\.m2\repository\org\springframework\plugin\spring-plugin-core\3.0.0\spring-plugin-core-3.0.0.jar;C:\Users\guendil_z\.m2\repository\org\atteo\evo-inflector\1.3\evo-inflector-1.3.jar;C:\Users\guendil_z\.m2\repository\org\springframework\boot\spring-boot-configuration-processor\3.2.3\spring-boot-configuration-processor-3.2.3.jar;C:\Users\guendil_z\.m2\repository\com\cl\logs\common-logger\4.0.0\common-logger-4.0.0.jar;C:\Users\guendil_z\.m2\repository\ch\qos\logback\logback-classic\1.4.14\logback-classic-1.4.14.jar;C:\Users\guendil_z\.m2\repository\ch\qos\logback\logback-core\1.4.14\logback-core-1.4.14.jar;C:\Users\guendil_z\.m2\repository\org\slf4j\jul-to-slf4j\2.0.12\jul-to-slf4j-2.0.12.jar;C:\Users\guendil_z\.m2\repository\org\apache\commons\commons-lang3\3.13.0\commons-lang3-3.13.0.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jsr310\2.13.4\jackson-datatype-jsr310-2.13.4.jar;C:\Users\guendil_z\.m2\repository\org\springdoc\springdoc-openapi-starter-webmvc-ui\2.1.0\springdoc-openapi-starter-webmvc-ui-2.1.0.jar;C:\Users\guendil_z\.m2\repository\org\springdoc\springdoc-openapi-starter-webmvc-api\2.1.0\springdoc-openapi-starter-webmvc-api-2.1.0.jar;C:\Users\guendil_z\.m2\repository\org\springdoc\springdoc-openapi-starter-common\2.1.0\springdoc-openapi-starter-common-2.1.0.jar;C:\Users\guendil_z\.m2\repository\io\swagger\core\v3\swagger-core-jakarta\2.2.9\swagger-core-jakarta-2.2.9.jar;C:\Users\guendil_z\.m2\repository\io\swagger\core\v3\swagger-annotations-jakarta\2.2.9\swagger-annotations-jakarta-2.2.9.jar;C:\Users\guendil_z\.m2\repository\io\swagger\core\v3\swagger-models-jakarta\2.2.9\swagger-models-jakarta-2.2.9.jar;C:\Users\guendil_z\.m2\repository\com\fasterxml\jackson\dataformat\jackson-dataformat-yaml\2.15.4\jackson-dataformat-yaml-2.15.4.jar;C:\Users\guendil_z\.m2\repository\org\webjars\swagger-ui\4.18.2\swagger-ui-4.18.2.jar;C:\Users\guendil_z\.m2\repository\javax\xml\bind\jaxb-api\2.3.1\jaxb-api-2.3.1.jar;C:\Users\guendil_z\.m2\repository\javax\activation\javax.activation-api\1.2.0\javax.activation-api-1.2.0.jar;C:\Users\guendil_z\.m2\repository\org\apache\poi\poi\5.0.0\poi-5.0.0.jar;C:\Users\guendil_z\.m2\repository\org\slf4j\jcl-over-slf4j\2.0.12\jcl-over-slf4j-2.0.12.jar;C:\Users\guendil_z\.m2\repository\commons-codec\commons-codec\1.16.1\commons-codec-1.16.1.jar;C:\Users\guendil_z\.m2\repository\org\apache\commons\commons-math3\3.6.1\commons-math3-3.6.1.jar;C:\Users\guendil_z\.m2\repository\com\zaxxer\SparseBitSet\1.2\SparseBitSet-1.2.jar;C:\Users\guendil_z\.m2\repository\org\apache\poi\poi-ooxml\5.0.0\poi-ooxml-5.0.0.jar;C:\Users\guendil_z\.m2\repository\org\apache\poi\poi-ooxml-lite\5.0.0\poi-ooxml-lite-5.0.0.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlbeans\xmlbeans\4.0.0\xmlbeans-4.0.0.jar;C:\Users\guendil_z\.m2\repository\org\apache\commons\commons-compress\1.20\commons-compress-1.20.jar;C:\Users\guendil_z\.m2\repository\com\github\virtuald\curvesapi\1.06\curvesapi-1.06.jar;C:\Users\guendil_z\.m2\repository\org\bouncycastle\bcpkix-jdk15on\1.68\bcpkix-jdk15on-1.68.jar;C:\Users\guendil_z\.m2\repository\org\bouncycastle\bcprov-jdk15on\1.68\bcprov-jdk15on-1.68.jar;C:\Users\guendil_z\.m2\repository\org\apache\santuario\xmlsec\2.2.1\xmlsec-2.2.1.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-all\1.13\batik-all-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-anim\1.13\batik-anim-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-shared-resources\1.13\batik-shared-resources-1.13.jar;C:\Users\guendil_z\.m2\repository\xml-apis\xml-apis-ext\1.3.04\xml-apis-ext-1.3.04.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-awt-util\1.13\batik-awt-util-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\xmlgraphics-commons\2.4\xmlgraphics-commons-2.4.jar;C:\Users\guendil_z\.m2\repository\commons-io\commons-io\1.3.1\commons-io-1.3.1.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-bridge\1.13\batik-bridge-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-codec\1.13\batik-codec-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-constants\1.13\batik-constants-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-css\1.13\batik-css-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-dom\1.13\batik-dom-1.13.jar;C:\Users\guendil_z\.m2\repository\xalan\xalan\2.7.2\xalan-2.7.2.jar;C:\Users\guendil_z\.m2\repository\xalan\serializer\2.7.2\serializer-2.7.2.jar;C:\Users\guendil_z\.m2\repository\xml-apis\xml-apis\1.4.01\xml-apis-1.4.01.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-ext\1.13\batik-ext-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-extension\1.13\batik-extension-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-gui-util\1.13\batik-gui-util-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-gvt\1.13\batik-gvt-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-i18n\1.13\batik-i18n-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-parser\1.13\batik-parser-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-rasterizer-ext\1.13\batik-rasterizer-ext-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-rasterizer\1.13\batik-rasterizer-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-script\1.13\batik-script-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-slideshow\1.13\batik-slideshow-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-squiggle-ext\1.13\batik-squiggle-ext-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-squiggle\1.13\batik-squiggle-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-svg-dom\1.13\batik-svg-dom-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-svgbrowser\1.13\batik-svgbrowser-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-svggen\1.13\batik-svggen-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-svgpp\1.13\batik-svgpp-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-svgrasterizer\1.13\batik-svgrasterizer-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-swing\1.13\batik-swing-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-transcoder\1.13\batik-transcoder-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-util\1.13\batik-util-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-ttf2svg\1.13\batik-ttf2svg-1.13.jar;C:\Users\guendil_z\.m2\repository\org\apache\xmlgraphics\batik-xml\1.13\batik-xml-1.13.jar;C:\Users\guendil_z\.m2\repository\de\rototor\pdfbox\graphics2d\0.30\graphics2d-0.30.jar;C:\Users\guendil_z\.m2\repository\org\apache\pdfbox\pdfbox\2.0.22\pdfbox-2.0.22.jar;C:\Users\guendil_z\.m2\repository\org\apache\pdfbox\fontbox\2.0.22\fontbox-2.0.22.jar" com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.cl.msofd.controller.AdemeControllerTest
Java HotSpot(TM) 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
00:17:59.271 [main] INFO org.hibernate.validator.internal.util.Version -- HV000001: Hibernate Validator 8.0.1.Final
00:18:00.388 [main] INFO org.springframework.mock.web.MockServletContext -- Initializing Spring TestDispatcherServlet ''
00:18:00.388 [main] INFO org.springframework.test.web.servlet.TestDispatcherServlet -- Initializing Servlet ''
00:18:00.396 [main] INFO org.springframework.test.web.servlet.TestDispatcherServlet -- Completed initialization in 5 ms
00:18:00.616 [main] INFO com.cl.msofd.controller.AdemeController -- getDpeAdeme : 123456

java.lang.AssertionError: No value at JSON path "$.numDpe"

	at org.springframework.test.util.JsonPathExpectationsHelper.evaluateJsonPath(JsonPathExpectationsHelper.java:302)
	at org.springframework.test.util.JsonPathExpectationsHelper.assertValue(JsonPathExpectationsHelper.java:99)
	at org.springframework.test.web.servlet.result.JsonPathResultMatchers.lambda$value$2(JsonPathResultMatchers.java:111)
	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:214)
	at com.cl.msofd.controller.AdemeControllerTest.testGetDpeSuccess(AdemeControllerTest.java:47)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
Caused by: com.jayway.jsonpath.PathNotFoundException: Expected to find an object with property ['numDpe'] in path $ but found 'java.lang.String'. This is not a json object according to the JsonProvider: 'com.jayway.jsonpath.spi.json.JsonSmartJsonProvider'.

00:18:00.911 [main] INFO org.springframework.mock.web.MockServletContext -- Initializing Spring TestDispatcherServlet ''
00:18:00.911 [main] INFO org.springframework.test.web.servlet.TestDispatcherServlet -- Initializing Servlet ''
00:18:00.911 [main] INFO org.springframework.test.web.servlet.TestDispatcherServlet -- Completed initialization in 0 ms
00:18:00.915 [main] INFO com.cl.msofd.controller.AdemeController -- getDpeAdeme : 123456

java.lang.AssertionError: No value at JSON path "$.numDpe"

	at org.springframework.test.util.JsonPathExpectationsHelper.evaluateJsonPath(JsonPathExpectationsHelper.java:302)
	at org.springframework.test.util.JsonPathExpectationsHelper.assertValue(JsonPathExpectationsHelper.java:99)
	at org.springframework.test.web.servlet.result.JsonPathResultMatchers.lambda$value$2(JsonPathResultMatchers.java:111)
	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:214)
	at com.cl.msofd.controller.AdemeControllerTest.testGetDpeNeufSuccess(AdemeControllerTest.java:72)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
Caused by: com.jayway.jsonpath.PathNotFoundException: Expected to find an object with property ['numDpe'] in path $ but found 'java.lang.String'. This is not a json object according to the JsonProvider: 'com.jayway.jsonpath.spi.json.JsonSmartJsonProvider'.

00:18:00.952 [main] INFO org.springframework.mock.web.MockServletContext -- Initializing Spring TestDispatcherServlet ''
00:18:00.953 [main] INFO org.springframework.test.web.servlet.TestDispatcherServlet -- Initializing Servlet ''
00:18:00.953 [main] INFO org.springframework.test.web.servlet.TestDispatcherServlet -- Completed initialization in 0 ms
00:18:00.955 [main] INFO com.cl.msofd.controller.AdemeController -- getDpeAdeme : 123456
00:18:00.956 [main] ERROR com.cl.msofd.controller.AdemeController -- ExecutionException: 
java.util.concurrent.ExecutionException: Execution exception
	at com.cl.msofd.service.DpeAdemeService.getDpe(DpeAdemeService.java:59)
	at com.cl.msofd.controller.AdemeController.getDpe(AdemeController.java:55)
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
	at org.springframework.test.web.servlet.TestDispatcherServlet.service(TestDispatcherServlet.java:72)
	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
	at org.springframework.mock.web.MockFilterChain$ServletFilterProxy.doFilter(MockFilterChain.java:165)
	at org.springframework.mock.web.MockFilterChain.doFilter(MockFilterChain.java:132)
	at org.springframework.test.web.servlet.MockMvc.perform(MockMvc.java:201)
	at com.cl.msofd.controller.AdemeControllerTest.testGetDpeInternalServerError(AdemeControllerTest.java:82)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at org.junit.platform.commons.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:728)
	at org.junit.jupiter.engine.execution.MethodInvocation.proceed(MethodInvocation.java:60)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain$ValidatingInvocation.proceed(InvocationInterceptorChain.java:131)
	at org.junit.jupiter.engine.extension.TimeoutExtension.intercept(TimeoutExtension.java:156)
	at org.junit.jupiter.engine.extension.TimeoutExtension.interceptTestableMethod(TimeoutExtension.java:147)
	at org.junit.jupiter.engine.extension.TimeoutExtension.interceptTestMethod(TimeoutExtension.java:86)
	at org.junit.jupiter.engine.execution.InterceptingExecutableInvoker$ReflectiveInterceptorCall.lambda$ofVoidMethod$0(InterceptingExecutableInvoker.java:103)
	at org.junit.jupiter.engine.execution.InterceptingExecutableInvoker.lambda$invoke$0(InterceptingExecutableInvoker.java:93)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain$InterceptedInvocation.proceed(InvocationInterceptorChain.java:106)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain.proceed(InvocationInterceptorChain.java:64)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain.chainAndInvoke(InvocationInterceptorChain.java:45)
	at org.junit.jupiter.engine.execution.InvocationInterceptorChain.invoke(InvocationInterceptorChain.java:37)
	at org.junit.jupiter.engine.execution.InterceptingExecutableInvoker.invoke(InterceptingExecutableInvoker.java:92)
	at org.junit.jupiter.engine.execution.InterceptingExecutableInvoker.invoke(InterceptingExecutableInvoker.java:86)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.lambda$invokeTestMethod$7(TestMethodTestDescriptor.java:218)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.invokeTestMethod(TestMethodTestDescriptor.java:214)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.execute(TestMethodTestDescriptor.java:139)
	at org.junit.jupiter.engine.descriptor.TestMethodTestDescriptor.execute(TestMethodTestDescriptor.java:69)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$6(NodeTestTask.java:151)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:141)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:137)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$9(NodeTestTask.java:139)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:138)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:95)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.invokeAll(SameThreadHierarchicalTestExecutorService.java:41)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$6(NodeTestTask.java:155)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:141)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:137)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$9(NodeTestTask.java:139)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:138)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:95)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.invokeAll(SameThreadHierarchicalTestExecutorService.java:41)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$6(NodeTestTask.java:155)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$8(NodeTestTask.java:141)
	at org.junit.platform.engine.support.hierarchical.Node.around(Node.java:137)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.lambda$executeRecursively$9(NodeTestTask.java:139)
	at org.junit.platform.engine.support.hierarchical.ThrowableCollector.execute(ThrowableCollector.java:73)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.executeRecursively(NodeTestTask.java:138)
	at org.junit.platform.engine.support.hierarchical.NodeTestTask.execute(NodeTestTask.java:95)
	at org.junit.platform.engine.support.hierarchical.SameThreadHierarchicalTestExecutorService.submit(SameThreadHierarchicalTestExecutorService.java:35)
	at org.junit.platform.engine.support.hierarchical.HierarchicalTestExecutor.execute(HierarchicalTestExecutor.java:57)
	at org.junit.platform.engine.support.hierarchical.HierarchicalTestEngine.execute(HierarchicalTestEngine.java:54)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.execute(EngineExecutionOrchestrator.java:198)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.execute(EngineExecutionOrchestrator.java:169)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.execute(EngineExecutionOrchestrator.java:93)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.lambda$execute$0(EngineExecutionOrchestrator.java:58)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.withInterceptedStreams(EngineExecutionOrchestrator.java:141)
	at org.junit.platform.launcher.core.EngineExecutionOrchestrator.execute(EngineExecutionOrchestrator.java:57)
	at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:103)
	at org.junit.platform.launcher.core.DefaultLauncher.execute(DefaultLauncher.java:85)
	at org.junit.platform.launcher.core.DelegatingLauncher.execute(DelegatingLauncher.java:47)
	at org.junit.platform.launcher.core.SessionPerRequestLauncher.execute(SessionPerRequestLauncher.java:63)
	at com.intellij.junit5.JUnit5IdeaTestRunner.startRunnerWithArgs(JUnit5IdeaTestRunner.java:57)
	at com.intellij.rt.junit.IdeaTestRunner$Repeater$1.execute(IdeaTestRunner.java:38)
	at com.intellij.rt.execution.junit.TestsRepeater.repeat(TestsRepeater.java:11)
	at com.intellij.rt.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:35)
	at com.intellij.rt.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:232)
	at com.intellij.rt.junit.JUnitStarter.main(JUnitStarter.java:55)
Caused by: java.lang.Throwable: null
	at com.cl.msofd.controller.AdemeControllerTest.testGetDpeInternalServerError(AdemeControllerTest.java:80)
	... 70 common frames omitted

java.lang.AssertionError: Status expected:<500> but was:<204>
Expected :500
Actual   :204
<Click to see difference>


	at org.springframework.test.util.AssertionErrors.fail(AssertionErrors.java:59)
	at org.springframework.test.util.AssertionErrors.assertEquals(AssertionErrors.java:122)
	at org.springframework.test.web.servlet.result.StatusResultMatchers.lambda$matcher$9(StatusResultMatchers.java:637)
	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:214)
	at com.cl.msofd.controller.AdemeControllerTest.testGetDpeInternalServerError(AdemeControllerTest.java:84)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)

00:18:01.000 [main] INFO org.springframework.mock.web.MockServletContext -- Initializing Spring TestDispatcherServlet ''
00:18:01.001 [main] INFO org.springframework.test.web.servlet.TestDispatcherServlet -- Initializing Servlet ''
00:18:01.001 [main] INFO org.springframework.test.web.servlet.TestDispatcherServlet -- Completed initialization in 0 ms
00:18:01.003 [main] INFO com.cl.msofd.controller.AdemeController -- getDpeAdeme : 123456

java.lang.AssertionError: Status expected:<404> but was:<200>
Expected :404
Actual   :200
<Click to see difference>


	at org.springframework.test.util.AssertionErrors.fail(AssertionErrors.java:59)
	at org.springframework.test.util.AssertionErrors.assertEquals(AssertionErrors.java:122)
	at org.springframework.test.web.servlet.result.StatusResultMatchers.lambda$matcher$9(StatusResultMatchers.java:637)
	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:214)
	at com.cl.msofd.controller.AdemeControllerTest.testGetDpeNotFound(AdemeControllerTest.java:58)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)


Process finished with exit code -1
