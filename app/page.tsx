import { dummyLinks } from "@/data/links"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Video, BookOpen, Code, Briefcase, Link as LinkIcon, Share2, PenLine, Terminal, CheckCircle2 } from "lucide-react"

// URL이나 타이틀에 맞는 대체 아이콘 반환 함수
const getIconForLink = (title: string, url: string) => {
  const lowerTitle = title.toLowerCase()
  const lowerUrl = url.toLowerCase()
  
  if (lowerTitle.includes("instagram") || lowerUrl.includes("instagram")) return <Camera className="w-5 h-5" />
  if (lowerTitle.includes("youtube") || lowerUrl.includes("youtube")) return <Video className="w-5 h-5" />
  if (lowerTitle.includes("blog") || lowerUrl.includes("blog")) return <BookOpen className="w-5 h-5" />
  if (lowerTitle.includes("github") || lowerUrl.includes("github")) return <Code className="w-5 h-5" />
  if (lowerTitle.includes("portfolio") || lowerUrl.includes("portfolio")) return <Briefcase className="w-5 h-5" />
  return <LinkIcon className="w-5 h-5" />
}

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export default function Page() {
  const activeLinks = dummyLinks
    .filter((link) => link.isActive)
    .sort((a, b) => a.order - b.order)

  return (
    <div className="relative min-h-svh w-full flex flex-col items-center py-16 px-4 sm:p-12 bg-slate-50 dark:bg-[#09090b] selection:bg-primary/30 font-sans overflow-hidden">
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      {/* Top Ambient Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 dark:bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col gap-8">
        
        {/* Top actions */}
        <div className="flex justify-end w-full">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm font-medium" aria-label="Share Profile">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center text-center px-4 mt-4">
          <div className="relative mb-8 group cursor-pointer">
            {/* Animated Glow Ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-600 opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            {/* Avatar Container */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-100 dark:bg-zinc-900 border-[3px] border-white dark:border-zinc-950 flex items-center justify-center overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.02] z-10">
               <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-700 to-slate-400 dark:from-white dark:to-zinc-500 select-none">ML</span>
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                 <PenLine className="w-7 h-7 text-white" />
               </div>
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white dark:border-zinc-950 rounded-full z-20 shadow-lg"></div>
          </div>
          
          <div className="group relative inline-flex items-center justify-center cursor-text p-2 -m-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              MyLink User
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
              시니어 프론트엔드 엔지니어 & 크리에이터. 혁신적인 UI/UX와 생산성 도구에 관심이 많습니다.
            </p>
            <PenLine className="w-4 h-4 absolute -right-6 top-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>
        </div>

        {/* Links Container */}
        <div className="flex flex-col gap-4 w-full mt-2">
          {activeLinks.map((link) => (
            <div key={link.id} className="group relative w-full">
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
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100/80 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-200 shrink-0 group-hover:scale-110 group-hover:text-primary transition-all duration-300 shadow-inner">
                      {getIconForLink(link.title, link.url)}
                    </div>
                    <div className="flex flex-col flex-1 text-left pr-12">
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
              {/* PRD: 인라인 편집 가시성을 위한 액션 버튼 */}
               <button 
                 className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex p-2.5 rounded-xl glass-panel bg-white/80 dark:bg-zinc-900/80 text-slate-400 hover:text-primary transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-300 hover:shadow-md" 
                 aria-label={`Edit ${link.title}`}
               >
                 <PenLine className="w-5 h-5" />
               </button>
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
    </div>
  )
}
