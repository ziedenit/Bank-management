import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    @Bean
    public ItemReader<Row> reader() throws Exception {
        return new ExcelItemReader("/mnt/data/240506_OFD_Abres de décision_Version travail.xlsx");
    }

    @Bean
    public ItemProcessor<Row, Rule> processor() {
        return new RuleItemProcessor();
    }

    @Bean
    public ItemWriter<Chunk<? extends Rule>> writer() {
        return new MongoItemWriter();
    }

    @Bean
    public Job importUserJob(JobRepository jobRepository, Step s1) {
        return new JobBuilder("importUserJob", jobRepository)
                .start(s1)
                .build();
    }

    @Bean
    public Step step1(JobRepository jobRepository, PlatformTransactionManager transactionManager) throws Exception {
        return new StepBuilder("step1", jobRepository)
                .<Row, Rule>chunk(10, transactionManager)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }
}
