j'ai modifier de la meme facon et j'ai ce fichier drl genere et sur lequel je me base pour lance ce service 
package com.cl.msofd.engineRules;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DroolsService {
    @Autowired
    private KieContainer kieContainer;


    public AcquisitionResponse applyRules(Acquisition acquisition) {
        List<AcquisitionResponse> responses = new ArrayList<>();
        KieSession kieSession = kieContainer.newKieSession();
        kieSession.insert(acquisition);
        kieSession.setGlobal("responses", responses);
        kieSession.fireAllRules();

        return responses.isEmpty() ? null : responses.get(0);
    }
}
mais toujours  un probleme au niveau de cette instruction   kieSession.setGlobal("responses", responses);
<ErrorResponse>
    <code>TECHNICAL_EXCEPTION_OCCURED </code>
    <message>
        <message>Unexpected global [responses]</message>
    </message>
</ErrorResponse>
