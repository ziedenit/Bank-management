package com.cl.msofd.engineRules;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ExcelToDroolsService {

    @Value("${arbre.rules}")
    private Resource excelResource;

    private static final String RULES_TEMPLATE =
            "package com.example.rules;\n" +
                    "import com.example.Acquisition;\n" +
                    "import com.example.AcquisitionResponse;\n\n";

    public List<Acquisition> readAcquisitionData() throws IOException, ParseException {
        List<Acquisition> acquisitions = new ArrayList<>();
        try (InputStream excelFile = excelResource.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet sheet = workbook.getSheet("ACQUISITION");

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Skip header row
                Acquisition acquisition = new Acquisition();
                acquisition.setEligibileDPE("Autre bien immobilier".equals(getStringValue(row, 0)));
                acquisition.setDateDepotPc(parseDate(getStringValue(row, 1)));
                acquisition.setPresenceDpe("Oui".equalsIgnoreCase(getStringValue(row, 2)));
                acquisition.setPresenceDpeJustificatif("Oui".equalsIgnoreCase(getStringValue(row, 3)));
                acquisition.setDateConstructionDpe(parseDate(getStringValue(row, 4)));
                acquisition.setClasseCep(getStringValue(row, 5));
                //acquisition.setValeurCep(getStringValue(row, 6).isEmpty() ? Double.parseDouble("0") : Double.parseDouble(getStringValue(row, 6)));
                acquisition.setPresenceNormeThermiqueJustificatif("Oui".equalsIgnoreCase(getStringValue(row, 7)));
                acquisition.setNormeThermique(getStringValue(row, 8));
                acquisition.setXtra248(getStringValue(row, 9));
                acquisition.setXtra249(getStringValue(row, 10));
                acquisition.setXtra250(getStringValue(row, 11));
                acquisition.setXtra251(getStringValue(row, 12));
                acquisition.setXtra275(getStringValue(row, 13));

                acquisitions.add(acquisition);
            }

            workbook.close();
        }

        return acquisitions;
    }


    public void generateDroolsFile(String outputDroolsFile) throws IOException, ParseException {
        List<Acquisition> acquisitions = readAcquisitionData();
        StringBuilder rulesContent = new StringBuilder(RULES_TEMPLATE);

        int ruleNumber = 1;
        for (Acquisition acquisition : acquisitions) {
            String rule = generateRule(acquisition, ruleNumber++);
            rulesContent.append(rule).append("\n");
        }

        try (FileWriter writer = new FileWriter(outputDroolsFile)) {
            writer.write(rulesContent.toString());
        }
    }

    private String generateRule(Acquisition acquisition, int ruleNumber) {
        return String.format(
                "rule \"Rule %d\"\n" +
                        "when\n" +
                        "    $acquisition : Acquisition(\n" +
                        "        eligibileDPE == %s,\n" +
                        "        dateDepotPc == \"%s\",\n" +
                        "        presenceDpe == %s,\n" +
                        "        presenceDpeJustificatif == %s,\n" +
                        "        (dateConstructionDpe == null || dateConstructionDpe == \"%s\"),\n" +
                        "        etiquetteDpe == \"%s\",\n" +
                        "        (valeurCep == 0.0 || valeurCep == %s),\n" +
                        "        normeThermique == \"%s\",\n" +
                        "        presenceNormeThermiqueJustificatif == %s\n" +
                        "    )\n" +
                        "then\n" +
                        "    AcquisitionResponse response = new AcquisitionResponse(\"%s\", \"%s\", \"%s\", \"%s\", \"%s\");\n" +
                        "    insert(response);\n" +                   
                        "end\n",
                ruleNumber,
                acquisition.isEligibileDPE(),
                acquisition.getDateDepotPc() != null ? new SimpleDateFormat("dd/MM/yyyy").format(acquisition.getDateDepotPc()) : "",
                acquisition.isPresenceDpe(),
                acquisition.isPresenceDpeJustificatif(),
                acquisition.getDateConstructionDpe() != null ? new SimpleDateFormat("dd/MM/yyyy").format(acquisition.getDateConstructionDpe()) : "",
                acquisition.getClasseCep(),
                acquisition.getValeurCep() != 0.0 ? acquisition.getValeurCep() : "0.0",
                acquisition.getNormeThermique(),
                acquisition.isPresenceNormeThermiqueJustificatif(),
                acquisition.getXtra248(),
                acquisition.getXtra249(),
                acquisition.getXtra250(),
                acquisition.getXtra251(),
                acquisition.getXtra275()
        );
    }


    private Date parseDate(String dateStr) throws ParseException {
        if (dateStr == null || dateStr.isEmpty() || "Inconnu".equals(dateStr.trim())) {
            return null;
        }

        // Gestion des valeurs spéciales
        if (dateStr.startsWith("avant")) {
            String datePart = dateStr.substring("avant ".length()).trim();
            return new SimpleDateFormat("dd/MM/yyyy").parse(datePart);
        } else if (dateStr.startsWith("du")) {
            // Exemple: "du 01/01/2013 au 31/12/2020"
            String[] parts = dateStr.split(" au ");
            String startDateStr = parts[0].substring("du ".length()).trim();
            return new SimpleDateFormat("dd/MM/yyyy").parse(startDateStr);
            // Vous pouvez également gérer la fin de la période si nécessaire
        } else if (dateStr.startsWith("> au")) {
            // Exemple: "> au 01/01/2022"
            String datePart = dateStr.substring("> au ".length()).trim();
            return new SimpleDateFormat("dd/MM/yyyy").parse(datePart);
        } else {
            // Gestion par défaut pour les autres cas
            throw new ParseException("Unparseable date: " + dateStr, 0);
        }
    }

    private String getStringValue(Row row, int cellIndex) {
        Cell cell = row.getCell(cellIndex, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
        if (cell == null) {
            return ""; // or handle null case as per your requirement
        } else {
            cell.setCellType(CellType.STRING); // Ensure the cell type is String
            return cell.getStringCellValue().trim(); // Get string value and trim whitespace
        }
    }

}
