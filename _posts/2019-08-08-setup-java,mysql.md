---
published: true
layout: single
title: "리눅스 우분투(ubuntu) 자바, mysql 설치"
category: linux
tags : [java, mysql, linux, ubuntu]
---

## 자바 설치법(openjdk)


```bash
sudo apt-get -y install openjdk-8-jdk
```

- 위에서 -y옵션을 주는 이유는 설치시 yes/no를 물어보는 경우가 있는데 이 때 자동적으로 yes를 입력해 주기 위해서 옵션을 사용한다.

- 설치가 끝났다면 다음과 같은 명령을 통해 설치가 잘 되었는지 확인한다.


```bash
java -version
```


![java-version](/image/check-java-version.jpeg)


## mysql 설치방법 


- 아래에 다음과 같이 입력한다.

```bash
sudo apt-get update
sudo apt-get -y install mysql-server
```


- 이 때 다음과 같이 root의 비밀번호를 입력하는 창이 나오는데 절대 까먹으면 안된다.


![mysql-server](/image/mysql-setup1.jpeg)


- 설치가 끝나면 다음과 같은 명령을 통해 설치가 잘 되었는지 확인한다.


```bash
mysql --version
```


![mysql-version](/image/check-mysql-version.jpeg)
