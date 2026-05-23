import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100svh-64px)] w-full flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#09090b] text-center font-sans selection:bg-primary/30 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="text-[120px] sm:text-[150px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-800 to-slate-400 dark:from-white dark:to-zinc-600 select-none drop-shadow-xl">
          404
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-zinc-100">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 max-w-[320px] mx-auto">
            요청하신 프로필 페이지가 존재하지 않거나, 삭제되었을 수 있습니다. 주소를 다시 한번 확인해 주세요.
          </p>
        </div>
        
        <div className="mt-4">
          <Link href="/">
            <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
