private void reloadDroolsFile(String outputDroolsFile) {
    KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
    kieFileSystem.write(ResourceFactory.newFileResource(outputDroolsFile));

    KieBuilder kieBuilder = kieServices.newKieBuilder(kieFileSystem);
    kieBuilder.buildAll();

    if (kieBuilder.getResults().hasMessages(org.kie.api.builder.Message.Level.ERROR)) {
        throw new IllegalStateException("Erreur lors de la compilation des règles : " + kieBuilder.getResults().toString());
    }

    ReleaseId releaseId = kieBuilder.getKieModule().getReleaseId();
    kieContainer.updateToVersion(releaseId);
}
