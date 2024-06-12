import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create("mongodb://user-rw:ShxzBCVWKrhXEYDNiX4k@mongodb-201.dbaas-mongodb.iaas.cagip.group.gca:27017,mongodb-202.dbaas-mongodb.iaas.cagip.group.gca:27017,mongodb-203.dbaas-mongodb.iaas.cagip.group.gca:27017/scripta-lcl-ofd-dev?authSource=scripta-lcl-ofd-dev&appname=scripta-lcl-ofd-dev&w=majority&tls=true&tlscafile=./certificats/carioca-bundle.crt&replicaSet=mutu-200");
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "scripta-lcl-ofd-dev");
    }
}
