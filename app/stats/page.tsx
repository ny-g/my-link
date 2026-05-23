"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLinks } from "@/hooks/useLinks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";
import { MousePointerClick, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const chartConfig = {
  clicks: {
    label: "클릭 수",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

export default function StatsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { links, isLinksLoading } = useLinks(user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (!mounted || loading || isLinksLoading) {
    return (
      <div className="min-h-[calc(100svh-64px)] w-full flex items-center justify-center bg-slate-50 dark:bg-[#09090b]">
        <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  // 총 클릭 수 계산
  const totalClicks = links.reduce((acc, link) => acc + (link.clicks || 0), 0);

  // 차트용 데이터 가공 (활성 링크만, 클릭수 0인 것도 포함)
  const chartData = links
    .filter((link) => link.isActive)
    .map((link) => ({
      title: link.title,
      clicks: link.clicks || 0,
    }));

  return (
    <div className="relative min-h-[calc(100svh-64px)] w-full flex flex-col items-center py-8 px-4 sm:p-12 bg-slate-50 dark:bg-[#09090b] selection:bg-primary/30 font-sans overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      {/* Top Ambient Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 dark:bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[720px] flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="rounded-full shrink-0 shadow-sm glass-panel bg-white/50 dark:bg-zinc-900/50 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-zinc-300" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              통계 대시보드
            </h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              내 프로필 링크의 실시간 클릭 데이터를 확인하세요.
            </p>
          </div>
        </div>

        {/* 요약 카드 */}
        <Card className="glass-panel overflow-hidden border-primary/20 shadow-lg group transition-transform duration-300 hover:-translate-y-0.5">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MousePointerClick className="w-4 h-4 text-primary" />
              </div>
              총 클릭 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary via-blue-500 to-purple-600">
              {totalClicks.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* 차트 카드 */}
        <Card className="glass-panel border-slate-200/50 dark:border-white/5 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-zinc-100">링크별 클릭 수</CardTitle>
            <CardDescription className="text-sm font-medium text-slate-500 dark:text-zinc-400">
              활성화된 각 링크의 개별 클릭수를 막대 차트로 보여줍니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                    <XAxis 
                      dataKey="title" 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: "currentColor", opacity: 0.7, fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: "currentColor", opacity: 0.7, fontSize: 12, fontWeight: 600 }}
                      allowDecimals={false}
                    />
                    <ChartTooltip 
                      cursor={{ fill: "currentColor", opacity: 0.05 }} 
                      content={<ChartTooltipContent hideLabel />} 
                    />
                    <Bar dataKey="clicks" fill="var(--color-clicks)" radius={[6, 6, 0, 0]}>
                      <LabelList dataKey="clicks" position="top" offset={10} className="fill-slate-900 dark:fill-white text-[11px] font-bold" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-sm font-medium text-slate-500 dark:text-zinc-400">
                표시할 데이터가 없습니다.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
