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

## 📋 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 코드 검사 |
| `npm run format` | Prettier 코드 포맷팅 |
| `npm run typecheck` | TypeScript 타입 체크 |

