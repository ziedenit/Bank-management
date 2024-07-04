  @Test
    void test_alignementAcquisitionAncien() throws ParseException {
       

        Date endDate = formatDate.parse("31/12/2012");

        // Test case where DPE is present, construction year is valid and within range
        String result = alignementService.alignementAcquisitionAncien(true, "A", 100, 150, 200, "RT2012", 2005);
        assertEquals("01", result);

        // Test case where construction year is valid and within range but no DPE
        result = service.alignementAcquisitionAncien(false, "A", 100, 150, 200, "RT2012", 2010);
        assertEquals("01", result);

        // Test case for year 2021
        result = service.alignementAcquisitionAncien(true, "A", 100, 150, 200, "RT2012", 2021);
        assertEquals("01", result);

        // Test case for year 2022 or after
        result = service.alignementAcquisitionAncien(true, "A", 100, 150, 200, "RT2020", 2022);
        assertEquals("01", result);

        // Test case for construction year less than or equal to 1700
        result = service.alignementAcquisitionAncien(true, "A", 100, 150, 200, "RT2000", 1699);
        assertEquals("07", result);
    }
//
'alignementAcquisitionAncien(boolean, java.lang.String, double, double, double, java.lang.String, java.lang.Integer)' has private access in 'com.cl.msofd.service.AlignementService'
