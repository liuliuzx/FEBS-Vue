package cc.mrbird.febs.common.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.devloper.joker.mybatis.plus.query.core.QueryConfigProperty;
import com.devloper.joker.mybatis.plus.query.core.QuerySupportMethod;
import com.devloper.joker.mybatis.plus.query.core.QuerySupportSqlInjector;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(value={"cc.mrbird.febs.*.dao","com.yhp.cms.dao","com.yhp.buss.*.*.dao"})
public class MybatisPlusConfig {

    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }

    /**
     * mybatis-plus SQL执行效率插件【生产环境可以关闭】
     */
    /*@Bean
    public PerformanceInterceptor performanceInterceptor() {
        return new PerformanceInterceptor();
    }*/

    /**
     *  query support 配置
     * @return
     */

    @ConfigurationProperties(prefix = "mybatis-plus-query")
    @Bean
    public QueryConfigProperty queryConfigProperty() {
        return new QueryConfigProperty();
    }

    @Bean
    public QuerySupportMethod querySupportMethod() {
        return new QuerySupportMethod();
    }

    @Bean
    public QuerySupportSqlInjector querySupportSqlInjector() {
        return new QuerySupportSqlInjector();
    }
   
}
