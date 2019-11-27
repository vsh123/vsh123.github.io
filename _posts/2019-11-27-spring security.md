# Spring Security 시작하기

- [https://spring.io/guides/gs/securing-web/#scratch](https://spring.io/guides/gs/securing-web/#scratch)를 번역한 내용입니다.

# 불안전한 웹 어플리케이션 생성

> 스프링 시큐리티를 적용하기 전에 간단한 웹 어플리케이션을 생성해본다.

### 의존성 설정

`build.gradle`

    plugins {
        id 'org.springframework.boot' version '2.1.6.RELEASE'
        id 'io.spring.dependency-management' version '1.0.8.RELEASE'
        id 'java'
    }
    
    group 'van'
    version '1.0-SNAPSHOT'
    
    sourceCompatibility = 1.8
    
    repositories {
        mavenCentral()
    }
    
    dependencies {
        implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
        implementation 'org.springframework.boot:spring-boot-starter-web'
        testImplementation 'junit:junit'
        testImplementation 'org.springframework.boot:spring-boot-starter-test'
        testImplementation 'org.springframework.security:spring-security-test'
    
    }

### 기본 index 페이지

`src/main/resources/templates/index.html`

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="https://www.thymeleaf.org" xmlns:sec="https://www.thymeleaf.org/thymeleaf-extras-springsecurity3">
    <head>
        <title>Spring Security Example</title>
    </head>
    <body>
    <h1>Welcome!</h1>
    
    <p>Click <a th:href="@{/hello}">here</a> to see a greeting.</p>
    </body>
    </html>

- 위의 페이지에서 Click을 누르면 `/hello` 로 요청을 보내기 때문에 hello.html도 생성을 해준다.

### hello.html

`src/main/resources/templates/hello.html`

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="https://www.thymeleaf.org"
          xmlns:sec="https://www.thymeleaf.org/thymeleaf-extras-springsecurity3">
        <head>
            <title>Hello World!</title>
        </head>
        <body>
            <h1>Hello world!</h1>
        </body>
    </html>

- 다음으로 기본적인 로그인 페이지를 생성해 준다.

### login.html

`src/main/resources/templates/login.html`

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="https://www.thymeleaf.org"
          xmlns:sec="https://www.thymeleaf.org/thymeleaf-extras-springsecurity3">
        <head>
            <title>Spring Security Example </title>
        </head>
        <body>
            <div th:if="${param.error}">
                Invalid username and password.
            </div>
            <div th:if="${param.logout}">
                You have been logged out.
            </div>
            <form th:action="@{/login}" method="post">
                <div><label> User Name : <input type="text" name="username"/> </label></div>
                <div><label> Password: <input type="password" name="password"/> </label></div>
                <div><input type="submit" value="Sign In"/></div>
            </form>
        </body>
    </html>

- `WebMvcConfigurer` 를 상속받아 View페이지를 보여주는 ViewController를 다음과 같이 만든다.

### MvcConfig.java

`src/main/java/hello/MvcConfig.java`

    package hello;
    
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
    
    @Configuration
    public class MvcConfig implements WebMvcConfigurer {
    
        @Override
        public void addViewControllers(ViewControllerRegistry registry) {
            registry.addViewController("/home").setViewName("index");
            registry.addViewController("/").setViewName("index");
            registry.addViewController("/hello").setViewName("hello");
            registry.addViewController("/login").setViewName("login");
        }
    }

- `registry.addViewController(경로).setViewName(파일 이름)` 은 다음과 같은 역할을 한다.
    - `addViewController()` 에 등록된 경로로 요청이 올 시, `setViewName()` 에 있는 파일을 리턴한다.
- 마지막으로 Spring Boot를 실행시킬 main클래스를 생성한다.

### SpringSecurityApplication.java

`src/main/java/hello/SpringSecurityApplication.java`

    package hello;
    
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    
    @SpringBootApplication
    public class SpringSecurityApplication {
        public static void main(String[] args) {
            SpringApplication.run(SpringSecurityApplication.class);
        }
    }

## 스프링 시큐리티 적용하기

- 이제 위에서 만든 어플리케이션에 스프링 시큐리티를 적용해보자.
- 상황 : 위에서 만든 페이지 중에 `/home` 을 요청 시 인증되지 않은 사용자는 접근 불가하게 설정

### 의존성 추가

`build.gradle`

    dependencies {
    	...
        implementation 'org.springframework.boot:spring-boot-starter-security'
    	...
    }

### SecurityConfig 설정

`src/main/java/hello/WebSecurityConfig.java`

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
    import org.springframework.security.core.userdetails.User;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.provisioning.InMemoryUserDetailsManager;
    
    @Configuration
    @EnableWebSecurity
    public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                .authorizeRequests()
                    .antMatchers("/", "/home").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .loginPage("/login")
                    .permitAll()
                    .and()
                .logout()
                    .permitAll();
        }
    
        @Bean
        @Override
        protected UserDetailsService userDetailsService() {
            UserDetails user =
                    User.withDefaultPasswordEncoder()
                    .username("user")
                    .password("password")
                    .roles("USER")
                    .build();
    
            return new InMemoryUserDetailsManager(user);
        }
    }

- User.withDefaultPasswordEncoder()는 deprecated되었지만 데모 테스트를 위해 사용하였습니다 :)
- 위 코드에 설정된 내용은 다음과 같습니다.
- `WebSecurityConfig` 클래스에 Spring Security 설정을 위해 `@EnableWebSecurity` 어노테이션을 추가해였습니다.
- `WebSecurityConfigurerAdapter` 라는 추상클래스를 상속받고, 해당 메소드에서 필요한 부분을 `@Override` 하여 재정의 합니다.
- `configure(HttpSecurity http)` 메소드에서는 인증을 할 부분과 하지 않을 부분을 `authorizeRequests()`, 로그인 페이지를 `formLogin()` , 로그아웃과 관련된 부분을 `logout()` 으로 설정합니다.
- 사용자가 성공적으로 로그인 한다면 이전에 요청한 페이지로 리다이렉트 됩니다.
- `userDetailsService()` 은 단일 사용자로 인 메모리 사용자 저장소를 설정합니다. 사용자의 정보는 `username` `password` `roles` 를 통해 이름, 패스워드, 역할이 부여가 됩니다.

- 로그아웃 버튼을 위해 hello.html에 다음과 같이 추가해줍니다.

### hello.html

`src/main/resources/templates/hello.html`

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="https://www.thymeleaf.org"
          xmlns:sec="https://www.thymeleaf.org/thymeleaf-extras-springsecurity3">
        <head>
            <title>Hello World!</title>
        </head>
        <body>
            <h1 th:inline="text">Hello [[${#httpServletRequest.remoteUser}]]!</h1>
            <form th:action="@{/logout}" method="post">
                <input type="submit" value="Sign Out"/>
            </form>
        </body>
    </html>

- [[${#httpServletRequest.remoteUser}]]!을 통해 유저 정보를 제공합니다.

## 실행 결과

### `GET /`

![1.png](/image/2019-11-27-spring security/1.png)

### `GET /login`

![2.png](/image/2019-11-27-spring security/2.png)

- 로그인 성공 시

![3.png](/image/2019-11-27-spring security/3.png)

- 로그인 실패 시

![4.png](/image/2019-11-27-spring security/4.png)

### `GET /hello`

![5.png](/image/2019-11-27-spring security/5.png)
