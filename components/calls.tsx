"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MoreVertical, CalendarCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCallHistory, type CallSession, type Participant, type PaginationInfo } from "@/lib/api";

interface CallItemProps {
  title: string;
  time: string;
  initial: string;
  color: string;
  participants?: Participant[];
}

const CallItem = ({ title, time, initial, color, participants = [] }: CallItemProps) => (
  <div className="flex items-center justify-between py-4 group border-b border-border/40 last:border-0 h-auto">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 md:w-11 md:h-11 rounded-md flex items-center justify-center text-white font-bold text-sm md:text-base ${color}`}>
        {initial}
      </div>
      <div className="flex flex-col">
        <span className="text-[15px] md:text-base font-bold text-foreground leading-tight">{title}</span>
        <div className="flex items-center -space-x-1.5 mt-1.5">
          {(participants.length > 0 ? participants : [1, 2, 3]).map((_, i) => (
            <div key={i} className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-background bg-muted overflow-hidden flex items-center justify-center relative">
              <Image 
                src="/profile.png" 
                alt="Participant" 
                width={24} 
                height={24} 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-[13px] md:text-sm font-semibold text-foreground/80">{time}</span>
      <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
        <MoreVertical size={18} className="text-black" />
      </button>
    </div>
  </div>
);

export default function Calls() {
  const [sessions, setSessions] = useState<CallSession[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadData = useCallback(async (page = 1, append = false) => {
    if (page !== 1) setLoadingMore(true);

    const data = await getCallHistory(5, page);
    if (data) {
      if (append) {
        setSessions(prev => [...prev, ...data.callSessions]);
      } else {
        setSessions(data.callSessions);
      }
      setPagination(data.pagination);
    }
    setLoading(false);
    setLoadingMore(false);
  }, []);

  useEffect(() => {
    loadData(1);
  }, [loadData]);

  if (loading) return <div className="text-center py-12 text-muted-foreground text-sm font-medium">Loading calls...</div>;

  if (sessions.length === 0) {
    return (
      <div className="border border-border rounded-md bg-card min-h-[260px] flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3 text-center max-w-xs">
          <div className="w-12 h-12 rounded-md bg-chart-4/15 flex items-center justify-center">
            <CalendarCheck size={22} className="text-chart-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">No Recent Calls</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
            </p>
          </div>
          <Button variant="outline" size="sm" className="rounded-md border-gray-300">
            Start a call
          </Button>
        </div>
      </div>
    );
  }

  const groupSessionsByDate = (sessionsToGroup: CallSession[]) => {
    const groups: { [key: string]: CallSession[] } = {};
    sessionsToGroup.forEach(session => {
      const date = new Date(session.started_at);
      const dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) + 
                        (date.getDate() === 1 ? 'st' : date.getDate() === 2 ? 'nd' : date.getDate() === 3 ? 'rd' : 'th');
      if (!groups[dateString]) groups[dateString] = [];
      groups[dateString].push(session);
    });
    return Object.entries(groups).map(([date, items]) => ({ date, items }));
  };

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <div className="flex flex-col w-full max-w-[786px] mx-auto px-1">
      {groupedSessions.map((group, groupIdx) => (
        <div key={groupIdx} className="mb-8">
          <h4 className="text-[11px] md:text-xs font-bold text-muted-foreground/60 tracking-wider">
            {group.date}
          </h4>
          <div className="flex flex-col">
            {group.items.map((session, idx) => (
              <CallItem 
                key={`${session._id}-${idx}`} 
                title={session.description || "Discovery Call"} 
                time={new Date(session.started_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()} 
                initial={session.client ? session.client[0] : "C"} 
                color="bg-purple-600"
                participants={session.participants}
              />
            ))}
          </div>
        </div>
      ))}

      {pagination?.hasNextPage && (
        <div className="flex justify-center mt-4 mb-12">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={loadingMore}
            onClick={() => loadData(pagination.page + 1, true)}
            className="rounded-md border-gray-300 text-xs font-bold px-6 h-9"
          >
            {loadingMore ? (
              <>
                <Loader2 size={14} className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}