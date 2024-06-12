<dependencies>
    <!-- Spring Boot and Spring Batch -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-batch</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    <!-- Apache POI for Excel processing -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
    </dependency>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
    </dependency>
    <!-- Other dependencies -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
//////////////////////
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "nom_de_la_collection")
public class Rule {
    @Id
    private String id;
    private boolean eligibleDPE;
    private Date dateDepotPc;
    private boolean presenceDpe;
    private boolean presenceDpeJustificatif;
    private String etiquetteDpe;
    private double valeurCep;
    private String normeThermique;
    private boolean presenceNormeThermiqueJustificatif;
    private String Xtra248;
    private String Xtra249;
    private String Xtra250;
    private String Xtra251;
    private String Xtra275;

    // Getters and setters
}
//
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
//
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
//
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

public class MongoItemWriter implements ItemWriter<Rule> {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void write(List<? extends Rule> items) {
        mongoTemplate.insertAll(items);
    }
}
//
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    @Bean
    public ExcelItemReader reader() throws Exception {
        return new ExcelItemReader("/mnt/data/240506_OFD_Abres de décision_Version travail.xlsx");
    }

    @Bean
    public RuleItemProcessor processor() {
        return new RuleItemProcessor();
    }

    @Bean
    public MongoItemWriter writer() {
        return new MongoItemWriter();
    }

    @Bean
    public Job importUserJob(JobBuilderFactory jobs, Step s1) {
        return jobs.get("importUserJob")
                .incrementer(new RunIdIncrementer())
                .flow(s1)
                .end()
                .build();
    }

    @Bean
    public Step step1(StepBuilderFactory stepBuilderFactory) throws Exception {
        return stepBuilderFactory.get("step1")
                .<Row, Rule>chunk(10)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }
}
//
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BatchApplication implements CommandLineRunner {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private Job job;

    public static void main(String[] args) {
        SpringApplication.run(BatchApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        jobLauncher.run(job, new JobParametersBuilder().toJobParameters());
    }
}

