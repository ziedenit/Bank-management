// Importer les packages nécessaires
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

public class DroolsTest {

    public static void main(String[] args) {
        try {
            // Créer KieServices
            KieServices ks = KieServices.Factory.get();
            KieContainer kContainer = ks.getKieClasspathContainer();
            KieSession kSession = kContainer.newKieSession("ksession-rules");

            // Initialiser la liste de réponses
            List<AcquisitionResponse> responses = new ArrayList<>();

            // Définir la variable globale 'responses'
            kSession.setGlobal("responses", responses);

            // Créer une instance d'Acquisition
            Acquisition acquisition = new Acquisition();
            // Initialiser les valeurs de l'acquisition ici

            // Insérer l'acquisition dans la session
            kSession.insert(acquisition);

            // Exécuter les règles
            kSession.fireAllRules();

            // Afficher les réponses
            for (AcquisitionResponse response : responses) {
                System.out.println(response);
            }

            // Fermer la session
            kSession.dispose();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
