 static {
        KieSession ksession = kieContainer.newKieSession();
        ksession.setGlobal("responses", responses);
    }

 public static KieSession getSession() {
        return kieContainer.newKieSession();
    }
