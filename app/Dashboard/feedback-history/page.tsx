"use client";

import dynamic from "next/dynamic";

const FeedbackHistory = dynamic(() => import("@/components/feedBackHist"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function FeedbackHistoryPage() {
  return (
    <div className="bg-background min-h-full">
      <FeedbackHistory />
    </div>
  );
}
