"use client"

import { Button } from "@/components/ui/button"
import { Check, Edit2, Link as LinkIcon, Smartphone } from "lucide-react"

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="w-full flex flex-col font-sans bg-white dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 min-h-[calc(100svh-64px)] selection:bg-slate-200 dark:selection:bg-zinc-800">
      
      {/* Hero Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 py-12 lg:py-0 gap-16 lg:gap-24">
        
        {/* Left: Text & CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            모든 링크를<br />
            한 곳에.
          </h1>
          <p className="text-xl sm:text-2xl text-slate-500 dark:text-zinc-400 mb-10 font-medium">
            당신을 보여주는 단 하나의 페이지.
          </p>
          <Button 
            onClick={onLogin} 
            size="lg" 
            className="rounded-full px-10 h-14 text-lg font-semibold shadow-none"
          >
            시작하기
          </Button>
        </div>

        {/* Right: Visual Mockup (Realistic Profile View) */}
        <div className="relative w-full max-w-[340px] shrink-0 mt-8 lg:mt-0">
          {/* Subtle background shadow for depth, no glowing colors */}
          <div className="absolute -inset-4 bg-slate-100/50 dark:bg-zinc-800/30 rounded-[3rem] blur-2xl"></div>
          
          {/* Phone / Profile Card Frame */}
          <div className="relative bg-slate-50 dark:bg-[#111113] rounded-[2.5rem] border-[6px] border-white dark:border-zinc-800 shadow-2xl overflow-hidden aspect-[4/7]">
            {/* Inner Content */}
            <div className="w-full h-full p-6 flex flex-col items-center">
              
              {/* Mock Avatar */}
              <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-zinc-800 border-4 border-white dark:border-[#111113] shadow-sm mt-8 mb-4 flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-bold text-slate-400 dark:text-zinc-600">ML</span>
              </div>
              
              {/* Mock Name & Bio */}
              <div className="text-xl font-bold mb-1">MyLink User</div>
              <div className="text-sm text-slate-500 dark:text-zinc-500 mb-6 flex items-center gap-1">
                @mylink_user
                <Check className="w-3 h-3 text-blue-500" />
              </div>
              
              {/* Mock Link Buttons */}
              <div className="w-full flex flex-col gap-3">
                <MockLink title="포트폴리오" domain="portfolio.com" />
                <MockLink title="GitHub" domain="github.com" />
                <MockLink title="블로그" domain="blog.io" />
              </div>

              {/* Inline Edit Hint (Small UI detail) */}
              <div className="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-slate-100 dark:border-zinc-700 text-slate-400">
                <Edit2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Bar (Minimal, No long text) */}
      <div className="w-full border-t border-slate-100 dark:border-zinc-900 bg-white dark:bg-[#09090b]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap justify-center gap-8 sm:gap-16 text-sm font-semibold text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            <span>인라인 편집</span>
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            <span>파비콘 연동</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span>반응형</span>
          </div>
        </div>
      </div>

    </div>
  )
}

function MockLink({ title, domain }: { title: string, domain: string }) {
  return (
    <div className="w-full bg-white dark:bg-zinc-800/80 rounded-2xl p-3 border border-slate-100 dark:border-zinc-700 shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-700 shrink-0"></div>
      <div className="flex flex-col flex-1">
        <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">{title}</span>
        <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">{domain}</span>
      </div>
    </div>
  )
}
