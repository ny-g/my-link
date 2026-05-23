"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { LogOut, Copy, ExternalLink, Check, User as UserIcon, Home, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "@base-ui/react/menu";

export function Header() {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const { userProfile } = useProfile(user);
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (userProfile?.displayName) {
      const url = `${window.location.origin}/${userProfile.displayName}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-[200] w-full border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 hover:opacity-80 transition-opacity">
            MyLink
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {!loading && (
            <>
              {user ? (
                <>
                  {userProfile?.displayName && (
                    pathname === "/" ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full hidden sm:flex gap-1.5 font-semibold text-slate-600 dark:text-zinc-300"
                        onClick={() => router.push(`/${userProfile.displayName}`)}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        내 프로필
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full hidden sm:flex gap-1.5 font-semibold text-slate-600 dark:text-zinc-300"
                        onClick={() => router.push("/")}
                      >
                        <Home className="w-3.5 h-3.5" />
                        대시보드
                      </Button>
                    )
                  )}
                  <Menu.Root>
                    <Menu.Trigger className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {userProfile?.photoURL ? (
                      <img
                        src={userProfile.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-zinc-700 object-cover"
                      />
                    ) : user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-zinc-700 object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-slate-500" />
                      </div>
                    )}
                  </Menu.Trigger>
                  
                  <Menu.Portal>
                    <Menu.Positioner align="end" sideOffset={8} className="z-[9999]">
                      <Menu.Popup className="z-[9999] w-64 rounded-2xl bg-white dark:bg-zinc-900 p-2 shadow-xl ring-1 ring-slate-200 dark:ring-zinc-800 outline-none transform origin-top-right transition-all data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
                        
                        {/* Profile Summary Header */}
                        <div className="flex flex-col px-3 py-3 gap-3">
                          <div className="flex items-center gap-3">
                            {userProfile?.photoURL ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={userProfile.photoURL} alt="" className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-700 object-cover" />
                            ) : user?.photoURL ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-700 object-cover" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center">
                                <UserIcon className="w-5 h-5 text-slate-500" />
                              </div>
                            )}
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                {userProfile?.displayName || user.displayName || "User"}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-zinc-400 truncate">
                                {user.email}
                              </span>
                            </div>
                          </div>
                          
                          {/* URL Box */}
                          {userProfile?.displayName && (
                            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50">
                              <span className="text-xs font-medium text-slate-600 dark:text-zinc-300 truncate mr-2">
                                mylink.com/{userProfile.displayName}
                              </span>
                              <button
                                onClick={handleCopyLink}
                                className="shrink-0 p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 dark:text-zinc-400 transition-colors"
                                title="URL 복사"
                              >
                                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="h-px bg-slate-200 dark:bg-zinc-800 my-1 mx-2" />

                        {/* Menu Items */}
                        <Menu.Item
                          onClick={() => {
                            if (userProfile?.displayName) {
                              router.push(`/${userProfile.displayName}`)
                            }
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 outline-none cursor-pointer select-none transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                          퍼블릭 뷰 보기
                        </Menu.Item>
                        
                        <Menu.Item
                          onClick={() => router.push(`/stats`)}
                          className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 outline-none cursor-pointer select-none transition-colors mt-1"
                        >
                          <BarChart3 className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                          통계 보기
                        </Menu.Item>
                        
                        <Menu.Item 
                          onClick={logout}
                          className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 outline-none cursor-pointer select-none transition-colors mt-1"
                        >
                          <LogOut className="w-4 h-4" />
                          로그아웃
                        </Menu.Item>

                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
                </>
              ) : (
                <Button onClick={loginWithGoogle} className="gap-2 rounded-full px-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 bg-white rounded-full p-0.5" />
                  구글로 시작하기
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
