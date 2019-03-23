package cc.mrbird.febs;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@ComponentScan(basePackages = {"cc.mrbird.febs", "com.yhp"})
@MapperScan("com.yhp")
@SpringBootApplication
@EnableTransactionManagement
@EnableScheduling
@EnableAsync
public class FebsApplication {

    public static void main(String[] args) {
        new SpringApplicationBuilder(FebsApplication.class)
                .run(args);
    }
}
