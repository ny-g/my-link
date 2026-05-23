import { Metadata } from "next"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

type Props = {
  params: Promise<{ displayName: string }>
}

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params
  const displayName = params.displayName

  try {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("displayName", "==", displayName))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data()
      const title = userData.username || displayName
      const description = userData.bio || `${title}님의 MyLink 프로필입니다.`

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images: userData.photoURL ? [userData.photoURL] : [],
        },
        twitter: {
          title,
          description,
          images: userData.photoURL ? [userData.photoURL] : [],
        },
      }
    }
  } catch (error) {
    console.error("Error fetching metadata:", error)
  }

  // 기본 메타데이터 (데이터를 찾지 못한 경우)
  return {
    title: displayName,
  }
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
