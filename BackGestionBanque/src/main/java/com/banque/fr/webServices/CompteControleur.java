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

    private DpeAdeme dpeAdemePersist;


    public DpeAdeme create(DpeAdeme dpeAdeme) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("create dpeAdeme : {}", dpeAdeme);
        Optional<DpeAdeme> existingDpe = dpeAdemeRepositoryCustom.findByNumDpe(dpeAdeme.getNumDpe());
        return (DpeAdeme) existingDpe.map(dpe -> {
            throw new DpeAdemeExistingException(String.format("le numéro DPE %s est déja crée ", dpeAdeme.getNumDpe()));
        }).orElseGet(() -> dpeAdemeRepository.save(dpeAdeme));
    }


    public DpeAdeme getDpe(String numDpe) throws ExecutionException, InterruptedException, IOException {

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
                 dpeAdemePersist = create(dpeAdeme);

            }
            return dpeAdemePersist;
        } else {
            throw new DpeAdemeNotFoundException(String.format("Le DPE %s est inexistant", numDpe));
        }
    }
       
}
i have proxy to mock to test this service how ca i do a class test for this service 
@Configuration
public class AppConfiguration {

    @Value("${ademe.proxy.host}")
    private String proxyHost;

    @Value("${ademe.proxy.port}")
    private int proxyPort;
