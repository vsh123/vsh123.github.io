---
published: true
layout: single
title: "Spring Security Filter chain 확인하는 법"
category: spring security
tags : [security, spring, spring security]
---

Spring Security는  다양한 Filter들이 기본으로 설정되어 있습니다.

이번 글에서는 기본적으로 어떤 Filter들이 존재하고 이를 어떻게 확인하는지 알아보도록 하겠습니다.

### 의존성 설정(build.gradle)

    implementation 'org.springframework.boot:spring-boot-starter-security'

이후 Spring Seucirty의 기본 configuration설정을 추가하겠습니다.

### SecurityConfig.java

    package van.security;
    
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
    
    @Configuration
    @EnableWebSecurity(debug = true)
    public class SecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .authorizeRequests()
                    .anyRequest().permitAll();
        }
    }

위 코드에 대한 설명은 다음과 같습니다.

- Spring Security의 WebSecurityConfigurerAdapter를 extends한 SecurityConfig클래스를 생성합니다.
- @EnableWebSecurity(debug = true)설정을 통해 Security와 관련된 디버깅을 켜줍니다.
- 모든 요청에 대해서 인증검사 없이 처리를 하기 위해(테스트를 위해 이렇게 하였습니다.) configure(HttpSecurty http) 메서드를 오버라이드하여 재정의 해주었습니다.

SpringBootApplication 실행을 위해 아래와 같은 클래스를 만들어줍니다.

### VanApplication.java

    package van;
    
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    
    @SpringBootApplication
    public class VanApplication {
        public static void main(String[] args) {
            SpringApplication.run(VanApplication.class, args);
        }
    }

이후 어플리케이션을 실행시키면 다음과 같은 내용이 console에 찍힙니다.

    ********************************************************************
    **********        Security debugging is enabled.       *************
    **********    This may include sensitive information.  *************
    **********      Do not use in a production system!     *************
    ********************************************************************

이렇게 하면 FilterChain을 확인하기 위한 작업이 모두 끝났습니다.

이제 localhost:8080접속을 한번해보겠습니다.

![image](https://user-images.githubusercontent.com/32254689/71433507-fa4dde80-2722-11ea-866d-0fa10b6fb6c0.png)

인덱스 페이지를 만들지 않았기 때문에 다음과 같이 에러가 발생합니다.

이번 글에서는 해당 내용이 중요한 것이 아니기 때문에 넘어가도록 하겠습니다.

이제 콘솔을 확인해보겠습니다.

![image](https://user-images.githubusercontent.com/32254689/71433511-020d8300-2723-11ea-941c-f27d039b6971.png)

위와 같이 Security filter chain이 보이시나요?

저희는 아무런 Filter를 등록하지 않았는데, 위와 같은 filter chain이 존재합니다.

    Security filter chain: [
      WebAsyncManagerIntegrationFilter
      SecurityContextPersistenceFilter
      HeaderWriterFilter
      CsrfFilter
      LogoutFilter
      RequestCacheAwareFilter
      SecurityContextHolderAwareRequestFilter
      AnonymousAuthenticationFilter
      SessionManagementFilter
      ExceptionTranslationFilter
      FilterSecurityInterceptor
    ]

위의 Filter들이 어떤 역할을 하는지는 추후 글에서 조금씩 확인해 보도록 하겠습니다.

자 이번에는 SecurityConfig의 설정에 다음과 같이 추가해 보겠습니다.

    package van.security;
    
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
    
    @Configuration
    @EnableWebSecurity(debug = true)
    public class SecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .authorizeRequests()
    				//permitAll()이 아닌 authenticated()
                    .anyRequest().authenticated();
    		//아래가 추가된 내용!!
            http
                    .formLogin();
        }
    }

추가된 내용은 다음과 같습니다.

- 모든 요청에 대해서 인증이 필요하다는 설정을 했습니다.(authenticated())
- http.formLogin()을 설정하여 Security에서 지원하는 기본 Login기능을 켰습니다.

이제 다시 어플리케이션을 키고 localhost:8080으로 요청을 보내보겠습니다.

![image](https://user-images.githubusercontent.com/32254689/71433518-076acd80-2723-11ea-99fc-0cc323d1ccf3.png)

분명 localhost:8080으로 보냈는데 /login으로 path가 변경이 되었습니다.

이는 Spring Security 내부에서 인증이 되지 않은 사용자는 /login으로 리다이렉션을 진행하며, 위의 페이지처럼 formLogin을 지원하기 때문입니다.

이번에는 filter chain을 확인해보겠습니다.

![image](https://user-images.githubusercontent.com/32254689/71433520-09349100-2723-11ea-9270-44414d7cda3e.png)

이전과 비교해서 3개의 Filter가 추가 되었습니다! 이름을 보아하는 인증 및 Login과 관련된 필터들인 것을 알 수 있었습니다.

## 결론

이번 글을 통해 저희는 다음과 같은 사실을 알 수 있었습니다.

- Spring Security는 기본적으로 제공되는 Filter chain들이 존재하며, `debug=true` 옵션을 통해 chain들을 확인할 수 있다.
- Spring Security는 기본 chain에 등록되는 filter들 이외에 다양한 filter들이 추가적으로 존재하며, Configuration 옵션을 설정하는 것으로 추가할 수 있다.

사실 Security Filter들은 너무 많아서 저도 잘 알지는 못합니다. 추후 하나씩 알아가면서 블로그에 기재해 보도록 하겠습니다!