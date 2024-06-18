j'ai de problemes de pars commencant par ca 

je me base sur un fichier xls et je parse un string un peu particulier qui represente une date en format DATE comme indiqué niveau code mais j'ai cette exception
Error generating rules: Unparseable date: "Date de dépôt de PC"
	java.text.ParseException: Unparseable date: "Date de dépôt de PC"
	at java.base/java.text.DateFormat.parse(DateFormat.java:399)
	at com.cl.msofd.engineRules.ExcelToDroolsService.parseDate(ExcelToDroolsService.java:70)
	at com.cl.msofd.engineRules.ExcelToDroolsService.readAcquisitionData(ExcelToDroolsService.java:40)
	at com.cl.msofd.engineRules.ExcelToDroolsService.generateDroolsFile(ExcelToDroolsService.java:81)
	at com.cl.msofd.engineRules.AcquisitionController.generateRules(AcquisitionController.java:23)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:259)
	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:192)
	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:920)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:830)
	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
public List<Acquisition> readAcquisitionData() throws IOException, ParseException {
        List<Acquisition> acquisitions = new ArrayList<>();
        try (InputStream excelFile = excelResource.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet sheet = workbook.getSheet("ACQUISITION");

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Skip header row

                Acquisition acquisition = new Acquisition();
                acquisition.setEligibileDPE("Autre bien immobilier".equals(row.getCell(0).getStringCellValue()));
               acquisition.setDateDepotPc(parseDate(row.getCell(1).getStringCellValue()));
                acquisition.setPresenceDpe("oui".equalsIgnoreCase(row.getCell(2).getStringCellValue()));
                acquisition.setPresenceDpeJustificatif("oui".equalsIgnoreCase(row.getCell(3).getStringCellValue()));
              acquisition.setDateConstructionDpe(parseDate(row.getCell(4).getStringCellValue()));
                acquisition.setEtiquetteDpe(row.getCell(5).getStringCellValue());
           acquisition.setValeurCep(parseDouble(row.getCell(6).getStringCellValue()));
                acquisition.setNormeThermique(row.getCell(7).getStringCellValue());
                acquisition.setPresenceNormeThermiqueJustificatif("oui".equalsIgnoreCase(row.getCell(8).getStringCellValue()));
                acquisition.setXtra248(row.getCell(9).getStringCellValue());
                acquisition.setXtra249(row.getCell(10).getStringCellValue());
                acquisition.setXtra250(row.getCell(11).getStringCellValue());
                acquisition.setXtra251(row.getCell(12).getStringCellValue());
                acquisition.setXtra275(row.getCell(13).getStringCellValue());

                acquisitions.add(acquisition);
            }

            workbook.close();
        }

        return acquisitions;
    }

    private Date parseDate(String dateStr) throws ParseException {
        if (dateStr == null || dateStr.isEmpty()) {
            return null;
        }
        if (dateStr.toLowerCase().contains("avant")) {
            return new SimpleDateFormat("yyyy-MM-dd").parse("2012-12-31");
        }
        return new SimpleDateFormat("dd/MM/yyyy").parse(dateStr);
    }
