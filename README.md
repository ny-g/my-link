<div align="center">

# 🔗 MyLink (마이링크)

**나의 모든 링크를 하나로, 멀티 링크 프로필 서비스**

여러 개의 링크를 하나의 페이지에 모아서 공유할 수 있는 **올인원 프로필 링크** 서비스입니다.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.7-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.13.0-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.1-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📖 프로젝트 소개

**MyLink**는 개발자, 크리에이터 등 자신의 포트폴리오, SNS, 작업물 링크를 **하나의 깔끔한 프로필 페이지**로 모아 공유할 수 있는 웹 서비스입니다.

> **핵심 철학:** 인라인 편집(In-line Editing) 기반의 끊김 없는(Seamless) 사용자 경험.  
> 모달이나 별도의 설정 페이지 없이, 텍스트를 직접 클릭해서 수정하고 포커스 해제 시 자동 저장됩니다.

### 왜 MyLink인가?

- 🚀 **즉시 시작** — 구글 로그인 한 번이면 나만의 프로필 페이지가 자동 생성됩니다.
- ✏️ **인라인 편집** — 별도 설정 창 없이 화면에서 바로 클릭하여 수정합니다.
- 📊 **방문자 통계** — 페이지 방문 수와 각 링크별 클릭 수를 한눈에 확인할 수 있습니다.
- 🎨 **모던 디자인** — shadcn/ui 기반의 정제되고 세련된 단일 디자인을 제공합니다.

---

## ✨ 주요 기능

### 🔐 인증 & 프로필
| 기능 | 설명 |
|------|------|
| **구글 소셜 로그인** | Firebase Auth 기반, 별도 가입 폼 없이 원클릭 로그인 |
| **자동 URL 슬러그 생성** | Gmail 아이디 앞부분을 추출하여 `mylink.com/닉네임` 자동 배정 |
| **프로필 이미지 연동** | 구글 계정 프로필 사진 자동 반영 |
| **인라인 프로필 편집** | 유저네임, 소개글(bio), 닉네임(displayName) 클릭 즉시 수정 |

### 🔗 링크 관리
| 기능 | 설명 |
|------|------|
| **링크 추가 / 삭제** | 외부 URL과 타이틀을 추가하고 관리 |
| **인라인 링크 편집** | 제목, URL을 클릭하여 즉시 수정 가능 |
| **파비콘 자동 표시** | 구글 Favicon API를 통해 사이트 아이콘 자동 렌더링 |
| **드래그 앤 드롭 정렬** | 링크 순서를 자유롭게 재배치 |
| **활성화/비활성화 토글** | 특정 링크를 방문자에게 일시적으로 숨김 처리 |

### 📊 통계 대시보드
| 기능 | 설명 |
|------|------|
| **총 방문 수 조회** | 프로필 페이지의 누적 방문 트래픽 확인 |
| **링크별 클릭 수** | 각 링크의 개별 클릭 카운트 추적 |

### 🌐 공유 최적화
| 기능 | 설명 |
|------|------|
| **OG 태그 자동 세팅** | 메신저/SNS 공유 시 카드 형태 미리보기 지원 |
| **SEO 대응** | 서버사이드 메타데이터를 통한 검색 엔진 최적화 |

---

## 🛠 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 16.1.7 | App Router, Turbopack 기반 프레임워크 |
| **React** | 19.2.4 | UI 라이브러리 |
| **TypeScript** | 5.9.3 | 타입 안전성 보장 |
| **Tailwind CSS** | 4.2.1 | 유틸리티 기반 스타일링 |
| **shadcn/ui** | 최신 | UI 컴포넌트 시스템 |

### Backend & Infra
| 기술 | 버전 | 용도 |
|------|------|------|
| **Firebase Auth** | 12.13.0 | 구글 소셜 로그인 인증 |
| **Cloud Firestore** | 12.13.0 | NoSQL 실시간 데이터베이스 |

### 상태 관리 & 데이터 페칭
| 기술 | 버전 | 용도 |
|------|------|------|
| **TanStack React Query** | 5.x | 서버 상태 관리 및 캐싱 |
| **React Hook Form** | 7.x | 폼 상태 관리 |
| **Zod** | 4.x | 스키마 기반 데이터 검증 |

### 시각화 & 기타
| 기술 | 버전 | 용도 |
|------|------|------|
| **Recharts** | 3.8.0 | 통계 차트 시각화 |
| **Lucide React** | 1.8.0 | 아이콘 라이브러리 |

---

## 📁 프로젝트 구조

```
my-link/
├── app/                          # Next.js App Router
│   ├── [displayName]/            #   ├── 사용자 공개 프로필 페이지 (동적 라우트)
│   │   ├── page.tsx              #   │     방문자가 보는 프로필 뷰어
│   │   ├── layout.tsx            #   │     프로필 페이지 레이아웃
│   │   └── opengraph-image.tsx   #   │     OG 이미지 동적 생성
│   ├── stats/                    #   ├── 통계 대시보드 페이지
│   │   └── page.tsx              #   │
│   ├── layout.tsx                #   ├── 루트 레이아웃 (메타데이터, 폰트, 프로바이더)
│   ├── page.tsx                  #   ├── 메인 대시보드 / 랜딩 페이지
│   ├── providers.tsx             #   ├── React Query 등 전역 프로바이더
│   ├── globals.css               #   ├── 전역 스타일 (Tailwind CSS)
│   ├── not-found.tsx             #   └── 404 페이지
│   └── opengraph-image.tsx       #       루트 OG 이미지
│
├── components/                   # 컴포넌트
│   ├── ui/                       #   ├── shadcn/ui 기반 원자적 컴포넌트
│   │   ├── button.tsx            #   │     (Button, Card, Dialog, Input 등)
│   │   ├── card.tsx              #   │
│   │   ├── chart.tsx             #   │
│   │   ├── dialog.tsx            #   │
│   │   ├── input.tsx             #   │
│   │   └── label.tsx             #   │
│   ├── landing/                  #   ├── 랜딩 페이지 전용 컴포넌트
│   │   └── LandingPage.tsx       #   │
│   ├── Header.tsx                #   ├── 글로벌 헤더 (로그인/로그아웃, 네비게이션)
│   └── theme-provider.tsx        #   └── 테마 프로바이더
│
├── hooks/                        # 커스텀 React 훅
│   ├── useAuth.ts                #   ├── Firebase 인증 상태 관리
│   ├── useLinks.ts               #   ├── 링크 CRUD 및 순서 관리
│   └── useProfile.ts             #   └── 프로필 데이터 관리
│
├── lib/                          # 유틸리티
│   ├── firebase.ts               #   ├── Firebase 초기화 설정
│   └── utils.ts                  #   └── cn() 등 공통 유틸리티
│
├── data/                         # 정적 데이터
│   └── links.ts                  #   └── 링크 타입 정의 및 샘플 데이터
│
├── docs/                         # 프로젝트 문서
│   ├── PRD.md                    #   ├── 제품 요구사항 정의서
│   ├── USER_SCENARIO.md          #   ├── 사용자 시나리오
│   └── WIREFRAME.md              #   └── 와이어프레임
│
├── public/                       # 정적 자산
├── firestore.rules               # Firestore 보안 규칙
├── GEMINI.md                     # 프로젝트 개발 가이드
└── package.json
```

---

## 🗄 데이터베이스 구조

MyLink는 **Cloud Firestore**의 서브 컬렉션 모델을 채택합니다.

```
firestore/
├── users/{userId}                  # 사용자 메인 문서
│   ├── photoURL                    #   구글 프로필 이미지 URL
│   ├── displayName                 #   URL 슬러그 (고유)
│   ├── username                    #   화면 표시용 이름
│   └── bio                         #   소개글
│
│   ├── links/{linkId}              # 링크 서브 컬렉션
│   │   ├── title                   #   링크 제목
│   │   ├── url                     #   대상 URL
│   │   ├── order                   #   정렬 순서
│   │   ├── isActive                #   활성화 여부
│   │   └── clicks                  #   클릭 수
│   │
│   └── settings/{settingId}        # 설정 서브 컬렉션 (비공개)
│
└── slugs/{slug}                    # URL 슬러그 중복 방지 맵핑
    └── userId                      #   해당 슬러그의 소유자 UID
```

---

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 18.18 이상
- **npm** 패키지 매니저
- **Firebase 프로젝트** (Authentication + Firestore 활성화)

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/my-link.git
cd my-link
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 Firebase 설정값을 입력합니다:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Firebase 설정

1. [Firebase 콘솔](https://console.firebase.google.com/)에서 프로젝트를 생성합니다.
2. **Authentication** > 로그인 방법에서 **Google** 제공업체를 활성화합니다.
3. **Firestore Database**를 생성합니다.
4. 프로젝트의 `firestore.rules` 파일 내용을 Firebase 콘솔의 보안 규칙에 적용합니다.

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

---

## 📋 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | Turbopack 기반 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 코드 검사 |
| `npm run format` | Prettier 코드 포맷팅 |
| `npm run typecheck` | TypeScript 타입 체크 |

---

## 📄 라이선스

이 프로젝트는 비공개(Private) 프로젝트입니다.
