# 팩토리 패턴

```
아래 예시에 사용된 코드는 
https://github.com/vsh123/springboot-test/tree/feat/factory-pattern
에서 확인 가능합니다.
```

> 느슨한 결함을 이용하는 객체지향 패턴

### 비즈니스 로직에 new를 사용하여 객체를 만드는 것은 좋은 것이 아니다

```java
    Duck duck = new MallarDuck();
    /*
    인터페이스를 사용해서 코드를 유연하게 만들었지만,
    구상 클래스의 인스턴스를 만드는 new를 사용했기 때문에
    나중에 코드를 수정해야할 가능성이 높아지며
    유연성이 떨어진다
    */
```

- 이를 해결하기 위해 비즈니스 로직은 인터페이스에 맞춰 코딩을 하고, 변하는 부분(구상 클래스는) 외부에서 주입해주는 형식으로 변경을 할 수 있다.

### Example) 피자 주문 메소드

- 아래와 같이 피자를 주문하면 만들어서 리턴해주는 메소드가 있습니다.

```java
    //Pizza는 인터페이스
    private static Pizza orderPizza(String type) {
        Pizza pizza = null;
        if (type.equals("cheese")) {
            pizza = new CheesePizza();
        }
    		//만약 type이 늘어난다면 위 코드가 else-if가 계속해서 붙겠죠?
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
            
        return pizza;
    }
```

- 위 코드에서 type이 추가되면 if/else-if 구문이 계속해서 늘어나는 문제점이 발생할 가능성이 존재합니다.

- 이를 해결하기 위해 타입을 입력하면 리턴해주는 간단한 PizzaFactory클래스를 작성할 수 있습니다.

```java
    //아래와 같이 객체의 생성을 담당해주는 클래스를 Factory 클래스라고 합니다.
    public class PizzaFactory {
        public static Pizza createPizza(String type) {
            if (type.equals("cheese")) {
                return new CheesePizza();
            }
            return null;
        }
    }
```

- 변경된 orderPizza 메소드

```java
    private static Pizza orderPizza(String type) {
        Pizza pizza = PizzaFactory.createPizza(type);
    
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
    
        return pizza;
    }
```

Q. 이와 같이 PizzaFactory를 만들었을 때의 장점?

- Pizza가 늘어나도 orderPizza의 메소드는 변하지 않는 구조가 됩니다!
- 해당 팩토리를 다른 메소드에서도 사용이 가능합니다!

### Example) 지점 별로 만들어지는 피자가 다른 case

- PizzaStore마다 같은 type을 입력하더라도 스타일이 다른 경우에 어떻게 구현하면 좋을까?

    → 기존 PizzaFactory의 createPizza()를 지점별로 구현해주면 될 것 같다!

- 다음과 같이 PizzaStore 추상 클래스를 선언해 줍니다.

```java
    public abstract class PizzaStore {
        public Pizza orderPizza(String type) {
            //PizzaFactory가 아닌 하위 Store에서 구현해주는 createPizza()를 사용
            Pizza pizza = createPizza(type);
    
            pizza.prepare();
            pizza.bake();
            pizza.cut();
            pizza.box();
    
            return pizza;
        }
    
        //하위 구상 클래스마다 만들어지는 방법이 조금씩 다르다
    		//해당 메소드는 팩토리 메소드라 할 수 있다.
        protected abstract Pizza createPizza(String type);
    }
```

- 그리고 PizzaStore를 상속받아 구현한 SeoulPizzaStore, PusanPizzaStore를 다음과 같이 구현해준다.

```java
    public class SeoulPizzaStore extends PizzaStore {
        @Override
        protected Pizza createPizza(String type) {
            if (type.equals("cheese")) {
                //서울식 치즈 피자
                return new SeoulCheesePizza();
            }
            return null;
        }
    }
    
    --------------------------------------------
    public class PusanPizzaStore extends PizzaStore {
    		@Override
        protected Pizza createPizza(String type) {
            if (type.equals("cheese")) {
                //부산식 치즈 피자
                return new PusanCheesePizza();
            }
            return null;
        }
    }
```   

Q. 위와 같이 구성하였을 때의 장점?

- 객체를 생성하는 작업을 서브클래스에서 정의함으로 인해 캡슐화 시킬 수 있습니다. 이로 인해 비즈니스 로직 시에는 슈퍼클래스에 있는 oderPizza()에만 신경쓰면 되는 이점이 있습니다.
- 객체 생성 방식(위에서는 PizzaStore가 됩니다!)이 추가되더라도 PizzaStore의 변경 없이 하위 서브클래스만 추가하면 되기 때문에 OCP(개방-폐쇄 원칙)을 만족시킨다고 할 수 있습니다!

> **팩토리 메소드 패턴** : 위와 같이 서브클래스에서 어떤 클래스를 만들지를 결정하여 객체 생성을 캡슐화 하는 것

### 위와 같이 구현했을 때의 객체 의존성

![connect](/image/2019-11-13-factory-pattern/1.png)

- 위 보시는 사진과 같이 PizzaExample은 슈퍼클래스인PizzaStor와 Pizza에만 의존하고 있습니다. 이렇게 추상화된 클래스에 의존하는 것을 DIP(의존성 역전 원칙) 이라고 합니다.

> **의존성 역전 원칙** :  추상화된 것에 의존하도록 만들어라. 구상 클래스에 의존하도록 만들지 않도록 한다.

Q. 어떤 걸 역전시킨다는 것인가요?

- 위의 다이어그램을 보면 저수준 구성요소(Seoul, PusanPizzaStore)가 고수준 추상클래스인 PizzaStore에 의존하고 있습니다. 이처럼 고수준이 저수준을 의존하는 것이 아닌 저수준이 고수준을 의존하게 만든 것을 의존성을 역전시켰다고 합니다.

### DIP를 지키기 위한 가이드라인

- 어떤 변수에도 구상 클래스에 대한 참조를 저장하지 마라(생성자를 이용한 생성을 하지말라)
- 구상 클래스에서 유도된 클래스를 만들지 말라. 이는 곳 구상클래스를 의존하게 된다.
- 베이스 클래스에 이미 구현되어 있던 메소드를 오버라이드 하지 마라 이는 곧 베이스 클래스가 제대로 추상화 되어있지 않다는 것이다.(상속보다 구성을 사용해라)

## 추상 팩토리 패턴

> 추상 팩토리 패턴에서는 인터페이스를 이용하여 서로 연관된, 또는 의존하는 객체를 구상 클래스를 지정하지 않고도 생성할 수 있습니다.

![connect](/image/2019-11-13-factory-pattern/1.png)

Q. 추상 팩토리 vs 팩토리 메소드 패턴

- 팩토리 메소드는 상속을 통해 객체를 생성, 추상 팩토리 패턴은 구성을 통해 생성

```java
    //팩토리 메소드 패턴, 하위 구상클래스가 상속 받아 객체를 생성하는 메소드를 만든다
    public abstract class PizzaStore {
        public Pizza orderPizza(String type) {
            //피자 팩토리가 아닌 하위 Store에서 구현해주는 createPizza()를 사용
            Pizza pizza = createPizza(type);
    
            pizza.prepare();
            pizza.bake();
            pizza.cut();
            pizza.box();
    
            return pizza;
        }
    
        //하위 구상 클래스마다 만들어지는 방법이 조금씩 다르다
        protected abstract Pizza createPizza(String type);
    }
```

```java
    //추상 팩토리 패턴 PizzaExample은 PizzaStore를 구성하고 있으며
    //pizza.orderPizza()를 통해 Pizza객체를 생성한다.
    public class PizzaExample {
        private PizzaStore pizzaStore;
    
        public PizzaExample(PizzaStore pizzaStore) {
            this.pizzaStore = pizzaStore;
        }
    
        public Pizza orderPizza(String type) {
            return pizzaStore.orderPizza(type);
        }
    }
```   

Q. 그래서 둘의 사용 용도는..?

- 추상 팩토리 패턴은 클라이언트에서 서로 연관된 일련의 제품을 만들어야 할 때(예를 들어 서울치즈피자에 들어가는 재료들) 사용하면 좋다
- 팩토리 메소드 패턴은 클라이언트 코드와 인스턴스를 만들어야 할 구상 클래스를 분리시켜야 할 때 사용