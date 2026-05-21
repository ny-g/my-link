"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LinkItem } from "@/data/links"
import { Card, CardContent } from "@/components/ui/card"
import { PenLine, Terminal, CheckCircle2, Plus, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { collection, addDoc, getDocs, query, orderBy, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/hooks/useAuth"


const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

const formSchema = z.object({
  title: z.string().min(1, { message: "타이틀을 입력해주세요." }),
  url: z.string().min(1, { message: "URL 주소를 입력해주세요." }).url({ message: "유효한 URL 형식이 아닙니다. (예: https://example.com)" }),
})

type FormValues = z.infer<typeof formSchema>

export default function Page() {
  const { user, userProfile, loading, loginWithGoogle } = useAuth()
  const [links, setLinks] = useState<LinkItem[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null)
  const [deleteTargetLink, setDeleteTargetLink] = useState<LinkItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchLinks = async () => {
      if (!user) {
        setLinks([])
        setIsLoading(false)
        return
      }
      try {
        setIsLoading(true)
        const q = query(collection(db, "users", user.uid, "links"), orderBy("order", "asc"))
        const querySnapshot = await getDocs(q)
        const fetchedLinks: LinkItem[] = []
        querySnapshot.forEach((docSnap) => {
          fetchedLinks.push({ id: docSnap.id, ...docSnap.data() } as LinkItem)
        })
        setLinks(fetchedLinks)
      } catch (error) {
        console.error("Error fetching links: ", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLinks()
  }, [user])

  // 링크 추가 폼
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  })

  // 링크 수정 폼
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: editErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  })

  const handleOpenChange = (open: boolean) => {
    setIsAddDialogOpen(open)
    if (!open) {
      reset()
    }
  }

  const onSubmit = async (data: FormValues) => {
    try {
      const newLinkData = {
        title: data.title,
        url: data.url,
        isActive: true,
        order: links.length,
      }

      if (!user) return

      const docRef = await addDoc(collection(db, "users", user.uid, "links"), newLinkData)

      const newLink: LinkItem = {
        id: docRef.id,
        ...newLinkData,
      }

      setLinks([...links, newLink])
      reset()
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding document: ", error)
    }
  }

  // 수정 모드 진입
  const handleEditStart = (link: LinkItem) => {
    setEditingLinkId(link.id)
    resetEdit({ title: link.title, url: link.url })
  }

  // 수정 취소
  const handleEditCancel = () => {
    setEditingLinkId(null)
    resetEdit()
  }

  // 수정 저장
  const onEditSubmit = async (data: FormValues) => {
    if (!editingLinkId || !user) return
    setIsSaving(true)
    try {
      const linkRef = doc(db, "users", user.uid, "links", editingLinkId)
      await updateDoc(linkRef, {
        title: data.title,
        url: data.url,
        updatedAt: serverTimestamp(),
      })
      setLinks((prev) =>
        prev.map((l) =>
          l.id === editingLinkId ? { ...l, title: data.title, url: data.url } : l
        )
      )
      setEditingLinkId(null)
      resetEdit()
    } catch (error) {
      console.error("Error updating document: ", error)
    } finally {
      setIsSaving(false)
    }
  }

  // 삭제 확인
  const handleDeleteConfirm = async () => {
    if (!deleteTargetLink || !user) return
    setIsDeleting(true)
    try {
      const linkRef = doc(db, "users", user.uid, "links", deleteTargetLink.id)
      await deleteDoc(linkRef)
      setLinks((prev) => prev.filter((l) => l.id !== deleteTargetLink.id))
      setDeleteTargetLink(null)
    } catch (error) {
      console.error("Error deleting document: ", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const activeLinks = links
    .filter((link) => link.isActive)
    .sort((a, b) => a.order - b.order)

  if (loading || isLoading) {
    return (
      <div className="min-h-[calc(100svh-64px)] w-full flex items-center justify-center bg-slate-50 dark:bg-[#09090b]">
        <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="relative min-h-[calc(100svh-64px)] w-full flex flex-col items-center justify-center py-16 px-4 bg-slate-50 dark:bg-[#09090b] selection:bg-primary/30 font-sans overflow-hidden text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
          나만의 모든 링크를 한 곳에
        </h1>
        <p className="text-lg text-slate-600 dark:text-zinc-400 mb-8 max-w-md">
          다양한 채널을 운영하는 당신을 위해.<br/>
          MyLink로 마이페이지에 모든 것을 담아보세요.
        </p>
        <Button onClick={loginWithGoogle} size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
          구글로 로그인하고 마이페이지 만들기
        </Button>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100svh-64px)] w-full flex flex-col items-center py-16 px-4 sm:p-12 bg-slate-50 dark:bg-[#09090b] selection:bg-primary/30 font-sans overflow-hidden">
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      {/* Top Ambient Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 dark:bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col gap-8">
        


        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center text-center px-4 mt-4">
          <div className="relative mb-8 group cursor-pointer">
            {/* Animated Glow Ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-600 opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            {/* Avatar Container */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-100 dark:bg-zinc-900 border-[3px] border-white dark:border-zinc-950 flex items-center justify-center overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.02] z-10">
               {userProfile?.photoURL ? (
                 /* eslint-disable-next-line @next/next/no-img-element */
                 <img src={userProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-700 to-slate-400 dark:from-white dark:to-zinc-500 select-none">ML</span>
               )}
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                 <PenLine className="w-7 h-7 text-white" />
               </div>
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white dark:border-zinc-950 rounded-full z-20 shadow-lg"></div>
          </div>
          
          <div className="group relative inline-flex items-center justify-center cursor-text p-2 -m-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {userProfile?.displayName || "MyLink User"}
            </h1>
            <PenLine className="w-5 h-5 absolute -right-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Tech/Creator Badges */}
          <div className="flex items-center gap-2 mt-4 mb-2">
            <div className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              <span>Developer</span>
            </div>
            <div className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3" />
              <span>Available</span>
            </div>
          </div>

          <div className="group relative inline-flex items-center justify-center mt-3 cursor-text p-2 -m-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors max-w-full">
            <p className="text-sm sm:text-[15px] font-medium text-slate-600 dark:text-zinc-400 leading-relaxed max-w-sm text-center">
              {userProfile?.bio || "소개글이 없습니다."}
            </p>
            <PenLine className="w-4 h-4 absolute -right-6 top-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>
        </div>

        {/* Links Container */}
        <div className="flex flex-col gap-4 w-full mt-2">
          {/* Add Link Button & Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger className="w-full py-4 mb-2 rounded-2xl border-2 border-dashed border-slate-300 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300 hover:border-slate-400 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all flex flex-col items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors shadow-sm">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">새 링크 추가하기</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>새 링크 추가</DialogTitle>
                <DialogDescription>
                  프로필에 표시할 새로운 링크 정보를 입력하세요.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      타이틀
                    </Label>
                    <div className="col-span-3 flex flex-col gap-1">
                      <Input
                        id="title"
                        placeholder="예: 내 포트폴리오"
                        {...register("title")}
                      />
                      {errors.title && (
                        <span className="text-xs text-red-500 font-medium ml-1">
                          {errors.title.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right">
                      URL 주소
                    </Label>
                    <div className="col-span-3 flex flex-col gap-1">
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://example.com"
                        {...register("url")}
                      />
                      {errors.url && (
                        <span className="text-xs text-red-500 font-medium ml-1">
                          {errors.url.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>취소</Button>
                  <Button type="submit">추가하기</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Link Cards */}
          {activeLinks.map((link) => (
            <div key={link.id} className="group relative w-full">
              {editingLinkId === link.id ? (
                /* ─── 인라인 편집 UI ─── */
                <Card className="glass-panel overflow-hidden relative rounded-2xl border border-primary/40 dark:border-primary/30 shadow-lg">
                  <CardContent className="p-4">
                    <form onSubmit={handleSubmitEdit(onEditSubmit)} noValidate>
                      <div className="flex flex-col gap-3">
                        {/* 타이틀 입력 */}
                        <div className="flex flex-col gap-1">
                          <Label htmlFor={`edit-title-${link.id}`} className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wide">
                            타이틀
                          </Label>
                          <Input
                            id={`edit-title-${link.id}`}
                            placeholder="예: 내 포트폴리오"
                            autoFocus
                            {...registerEdit("title")}
                          />
                          {editErrors.title && (
                            <span className="text-xs text-red-500 font-medium ml-1">
                              {editErrors.title.message}
                            </span>
                          )}
                        </div>
                        {/* URL 입력 */}
                        <div className="flex flex-col gap-1">
                          <Label htmlFor={`edit-url-${link.id}`} className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wide">
                            URL 주소
                          </Label>
                          <Input
                            id={`edit-url-${link.id}`}
                            type="url"
                            placeholder="https://example.com"
                            {...registerEdit("url")}
                          />
                          {editErrors.url && (
                            <span className="text-xs text-red-500 font-medium ml-1">
                              {editErrors.url.message}
                            </span>
                          )}
                        </div>
                        {/* 액션 버튼 */}
                        <div className="flex justify-end gap-2 pt-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleEditCancel}
                            disabled={isSaving}
                            className="gap-1.5 text-slate-500"
                          >
                            <X className="w-4 h-4" />
                            취소
                          </Button>
                          <Button
                            type="submit"
                            size="sm"
                            disabled={isSaving}
                            className="gap-1.5"
                          >
                            {isSaving ? (
                              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <Check className="w-4 h-4" />
                                저장
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                /* ─── 일반 링크 카드 ─── */
                <>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl z-10"
                  >
                    {/* Glow Background Effect for Card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-purple-500/40 to-blue-500/40 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    <Card className="glass-panel overflow-hidden relative group-hover:-translate-y-0.5 transition-transform duration-300 rounded-2xl border border-slate-200/50 dark:border-white/5">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100/80 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-200 shrink-0 group-hover:scale-110 group-hover:text-primary transition-all duration-300 shadow-inner overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={`https://s2.googleusercontent.com/s2/favicons?domain=${getDomain(link.url)}&sz=32`}
                            alt={`${link.title} icon`}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                        <div className="flex flex-col flex-1 text-left pr-24">
                          <span className="font-bold text-[16px] text-slate-900 dark:text-zinc-100 tracking-tight">
                            {link.title}
                          </span>
                          <span className="text-[13px] font-medium text-slate-500 dark:text-zinc-400 truncate max-w-[200px] mt-0.5 flex items-center gap-1">
                            {getDomain(link.url)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>

                  {/* 수정 / 삭제 버튼 */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <button
                      onClick={() => handleEditStart(link)}
                      className="p-2.5 rounded-xl glass-panel bg-white/80 dark:bg-zinc-900/80 text-slate-400 hover:text-primary hover:shadow-md transition-all"
                      aria-label={`${link.title} 수정`}
                    >
                      <PenLine className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetLink(link)}
                      className="p-2.5 rounded-xl glass-panel bg-white/80 dark:bg-zinc-900/80 text-slate-400 hover:text-red-500 hover:shadow-md transition-all"
                      aria-label={`${link.title} 삭제`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center pb-8">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full glass-panel">
            <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500 dark:text-zinc-500">
              Powered by <span className="text-slate-900 dark:text-zinc-300">MyLink</span>
            </p>
          </div>
        </div>
        
      </div>

      {/* ─── 삭제 확인 모달 ─── */}
      <Dialog open={!!deleteTargetLink} onOpenChange={(open) => { if (!open) setDeleteTargetLink(null) }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">정말 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>
              아래 링크를 삭제하려고 합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {deleteTargetLink && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://s2.googleusercontent.com/s2/favicons?domain=${getDomain(deleteTargetLink.url)}&sz=32`}
                  alt=""
                  className="w-5 h-5 object-contain shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[15px] text-slate-900 dark:text-zinc-100 truncate">
                    {deleteTargetLink.title}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 truncate">
                    {getDomain(deleteTargetLink.url)}
                  </span>
                </div>
              </div>
            )}
            <p className="text-sm font-semibold text-red-500 flex items-center gap-1.5">
              <span>⚠</span>
              이 작업은 되돌릴 수 없습니다.
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteTargetLink(null)}
              disabled={isDeleting}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="gap-1.5"
            >
              {isDeleting ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  삭제하기
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
