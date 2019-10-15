---
published: true
layout: single
title: "RequestParam vs ModelAttribute vs RequestBody"
category: Spring
tags : [Spring, Controller]
---

## RequestParam vs ModelAttribute vs RequestBody 어노테이션의 차이는 무엇일까?

> 스프링 mvc를 구현해보려 하니 위 3개 어노테이션에 대해 혼란이 와서 정리를 해보려고 한다.

### RequestParam

요청 파라미터를 매핑해주는 어노테이션이다.
만약 요청이 `/requestParam?name=van`이라고 하면 아래와 같이 코드를 짤 수 있다.

```java
@RestController
public class TestController {
    private static final Logger log = LoggerFactory.getLogger(TestController.class);

    @RequestMapping("/requestParam")
    public String requestParam(@RequestParam String name) {
        log.info(name);
        return name;
    }
}
```

만약 Request의 value이름이 RequestParam이름과 다를 경우에는 다음과 같이 작성해주면 된다.
`requestParam?na=van`이라는 요청일 시

```java
@RestController
public class TestController {
    private static final Logger log = LoggerFactory.getLogger(TestController.class);

    @RequestMapping("/requestParam")
    //request의 파라미터 이름을 명시해준다.
    public String requestParam(@RequestParam("na") String name) {
        log.info(name);
        return name;
    }
}
```

마지막으로 파라미터의 이름과 request로 넘어온 파라미터의 이름이 동일하면 @RequestParam를 생략할 수 있다.
`/requestParam?name=van`이라는 요청 시

```java
@RestController
public class TestController {
    private static final Logger log = LoggerFactory.getLogger(TestController.class);

    @RequestMapping("/requestParam")
    public String requestParam(String name) {
        log.info(name);
        return name;
    }
}
```

위와 같이 작성이 가능하다.

### ModelAttribute

요청된 파라미터를 도메인 모델이나 DTO같은 모델로 매핑을 해준다.

아래와 같은 User 클래스가 있다고 가정해보자.

#### 주의!! 객체를 만들 때 Setter or 전체 생성자를 선언을 해주어야 한다.

```java
public class User {
    private String id;
    private String password;

    private User() {
    }

    public User(String id, String password) {
        this.id = id;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
```

그리고 `/modelAttribute?id=asdf&password=qer`라는 요청이 있을 시 다음과 같이 작성이 가능하다.

```java
    @RequestMapping("/modelAttribute")
    public User modelAttribute(@ModelAttribute User user){
        log.info(user.toString());
        return user;
    }
```

RequestParam과 마찬가지로 ModelAttribute 어노테이션도 생략이 가능하다.

### RequestBody

http body를 객체로 매핑해주는 어노테이션이다.
다음과 같은 테스트 코드가 있다고 가정해 보자.

```java
@Test
    void RequestBodyTest() {
        User user = new User("id", "password");
        webTestClient.post()
                .uri("/requestBody")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .body(Mono.just(user), User.class)
                .exchange()
                .expectBody().consumeWith(
                res -> {
                    String body = new String(res.getResponseBody());
                }
        );
    }
```

이때 다음과 같이 Controller를 작성 가능하다.

```java
    @PostMapping("/requestBody")
    public User requestBody(@RequestBody User user) {
        log.info(user.toString());
        return user;
    }
```

Q. RequestBody는 APPLICATION_FORM_URLENCODED타입을 인식하지 못해요
A. Spring에서는 APPLICATION_FORM_URLENCODED를 RequestBody로 인식하지 못한다고 합니다. 그 대신, @ModelAttribute를 사용하거나 어노테이션을 제거하면 정상적으로 매핑이 가능합니다.

Q. RequestParam과 ModelAttribute 어노테이션 없이 어떻게 매핑을 해주는 건가요?
A. String, int, long 등의 단순한 primitive 타입이라면 RequestParam, 그게 아니라 모델인 경우에는 ModelAttribute로 판단한다고 합니다.