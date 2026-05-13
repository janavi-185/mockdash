"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, Play, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoutModal from "@/components/logout";

interface TopbarProps {
  onMenuClick: () => void;
  title?: string;
}

export function Topbar({ onMenuClick, title = "Dashboard" }: TopbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border bg-background flex items-center px-4 sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3 md:w-auto w-10">
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 rounded-md hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} className="text-foreground" />
          </button>
        </div>

        <div className="flex-1 flex justify-center md:justify-start">
          <span className="text-2xl font-semibold text-foreground">{title}</span>
        </div>

        <div className="flex items-center gap-2 md:w-auto w-10 justify-end relative">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5">
            <Play size={11} fill="currentColor" />
            Watch Tutorial
          </Button>

          <div
            className="flex items-center gap-1 cursor-pointer group p-1"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex items-center justify-center border border-border relative">
              <Image 
                src="/profile.png" 
                alt="Profile" 
                width={32} 
                height={32} 
                className="w-full h-full object-cover" 
              />
            </div>
            <ChevronDown
              size={14}
              className={`text-muted-foreground transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
            />
          </div>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-20 overflow-hidden py-1">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <LogOut size={16} className="text-muted-foreground" />
                  <span>Log out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      {showLogoutModal && (
        <LogoutModal onCancel={() => setShowLogoutModal(false)} />
      )}
    </>
  );
}
