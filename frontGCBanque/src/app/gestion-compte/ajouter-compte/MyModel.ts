import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.rule.FactHandle;
import java.util.ArrayList;
import java.util.List;

public class DroolsTest {
    public static void main(String[] args) {
        try {
            // Load the KIE services
            KieServices ks = KieServices.Factory.get();
            KieContainer kContainer = ks.getKieClasspathContainer();
            KieSession kSession = kContainer.newKieSession("ksession-rules");

            // Initialize the global variable
            List<AcquisitionResponse> responses = new ArrayList<>();
            kSession.setGlobal("responses", responses);

            // Insert facts into the session
            Acquisition acquisition = new Acquisition();
            // Set properties of acquisition

            FactHandle fact1 = kSession.insert(acquisition);

            // Fire all rules
            kSession.fireAllRules();

            // Retrieve the results
            for (AcquisitionResponse response : responses) {
                System.out.println(response);
            }

            // Dispose the session
            kSession.dispose();
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
}
