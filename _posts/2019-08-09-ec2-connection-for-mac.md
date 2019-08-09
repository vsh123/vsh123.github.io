---
published: true
layout: single
title: "mac에서 AWS EC2 접속 sh파일 만들기"
category: AWS
tags : [aws, ec2, linux, mac]
---

Mac에서 아마존 웹서비스(이하 aws) linux ec2를 접속하기 위해서는 key가 있는 위치로 이동하여 ssh 명령어를 통해 접속을 해야한다.

하지만 매번 key가 있는 위치를 찾아서 작업하기에는 너무 귀찮기 때문에 다음과 같은 sh 스크립트를 작성해 접속을 하려고 한다.

스크립트에는 다음과 같은 내용이 들어가 있다

1. key가 있는 경로를 찾고 해당 경로를 저장한다.
2. 해당 key를 이용해 서버에 접속을한다.

우선 key이름이 EC2-vsh123.pem인 key를 찾기 위해서 다음과 같은 명령어가 필요하다.

```bash
#!/bin/bash
serverip=#본인의 서버 ip

#key이름을 가진 첫번째 경로를 찾아 저장한다.
findpath=$(find . -name EC2-vsh123.pem | head -n 1)
```

그 후 찾은 경로를 통해 ssh로 접속을 한다

```bash
#!/bin/bash
serverip=#본인의 서버 ip

#key이름을 가진 첫번째 경로를 찾아 저장한다.
findpath=$(find . -name EC2-vsh123.pem | head -n 1)

#ssh를 통해 접속을 시도한다.
ssh -i $findpath ubuntu@$serverip -y
```

해당 shell을 저장 후 sh 명령어를 통해 실행시켜 주면 끝!

![connect](/image/connect-shell.jpeg)
