var store = [{
        "title": "리눅스 우분투(ubuntu) 자바, mysql 설치",
        "excerpt":"자바 설치법(openjdk) sudo apt-get -y install openjdk-8-jdk 위에서 -y옵션을 주는 이유는 설치시 yes/no를 물어보는 경우가 있는데 이 때 자동적으로 yes를 입력해 주기 위해서 옵션을 사용한다. 설치가 끝났다면 다음과 같은 명령을 통해 설치가 잘 되었는지 확인한다. java -version mysql 설치방법 아래에 다음과 같이 입력한다. sudo apt-get update sudo apt-get -y install...","categories": ["linux"],
        "tags": ["java","mysql","linux","ubuntu"],
        "url": "http://localhost:4000/linux/setup-java,mysql/",
        "teaser":null},{
        "title": "mac에서 AWS EC2 접속 sh파일 만들기",
        "excerpt":"Mac에서 아마존 웹서비스(이하 aws) linux ec2를 접속하기 위해서는 key가 있는 위치로 이동하여 ssh 명령어를 통해 접속을 해야한다. 하지만 매번 key가 있는 위치를 찾아서 작업하기에는 너무 귀찮기 때문에 다음과 같은 sh 스크립트를 작성해 접속을 하려고 한다. 스크립트에는 다음과 같은 내용이 들어가 있다 key가 있는 경로를 찾고 해당 경로를 저장한다. 해당 key를...","categories": ["AWS"],
        "tags": ["aws","ec2","linux","mac"],
        "url": "http://localhost:4000/aws/ec2-connection-for-mac/",
        "teaser":null},{
        "title": "github PR(Pull Request) 일반 merge 막기",
        "excerpt":"github을 통해 팀 프로젝트를 할 때 가장 중요한 것 중의 하나가 Pull Request(이하 PR) 과 commit관리이다. 팀 규칙으로 PR을 merge할 때 squash and merge를 사용하자고 정했지만, 사람은 가끔 실수를 할 수 있기 때문에 이번 글에서는 github에서 지원하는 일반 merge 버튼 제한을 공유해보자 한다. 본인의 github Repository -&gt; setting으로 접속한다. Options에서...","categories": ["github"],
        "tags": ["github","Pull Request","squash merge"],
        "url": "http://localhost:4000/github/github-PR-setting/",
        "teaser":null},{
        "title": "1주 회고 ",
        "excerpt":"기간 : 2019년 9월 2일(월) ~ 2019년 9월 8일(일) 이번 주 목표 성공적인 미니 프로젝트 완성 방학에도 주기적인 공부 1일 1커밋 매일 프로그래머스 SQL 7일 챌린지 나에게 칭찬해주고 싶은 점 프로젝트에서 팀 문화 1등을 하였다. git에 대해서 많은 숙련도가 쌓인 것 같다. 매일 커밋을 기록하였다. 프로그래머스 SQL 7일 챌린지를 이어가고...","categories": ["회고"],
        "tags": ["회고"],
        "url": "http://localhost:4000/%ED%9A%8C%EA%B3%A0/remind-1/",
        "teaser":null},{
        "title": "두개 이상의 구현체가 있는 인터페이스 의존성 주입(DI)",
        "excerpt":"의존성 주입은 인터페이스에 걸어라 만약 해당 인터페이스에 대한 구현체가 2개 이상이라면????????????? Test를 해보자! 다음과 같이 Car 인터페이스를 생성한다. import org.springframework.stereotype.Component; @Component public interface Car { String getName(); } Car객체를 상속받아 구현한 K5와 Sonata를 만들어 준다. K5 import org.springframework.stereotype.Component; @Component public class K5 implements Car { private final String name =...","categories": ["spring"],
        "tags": ["spring","DI"],
        "url": "http://localhost:4000/spring/DI/",
        "teaser":null},{
        "title": "spring boot yml에 있는 상수 값 불러오기",
        "excerpt":"상수 값들을 yml파일로 관리하고 싶을 때? 다음과 같이 두 가지 방법으로 진행이 가능하다. application.yml파일에 설정 별도 이름.yml에 설정 [첫번째 방법]application.yml파일에 설정 다음과 같이 application.yml에 van.name의 값을 기록한다. van: name: van class파일을 생성후 다음과 같이 Configuration,ConfigurationProperties 어노테이션을 추가한다. import org.springframework.boot.context.properties.ConfigurationProperties; import org.springframework.context.annotation.Configuration; @Configuration @ConfigurationProperties(prefix = \"van\") public class ApplicationYamlRead { }...","categories": ["spring boot"],
        "tags": ["spring boot","yml","property"],
        "url": "http://localhost:4000/spring%20boot/spring-boot-yml/",
        "teaser":null},{
        "title": "2주 회고 ",
        "excerpt":"기간 : 2019년 9월 9일(월) ~ 2019년 9월 15일(일) 이번 주 목표 1일 1커밋 프로그래머스 SQL 7일 챌린지 완성 아래 책 중 한권을 꼭 읽어보자 객체지향의 사실과 오해 소프트웨어 장인 TDD HeadFirst DesignPattern 한 챕터 정리 1일 HIIT 최소 한번이상 실시 나에게 칭찬해주고 싶은 점 1일 1커밋은 꾸준히 했다. 지난주와는...","categories": ["회고"],
        "tags": ["회고"],
        "url": "http://localhost:4000/%ED%9A%8C%EA%B3%A0/remind-2/",
        "teaser":null},{
        "title": "스트래티지 패턴(Strategy Pattern) ",
        "excerpt":"스트래티지 패턴(Strategy Pattern) 스트래티지 패턴에서는 알고리즘군을 정의하고 각각을 캡슐화하여 교환해서 사용할 수 있도록 만든다. 스트래티지를 활용하면 알고리즘을 사용하는 클라이언트와는 독립적으로 알고리즘을 변경할 수 있다. 스트래티지 패턴 예시 예시는 HeadFirst DesignPattern에서 가져왔습니다. 상황 다음과 같이 Duck 슈퍼클래스를 상속 받은 세 가지 종류의 오리 클래스가 존재합니다. 모든 오리들은 꽥꽥소리를 내며, 물 위에...","categories": ["Design Pattern"],
        "tags": ["디자인 패턴","Design Pattern","Head First Design Pattern","스트래티지 패턴","Strategy Pattern"],
        "url": "http://localhost:4000/design%20pattern/strategy-pattern/",
        "teaser":null},{
        "title": "자바의 쓰레드 풀(ThreadPoolExecutor)의 동작 원리",
        "excerpt":"쓰레드를 무한으로 늘리게되면 어떤 문제가 발생할 수 있을까? 성능이 떨어질 수 있다(context switching 비용) 쓰레드도 자원인데 계속 자원을 소모하면 자원 고갈로 인해 메모리가 넘침 -&gt; 서버가 다운 서버 입장에서 가장 중요한것은 서버가 다운되지 않으면서 운영되는 것 서버는 어떻게 해결할까 쓰레드를 미리 만들어 놓고 재사용하는 방식으로 사용한다(쓰레드 풀) 해당 내용은 공부를...","categories": ["OS"],
        "tags": ["Thread Pool","thread","쓰레드","java"],
        "url": "http://localhost:4000/os/thread-pool/",
        "teaser":null},{
        "title": "자바에서 Gson을 이용한 json<->객체 매핑",
        "excerpt":"Json이란? JSON(JavaScript Object Notation)은 속성-값 쌍(attribute–value pairs and array data types (or any other serializable value)) 또는 “키-값 쌍”으로 이루어진 데이터 오브젝트를 전달하기 위해 인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷이다. 비동기 브라우저/서버 통신 (AJAX)을 위해, 넓게는 XML(AJAX가 사용)을 대체하는 주요 데이터 포맷이다. 특히, 인터넷에서 자료를 주고 받을...","categories": ["java"],
        "tags": ["gson","json","java","gson"],
        "url": "http://localhost:4000/java/json-spring-boot/",
        "teaser":null},{
        "title": "3주 회고",
        "excerpt":"기간 : 2019년 9월 16일(월) ~ 2019년 9월 22일(일) 이번 주 목표 1일 1커밋 HeadFirst DesignPattern 한 챕터 정리 1일 HIIT 최소 한번이상 실시 성공적인 Level3 시작하기 나에게 칭찬해주고 싶은 점 이번 주 목표를 모두 달성했다! 성장을 위한 조언 조금 더 효율적인 페어프로그래밍 방법을 찾아야 할 것 같다. 책을 읽는...","categories": ["회고"],
        "tags": ["회고"],
        "url": "http://localhost:4000/%ED%9A%8C%EA%B3%A0/remind-3/",
        "teaser":null},{
        "title": "옵저버 패턴(Observer Pattern) ",
        "excerpt":"옵저버 패턴(Strategy Pattern) 한 객체(주제)의 상태가 바뀌면 그 객체에 의존하는 다른 객체(옵저버)들한테 연락이 가고 데이터가 업데이트되는 방식으로 일대다(one-to-many) 의존성을 정의합니다. 이 부분에서 가장 중요한 포인트는 연락이 가고 내용이 갱신돤다.라는 점이라고 생각한다. push vs pull 옵저버 패턴은 push방식, pull방식 두가지로 구현이 가능합니다. pull : 변경되었다는 알림과 함께 옵저버에게 직접 데이터를 전달...","categories": ["Observer Pattern"],
        "tags": ["디자인 패턴","Design Pattern","Head First Design Pattern","옵저버 패턴","Observer Pattern"],
        "url": "http://localhost:4000/observer%20pattern/observer-pattern/",
        "teaser":null},{
        "title": "와이어 샤크를 이용한 3 way-handshake 확인하기",
        "excerpt":"3 way-handShake란? 간단하게 말해서 TCP통신에서 두 장치들 사이에 통로를 맺는 과정이라고 볼 수 있다. 3 way-handShake를 하는 이유 데이터의 정확한 전송을 보장하기 위함 3 way-handShake 과정 연결 요청하는 쪽을 client, 받는 쪽을 Server라고 해보자 client가 server에 연결을 요청한다 (SYN) server가 1번에 대한 ACK응답과 함께 연결을 위한 SYN 요청을 보낸다 (SYN...","categories": ["Network"],
        "tags": ["Network","네트워크","TCP","3-way-handshake","Observer Pattern"],
        "url": "http://localhost:4000/network/3-way-handshake/",
        "teaser":null},{
        "title": "나를 표현하는 방법 연습하기",
        "excerpt":"나를 표현하는 방법 연습하기 제 3의 눈으로 나를 보기 영상이나 다른 사람을 통해 보여지는 나의 모습을 직접 관찰하자 무엇을 말할 지 정리하기 팀원들끼리 트렐로 같은 곳에 주제별로 나누고 정리 무슨일이 있어도 꼭 말하고 나와야 할 것 정하기 내가 꼭 얘기해야 하는 것 2~3개 정도 정해서 가기 회사에 맞추지 말라. 나의...","categories": ["기타"],
        "tags": [],
        "url": "http://localhost:4000/%EA%B8%B0%ED%83%80/lecture/",
        "teaser":null},{
        "title": "세션(session)은 언제 생성될까?",
        "excerpt":"개요 이번 was 구현 미션을 진행하면서 세션 이용한 로그인 관리를 구현하게 되었고 구현하는 와중에 다음과 같은 궁금증이 생겼다. 세션에 로그인 여부를 담자! client가 요청시 로그인 여부를 확인해야 하니 sessionId를 cookie값으로 넘겨야 겠지? 그런데 세션은 언제부터 생성되는 거지?? 구글링을 해보니 세션은 세션을 처음으로 필요로 하는 순간에 생성이 된다고 한다. 그래서 세션이...","categories": ["WAS"],
        "tags": ["WAS","cookie"],
        "url": "http://localhost:4000/was/session/",
        "teaser":null},{
        "title": "4주 회고",
        "excerpt":"기간 : 2019년 9월 23일(월) ~ 2019년 9월 29일(일) 이번 주 목표 1일 1커밋 HeadFirst DesignPattern 한 챕터 정리 1일 HIIT 최소 한번이상 실시 성공적인 Level3 시작하기 나에게 칭찬해주고 싶은 점 블로그에 많은 포스트를 했다 성장을 위한 조언 사람들이 읽기 쉬운 포스트를 작성해 보자. 책을 읽는 습관을 기를 필요가 있다....","categories": ["회고"],
        "tags": ["회고"],
        "url": "http://localhost:4000/%ED%9A%8C%EA%B3%A0/remind-4/",
        "teaser":null},{
        "title": "자바로 was 만들어보기-1",
        "excerpt":"이번 포스팅부터 2주간 교육에서 진행하였던 was를 처음부터 다시 만들어 보려고 한다. 이번 포스팅에는 서버를 띄우고 접속까지 구현을 해보려고 한다. 프로젝트 생성 및 설정 gradle기반 java프로젝트를 생성해주면 된다. dependencies(build.gradle) dependencies { //로깅을 위한 의존성 implementation 'ch.qos.logback:logback-classic:1.2.3' //테스트를 위한 의존성 testImplementation 'org.junit.jupiter:junit-jupiter:5.5.1' testImplementation 'org.assertj:assertj-core:3.12.2' } WebServer 생성 우선 Socket을 통한 웹서버를 실행시켜보려고...","categories": ["JAVA"],
        "tags": ["자바","was","java"],
        "url": "http://localhost:4000/java/was-level-1/",
        "teaser":null},{
        "title": "서블릿(Servlet)",
        "excerpt":"서블릿(Servlet)이란 자바 진영에서 동적인 웹 페이지를 구현하기 위한 표준 Servlet 표준을 정한 후 interface를 제공 각 Servlet에 대한 구현체는 Tomcat, Jetty등이 있다. HTTP의 응답과 요청을 parsing할 수 있는 것들을 정의해놓은 것 서블릿은 인터페이스로 표준을 제공하고 이를 구현한 tomcat, jetty등이 있음 인터페이스 기반으로 만들었을 때는 다른 것으로 옮겼을 때도 내부 로직에...","categories": ["JAVA"],
        "tags": ["자바","java","servlet"],
        "url": "http://localhost:4000/java/servlet/",
        "teaser":null},{
        "title": "서블릿 필터(Servlet Filter)",
        "excerpt":"mvc framework에서 servlet과 같은 역할을 하는 것은 controller controller에서 반복적으로 발생하는 일이 있을 수 있다 -&gt; 서블릿 내의 중복이 발생한다 인프라 성격의 로직(인프라 로직) : 권한 관리, 성능 측정, 해당 메서드에 대해서 로깅을 처리 컨트롤러 메서드의 성능 측정 방법 : (메서드의 끝나는 시간 - 시작 시간) - 이 기능을 모든...","categories": ["JAVA"],
        "tags": ["자바","java"],
        "url": "http://localhost:4000/java/lecture/",
        "teaser":null},{
        "title": "멀티쓰레드에서 서블릿 인스턴스를 재사용할 때 발생할 수 있는 문제점?",
        "excerpt":"JVM 메모리는 어떻게 관리되며, 인스턴스를 재사용할 때 어떤 문제가 발생할 수 있을까? 자바 프로그래밍에서 클래스의 인스턴스를 생성할 때 비용이 발생한다. 인스턴스를 생성하고 더 이상 사용하지 않을 경우 가비지 콜렉션 과정을 통해 메모리에서 해제하는 과정 또한 비용이 발생한다. 따라서 인스턴스를 매번 생성할 필요가 없는 경우 매번 인스턴스를 생성하지 않는 것이 성능...","categories": ["JAVA"],
        "tags": ["자바","java"],
        "url": "http://localhost:4000/java/servlet-in-multi-Thread/",
        "teaser":null},{
        "title": "5주 회고",
        "excerpt":"기간 : 2019년 9월 30일(월) ~ 2019년 10월 06일(일) 이번 주 목표 1일 1커밋 HeadFirst DesignPattern 한 챕터 정리 1일 HIIT 최소 한번이상 실시 스프링 부트 스타터 책 읽어보기 자바 8 in action 읽어보기 여태까지 내가 알고 있었던 내용, 배운 내용 정리하기 나에게 칭찬해주고 싶은 점 성장을 위한 조언 기능의...","categories": ["회고"],
        "tags": ["회고"],
        "url": "http://localhost:4000/%ED%9A%8C%EA%B3%A0/remind-5/",
        "teaser":null},{
        "title": "프록시 서버",
        "excerpt":"프록시 프록시 : 서버와 클라이언트 사이에 중계기로서 대리로 통신을 수행하는 것 프록시 서버 : 프록시 기능을 하는 서버 프록시 패턴 : 컴퓨터 프로그래밍에서 소프트웨어 디자인 패턴의 하나 프록시 서버 : 클라이언트가 자신을 통해서 다른 네트워크 서비스에 간접적으로 접속할 수 있게 해 주는 컴퓨터나 응용 프로그램 공개 프록시 : 누구나 자유롭게...","categories": ["etc"],
        "tags": ["프록시 서버","프록시","proxy","proxy server"],
        "url": "http://localhost:4000/etc/proxy/",
        "teaser":null},{
        "title": "6주 회고",
        "excerpt":"기간 : 2019년 10월 07일(월) ~ 2019년 10월 13일(일) 이번 주 목표 1일 1커밋 HeadFirst DesignPattern 한 챕터 정리 1일 HIIT 최소 한번이상 실시 발표 준비하기(forward proxy, reverse proxy) 나에게 칭찬해주고 싶은 점 성공적인 발표를 마쳤다. 성장을 위한 조언 다음 발표부터는 호흡을 조절하는 연습이 필요할 것 같다. Spring의 각 어노테이션의...","categories": ["회고"],
        "tags": ["회고"],
        "url": "http://localhost:4000/%ED%9A%8C%EA%B3%A0/remind-6/",
        "teaser":null},{
        "title": "RequestParam vs ModelAttribute vs RequestBody",
        "excerpt":"RequestParam vs ModelAttribute vs RequestBody 어노테이션의 차이는 무엇일까? 스프링 mvc를 구현해보려 하니 위 3개 어노테이션에 대해 혼란이 와서 정리를 해보려고 한다. RequestParam 요청 파라미터를 매핑해주는 어노테이션이다. 만약 요청이 /requestParam?name=van이라고 하면 아래와 같이 코드를 짤 수 있다. @RestController public class TestController { private static final Logger log = LoggerFactory.getLogger(TestController.class); @RequestMapping(\"/requestParam\") public...","categories": ["Spring"],
        "tags": ["Spring","Controller"],
        "url": "http://localhost:4000/spring/spring-boot-parameter-type/",
        "teaser":null},{
        "title": "데코레이터 패턴",
        "excerpt":"데코레이터 패턴? 기본 구성요소 클래스위에 데코레이터하는 클래스를 래퍼하는 것 데코레이터 패턴이 필요한 상황 다음과 같은 카페 메뉴가 존재한다고 하자 1. 아메리카노 2. 라떼 3. 아이스티 해당 메뉴에 대해서 공통로직으로 추출한다면 다음과 같이 추출할 수 있다. 이 때 각 메뉴들이 선택할 수 있는 옵션들이 다음과 같다면? 1. 휘핑 추가 2. 샷...","categories": ["Design Pattern"],
        "tags": ["디자인 패턴","Design Pattern","Head First Design Pattern","데코레이터 패턴","Decorator Pattern"],
        "url": "http://localhost:4000/design%20pattern/decorate-pattern/",
        "teaser":null},{
        "title": "7주 회고",
        "excerpt":"기간 : 2019년 10월 14일(월) ~ 2019년 10월 20일(일) 이번 주 목표 1일 1커밋 HeadFirst DesignPattern 한 챕터 정리 1일 HIIT 최소 한번이상 실시 RestController vs Controller 어노테이션 차이 ModelAttribute, ReqeustBody, RequestParam, PathVariable 어노테이션 공부 나에게 칭찬해주고 싶은 점 성장을 위한 조언 면접에서 아쉬웠던 점들을 정리해보면 좋을 것 같다. 보안에서...","categories": ["회고"],
        "tags": ["회고"],
        "url": "http://localhost:4000/%ED%9A%8C%EA%B3%A0/remind-7/",
        "teaser":null},{
        "title": "9주 회고",
        "excerpt":"기간 : 2019년 10월 21일(월) ~ 2019년 11월 03일(일) 이번 주 목표 1일 1커밋 HeadFirst DesignPattern 한 챕터 정리 1일 HIIT 최소 한번이상 실시 30개 정도의 키워드를 만들고 정리해보자 나에게 칭찬해주고 싶은 점 성장을 위한 조언 하나도 목표를 달성한 것이 없다. 다음 주 목표 1일 1커밋 HeadFirst DesignPattern 한 챕터...","categories": ["회고"],
        "tags": ["회고"],
        "url": "http://localhost:4000/%ED%9A%8C%EA%B3%A0/remind-9/",
        "teaser":null},{
        "title": "github oauth 동작 원리",
        "excerpt":"github OAuth2 동작 방식 1 ~ 2번 과정 (1) 사용자가 어플리케이션의 특정 URL로 접속한다. (/login) (2) 어플리케이션에서는 client_id를 포함하여 redirect URL을 전달한다. (https://github.com/login/oauth/authorize?client_id=‘client가 사전에 받은 id’) 3 ~ 4번 과정 (3) 사용자가 2번의 url로 이동하여 권한 허가를 한다 (4) Github에서는 code와 함께 사용자에게 redirectURL을 전달한다 (여기서 redirectURL은 client가 사전에 등록한...","categories": ["Web"],
        "tags": ["web","oauth","github"],
        "url": "http://localhost:4000/web/github-oauth/",
        "teaser":null}]
