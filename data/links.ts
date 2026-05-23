export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  isActive: boolean; // PRD: 특정 사이트 일시 숨김 토글 지원
  order: number; // PRD: 드래그 앤 드롭을 통한 리스트 위아래 순서 변경 지원
  updatedAt?: Date; // 링크 마지막 수정 시각
  clicks?: number; // 링크 클릭 수
}

export const dummyLinks: LinkItem[] = [
  {
    id: "1",
    title: "인스타그램",
    url: "https://instagram.com/example",
    isActive: true,
    order: 0,
  },
  {
    id: "2",
    title: "유튜브",
    url: "https://youtube.com/@example",
    isActive: true,
    order: 1,
  },
  {
    id: "3",
    title: "블로그",
    url: "https://blog.example.com",
    isActive: true,
    order: 2,
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com/example",
    isActive: true,
    order: 3,
  },
  {
    id: "5",
    title: "포트폴리오",
    url: "https://portfolio.example.com",
    isActive: false, // 예시로 비활성화 상태 추가
    order: 4,
  },
];
