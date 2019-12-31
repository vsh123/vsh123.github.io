# Vue Router

## Vue Router

- 뷰 라이브러리를 이용하여 싱글 페이지 애플리케이션을 구현할 때 사용하는 라이브러리

![image](https://user-images.githubusercontent.com/32254689/71607747-58fdd700-2bbf-11ea-90d9-08ba4c8fea72.png)

- router.js

```javascript
  //Lazy Loading
  const About = () => {
  return import(/_ webpackChunkName: "about" _/ "./views/About.vue");
  };

  export default new Router({
  //mode: "history"를 사용하지 않으면 path에 #이 붙는다
  //#이 붙는 모드를 default 모드인 hash mode라고 한다.
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
  {
  path: "/",
  name: "home",
  component: Home
  },
  {
  path: "/about",
  name: "about",
  component: About
  }
  ]
  });
```

- name의 사용법

```javascript
  //객체로 만들어서 삽입
  <v-list-tile @click="\$router.push({name: 'home'})">

  //path의 값을 삽입
  <v-list-tile @click="\$router.push('/')">

  //아래와 같이 객체안에 query나 parameter를 함께 넣어줄 수 있음
  <v-list-tile @click="\$router.push({name: 'home', query: {}, params: {}})">

  <router-link :to="{name: 'home'}">클릭</router-link>

  //vuetify에서
  //exact 속성을 넣어주게 된다면 해당 path가 정확히 일치할 때에만 router가 번쩍임
  <v-list-tile router :to="{name: 'home'}" exact>
```

- 파라미터 전달

```javascript
  //router.js
  {
  //:id를 통해 보낼 수 있슴
  // '/articles/:articleId' 이런식으로 응용이 가능할 듯
  path: "/users/:userId",
  name: "users",
  component: Users
  }

  //App.vue
  <v-list-tile
              router
              :to="{
              name: 'users',
              params: {
                userId: 4321
              }}"
              exact
            >

  //받는 쪽에서 처리하는 방법
  <template>

  <div>
  <h1>Users 파일</h1>
  //computed의 userId를 호출
  {{ userId }}
  </div>
  </template>

    <script>
    export default {
      computed: {
        userId() {
    			//$route.을 사용
          return this.$route.params;
        }
      }
    };
    </script>

    <style>
    </style>
```

- query

```javascript
  <v-list-tile
              router
              :to="{
              name: 'users',
              params: {
                userId: 4321,
                name: 'van'
              },
              query: {
                group: 'member',
                category: 'trial'
              }}"
              exact
            >

  //Users.vue
  <template>

  <div>
  <h1>Users 파일</h1>
  <p>이 유저는 현재 유저 번호가 {{ userId }}입니다.</p>
  <h1>{{ group }}</h1>
  {{ category }}
  //여기서는 this를 빼도 되는디
  {{ $route.query.group }}
  </div>
  </template>

    <script>
    export default {
      computed: {
        userId() {
          return this.$route.params.userId;
        }
      },
      data() {
        return {
    //여기는 빼면 안됨 왜지
          group: this.$route.query.group,
          category: this.$route.query.category
        };
      }
    };
    </script>

    <style>
    </style>
```

![image](https://user-images.githubusercontent.com/32254689/71607753-5ef3b800-2bbf-11ea-8a3d-347a40f84bf0.png)

- 하위경로

`/users/:userId/edit` 을 children을 이용해서 구성해보자(여러개로 router등록하지말구)

router.js

```javascript
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

//Lazy
const About = () => import(/* webpackChunkName: "about" */ "./views/About.vue");

const Users = () => import(/* webpackChunkName: "users" */ "./views/Users.vue");
const UsersDetail = () =>
  import(/* webpackChunkName: "users-detail" */ "./views/UsersDetail.vue");

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      children: [
        {
          path: ":id",
          name: "users-detail",
          component: UsersDetail
        }
      ]
    }
  ]
});
```

- Users.vue

```javascript
    <template>
      <v-layout row wrap pt-5 text-xs-center style="max-width:500px;margin: 0 auto;">
        <v-flex>
          <h1>Users 파일</h1>
          <p>유저를 검색해 주세요</p>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="userId" label="유저 번호를 입력하세요"></v-text-field>
          <v-btn @click="$router.push({name: 'users-detail',params:{
              id:userId
          }})">검색</v-btn>
        </v-flex>
        <v-flex xs12>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </template>

    <script>
    export default {
      data() {
        return {
          userId: null
        };
      }
    };
    </script>

    <style>
    </style>
```

- UsersDetail.vue

```javascript
    <template>
      <div>
        <h1>Users Detail</h1>
        {{ userId }}
        <v-btn @click="edit" small>수정</v-btn>
      </div>
    </template>

    <script>
    export default {
      computed: {
        userId() {
          return this.$route.params.id;
        }
      },
      methods: {
        edit() {
          this.$router.push({ name: "users-edit" });
        }
      }
    };
    </script>

    <style>
    </style>
```

- Router Guard

  - 조건에 따라서 라우터를 지킨다(로그인을 안한 유저를 막는다)

- router.js

```javascript
  {
  path: "/users",
  name: "users",
  //to : 가려는 곳
  //from : 요청한 곳
  //next : 실제로 이동할 곳
  beforeEnter: (to, from, next) => {
  //무조건 home페이지로 간다
  next("/");
  },
  component: Users,
  children: [
  {
  path: ":id",
  name: "users-detail",
  component: UsersDetail
  },
  {
  path: ":id/edit",
  name: "users-edit",
  component: UsersEdit
  }
  ]
  }
```

- Users.vue

```javascript
    <script>
    export default {
      data() {
        return {
          userId: null
        };
      },
      created() {
        console.log("created");
      },
      beforeRouteEnter(to, from, next) {
        console.log("befor enter");
        next();
      },beforeRouteLeave(to, from, next) {
        console.log("before leave");
      },
    };
    </script>
```

- 예상하지 못한 요청 url 리다이렉션

  - router.js

```javascript
    {
    path: "redirect-me",
    redirect: { name: "users" }
    },
    {
    path: "/\*",
    redirect: { name: "home" }
    }
```
