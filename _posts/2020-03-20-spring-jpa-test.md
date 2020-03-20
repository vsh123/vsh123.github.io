# Spring Data Jpa에서 Lazy Loading을 테스트해보자!!

JPA(혹은 하이버네이트)를 공부하다보면 다음과 Lazy Loading과 Eager Loading에 대해서 들을 수 있습니다.

다음과 같이 연관관계를 가진 엔티티가 있다고 가정하겠습니다.

### Team

    @Entity
    public class Team {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

    		public Team() {
    		}

        public Team(String name) {
            this.name = name;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }
    }

### Member

    @Entity
    public class Member {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        @ManyToOne
        private Team team;

        public Member(String name, Team team) {
            this.name = name;
            this.team = team;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public Team getTeam() {
            return team;
        }
    }

위를 보면 Member가 Team을 ManyToOne의 관계로 연관관계 매핑이 되어 있습니다.

이 때

- Lazy Loading(지연 로딩) :Member.getTeam()을 했을 때 team에 대한 실제 데이터를 불러옴
- Eager Loading(즉시 로딩) : find(Member)를 했을 때 team에 대한 데이터도 함께 불러옴

라는 개념을 가지고 있으며 `@ManyToOne` 의 기본 타입은 `Eager` 입니다.

![connect](/image/2020-03-20-spring-jpa-test/1.png)

자, 이제 이를 테스트 해보기 위해(눈으로 직접 보기 위해) 다음과 같은 코드를 작성해 주겠습니다.

- `test/resources` 밑에 data.sql 파일을 만들어주세요

![connect](/image/2020-03-20-spring-jpa-test/2.png)

### application.yml

    spring:
      datasource:
      jpa:
        properties:
          hibernate.format_sql: true

### MemberRepository

    public interface MemberRepository extends JpaRepository<Member, Long> {
    }

### MemberRepositoryTest

    @DataJpaTest
    class MemberRepositoryTest {
        @Autowired
        private MemberRepository memberRepository;

        @Test
        void manyToOne은_정말_즉시_로딩일까() {
            memberRepository.findById(1L);
        }
    }

자 이제 실행결과를 확인해 보겠습니다.

![connect](/image/2020-03-20-spring-jpa-test/3.png)

보이시나요? member와 team을 조인해서 가져오고 있습니다.

이번에는 Lazy Loading옵션을 해서 테스트해보겠습니다.

### Member

    @Entity
    public class Member {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        //이렇게 Lazy옵션을 설정했습니다.
        @ManyToOne(fetch = FetchType.LAZY)
        private Team team;

        private Member(){
        }

        public Member(String name, Team team) {
            this.name = name;
            this.team = team;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public Team getTeam() {
            return team;
        }
    }

그리고 다시한번 테스트를 실행해보면!

![connect](/image/2020-03-20-spring-jpa-test/4.png)

이전과는 다르게 member 테이블만 조회하는 것을 알 수 있습니다.

이렇게 콘솔을 통해 한번에 가져온다는 것을 확인할 수 있었지만,

이를 조금 더 명확히 하기 위해 테스트 코드를 작성해 보겠습니다.

테스트하기 위해 EntityManagerFactory에 있는 `PersistenceUnitUtil` 을 활용해 보겠습니다.

다음과 같이 테스트 코드를 수정해 주세요.

    @DataJpaTest
    class MemberRepositoryTest {
        @Autowired
        private MemberRepository memberRepository;
        @Autowired
        private EntityManagerFactory factory;

        @Test
        void manyToOne은_정말_즉시_로딩일까() {
            PersistenceUnitUtil persistenceUnitUtil = factory.getPersistenceUnitUtil();
            Optional<Member> maybeMember = memberRepository.findById(1L);

            //멤버 클래스의 team이름의 필드가 로드 되어있는지 테스트
            assertThat(persistenceUnitUtil.isLoaded(maybeMember.get(), "team")).isFalse();

            Member member = maybeMember.get();
            assertThat(persistenceUnitUtil.isLoaded(maybeMember.get(), "team")).isFalse();

            Team team = maybeMember.get().getTeam();
            assertThat(persistenceUnitUtil.isLoaded(maybeMember.get(), "team")).isFalse();

            String name = maybeMember.get().getTeam().getName();
            assertThat(persistenceUnitUtil.isLoaded(member, "team")).isTrue();
        }
    }

![connect](/image/2020-03-20-spring-jpa-test/5.png)

테스트 코드를 보니 특별한 게 보이시나요?

> Team에 대한 실제 데이터가 삽입되는 시점은 getTeam()이 아닌 그 안에있는 필드에 직접 접근할 때라는 걸 알 수 있습니다.

이처럼 이번 테스트를 통해 눈으로 확인하는것 보다 조금 더 명확하게 영속성 객체에 대해서 조금 더 이해하게 되었습니다.
