import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.batch.item.ItemReader;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;

public class ExcelItemReader implements ItemReader<Row> {

    private Iterator<Row> rowIterator;

    public ExcelItemReader(String filePath) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);
        this.rowIterator = sheet.iterator();
        // Skip header row
        if (this.rowIterator.hasNext()) {
            this.rowIterator.next();
        }
    }

    @Override
    public Row read() {
        if (this.rowIterator != null && this.rowIterator.hasNext()) {
            return this.rowIterator.next();
        } else {
            return null;
        }
    }
}
