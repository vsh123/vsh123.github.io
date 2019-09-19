---
published: true
layout: single
title: "자바의 쓰레드 풀(ThreadPoolExecutor)의 동작 원리"
category: OS
tags : [Thread Pool, thread, 쓰레드, java]
---

> 해당 내용은 공부를 하는 과정에서 작성된 문서이기 때문에 일부 내용이 잘 못 되었을 수 있습니다. 이 점 너그럽게 양해 부탁드리겠습니다 :)

## 왜 쓰레드 풀을 사용할까?

> 서버가 모든 요청에 대해 Thread를 매번 생성하는 경우 성능상 문제가 발생할 수 있다. Thread Pool을 적용해 일정 수의 사용자 동시에 처리가 가능하도록 한다.

### 쓰레드 풀을 직접 사용해보자!

자바에서는 ThreadPoolExecutor라는 클래스를 지원해주는데, 다음과 같은 생성자들이 존재한다.

```java
ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue)

ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, RejectedExecutionHandler handler)

ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory)

ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler)

```

공통적으로 `corePoolSize`,`maximumPoolSize`, `keepAliveTime`, `unit`, `workQueue`의 5가지 파라미터가 존재하는데 각 파라미터는 다음과 같은 역할을 한다.

- corePoolSize
 - 기본 풀 Size를 의미한다. 최초 쓰레드는 corePoolSize만큼 생성 된다.
- maximumPoolSize
 - 해당 풀에 최대로 유지할 수 있는 쓰레드의 Size이며, corePoolSize보다 쓰레드가 많아졌을 경우 maximumPoolSize까지 생성이 된다.
- keepAliveTime
 - corePoolSize보다 스레드가 많아졌을 경우 maximumPoolSize까지 스레드가 생성이 되는데 keepAliveTime 시간만큼 유지했다가 다시 corePoolSize로 유지되는 시간을 의미한다.
- unit
 - keepAliveTime의 시간 단위를 의미한다.
 - ex) SECONDS
- workQueue
 - corePoolSize보다 스레드가 많아졌을 경우, 남는 스레드가 없을 경우 해당 큐에 담는다.

### maximumPoolSize와 workQueue간의 상관 관계

- 다음과 같이 설정된 쓰레드풀이 존재한다고 하자.

```
corePoolSize = 1
maximumPoolSize = 5
keepAliveTime = 3
unit = SECONDS
workQueue = 7 (최대 7개의 쓰레드가 보관이 가능하다.)
```

- 이때 쓰레드가 10개가 필요하다고 가정하면 다음과 같은 순서로 쓰레드 풀이 작동한다.

```
1. corePoolSize만큼 쓰레드가 작동한다. (나머지 필요한 쓰레드 수 : (10 - 1) -> 9)
2. workQueue의 Size만큼 남은 쓰레드들을 보관한다. 
 -> 위 예시에서 workQueue의 Size는 7이기 때문에 나머지 필요한 쓰레드 수는 2개가 된다
3. 현재 생성된 corePoolSize = 1, maximumPoolSize = 5이며 4개의 여유 쓰레드가 생성이 가능하다.
   이때 큐에 보관되지 못한 나머지 2개의 쓰레드를 실행 시켜 준다.
   * 만약 보관되지 못한 쓰레드 수 > 여유 쓰레드라면 에러가 발생한다.
```

### 예시 코드

위의 상황 실제로 코드로 작성해보자.

```java
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;

import static java.util.concurrent.TimeUnit.SECONDS;

public class WebServer {
    public static void main(String args[]) throws Exception {
        //해당 큐는 7개까지 쓰레드 저장이 가능하다.
        LinkedBlockingQueue<Runnable> queue = new LinkedBlockingQueue<>(7);

        ThreadPoolExecutor executorService =
                new ThreadPoolExecutor(1,5,3, SECONDS, queue);

        for (int i = 0; i < 10; i++) {
            //10개의 Task를 실행시킨다.
            executorService.execute(new Task());
        }

        executorService.awaitTermination(5, SECONDS);
        executorService.shutdown();
    }

    private static class Task implements Runnable {
        @Override
        public void run() {
            try {
                //쓰레드 번호를 출력해 준다.
                System.out.println(Thread.currentThread().getName());
                SECONDS.sleep(1);
            } catch (InterruptedException e) {
            }
        }
    }
}
```

### 실행 결과

![connect](/image/2019-09-19-thread-pool/image-1.png)

> 빨간선을 기준을 3개씩 쓰레드가 생성된 것을 볼 수 있다.

### 결론

Thread Pool을 적용해 일정 수의 사용자 동시에 처리가 가능하도록 하였다. java에서는 ThreadPoolExecutor 이용한 다음과 같은 구현체를 지원하니 알아보고 목적에 맞게 사용하면 좀 더 편리하게 관리가 가능할 것으로 보인다.
```
Executors.newSingleThreadExecutor()
Executors.newFixedThreadPool()
Executors.newCachedThreadPool()
Executors.newWorkStealingPool()
```

## Reference
http://wonwoo.ml/index.php/post/2254/amp
https://hamait.tistory.com/937