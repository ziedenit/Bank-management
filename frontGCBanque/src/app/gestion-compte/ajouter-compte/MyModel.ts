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
