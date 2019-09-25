---
published: true
layout: single
title: "옵저버 패턴(Observer Pattern) "
category: Observer Pattern
tags : [디자인 패턴, Design Pattern, Head First Design Pattern, 옵저버 패턴, Observer Pattern]
---

## 옵저버 패턴(Strategy Pattern)

> 한 객체(주제)의 상태가 바뀌면 그 객체에 의존하는 다른 객체(옵저버)들한테 연락이 가고 데이터가 업데이트되는 방식으로 일대다(one-to-many) 의존성을 정의합니다.

이 부분에서 가장 중요한 포인트는 `연락이 가고 내용이 갱신돤다.`라는 점이라고 생각한다.

### push vs pull

옵저버 패턴은 push방식, pull방식 두가지로 구현이 가능합니다.

- pull : 변경되었다는 알림과 함께 옵저버에게 직접 데이터를 전달
- push : 변겨되었다는 알림을 보내면 옵저버는 필요한 데이터를 get하여 확인하는 방식

### 옵저버 패턴을 사용하는 다양한 예시 (추가 필요)

- 제보자가 신문사에게 내용을 전달해준다.
- 신문 구독자들에게 매일 신문을 전달해준다.
- 물품 공급자가 판매처에 물품에 대한 변동사항을 전달해 준다.

### 옵저버 패턴은 다음과 같은 기능을 가지고 있다.
- 옵저버들은 주제에 등록/삭제 요청을 할 수 있다. (신문 구독/취소를 할 수 있다.)
- 주제(subject)는 옵저버들에게 업데이트된 정보를 전달할 수 있다. (매일 새로운 정보가 업데이트 된 신문을 전달해준다.)

### 옵저버 패턴은 구현시 다음과 같은 특징을 가지고 있어야 한다.
- 옵저버들은 Observer interface를 상속받아 구현하여야한다.
- 주제(subject)는 Observer들은 interface를 통해 구현한다는 것 이외에 아무런 정보를 알지 못한다.

## 코드 예시

우선적으로 옵저버와 주제에 대해 느슨한 결합을 가지기 위해 필수 기능들을 인터페이스로 구현하고 진행한다.

### push(제보 서비스)

신문 구독 옵저버는 다음과 같은 기능을 반드시 가지고 있어야한다.

- 업데이트 된 알림과 내용을 받는 기능(update(String content))

```java
public interface NewsPaperObserver {
    void update(String content);
}
```

주제는 다음과 같은 기능을 반드시 가지고 있어야한다.

- 옵저버 등록(addObserver(Observer))
- 옵저버 삭제(removeObserver(Observer))
- 옵저버에게 알림(notificationObserver())

```java
public interface Subject {
    void addObserver(NewsPaperObserver observer);
    void removeObserver(NewsPaperObserver observer);
    void notificationObserver();
}
```

아래와 같이 NewsPaperObserver를 구현한 3개의 신문사를 만들어보자.

1. KimNews
2. VanNews
2. ParkNews


#### KimNews

```java
public class KimNews implements NewsPaperObserver {
    private String content = "";

    public void introduce() {
        System.out.println("Kim뉴스의 소식입니다. : " + content);
    }

    @Override
    public void update(String content) {
        this.content = content;
    }
}
```

#### VanNews

```java
public class VanNews implements NewsPaperObserver {
    private String content = "";

    public void introduce() {
        System.out.println("Van뉴스의 소식입니다. : " + content);
    }

    @Override
    public void update(String content) {
        this.content = content;
    }
}
```

#### ParkNews

```java
public class ParkNews implements NewsPaperObserver {
    private String content = "";

    public void introduce() {
        System.out.println("Park뉴스의 소식입니다. : " + content);
    }

    @Override
    public void update(String content) {
        this.content = content;
    }
}

```

그리고 방송 내용을 알려주는 BroadCast는 다음과 같다

#### BroadCast

```java
import java.util.ArrayList;
import java.util.List;

public class BroadCast implements Subject {
    private List<NewsPaperObserver> observers = new ArrayList<>();
    private String content;

    public BroadCast(String content) {
        this.content = content;
    }

    public void updateContent(String content) {
        //변경사항이 발생하였다면 변경하고 notification한다.
        if(!this.content.equals(content)) {
            this.content = content;
            notificationObserver();
        }
    }

    @Override
    public void addObserver(NewsPaperObserver observer) {
        observers.add((NewsPaperObserver) observer);
    }

    @Override
    public void removeObserver(NewsPaperObserver observer) {
        observers.remove(observer);
    }

    @Override
    public void notificationObserver() {
        for (NewsPaperObserver observer : observers) {
            //각 옵저버 마다 content를 업데이트 한다.
            observer.update(this.content);
        }
    }
}
```

위를 테스트하기 위해 다음과 같은 테스트 코드를 구현해보았다.

#### 테스트 코드

```java
import org.junit.jupiter.api.Test;

class BroadCastTest {

    @Test
    void pull_옵저버_패턴_테스트() {
        BroadCast broadCast = new BroadCast("안녕하세요");
        KimNews kimNews = new KimNews();
        VanNews vanNews = new VanNews();
        ParkNews parkNews = new ParkNews();

        //기본 방송
        kimNews.introduce();
        vanNews.introduce();
        parkNews.introduce();

        //방송국에 뉴스정보를 추가
        broadCast.addObserver(kimNews);
        broadCast.addObserver(vanNews);
        broadCast.addObserver(parkNews);

        System.out.println();

        //새로운 기사 알림
        broadCast.updateContent("1번 기사입니다.");

        //"1번 기사입니다"가 출력될 것이다
        kimNews.introduce();
        vanNews.introduce();
        parkNews.introduce();

        System.out.println();

        //vanNews를 삭제
        broadCast.removeObserver(vanNews);

        //새로운 기사 입력
        broadCast.updateContent("2번 기사입니다.");

        //vanNews를 제외한 나머지 뉴스기사만 업데이트 된다.
        kimNews.introduce();
        vanNews.introduce();
        parkNews.introduce();

    }
}
```

#### 실행 결과

![connect](/image/2019-09-25-observer-pattern/image-1.png)


### pull(물품 정보)

> 물품 공급자가 마트들에게 물품을 공급하는 로직을 만들어보자.

옵저버는 다음과 같은 기능을 반드시 가지고 있어야한다.

- 업데이트 된 알림과 내용을 받는 기능(update(String content))

```java
public interface SalesObserver {
    void update(Subject subject);
}
```

주제는 다음과 같은 기능을 반드시 가지고 있어야한다.

- 옵저버 등록(addObserver(Observer))
- 옵저버 삭제(removeObserver(Observer))
- 옵저버에게 알림(notificationObserver())
- 가격을 알려주는 기능(getPrice())

```java
public interface Subject {
    void addObserver(SalesObserver observer);

    void removeObserver(SalesObserver observer);

    void notificationObserver();

    int getPrice(String name);
}
```

다음과 같이 SalesObserver를 구현한 3개의 마트를 만들어보자

1. Amart
2. Bmart
3. Cmart

#### Amart

```java
public class Amart implements SalesObserver {
    //A마트는 사과,바나나,포도를 취급한다.
    private static final String APPLE = "apple";
    private static final String BANANA = "banana";
    private static final String GRAPE = "grape";

    private int applePrice;
    private int bananaPrice;
    private int grapePrice;


    public Amart(int applePrice, int bananaPrice, int grapePrice) {
        this.applePrice = applePrice;
        this.bananaPrice = bananaPrice;
        this.grapePrice = grapePrice;
    }

    @Override
    public void update(Subject subject) {
        applePrice = subject.getPrice(APPLE);
        bananaPrice = subject.getPrice(BANANA);
        grapePrice = subject.getPrice(GRAPE);
    }

    @Override
    public String toString() {
        return "Amart{" +
                "applePrice=" + applePrice +
                ", bananaPrice=" + bananaPrice +
                ", grapePrice=" + grapePrice +
                '}';
    }
}
```

#### Bmart

```java
public class Bmart implements SalesObserver {
    //B마트는 사과를 취급한다.
    private static final String APPLE = "apple";

    private int applePrice;

    public Bmart(int applePrice) {
        this.applePrice = applePrice;
    }

    @Override
    public void update(Subject subject) {
        applePrice = subject.getPrice(APPLE);
    }

    @Override
    public String toString() {
        return "Bmart{" +
                "applePrice=" + applePrice +
                '}';
    }
}

```

#### Cmart

```java
public class Cmart implements SalesObserver {
    //C마트는 바나나,포도를 취급한다.
    private static final String BANANA = "banana";
    private static final String GRAPE = "grape";

    private int bananaPrice;
    private int grapePrice;

    public Cmart(int bananaPrice, int grapePrice) {
        this.bananaPrice = bananaPrice;
        this.grapePrice = grapePrice;
    }

    @Override
    public void update(Subject subject) {
        bananaPrice = subject.getPrice(BANANA);
        grapePrice = subject.getPrice(GRAPE);
    }

    @Override
    public String toString() {
        return "Cmart{" +
                "bananaPrice=" + bananaPrice +
                ", grapePrice=" + grapePrice +
                '}';
    }
}
```

Subject를 구현한 Sales를 다음과 같이 구현한다.

#### Sales

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Sales implements Subject {
    private Map<String, Integer> sales = new HashMap<>();
    private List<SalesObserver> observers = new ArrayList<>();

    public Sales(Map<String, Integer> sales) {
        this.sales = sales;
    }

    public void updatePrice(String name, int price) {
        sales.put(name, price);
        notificationObserver();
    }

    @Override
    public void addObserver(SalesObserver observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(SalesObserver observer) {
        observers.remove(observer);
    }

    @Override
    public void notificationObserver() {
        //객체에서 필요한 정보만 가져갈 수 있도록 한다.
        for (SalesObserver observer : observers) {
            observer.update(this);
        }
    }

    @Override
    public int getPrice(String name) {
        if (sales.containsKey(name)) {
            return sales.get(name);
        }
        return -1;
    }
}
```

그리고 다음과 같이 테스트를 진행해 보았다.

#### 테스트 코드

```java
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

class SalesTest {

    @Test
    void pull_Test() {
        Map<String, Integer> values = new HashMap<>();
        values.put("apple", 1000);
        values.put("banana", 100);
        values.put("grape", 500);
        //공급처 생성
        Sales sales = new Sales(values);
        //마트 생성
        Amart amart = new Amart(500, 10, 1);
        Bmart bmart = new Bmart(10);
        Cmart cmart = new Cmart(10, 1);
        //처음 가격이 출력된다.
        System.out.println(amart.toString());
        System.out.println(bmart.toString());
        System.out.println(cmart.toString());

        System.out.println();

        //Observer 추가
        sales.addObserver(amart);
        sales.addObserver(bmart);
        sales.addObserver(cmart);

        //사과의 가격을 업데이트 하며 옵저버들에게 안내해준다.
        sales.updatePrice("apple", 2000);

        //sales의 가격이 출력된다.
        System.out.println(amart.toString());
        System.out.println(bmart.toString());
        System.out.println(cmart.toString());

        System.out.println();
        //bmart 제거
        sales.removeObserver(bmart);

        //사과의 가격을 다시 바꾼다
        sales.updatePrice("apple", 100);

        //bmart의 사과가격은 그대로 2000이다.
        System.out.println(amart.toString());
        System.out.println(bmart.toString());
        System.out.println(cmart.toString());
    }
}
```

#### 실행 결과

![connect](/image/2019-09-25-observer-pattern/image-2.png)


### 결론

- push 와 pull방식 모두 구현 해보았는데 pull방식이 더 `옳은` 것으로 간주 된다고 한다.
- 옵저버 패턴에서는 객체들 사이에 일대다 관계를 정의합니다.
- Subject 쪽에서는 옵저버드이 Observer 인터페이스를 구헌한다는 것 이외에 옵저버에 대해 모르기 때문에 느슨한 결합이라고 할 수 있다.

