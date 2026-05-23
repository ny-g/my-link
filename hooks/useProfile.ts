import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { UserProfile } from "./useAuth" // 인터페이스만 가져오거나 여기로 이동

export function useProfile(user: any) {
  const queryClient = useQueryClient()

  // 1. 프로필 정보 조회
  const { data: userProfile, isLoading: isProfileLoading } = useQuery<UserProfile | null>({
    queryKey: ["profile", user?.uid],
    queryFn: async () => {
      if (!user) return null
      
      const userDocRef = doc(db, "users", user.uid)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        return userDocSnap.data() as UserProfile
      } else {
        // 최초 접속 시 프로필 생성
        const email = user.email || ""
        const slug = email.split("@")[0] || user.uid.slice(0, 8)
        const newProfile: UserProfile = {
          username: user.displayName || slug,
          displayName: slug,
          slug: slug,
          photoURL: user.photoURL || "",
          bio: "안녕하세요! 제 포트폴리오입니다",
        }
        
        await setDoc(userDocRef, {
          ...newProfile,
          createdAt: serverTimestamp(),
        })
        return newProfile
      }
    },
    enabled: !!user,
  })

  // 2. 프로필 업데이트 Mutation (낙관적 업데이트 적용)
  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      if (!user) throw new Error("No user")
      const userDocRef = doc(db, "users", user.uid)
      await updateDoc(userDocRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })
      return data
    },
    onMutate: async (newData) => {
      // 진행중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ["profile", user?.uid] })

      // 이전 캐시 데이터 백업
      const previousProfile = queryClient.getQueryData<UserProfile>(["profile", user?.uid])

      // 캐시를 낙관적으로 업데이트
      if (previousProfile) {
        queryClient.setQueryData(["profile", user?.uid], {
          ...previousProfile,
          ...newData,
        })
      }

      // 에러 시 롤백을 위해 context에 이전 데이터 반환
      return { previousProfile }
    },
    onError: (err, newData, context) => {
      console.error("Error updating profile:", err)
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", user?.uid], context.previousProfile)
      }
    },
    onSettled: () => {
      // 성공이든 에러든 처리가 끝나면 무효화하여 최신 데이터 리패치 (실시간 필요없으면 생략 가능하지만 일관성을 위해)
      // queryClient.invalidateQueries({ queryKey: ["profile", user?.uid] })
    },
  })

  // 3. 중복 확인 유틸 함수 (Mutation 밖에서 호출용)
  const checkDisplayNameDuplicate = async (displayName: string) => {
    if (!user) return false
    try {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("displayName", "==", displayName))
      const querySnapshot = await getDocs(q)
      
      const duplicateDocs = querySnapshot.docs.filter((docSnap) => docSnap.id !== user.uid)
      return duplicateDocs.length > 0
    } catch (error) {
      console.error("Error checking display name duplicate:", error)
      return true // 에러 시 방어적으로 중복 처리
    }
  }

  return {
    userProfile,
    isProfileLoading,
    updateProfile: updateProfileMutation.mutateAsync,
    checkDisplayNameDuplicate,
  }
}
