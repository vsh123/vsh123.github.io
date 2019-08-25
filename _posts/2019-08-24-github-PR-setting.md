---
published: true
layout: single
title: "github PR(Pull Request) 일반 merge 막기"
category: github
tags : [github, Pull Request, squash merge]
---

github을 통해 팀 프로젝트를 할 때 가장 중요한 것 중의 하나가 Pull Request(이하 PR) 과 commit관리이다.

팀 규칙으로 PR을 merge할 때 squash and merge를 사용하자고 정했지만, 사람은 가끔 실수를 할 수 있기 때문에

이번 글에서는 github에서 지원하는 일반 merge 버튼 제한을 공유해보자 한다.

1. 본인의 github Repository -> setting으로 접속한다.
![connect](/image/github-setting-page.jpeg)

1. Options에서 밑으로 내리다 보면 다음과 같이 Merge button이 보인다.
![connect](/image/github-merge-button.jpeg)

1. 여기서 Allow merge commits를 체크 해제하면 끝!
![connect](/image/github-allow-merge-disable.jpeg)