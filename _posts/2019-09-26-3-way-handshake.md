---
published: true
layout: single
title: "와이어 샤크를 이용한 3 way-handshake 확인하기"
category: Network
tags : [Network, 네트워크, TCP, 3-way-handshake, Observer Pattern]
---

## 3 way-handShake란?

> 간단하게 말해서 TCP통신에서 두 장치들 사이에 통로를 맺는 과정이라고 볼 수 있다.

### 3 way-handShake를 하는 이유

- 데이터의 정확한 전송을 보장하기 위함

### 3 way-handShake 과정

연결 요청하는 쪽을 client, 받는 쪽을 Server라고 해보자

1. client가 server에 연결을 요청한다 (SYN)
2. server가 1번에 대한 ACK응답과 함께 연결을 위한 SYN 요청을 보낸다 (SYN ACK)
3. client가 2번에 대한 ACK응답을 보낸다 (ACK)

### 직접 확인해보자!

> 네이버 사이트에 접속하면서 3 way handshake를 확인해보자

#### www.naver.com의 ip를 확인

맥은 terminal, 윈도우는 cmd 창을 열어 `nslookup www.naver.com`을 친다.

![connect](/image/2019-09-26-3-way-handshake/image-1.png)

> 23.35.221.113임을 알 수 있다.

#### wireShark를 켜고 ip.addr == 23.35.221.113을 입력한다.

![connect](/image/2019-09-26-3-way-handshake/image-2.png)

> ip(source나 destination)가 23.35.221.113인 것만 보겠다는 의미이다.

#### 네이버에 접속한 후 찍힌 패킷 번호 중 가장 최상위 번호를 확인한다.

![connect](/image/2019-09-26-3-way-handshake/image-3.png)

위의 3개의 패킷을 보면 다음과 같은 것을 알 수 있다.

1. 내가 네이버에게 SYN을 보내고
2. 네이버가 SYN ACK를 보내준 후
3. 내가 확인으로 ACK를 보낸다
4. Client Hello는 3 way handShake 이후 클라이언트가 보내는 첫 번째 메세지 이다.

## 결론

TCP통신에서 3way handShake가 맺어지는 과정을 확인해봤다.