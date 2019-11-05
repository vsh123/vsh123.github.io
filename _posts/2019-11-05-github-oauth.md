---
published: true
layout: single
title: "github oauth 동작 원리"
category: Web
tags : [web, oauth, github]
---

# github OAuth2 동작 방식

![connect](/image/2019-11-05-github-oauth/1.png)

## 1 ~ 2번 과정

![connect](/image/2019-11-05-github-oauth/2.png)

(1) 사용자가 어플리케이션의 특정 URL로 접속한다. (/login)

(2) 어플리케이션에서는 client_id를 포함하여 redirect URL을 전달한다.

(https://github.com/login/oauth/authorize?client_id=‘**client가 사전에 받은 id**’)

## 3 ~ 4번 과정

![connect](/image/2019-11-05-github-oauth/3.png)

(3) 사용자가 2번의 url로 이동하여 권한 허가를 한다

(4) Github에서는 code와 함께 사용자에게 redirectURL을 전달한다

(여기서 redirectURL은 client가 사전에 등록한 url이다)

![connect](/image/2019-11-05-github-oauth/4.png)

## 5번 이후 과정

![connect](/image/2019-11-05-github-oauth/5.png)

(5) 사용자는 4번의 redirectURL로 code와 함께 어플리케이션에 전달한다.

(6) 어플리케이션은 **사용자에게 받은 code, 본인의 client_id, client_secret**과 함께 github으로 access_token 발급 요청을 한다.

(POST https://github.com/login/oauth/access_token)

(7) Github은 어플리케이션에게 사용자의 access_token, token_type을 리턴한다

(8,9) : 이후 access_token을 통해 왔다리 갔다리 한다.

Github은 refresh_token이 별도로 존재하지 않고 access_token이 지속 유지되나봄?