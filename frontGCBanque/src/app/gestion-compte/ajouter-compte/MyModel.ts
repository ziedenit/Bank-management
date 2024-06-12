import org.apache.poi.ss.usermodel.Row;
import org.springframework.batch.item.ItemProcessor;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class RuleItemProcessor implements ItemProcessor<Row, Rule> {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");

    @Override
    public Rule process(Row row) throws ParseException {
        Rule rule = new Rule();

        rule.setEligibleDPE("Autre bien immobilier".equals(row.getCell(0).getStringCellValue()));
        rule.setDateDepotPc(parseDate(row.getCell(1).getStringCellValue()));
        rule.setPresenceDpe("oui".equalsIgnoreCase(row.getCell(2).getStringCellValue()));
        rule.setPresenceDpeJustificatif("oui".equalsIgnoreCase(row.getCell(3).getStringCellValue()));
        rule.setEtiquetteDpe(row.getCell(4).getStringCellValue());
        rule.setValeurCep(row.getCell(5).getNumericCellValue());
        rule.setNormeThermique(row.getCell(6).getStringCellValue());
        rule.setPresenceNormeThermiqueJustificatif("oui".equalsIgnoreCase(row.getCell(7).getStringCellValue()));
        rule.setXtra248(row.getCell(8).getStringCellValue());
        rule.setXtra249(row.getCell(9).getStringCellValue());
        rule.setXtra250(row.getCell(10).getStringCellValue());
        rule.setXtra251(row.getCell(11).getStringCellValue());
        rule.setXtra275(row.getCell(12).getStringCellValue());

        return rule;
    }

    private Date parseDate(String dateStr) {
        try {
            return DATE_FORMAT.parse(dateStr);
        } catch (ParseException e) {
            return null;
        }
    }
}
