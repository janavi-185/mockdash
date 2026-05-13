"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Phone,
  FileText,
  MessageSquare,
  Aperture,
  Inbox,
  Gift,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const topNav = [
  { label: "Dashboard", href: "/Dashboard", icon: LayoutDashboard, alert: false },
  { label: "Call Insights", href: "/Dashboard/call-insights", icon: Phone, alert: false },
  { label: "Knowledge Base", href: "/Dashboard/knowledge-base", icon: FileText, alert: true },
  { label: "Prompts", href: "/Dashboard/prompts", icon: MessageSquare, alert: true },
  { label: "Boxy Controls", href: "/Dashboard/boxy-controls", icon: Aperture, alert: true },
];

const bottomNav = [
  { label: "Feedback History", href: "/Dashboard/feedback-history", icon: Inbox },
  { label: "Feedback", href: "/Dashboard/feedback", icon: Gift },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col bg-sidebar border-r border-sidebar-border"
      style={{ width: "220px", minHeight: "100vh", flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <span className="text-xl font-bold text-sidebar-foreground tracking-tight">
          Hintro
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-sidebar-border mx-4 mb-3" />

      {/* Top Nav */}
      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {topNav.map(({ label, href, icon: Icon, alert }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70"}
                />
                {label}
              </span>
              {alert && !isActive && (
                <AlertCircle size={16} className="text-sidebar-foreground/50 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div>
        <div className="h-px bg-sidebar-border mx-4 mb-3" />
        <nav className="flex flex-col gap-0.5 px-3 mb-4">
          {bottomNav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors duration-150"
            >
              <Icon size={18} className="text-sidebar-foreground/70" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Upgrade Button */}
        <div className="px-4 pb-6">
          <Button variant="secondary" size="lg" className="w-full">
            Upgrade
          </Button>
        </div>
      </div>
    </aside>
  );
}
