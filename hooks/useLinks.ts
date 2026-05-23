import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { LinkItem } from "@/data/links" // 혹은 타입을 재정의

export function useLinks(user: any) {
  const queryClient = useQueryClient()

  // 1. 링크 목록 조회
  const { data: links = [], isLoading: isLinksLoading } = useQuery<LinkItem[]>({
    queryKey: ["links", user?.uid],
    queryFn: async () => {
      if (!user) return []
      
      const q = query(collection(db, "users", user.uid, "links"), orderBy("order", "asc"))
      const querySnapshot = await getDocs(q)
      const fetchedLinks: LinkItem[] = []
      querySnapshot.forEach((docSnap) => {
        fetchedLinks.push({ id: docSnap.id, ...docSnap.data() } as LinkItem)
      })
      return fetchedLinks
    },
    enabled: !!user,
  })

  // 2. 링크 추가 Mutation
  const addLinkMutation = useMutation({
    mutationFn: async (data: { title: string; url: string; order: number }) => {
      if (!user) throw new Error("No user")
      const newLinkData = {
        title: data.title,
        url: data.url,
        isActive: true,
        order: data.order,
      }
      const docRef = await addDoc(collection(db, "users", user.uid, "links"), newLinkData)
      return { id: docRef.id, ...newLinkData } as LinkItem
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", user?.uid] })
    },
  })

  // 3. 링크 수정 Mutation
  const updateLinkMutation = useMutation({
    mutationFn: async (data: { id: string; title: string; url: string }) => {
      if (!user) throw new Error("No user")
      const linkRef = doc(db, "users", user.uid, "links", data.id)
      await updateDoc(linkRef, {
        title: data.title,
        url: data.url,
        updatedAt: serverTimestamp(),
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", user?.uid] })
    },
  })

  // 4. 링크 삭제 Mutation
  const deleteLinkMutation = useMutation({
    mutationFn: async (linkId: string) => {
      if (!user) throw new Error("No user")
      const linkRef = doc(db, "users", user.uid, "links", linkId)
      await deleteDoc(linkRef)
      return linkId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", user?.uid] })
    },
  })

  return {
    links,
    isLinksLoading,
    addLink: addLinkMutation.mutateAsync,
    isAdding: addLinkMutation.isPending,
    updateLink: updateLinkMutation.mutateAsync,
    isUpdating: updateLinkMutation.isPending,
    deleteLink: deleteLinkMutation.mutateAsync,
    isDeleting: deleteLinkMutation.isPending,
  }
}
