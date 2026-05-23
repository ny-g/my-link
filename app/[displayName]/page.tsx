"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import { collection, query, where, getDocs, orderBy, updateDoc, doc, increment } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, CheckCircle2 } from "lucide-react"
import { UserProfile } from "@/hooks/useAuth"
import { LinkItem } from "@/data/links"

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return url
  }
}

export default function PublicProfilePage() {
  const params = useParams()
  // Next.js 14+ params는 Promise일 수도, 동기 객체일 수도 있음 (보통 동기 지원)
  const displayName = params.displayName as string

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [links, setLinks] = useState<LinkItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    if (!displayName) {
      setIsNotFound(true)
      return
    }

    const fetchProfileAndLinks = async () => {
      try {
        const usersRef = collection(db, "users")
        const q = query(usersRef, where("displayName", "==", displayName))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          setIsNotFound(true)
          return
        }

        const userDoc = querySnapshot.docs[0]
        const userData = userDoc.data() as UserProfile

        if (!userData.username) {
          setIsNotFound(true)
          return
        }

        setProfile(userData)
        setUserId(userDoc.id)

        // Fetch Links
        const linksRef = collection(db, "users", userDoc.id, "links")
        const linksQ = query(linksRef, orderBy("order", "asc"))
        const linksSnapshot = await getDocs(linksQ)

        const fetchedLinks: LinkItem[] = []
        linksSnapshot.forEach((docSnap) => {
          const data = docSnap.data()
          if (data.isActive) {
            fetchedLinks.push({ id: docSnap.id, ...data } as LinkItem)
          }
        })
        setLinks(fetchedLinks)
      } catch (error) {
        console.error("Error fetching public profile:", error)
        setIsNotFound(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileAndLinks()
  }, [displayName])

  if (isNotFound) {
    notFound() // This will trigger the app/not-found.tsx page
  }

  const handleLinkClick = async (linkId: string) => {
    if (!userId) return
    try {
      const linkRef = doc(db, "users", userId, "links", linkId)
      await updateDoc(linkRef, { clicks: increment(1) })
    } catch (error) {
      console.error("Error updating click count:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[calc(100svh-64px)] w-full flex items-center justify-center bg-slate-50 dark:bg-[#09090b]">
        <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="relative min-h-[calc(100svh-64px)] w-full flex flex-col items-center py-16 px-4 sm:p-12 bg-slate-50 dark:bg-[#09090b] selection:bg-primary/30 font-sans overflow-hidden">
      {/* Animated Grid Background removed */}

      {/* Top Ambient Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-600/15 dark:bg-lime-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col gap-8">
        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center text-center px-4 mt-4">
          <div className="relative mb-8 group">
            {/* Animated Glow Ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-lime-600 via-green-600 to-emerald-700 opacity-70 blur-md transition-opacity duration-500 animate-pulse"></div>
            {/* Avatar Container */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-100 dark:bg-zinc-900 border-[3px] border-white dark:border-zinc-950 flex items-center justify-center overflow-hidden shadow-2xl z-10">
              {profile.photoURL ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={profile.photoURL}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-700 to-slate-400 dark:from-white dark:to-zinc-500 select-none">
                  ML
                </span>
              )}
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white dark:border-zinc-950 rounded-full z-20 shadow-lg"></div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-2">
            {profile.username}
          </h1>

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

          {/* Bio 영역 */}
          {profile.bio && (
            <div className="mt-3 w-full max-w-sm mx-auto flex justify-center">
              <p className="text-sm sm:text-[15px] font-medium text-slate-600 dark:text-zinc-400 leading-relaxed text-center">
                {profile.bio}
              </p>
            </div>
          )}
        </div>

        {/* Links Container */}
        <div className="flex flex-col gap-4 w-full mt-2">
          {links.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-zinc-400 text-sm mt-8">
              아직 추가된 링크가 없습니다.
            </div>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link.id)}
                className="group relative w-full block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl z-10"
              >
                {/* Glow Background Effect for Card */}
                <div className="absolute inset-0 bg-gradient-to-r from-lime-600/40 via-green-600/40 to-emerald-700/40 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                <Card className="glass-panel overflow-hidden relative group-hover:-translate-y-0.5 transition-transform duration-300 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100/80 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-200 shrink-0 group-hover:scale-110 group-hover:text-primary transition-all duration-300 shadow-inner overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://s2.googleusercontent.com/s2/favicons?domain=${getDomain(
                          link.url
                        )}&sz=32`}
                        alt={`${link.title} icon`}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <div className="flex flex-col flex-1 text-left">
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
            ))
          )}
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
    </div>
  )
}
