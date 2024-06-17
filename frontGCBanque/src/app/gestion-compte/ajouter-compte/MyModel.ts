Description:

Field kieSession in com.cl.msofd.engineRules.DroolsService required a bean of type 'org.kie.api.runtime.KieSession' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)

The following candidates were found but could not be injected:
	- User-defined bean method 'kieSession' in 'DroolsConfig' ignored as the bean value is null


Action:

Consider revisiting the entries above or defining a bean of type 'org.kie.api.runtime.KieSession' in your configuration.


Process finished with exit code 1
//
j'ai toujours la meme chose meme erreur par contre j'ai une autre classe de config 

de l'application
    package com.cl.msofd.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.net.InetSocketAddress;
import java.net.ProxySelector;
import java.net.http.HttpClient;

@Configuration
public class AppConfiguration {

    @Value("${ademe.proxy.host}")
    private String proxyHost;

    @Value("${ademe.proxy.port}")
    private int proxyPort;


    @Bean
    public HttpClient ademeHttpClient() {
        return HttpClient
                .newBuilder()
                .proxy(ProxySelector.of(new InetSocketAddress(proxyHost, proxyPort)))
                .build();
    }

    @Bean
    public HttpClient httpClient() {
        return HttpClient
                .newBuilder()
                .build();
    }

    @Bean
    public ValidatingMongoEventListener validatingMongoEventListener() {
        return new ValidatingMongoEventListener(validator());
    }

    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }
}

et mon main et le suivant 
package com.cl.msofd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.config.EnableMongoAuditing;



@ConfigurationPropertiesScan({"com.cl.msofd"})
@EnableConfigurationProperties
@EnableMongoAuditing
@Import(com.cl.msofd.swagger.SwaggerConfiguration.class)
@SpringBootApplication
public class MsofdApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(MsofdApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(MsofdApplication.class);
    }

}


merci de m'aider a resousdre 

***************************
APPLICATION FAILED TO START
***************************

Description:

Field kieSession in com.cl.msofd.engineRules.DroolsService required a bean of type 'org.kie.api.runtime.KieSession' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)

The following candidates were found but could not be injected:
	- User-defined bean method 'kieSession' in 'DroolsConfig' ignored as the bean value is null


Action:

Consider revisiting the entries above or defining a bean of type 'org.kie.api.runtime.KieSession' in your configuration.


Process finished with exit code 1
