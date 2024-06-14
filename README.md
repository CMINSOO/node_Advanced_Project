# node-advanced

# 환경변수

- `.env.example` 파일의 이름을 `.env`로 변경하고 아래 내용을 채움

```sh
SERVER_PORT=서버 포트
DATABASE_URL=mysql://계정이름:비밀번호@주소:포트/DB명
ACCESS_TOKEN_SECRET=JWT 생성을 위한 비밀키
```

# 실행 방법 (with yarn)

- 필요한 패키지 설치

```sh
yarn
```

- DB 테이블 생성
```sh
yarn prisma db push
```

- 서버 실행 (배포용)

```sh
yarn start
```

- 서버 실행 (개발용)

```sh
yarn dev
```

# 실행 방법 (with npm)

- 필요한 패키지 설치

```sh
npm install
```

- DB 테이블 생성
```sh
npx prisma db push
```

- 서버 실행 (배포용)

```sh
npm run start
```

- 서버 실행 (개발용)

```sh
npm run dev
```

# API 명세서

(https://secretive-uranium-993.notion.site/75d749b009ea49b59e4079a68dfa56da?v=19779d4904224a838e8d76c8c133a18b&pvs=4)

# ERD

https://drawsql.app/teams/team-modolee/diagrams/sparta-node-advanced
