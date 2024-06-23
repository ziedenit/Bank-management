    reloadDroolsFile(outputDroolsFile);
    }

    private void reloadDroolsFile(String outputDroolsFile) {
        KieFileSystem kieFileSystem = kieContainer.getKieServices().newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newFileResource(outputDroolsFile));
        KieBuilder kieBuilder = kieContainer.getKieServices().newKieBuilder(kieFileSystem);
        kieBuilder.buildAll();
        kieContainer.updateToVersion(kieBuilder.getKieModule().getReleaseId());
    }
