package com.example.service;

import com.example.model.Regle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RegleService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Double findXtra250Alignement(Boolean eligibleDEP, Date dateDepotPc, Boolean presenseDateDpeJustif,
                                        Boolean presenseDpe, Date dateConstruction, String classeCEP,
                                        Double valeurCep, Boolean justifNormeThermique, Double normeThermique) {
        Criteria criteria = new Criteria();

        if (eligibleDEP != null) criteria.and("eligibleDEP").is(eligibleDEP);
        if (dateDepotPc != null) criteria.and("dateDepotPc").is(dateDepotPc);
        if (presenseDateDpeJustif != null) criteria.and("presenseDateDpeJustif").is(presenseDateDpeJustif);
        if (presenseDpe != null) criteria.and("presenseDpe").is(presenseDpe);
        if (dateConstruction != null) criteria.and("dateConstruction").is(dateConstruction);
        if (classeCEP != null && !classeCEP.isEmpty()) criteria.and("classeCEP").is(classeCEP);
        if (valeurCep != null) criteria.and("valeurCep").is(valeurCep);
        if (justifNormeThermique != null) criteria.and("justifNormeThermique").is(justifNormeThermique);
        if (normeThermique != null) criteria.and("normeThermique").is(normeThermique);

        Query query = new Query(criteria);
        List<Regle> regles = mongoTemplate.find(query, Regle.class);

        if (regles.isEmpty()) {
            return null;
        }

        return regles.get(0).getXtra250Alignement();
    }
}
//
package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "regles")
public class Regle {
    @Id
    private String id;
    private Boolean eligibleDEP;
    private Date dateDepotPc;
    private Boolean presenseDateDpeJustif;
    private Boolean presenseDpe;
    private Date dateConstruction;
    private String classeCEP;
    private Double valeurCep;
    private Boolean justifNormeThermique;
    private Double normeThermique;
    private Double xtra248eligible;
    private String xtra249dedie;
    private Double xtra250Alignement;
    private Double xtra251;
    private Boolean xtra275;

    // Getters and setters
    // ...
}
//
package com.example.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.core.step.tasklet.TaskletStep;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
@EnableBatchProcessing
public class BatchConfiguration {

    @Bean
    public Job importUserJob(JobBuilderFactory jobBuilderFactory, StepBuilderFactory stepBuilderFactory,
                             Tasklet step1Tasklet) {
        Step step1 = stepBuilderFactory.get("step1")
                .tasklet(step1Tasklet)
                .build();

        return jobBuilderFactory.get("importUserJob")
                .incrementer(new RunIdIncrementer())
                .flow(step1)
                .end()
                .build();
    }
}
//
package com.example.batch;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.core.step.tasklet.TaskletStep;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class ExcelReaderTasklet implements Tasklet {

    @Value("classpath:your-file.xlsx")
    private Resource resource;

    private final MongoTemplate mongoTemplate;

    public ExcelReaderTasklet(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public RepeatStatus execute(StepContribution stepContribution, ChunkContext chunkContext) throws Exception {
        InputStream inputStream = resource.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        for (Row row : sheet) {
            Map<String, Object> regle = new HashMap<>();
            regle.put("eligibleDEP", parseEligibleDEP(row.getCell(0).getStringCellValue()));
            regle.put("dateDepotPc", parseDate(row.getCell(1).getStringCellValue()));
            regle.put("presenseDateDpeJustif", row.getCell(2).getStringCellValue().equalsIgnoreCase("oui"));
            regle.put("presenseDpe", row.getCell(3).getStringCellValue().equalsIgnoreCase("oui"));
            regle.put("dateConstruction", parseDate(row.getCell(4).getStringCellValue()));
            regle.put("classeCEP", row.getCell(5).getStringCellValue());
            regle.put("valeurCep", parseDouble(row.getCell(6).getStringCellValue()));
            regle.put("justifNormeThermique", row.getCell(7).getStringCellValue().equalsIgnoreCase("oui"));
            regle.put("normeThermique", row.getCell(8).getNumericCellValue());
            regle.put("xtra248eligible", row.getCell(9).getNumericCellValue());
            regle.put("xtra249dedie", row.getCell(10).getStringCellValue());
            regle.put("xtra250Alignement", row.getCell(11).getNumericCellValue());
            regle.put("xtra251", row.getCell(12).getNumericCellValue());
            regle.put("xtra275", row.getCell(13).getStringCellValue().equalsIgnoreCase("Y"));

            mongoTemplate.save(regle, "regles");
        }

        workbook.close();
        inputStream.close();

        return RepeatStatus.FINISHED;
    }

    private Boolean parseEligibleDEP(String value) {
        return "Autre bien immobilier".equalsIgnoreCase(value);
    }

    private Date parseDate(String dateStr) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        if (dateStr.contains("au")) {
            String[] dates = dateStr.split(" au ");
            return sdf.parse(dates[0].trim()); // Returning the start date for simplicity
        } else if (dateStr.contains("avant")) {
            return sdf.parse(dateStr.replace("avant ", "").trim());
        } else if (dateStr.contains("après")) {
            return sdf.parse(dateStr.replace("après ", "").trim());
        }
        return null;
    }

    private Double parseDouble(String value) {
        return Double.parseDouble(value.replace("≤", "").replace(">", "").trim());
    }
}
//
package com.example.controller;

import com.example.service.RegleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class RegleController {

    @Autowired
    private RegleService regleService;

    @GetMapping("/find")
    public Double findXtra250Alignement(
            @RequestParam Boolean eligibleDEP,
            @RequestParam @DateTimeFormat(pattern = "dd/MM/yyyy") Date dateDepotPc,
            @RequestParam Boolean presenseDateDpeJustif,
            @RequestParam Boolean presenseDpe,
            @RequestParam @DateTimeFormat(pattern = "dd/MM/yyyy") Date dateConstruction,
            @RequestParam String classeCEP,
            @RequestParam Double valeurCep,
            @RequestParam Boolean justifNormeThermique,
            @RequestParam Double normeThermique) {
        return regleService.findXtra250Alignement(eligibleDEP, dateDepotPc, presenseDateDpeJustif,
                presenseDpe, dateConstruction, classeCEP, valeurCep, justifNormeThermique, normeThermique);
    }
}
//
