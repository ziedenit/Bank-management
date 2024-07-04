@Test
void test_alignementAcquisitionAncien() throws ParseException {
    Date endDate = formatDate.parse("31/12/2012");

    // Test case where DPE is present, construction year is valid and within range
    String result = alignementService.alignementAcquisitionAncien(true, "A", 100, 150, 200, "RT2012", 2005);
    assertEquals("01", result);

    // Test case where construction year is valid and within range but no DPE
    result = alignementService.alignementAcquisitionAncien(false, "A", 100, 150, 200, "RT2012", 2010);
    assertEquals("01", result);

    // Test case for year 2021
    result = alignementService.alignementAcquisitionAncien(true, "A", 100, 150, 200, "RT2012", 2021);
    assertEquals("01", result);

    // Test case for year 2022 or after
    result = alignementService.alignementAcquisitionAncien(true, "A", 100, 150, 200, "RT2020", 2022);
    assertEquals("01", result);

    // Test case for construction year less than or equal to 1700
    result = alignementService.alignementAcquisitionAncien(true, "A", 100, 150, 200, "RT2000", 1699);
    assertEquals("07", result);
}
