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
  X,
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
  { label: "Feedback", href: "#", icon: Gift, isModal: true },
];

interface SidebarProps {
  onClose?: () => void;
  onFeedbackClick?: () => void;
}

export function Sidebar({ onClose, onFeedbackClick }: SidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside
      className="flex flex-col bg-sidebar border-r border-sidebar-border h-screen w-[260px] shrink-0"
    >
      <div className="h-16 flex items-center px-10 border-b border-sidebar-border justify-between">
        <span className="text-2xl font-bold text-sidebar-foreground tracking-tight md:block hidden">
          Hintro
        </span>
        <button 
          onClick={onClose}
          className="md:hidden p-1 hover:bg-muted rounded-md transition-colors"
        >
          <X size={24} className="text-foreground" />
        </button>
      </div>

      <nav className="flex flex-col pt-6 gap-2 px-3 flex-1 overflow-y-auto">
        {topNav.map(({ label, href, icon: Icon, alert }) => {
          const isActive = pathname === href || (href === "/Dashboard" && pathname === "/Dashboard/dashboard");
          return (
            <Link
              key={href}
              href={href}
              onClick={handleLinkClick}
              className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors duration-150 ${
                isActive
                  ? "bg-hintro-light-blue text-hintro-blue"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isActive ? "text-hintro-blue" : "text-sidebar-foreground/70"}
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

      <div className="mt-auto mb-13 ">
        <div className="h-px bg-sidebar-border mx-4 mb-4" />
        
        {/* {usage && (
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-sidebar-foreground/50 uppercase tracking-wider flex items-center gap-1.5">
                <HardDrive size={12} />
                Storage
              </span>
              <span className="text-[11px] font-bold text-hintro-blue">{usage.kb_files.percentage}%</span>
            </div>
            <div className="w-full bg-sidebar-border rounded-full h-1.5 mb-2">
              <div 
                className="bg-hintro-blue h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${usage.kb_files.percentage}%` }}
              />
            </div>
            <p className="text-[10px] text-sidebar-foreground/40 font-medium">
              {usage.kb_files.used} of {usage.kb_files.limit} files used
            </p>
          </div>
        )} */}

        <nav className="flex flex-col gap-2 px-3 mb-6">
          {bottomNav.map(({ label, href, icon: Icon, isModal }) => {
            const isActive = !isModal && pathname === href;
            
            if (isModal) {
              return (
                <button
                  key={label}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onFeedbackClick) onFeedbackClick();
                    handleLinkClick();
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors duration-150 text-sidebar-foreground/80 hover:bg-sidebar-accent/60 w-full text-left"
                >
                  <Icon size={18} className="text-sidebar-foreground/70" />
                  {label}
                </button>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? "bg-hintro-light-blue text-hintro-blue"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
                }`}
              >
                <Icon size={18} className={isActive ? "text-hintro-blue" : "text-sidebar-foreground/70"} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 pb-8 mx-4">
          <Button 
            variant="secondary" 
            onClick={() => {
              const currentId = localStorage.getItem("hintro_user_id") || "u1";
              const nextId = currentId === "u1" ? "u2" : "u1";
              localStorage.setItem("hintro_user_id", nextId);
              window.location.reload();
            }}
            className="w-full bg-muted-foreground hover:bg-muted-foreground/90 text-secondary font-bold h-10 rounded-md"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </aside>
  );
}
