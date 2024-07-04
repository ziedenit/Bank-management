financement.getObjetFinancement().forEach(objetFinancement -> {
    objetFinancement.setIdObjetFinancement(idGeneratorService.generateId("O"));
    if (objetFinancement.getGarantie() != null) 
        objetFinancement.getGarantie().forEach(garantie -> garantie.setIdGarantie(idGeneratorService.generateId("G")));
});
//
@Test
void testGetGarantieWithEmptyList() {
    when(financementRepository.findByidFinancement("FR51TLJ5K")).thenReturn(Optional.of(emptyFinancement));

    assertThrows(GarantieNotFoundException.class, () -> {
        financementService.getGarantie("FR51TLJ5K", "INVALID");
    });
}
//

List<String> idGaranties = savedFinancement.getObjetFinancement().get(0).getGarantie()
    .stream()
    .map(Garantie::getIdGarantie)
    .toList();
//
private void updateFieldIfNotNull(Financement existingFinancement, Financement financementToUpdate, Field field) {
    String fieldName = field.getName();
    try {
        field.setAccessible(true);
        Object newValue = field.get(financementToUpdate);
        if (newValue != null) {
            Field targetField = Financement.class.getDeclaredField(fieldName);
            targetField.setAccessible(true);
            targetField.set(existingFinancement, newValue);
        }
    } catch (NoSuchFieldException | IllegalAccessException e) {
        commonLogger.eventTyp(EventTyp.APPLICATIVE).secEventTyp(SecEventTyp.METIER).logger().info("Erreur lors de l'update du financement causé par: {}", e.getMessage());
    }
}
