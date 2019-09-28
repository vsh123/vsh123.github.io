---
published: true
layout: single
title: "스트래티지 패턴(Strategy Pattern) "
category: Design Pattern
tags : [디자인 패턴, Design Pattern, Head First Design Pattern, 스트래티지 패턴, Strategy Pattern]
---

## 스트래티지 패턴(Strategy Pattern)

> 스트래티지 패턴에서는 알고리즘군을 정의하고 각각을 캡슐화하여 교환해서 사용할 수 있도록 만든다. 스트래티지를 활용하면 알고리즘을 사용하는 클라이언트와는 독립적으로 알고리즘을 변경할 수 있다.

## 스트래티지 패턴 예시

> 예시는 HeadFirst DesignPattern에서 가져왔습니다.

### 상황

다음과 같이 Duck 슈퍼클래스를 상속 받은 세 가지 종류의 오리 클래스가 존재합니다.

![connect](/image/2019-09-16-strategy-pattern/image-1.png)

> 모든 오리들은 꽥꽥소리를 내며, 물 위에 뜰 수 있습니다.

이 때 오리들이 날 수 있게 하고 싶어 다음과 같이 Duck클래스에 fly()라는 메소드를 추가하였습니다.

![connect](/image/2019-09-16-strategy-pattern/image-2.png)

> 이제 모든 오리들은 fly할 수 있네요!

하지만 구현을 하고 나니 다음과 같은 문제점들이 발생하였습니다.

```
1. 장난감 오리는 꽥꽥이 아닌 삑삑 소리를 내야합니다.
2. 장난감 오리는 날 수 없습니다.
```

`quack(), fly()를 오버라이드하면 되는 거 아니야?`라고 생각할 수 있습니다. 하지만 저런 클래스가 수십, 수백개라면? 모든 클래스마다 재정의 하는 것은 쉬운 일이 아닐 것이며, 조그마한 변경이 발생한다면(메서드 명이라도 변경된다면) 작업 비용은 어마어마해질 것입니다.

이에 이를 해결하기 위해 아래와 같은 디자인 원칙들을 순차적으로 적용해 보려 합니다.

### 적용

- 애플리케이션에서 달라지는 부분을 찾아내고, 달라지지 않는 부분으로부터 분리시킨다. -> 바뀌는 부분은 따로 뽑아서 캡슐화시킨다.

Duck 클래스에서 변경되는 부분과 그렇지 않은 부분을 분리해보면 다음과 같이 나눌 수 있습니다.

| 변경되는 부분 | 그렇지 않은 부분 |
|:--------:|:--------:|
| fly() | swim() |
| quack() |

> display()의 경우 abstract method라 제외하였습니다.

- 구현이 아닌 인터페이스에 맞춰서 프로그래밍한다.

fly()와 quack()을 각각 인터페이스로 포현하고, 각각의 행동을 구현 해보겠습니다.


#### fly

![connect](/image/2019-09-16-strategy-pattern/image-3.png)

#### quack

![connect](/image/2019-09-16-strategy-pattern/image-4.png)

> 하위 클래스들은 상위 인터페이스의 fly(), quack()을 구현하였습니다.

- 이제 Duck클래스를 아래와 같이 변경해보겠습니다.

#### 기존 Duck클래스

```java
public abstract class Duck {
    public void quack() {
        System.out.println("꽥꽥");
    }

    public void swim() {
        System.out.println("어푸어푸어푸");
    }

    public void fly() {
        System.out.println("나는 날고 있어요~");
    }

    public abstract void display();
}
```

#### 변경된 Duck클래스

```java
import van.strategypattern.fly.FlyBehavior;
import van.strategypattern.quack.QuackBehavior;

public abstract class Duck {
    //fly, quack 행동 인터페이스를 인스턴스 변수로 가진다.
    QuackBehavior quackBeHavior;
    FlyBehavior flyBehavior;

    public void perfomrQuack() {
        //QuackBeHavior에 정의한 quack() 메서드
        quackBeHavior.quack();
    }

    public void swim() {
        System.out.println("어푸어푸어푸");
    }

    public void performFly() {
        //FlyBehavior에 정의한 fly() 메서드
        flyBehavior.fly();
    }

    public abstract void display();
}
```

그리고 Duck의 하위 클래스들을 다음과 같이 변경합니다.

#### MallardDuck 변경 전

```java
public class MallardDuck extends Duck {
    @Override
    public void display() {
        System.out.println("나는야 청둥 오리");
    }
}
```

#### MallardDuck 변경 후

```java
import van.strategypattern.fly.FlyWithWings;
import van.strategypattern.quack.Quack;

public class MallardDuck extends Duck {
    //아래와 같이 기본 생성시 Duck에서 가지고 있는 인스턴스 변수에 대한 구현체를 정의해줍니다.
    public MallardDuck() {
        quackBeHavior = new Quack(); //청둥 오리는 꽥꽥이니까 Quack클래스로 정의
        flyBehavior = new FlyWithWings(); //날개로 날 수 있습니다.
    }

    @Override
    public void display() {
        System.out.println("나는야 청둥 오리");
    }
}
```

#### RedheadDuck 변경 후

```java
import van.strategypattern.fly.FlyWithWings;
import van.strategypattern.quack.Quack;

public class RedheadDuck extends Duck {
    public RedheadDuck() {
        quackBeHavior = new Quack(); //꽥꽥
        flyBehavior = new FlyWithWings(); //날개로 날 수 있습니다.
    }

    @Override
    public void display() {
        System.out.println("나는야 빨간 머리 오리");
    }
}
```

#### ToyDuck 변경 후

```java
import van.strategypattern.fly.NoFly;
import van.strategypattern.quack.Squeak;

public class ToyDuck extends Duck {
    public ToyDuck() {
        quackBeHavior = new Squeak(); //삑삑!
        flyBehavior = new NoFly(); //날 수 없습니다.
    }

    @Override
    public void display() {
        System.out.println("나는야 장난감 오리");
    }
}
```

#### 변경 완료 후 Duck 구성

![connect](/image/2019-09-16-strategy-pattern/image-5.png)

> Duck 클래스에서 fly, quack 인터페이스를 상속 받을 수도 있지만, 구현체를 받아 행동을 부여받게 됩니다. 이렇게 했을 경우 상속보다 유연성을 크게 향상시킬 수 있습니다.

여기까지 변화할 수 있는 행동들을 인터페이스로 빼고, Duck에 적용 시켰습니다. 하지만 여기서 한가지 더 생각해볼 거리가 남아있습니다.

> 만약 장난감이 업그레이드 돼서 날 수 있다면?

이를 위해 동적으로 행동을 변경할 수 있는 setter를 구현해 보겠습니다.

#### Duck에 setFlyHabevior(), setQuackHavior() 구현

```java
import van.strategypattern.fly.FlyBehavior;
import van.strategypattern.quack.QuackBehavior;

public abstract class Duck {
    //fly, quack 행동 인터페이스를 인스턴스 변수로 가진다.
    QuackBehavior quackBeHavior;
    FlyBehavior flyBehavior;

    public void perfomrQuack() {
        //QuackBeHavior에 정의한 quack() 메서드
        quackBeHavior.quack();
    }

    public void swim() {
        System.out.println("어푸어푸어푸");
    }

    public void performFly() {
        //FlyBehavior에 정의한 fly() 메서드
        flyBehavior.fly();
    }

    //setter를 이용해 변경이 가능합니다.
    public void setQuackBeHavior(QuackBehavior quackBeHavior) {
        this.quackBeHavior = quackBeHavior;
    }

    public void setFlyBehavior(FlyBehavior flyBehavior) {
        this.flyBehavior = flyBehavior;
    }

    public abstract void display();
}
```

### 테스트 코드 작성

```java
import org.junit.jupiter.api.Test;
import van.strategypattern.fly.NoFly;
import van.strategypattern.quack.Squeak;

class MallardDuckTest {

    @Test
    void 오리_테스트() {
        Duck mallardDuck = new MallardDuck();

        mallardDuck.perfomrQuack();
        mallardDuck.performFly();

        System.out.println("---------------------------------");
        mallardDuck.setFlyBehavior(new NoFly()); //못 나는 것으로 변경
        mallardDuck.setQuackBeHavior(new Squeak()); //삑삑으로 변경

        mallardDuck.perfomrQuack();
        mallardDuck.performFly();
    }
}
```

### 실행 결과

![connect](/image/2019-09-16-strategy-pattern/image-6.png)

### 결론

이처럼 행동들을 별도 정의하고 캡슐화하고, 교환하여 사용할 수 있도록 만드는 것을 Strategy Pattern이라고 정의합니다. 이 패턴을 이용하면 행동들에 변경이 생겼을 경우에도 이를 사용하는 클래스의 변경사항은 작아지는 이점을 가질 수 있습니다.

### 예시 문제

```
선호는 퇴직금으로 카페를 오픈하였다.

현재 카페는 다음과 같은 메뉴들이 있으며 가격은 다음과 같다

1. 아메리카노 - 2000원
2. 아이스티 - 1500원

하지만 장사가 너무 안된 나머지 할인을 하여 고객을 홍보하려고 한다.

각 요일에 따른 할인율은 다음과 같다
평일 : 20%
주말 : 10%

이 때 요일에 맞는 할인율을 가져와서 금액을 계산해주는 코드을 구현해라

주어지는 인터페이스는 다음과 같다

Discount
- 할인율을 반환해주는 
    int getdiscountRate()
가 있다

Cafe
- Discount인터페이스를 인자로 받는 
    int priceOfAmericano(Discount discount);
    int priceOfIceTea(Discount discount);
가 존재한다

```