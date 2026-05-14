"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { type FeedbackItem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import FeedbackModal from "@/components/FeedbackModal";

const StarRating = ({ rating }: { rating: string }) => {
  const num = parseInt(rating.split("/")[0]) || 0;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          className={`${
            star <= num ? "fill-hintro-star-yellow text-hintro-star-yellow" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

const FeedbackHistory = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("hintro_user_id") || "u1";
      const key = `local_feedback_${userId}`;
      setFeedbackData(JSON.parse(localStorage.getItem(key) || "[]"));
    }
  }, []);

  const refreshFeedback = () => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("hintro_user_id") || "u1";
      const key = `local_feedback_${userId}`;
      const localFeedback = JSON.parse(localStorage.getItem(key) || "[]");
      setFeedbackData(localFeedback);
    }
  };

  return (
    <div className="p-4 md:p-12 lg:p-16 max-w-[1400px]">
      <div className="mb-8 md:mb-12">
        <p className="text-[14px] md:text-base text-muted-foreground font-medium ml-1">
          Review your previous feedbacks
        </p>
      </div>

      <div className="hidden md:block">
        <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-8 py-5 text-[13px] font-bold text-muted-foreground uppercase tracking-tight">Title</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-muted-foreground uppercase tracking-tight">Rating</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-muted-foreground uppercase tracking-tight">Description</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-muted-foreground uppercase tracking-tight">Date</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-muted-foreground uppercase tracking-tight">Time</th>
                </tr>
              </thead>
              {feedbackData.length > 0 && (
                <tbody className="divide-y divide-border">
                  {feedbackData.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="px-8 py-6 text-sm font-bold text-foreground">{item.title}</td>
                      <td className="px-8 py-6 text-sm font-bold text-foreground">
                        {item.rating}
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-muted-foreground"> - {item.description}</td>
                      <td className="px-8 py-6 text-sm font-bold text-foreground">{item.date}</td>
                      <td className="px-8 py-6 text-sm font-bold text-foreground">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          
          {feedbackData.length === 0 && (
            <div className="flex flex-col items-center justify-center p-24 min-h-[400px]">
              <p className="text-base font-bold text-foreground mb-6">No feedbacks yet</p>
              <Button 
                onClick={() => setModalOpen(true)}
                variant="outline" 
                className="text-[12px] font-medium px-6 h-10 border-border rounded-md"
              >
                Give Feedback
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden">
        {feedbackData.length > 0 ? (
          <div className="space-y-4">
            {feedbackData.map((item, index) => (
              <div key={index} className="bg-background border border-border rounded-md p-6 flex flex-col gap-3">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-lg font-bold text-foreground leading-tight">{item.title}</h3>
                  <StarRating rating={item.rating} />
                </div>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-hintro-blue">
                  <span>{item.date}</span>
                  <span className="opacity-40">•</span>
                  <span className="text-foreground/40">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-background border border-border rounded-md min-h-[300px] flex flex-col items-center justify-center p-12">
            <p className="text-base font-bold text-foreground mb-6">No feedbacks yet</p>
            <Button 
              onClick={() => setModalOpen(true)}
              variant="outline" 
              className="text-[12px] font-medium px-6 h-10 border-border rounded-md"
            >
              Give Feedback
            </Button>
          </div>
        )}
      </div>



      <FeedbackModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmitSuccess={refreshFeedback} 
      />
    </div>
  );
};

export default FeedbackHistory;