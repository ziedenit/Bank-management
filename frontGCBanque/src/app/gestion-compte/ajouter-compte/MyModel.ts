@Test
void testDeleteFinancementByIdFinancement() {
    doAnswer(invocation -> {
        return null;
    }).when(financementRepository).deleteByIdFinancement("FR51TLJ5K");

    financementService.deleteFinancementByIdFinancement("FR51TLJ5K");

    verify(financementRepository, times(1)).deleteByIdFinancement("FR51TLJ5K");
}
