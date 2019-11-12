# Spring Interceptor

> 스프링의 인터셉터란 어떠한 URI를 호출했을 때 해당 요청의 컨트롤러가 처리되기 전 또는 후에 작업을 하기 위해서 사용

    addWebRequestInterceptor vs addInterceptor
    

## Filter vs Interceptor?

> 둘의 가장 큰 차이점은 실행되는 위치!

![connect](/image/2019-11-12-spring-interceptor/1.png)

- 위 사진과 같이 Fi는 DispatcherServlet이 실행되기 전,후에 실행되며 Interceptor는 DispatcherServlet에서 핸들러 컨트롤러로 가기 전에 동작한다.
- Fitler는 J2EE 표준 스펙에 있는 서블릿(ServletFilter)의 기능
- Interceptor는 스프링 프레임워크에서 제공되는 기능

### 어느 상황에서 사용하는 것이 좋을까?

- Filter : 문자열 인코딩과 같은 웹 전반에서 사용되는 기능
- Interceptor : 로그인 인증, 권한(인가)

## 구현

> HandlerInterceptorAdapter클래스를 상속받아 구현

- HandlerInterceptorAdaptor에서는 다음과 같이 3가지의 메소드를 제공한다.
    - preHandle : 컨트롤러 실행 전에 수행
    - postHandle : 컨트롤러 수행 후 결과를 뷰로 보내기 전에 수행
    - afterCompletion : 뷰의 작업까지 완료된 후 수행

### 로그인 확인 로직을 구현해보자!

> [https://github.com/vsh123/WoowaCrew/tree/feat/auth-interceptor](https://github.com/vsh123/WoowaCrew/tree/feat/auth-interceptor)에서 코드를 확인할 수 있습니다.

- 다음과 같이 HandlerInterceptorAdaptor를 상속받는 AuthInterceptor를 생성한다.

```java
    import org.springframework.web.servlet.ModelAndView;
    import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
    
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    
    @Component
    public class AuthInterceptor extends HandlerInterceptorAdapter {
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            return super.preHandle(request, response, handler);
        }
    	//preHandle을 제외한 나머지는 사용하지 않을 예정이기 때문에 override하지 않았습니다.
    }
```

- Session에 user가 있는지 확인하는 로직을 추가한다.

```java
    import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
    import woowacrew.user.domain.UserDto;
    
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import javax.servlet.http.HttpSession;
    import java.util.Optional;
    
    @Component
    public class AuthInterceptor extends HandlerInterceptorAdapter {
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            HttpSession session = request.getSession();
            //세션에 등록된 유저 정보를 가져온다. 만약 없다면 null이 리턴되기 때문에 Optional.ofNullable로 묶어주었다.
            Optional<UserDto> user = Optional.ofNullable((UserDto) session.getAttribute("user"));
            if (!user.isPresent()) {
                //만약 유저정보가 없다면 login페이지로 리다이렉트 한다.
                response.sendRedirect("/login");
                //인터셉터를 통과하지 못한다.
                return false;
            }
            //인터셉터 통과, controller를 실행시킨다
            return true;
        }
    }
```

### 인터셉터 등록하기

> 만든 인터셉터를 등록해서 특정 URI를 만족할 때 해당 인터셉터를 거쳐가게 적용

- 이전 버전에서는 WebMvcConfigurerAdapter를 상속받아 구현했지만, 스프링 5부터는 WebMvcConfigurer를 통해 구현한다.

- WebMvcConfigurer를 상속하는 WebMvcConfig구현

```java
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
    import woowacrew.utils.interceptor.AuthInterceptor;
    
    @Configuration
    public class WebMvcConfig implements WebMvcConfigurer {
    
        private final AuthInterceptor authInterceptor;
        //authInterceptor 빈 등록
        public WebMvcConfig(AuthInterceptor authInterceptor) {
            this.authInterceptor = authInterceptor;
        }
    
        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            //authInterceptor 빈을 등록한다.
            registry.addInterceptor(authInterceptor)
                    .addPathPatterns("/**")
                    //로그인 요청, static페이지에 대한 요청은 해당 인터셉터를 타지 않게 한다.
                    .excludePathPatterns("/", "/login", "/css/**", "/image/**", "/js/**", "/oauth/**");
        }
    }
```

## 테스트 코드 작성

> 위의 인터셉터가 잘 작동하는지 간단한 테스트 코드를 통해 적용해 볼 수 있다.

```java
    import org.hamcrest.Matchers;
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.test.context.SpringBootTest;
    import org.springframework.test.web.reactive.server.WebTestClient;
    
    @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
    class WebMvcConfigTest {
    
        @Autowired
        private WebTestClient webTestClient;
    
        @Test
        void 로그인이_되어있지_않으면_로그인페이지로_리다이렉트() {
            webTestClient.get()
                    .uri("/asdfasdf")
                    .exchange()
                    .expectStatus()
                    .is3xxRedirection()
                    .expectHeader()
                    .value("Location", Matchers.containsString("/login"));
        }
    
        @Test
        void 인덱스_페이지는_인터셉터를_거치지_않는다() {
            webTestClient.get()
                    .uri("/")
                    .exchange()
                    .expectStatus()
                    .isOk();
        }
    
        @Test
        void 정적파일_요청은_인터셉터를_거치지_않는다() {
            webTestClient.get()
                    .uri("/css/index.css")
                    .exchange()
                    .expectStatus()
                    .isOk();
        }
    }
```

## 결론

- 인터셉터는 위와 같이 로그인 확인 등 특정 api를 호출하기 전 인증, 인가의 목적으로 사용할 수 있다.
- 만약 Controller가 아닌 다른 Service에서 공통된 로직을 처리하고 싶으면 AOP를 적용하는 것을 고려해 볼 수 있다.