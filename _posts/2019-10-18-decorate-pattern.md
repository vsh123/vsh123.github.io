---
published: true
layout: single
title: "데코레이터 패턴"
category: Design Pattern
tags : [디자인 패턴, Design Pattern, Head First Design Pattern, 데코레이터 패턴, Decorator Pattern]
---

## 데코레이터 패턴?

> 기본 구성요소 클래스위에 데코레이터하는 클래스를 래퍼하는 것

### 데코레이터 패턴이 필요한 상황

#### 다음과 같은 카페 메뉴가 존재한다고 하자

```
1. 아메리카노
2. 라떼
3. 아이스티
```

#### 해당 메뉴에 대해서 공통로직으로 추출한다면 다음과 같이 추출할 수 있다.

![connect](/image/2019-10-18-decorate-pattern/image-1.png)

#### 이 때 각 메뉴들이 선택할 수 있는 옵션들이 다음과 같다면?

```
1. 휘핑 추가
2. 샷 추가
```

#### 만약 위에처럼 계속 만든다면 다음과 같은 클래스들이 추가 될 것이다.

```
1. 아메리카노 (Americano)
2. 휘핑 아메리카노 (AmericanoWithWhip)
3. 샷 추가 아메리카노 (AmericanoWithShot)
4. 휘핑 + 샷 추가 아메리카노 (AmericanoWithWhipAndShot)
....
```

> 한 메뉴에 대해서 총 4가지의 클래스가 생성되었다!!

### 위와 같은 상황이 발생하지 않게 하려면 어떻게 해야할까?

#### 옵션들이 기본 메뉴를 데코레이트(decorate)하게 구현해보자!!

다음과 같이 Beverage를 extends한 데코레이트 클래스를 만들어보자

```java
public class DecorateOption extends Beverage {
    //메뉴를 Composition하고 있다.
    private Beverage beverage;

    public DecorateOption(Beverage beverage, String name, int cost) {
        super(name, cost);
        this.beverage = beverage;
    }

    public int cost() {
        //데코하고 있는 메뉴 가격 + 옵션 가격을 리턴한다.
        return beverage.cost() + getCost();
    }
}
```

그리고 이를 구성하는 옵션들을 클래스로 만들면 다음과 같은 구조가 있다.

![connect](/image/2019-10-18-decorate-pattern/image-2.png)

### 자 이제 메뉴를 Decorate해보자!!!

#### 샷 추가한 아메리카노에 대한 코드를 다음과 같이 짜보자

```java
    @Test
    void 샷_추가_아메리카노() {
        Beverage beverage = new Americano("아메리카노", 1500);
        //아메리카노 + Shot을 한 값을 beverage에 넣는다
        beverage = new Shot(beverage, "샷 추가", 500);

        assertThat(beverage.cost()).isEqualTo(2000);
    }
```

#### 위를 그림으로 그려보면 다음과 같이 그려볼 수 있다.

![connect](/image/2019-10-18-decorate-pattern/image-3.png)


### OCP 원칙(개방 폐쇄의 원칙)

- 클래스는 확장에 대해서는 열려 있어야 하지만 코드 변경에 대해서는 닫혀 있어야 한다.

Q. 구상요소 없이 데코레이터가 될 수도 있지 않을까?
Q. 옵션List를 만들고 이곳에 add하면 어떨까? (이게 전략패턴이 되는 건가?)
Q. 상속보다 구성?