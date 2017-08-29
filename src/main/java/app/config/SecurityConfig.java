//package app.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.web.savedrequest.NullRequestCache;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/index.html", "/home.html", "/login.html", "/").permitAll()
//                .anyRequest().authenticated()
//                /*.antMatchers(HttpMethod.GET, "/orders").access("hasRole('ROLE_ADMIN')")
//                .antMatchers(HttpMethod.GET, "/**").permitAll()*/
//                //.and().formLogin()
//                .and().requestCache().requestCache(new NullRequestCache());
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder builder) throws Exception {
//        builder.inMemoryAuthentication()
//                .withUser("user").password("user").roles("USER").and()
//                .withUser("admin").password("admin").roles("ADMIN");
//    }
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring().antMatchers("/*.css");
//        web.ignoring().antMatchers("/*.js");
//    }
//}
