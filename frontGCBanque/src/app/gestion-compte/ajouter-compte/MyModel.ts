import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public class MongoItemWriter implements ItemWriter<Chunk<? extends Rule>> {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void write(Chunk<? extends Rule> items) {
        mongoTemplate.insertAll(items.getItems());
    }
}
