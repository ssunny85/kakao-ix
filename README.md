# KAKAO IX 과제

## Project 구동

Backend, Frontend 서버 구동후 Front 개발서버로 접속하여 과제 확인 가능합니다. (OSX 기준 설명입니다.)

** 참고 **
> Frontend 과제 제출은 Vue.js 프레임워크를 사용한 `todo-vue` 폴더에서 확인 부탁드립니다.
>
> `todo-react`는 react 학습용으로 진행중입니다. 단순 참고만 부탁드립니다. 

### yarn install
```shell script
$ brew install yarn
```

### Mongodb install

```shell script
$ brew tap mongodb/brew
$ brew install mongodb-community
$ brew services start mongodb-community
```

### Backend 구동

```shell script
$ cd backend
$ yarn install
$ yarn serve
```

### Frontend Vue 구동

```shell script
$ cd todo-vue
$ yarn install
$ yarn serve
```

### Frontend React 구동

```shell script
$ cd todo-react
$ yarn install
$ yarn serve
```

### Frontend 단위테스트

```shell script
$ cd todo-vue
$ yarn test:unit
```
