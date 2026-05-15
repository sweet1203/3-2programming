# python_courseware_app

고등학교 정보 3-2 **알고리즘과 프로그래밍** 단원용 브라우저 실습 코스웨어(Vite + React + Pyodide)입니다.

## 포함 내용

- `src/` … 웹 앱 소스 (`/lesson/1` ~ `/lesson/5`)
- `materials/` … 단원 안내 및 1~5차시 이론 마크다운 (`00_단원_안내.md`, `01차시_…` ~ `05차시_…`)

이론 본문은 빌드 시 `materials`의 MD를 그대로 불러와 표시합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173/lesson/1` 등으로 접속합니다.

## 빌드

```bash
npm run build
npm run preview
```

## GitHub Pages 배포

- 공개 URL: https://sweet1203.github.io/3-2programming/
- `main` 브랜치에 push하면 [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)이 `npm run build` 결과(`dist/`)를 Pages에 올립니다.
- 저장소 **Settings → Pages → Build and deployment**에서 **Source**를 **GitHub Actions**로 선택해야 합니다. (예전처럼 `main` / `(root)`만 쓰면 소스 `index.html`이 올라가 앱이 비어 보입니다.)

## 라이선스

교육용으로 사용하세요. 원본 MD·교안의 저작권은 작성자·학교 정책을 따릅니다.
