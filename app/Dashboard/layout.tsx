"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getTitle = () => {
    if (pathname === "/Dashboard/feedback-history") return "Feedback History";
    if (pathname === "/Dashboard/feedback") return "Give Feedback";
    // if(pathname === "/Dashboard/dashboard") return "Dashboard";
    return "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-30 transition-transform duration-300
          md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar 
          onMenuClick={() => setSidebarOpen((o) => !o)} 
          title={getTitle()}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}