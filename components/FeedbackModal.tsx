"use client";

import React, { useState, useEffect } from "react";
import { Star, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export default function FeedbackModal({ isOpen, onClose, onSubmitSuccess }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setRating(0);
        setHover(0);
        setDescription("");
        setIsSubmitted(false);
        setIsSubmitting(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !description.trim()) return;

    setIsSubmitting(true);

    const newFeedback = {
      title: "General Feedback",
      rating: `${rating}/5`,
      description: description.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    const userId = localStorage.getItem("hintro_user_id") || "u1";
    const key = `local_feedback_${userId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([newFeedback, ...existing]));

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleFinalClose = () => {
    if (isSubmitted) {
      onSubmitSuccess();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      <div 
        className="absolute inset-0 bg-foreground/50" 
        onClick={handleFinalClose}
      />
      
      <div className="relative bg-background w-full max-w-xl rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col">
        {isSubmitted && (
          <button 
            onClick={handleFinalClose}
            className="absolute top-6 right-6 p-1 text-foreground hover:bg-muted rounded-full transition-colors z-10"
          >
            <X size={24} />
          </button>
        )}

        <div className="flex-1 flex flex-col">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 text-left flex-1 flex flex-col">
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">Give Feedback</h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Describe your experience using Hintro...
                </p>
              </div>

              <div className="flex justify-center gap-1.5 md:gap-2 mb-8 md:mb-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-105 focus:outline-none"
                  >
                    <Star
                      className={`
                        w-8 h-8 md:w-11 md:h-11
                        ${(hover || rating) >= star ? "fill-hintro-star-yellow text-hintro-star-yellow" : "fill-muted text-muted"}
                        transition-colors duration-150
                      `}
                    />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-[10px] md:text-[11px] font-bold text-muted-foreground/60 tracking-wide mb-2 uppercase">
                    {rating > 3 ? "What did you like the most?" : "What frustrated you or felt confusing?"}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share your thoughts..."
                    required
                    className="w-full p-3 md:p-4 rounded-sm border border-border bg-background focus:outline-none focus:ring focus:ring-primary/20 transition-all text-xs md:text-sm md:h-40 resize-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-4 md:px-6 h-9 md:h-10 rounded-md text-xs md:text-sm font-bold text-foreground"
                >
                  <ArrowLeft size={16} className="mr-1.5 md:mr-2" />
                  Back
                </Button>
                
                <Button
                  type="submit"
                  disabled={rating === 0 || !description.trim() || isSubmitting}
                  className="px-6 md:px-8 h-9 md:h-10 bg-muted-foreground hover:bg-muted-foreground/90 text-white font-bold rounded-md text-xs md:text-sm"
                >
                  {isSubmitting ? "..." : "Submit"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="p-6 md:p-12 flex-1 flex flex-col items-center justify-center text-center md:py-20 animate-in fade-in zoom-in duration-300">
              <div className="relative mb-8 md:mb-12">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 md:w-24 md:h-24 bg-hintro-star-yellow/50 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 md:w-16 md:h-16 z-50 rounded-full flex items-center justify-center bg-yellow-100">
                      <Star size={23} className="fill-hintro-star-yellow text-hintro-star-yellow md:w-10 md:h-10" />
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-sm md:text-xl font-bold text-foreground leading-tight">
                Thank you for your feedback!!
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-md leading-relaxed mt-1">
                Our team reviews every suggestion to improve AI responses, workflows, and overall experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
