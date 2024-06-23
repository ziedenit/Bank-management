System.out.println("Generated rules: \n" + rulesContent.toString()); // Log generated rules

  if (kieBuilder.getResults().hasMessages(org.kie.api.builder.Message.Level.ERROR)) {
        System.out.println("Error building KieBase: " + kieBuilder.getResults().toString());
    }
