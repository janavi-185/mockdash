"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Clock,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Calls from "@/components/calls";
import { getStats, getProfile, type DashboardStats } from "@/lib/api";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
}

function StatCard({ label, value, icon, iconBg }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 md:gap-4 bg-card border border-border rounded-md px-3 py-3.5 md:px-5 md:py-4 flex-1 min-w-0">
      <div className={`w-10 h-10 md:w-11 md:h-11 rounded-md flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-xs text-muted-foreground font-medium truncate">
          {label}
        </p>
        <p className="text-sm md:text-xl font-bold text-foreground leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Dash() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userName, setUserName] = useState("Name");

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      const statsData = await getStats();
      if (isMounted && statsData) setStats(statsData);
      
      const profileData = await getProfile();
      if (isMounted && profileData) {
        setUserName(profileData.firstName || "Name");
      }
    }
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            Hi, {userName} 👋 Welcome to Hintro
          </h2>
          <p className="text-[11px] md:text-sm text-muted-foreground mt-1.5 font-medium">
            Ready to make your next call smarter ?
          </p>
        </div>
        <div className="flex md:justify-end justify-start">
          <Button variant="default" size="sm" className="px-5 py-2 text-[11px] md:text-sm font-bold rounded-md h-9 md:h-11 md:px-6">
            <span className="md:hidden">Start Call</span>
            <span className="hidden md:inline">Start New Call</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12">
        <StatCard
          label="Total Sessions"
          value={stats?.totalSessions || 0}
          iconBg="bg-chart-1/15"
          icon={<PieChart size={18} className="text-chart-1 md:size-5" />}
        />
        <StatCard
          label="Average Duration"
          value={formatDuration(stats?.averageDuration)}
          iconBg="bg-chart-2/15"
          icon={<Clock size={18} className="text-chart-2 md:size-5" />}
        />
        <StatCard
          label="AI Used"
          value={stats?.totalAIInteractions || 0}
          iconBg="bg-chart-3/15"
          icon={<Sparkles size={18} className="text-chart-3 md:size-5" />}
        />
        <StatCard
          label="Last Session"
          value={formatDate(stats?.lastSession?.[0])}
          iconBg="bg-chart-4/15"
          icon={<CalendarDays size={18} className="text-chart-4 md:size-5" />}
        />
      </div>

      <div className="mt-16">
        <h3 className="text-base md:text-lg font-bold text-foreground text-center mb-8">
          Recent calls
        </h3>
        <div className="w-full">
          <Calls />
        </div>
      </div>
    </div>
  );
}
