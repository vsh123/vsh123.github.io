---
published: true
layout: single
title: "자바에서 Gson을 이용한 json<->객체 매핑"
category: java
tags : [gson, json, java, gson]
---

## Json이란?

>JSON(JavaScript Object Notation)은 속성-값 쌍(attribute–value pairs and array data types (or any other serializable value)) 또는 "키-값 쌍"으로 이루어진 데이터 오브젝트를 전달하기 위해 인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷이다. 비동기 브라우저/서버 통신 (AJAX)을 위해, 넓게는 XML(AJAX가 사용)을 대체하는 주요 데이터 포맷이다. 특히, 인터넷에서 자료를 주고 받을 때 그 자료를 표현하는 방법으로 알려져 있다. 자료의 종류에 큰 제한은 없으며, 특히 컴퓨터 프로그램의 변수값을 표현하는 데 적합하다.
출처 : https://ko.wikipedia.org/wiki/JSON

## 그러면 Gson은?

>Gson(구글 Gson, Google Gson)은 JSON의 자바 오브젝트의 직렬화, 역직렬화를 해주는 오픈 소스 자바 라이브러리이다.
출처 : https://ko.wikipedia.org/wiki/Gson

## 직접 사용해보자!

다음과 같은 Json파일과 User객체가 있다고 가정하고, json을 받아 User객체로 만들어보자

```json
{
    "name":"van",
    "age":27
}
```

```java
public class User {
    private String name;
    private int age;

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age='" + age + '\'' +
                '}';
    }
}

```

### Gson을 이용하기 위해 의존성을 추가한다.

> jar파일을 직접 library에 추가해주어도 된다.

```gradle
    //gradle 기준
    implementation 'com.google.code.gson:gson:2.8.2'
```

### Json -> 객체 매핑

```java
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;

public class GsonTest {
    @Test
    void JsonToObject() {
        String json = "{" +
                "\"name\":\"van\"," +
                "\"age\":27" +
                "}";

        //Gson 객체 생성
        Gson gson = new Gson();

        //json을 User.class로 매핑한다.
        User user = gson.fromJson(json, User.class);

        System.out.println(user.toString());
    }
}

```

### 실행 결과

![connect](/image/2019-09-21-json-spring-boot/image-1.png)

### 객체 -> Json으로 만들어보자

Gson에서 지원해주는 .toJson() 메소드를 사용하면 된다!

```java
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;

public class GsonTest {
    @Test
    void ObjectToJson() {
        User user = new User("van",27);

        //Gson 객체 생성
        Gson gson = new Gson();

        //user를 json으로 만들어준다.
        String json = gson.toJson(user);

        System.out.println(json);
    }
}

```

### 실행 결과

![connect](/image/2019-09-21-json-spring-boot/image-2.png)

## 결론

Gson을 이용하면서 다음과 같은 편리함이 있었다.
- 모든 값들이 String으로 매핑되는 것이 아닌 int나 다른 형으로도 매핑이 가능하다.
- 하나의 user가 아닌 여러 명의 user정보가 배열로 날아온다해도 List 컬렉션을 가진 객체를 만들고, 해당 클래스로 매핑해주면 값이 매핑 되었다.
- 만약 name, age중에 age없이 name만 날아온다해도 객체 매핑이 된다 -> 필드의 수가 달라도 key와 필드명만 일치하면 된다.

또한 다음과 같은 궁금한 점이 생겼다.(추가 공부해야 할 사항)
- Getter,Setter나 생성자 없이 어떻게 매핑을 하는거지..?