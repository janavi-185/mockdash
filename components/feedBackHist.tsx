"use client";

import React, { useEffect, useState } from "react";
import { getFeedback, type FeedbackItem } from "@/lib/api";
import { Button } from "@/components/ui/button";

const FeedbackHistory = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getFeedback();
      const apiFeedback = data ? data.feedback : [];
      
      // Get local feedback from localStorage
      const localFeedback = JSON.parse(localStorage.getItem("local_feedback") || "[]");
      
      // Combine them (local first)
      setFeedbackData([...localFeedback, ...apiFeedback]);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-12 lg:p-16 max-w-[1400px]">
      <div className="mb-8 md:mb-12">
        <p className="text-[14px] md:text-base text-[#8A8A8A] font-medium ml-1">
          Review your previous feedbacks
        </p>
      </div>

      <div className="hidden md:block">
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-border">
                  <th className="px-8 py-5 text-[13px] font-bold text-[#8A8A8A] uppercase tracking-tight">Title</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-[#8A8A8A] uppercase tracking-tight">Rating</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-[#8A8A8A] uppercase tracking-tight">Description</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-[#8A8A8A] uppercase tracking-tight">Date</th>
                  <th className="px-8 py-5 text-[13px] font-bold text-[#8A8A8A] uppercase tracking-tight">Time</th>
                </tr>
              </thead>
              {feedbackData.length > 0 && (
                <tbody className="divide-y divide-border">
                  {feedbackData.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="px-8 py-6 text-sm font-bold text-gray-900">{item.title}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-900">{item.rating}</td>
                      <td className="px-8 py-6 text-sm font-medium text-gray-600">{item.description}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-900">{item.date}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-900">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          
          {feedbackData.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center p-24 min-h-[400px]">
              <p className="text-base font-bold text-gray-900 mb-6">No feedbacks yet</p>
              <Button variant="outline" className="text-[12px] font-medium px-6 h-10 border-gray-300 rounded-md">
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
              <div key={index} className="bg-white border border-border rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                    <p className="text-xs font-semibold text-[#8A8A8A] mt-1">{item.date} • {item.time}</p>
                  </div>
                  <span className="text-xs font-bold bg-[#F9FAFB] px-2 py-1 rounded border border-border">
                    {item.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ) : !loading && (
          <div className="bg-white border border-border rounded-xl shadow-sm min-h-[300px] flex flex-col items-center justify-center p-12">
            <p className="text-base font-bold text-gray-900 mb-6">No feedbacks yet</p>
            <Button variant="outline" className="text-[12px] font-medium px-6 h-10 border-gray-300 rounded-md">
              Give Feedback
            </Button>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F80FF]"></div>
        </div>
      )}
    </div>
  );
};

export default FeedbackHistory;