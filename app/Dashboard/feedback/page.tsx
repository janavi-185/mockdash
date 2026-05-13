"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const GiveFeedback = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || rating === 0) {
      alert("Please provide a title and rating.");
      return;
    }

    const newFeedback = {
      title,
      rating: `${rating}/5`,
      description: description || "No description provided.",
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase(),
    };

    // Save to localStorage
    const existingFeedback = JSON.parse(localStorage.getItem("local_feedback") || "[]");
    localStorage.setItem("local_feedback", JSON.stringify([newFeedback, ...existingFeedback]));

    // Redirect to history
    router.push("/Dashboard/feedback-history");
  };

  return (
    <div className="p-4 md:p-12 lg:p-16 max-w-[800px] mx-auto">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-bold text-[#8A8A8A] hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="bg-white border border-border rounded-xl p-8 md:p-12 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Give Feedback</h1>
        <p className="text-sm text-[#8A8A8A] mb-10">We value your input! Tell us about your experience.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Call Title</label>
            <input
              type="text"
              placeholder="e.g. My First Call"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-[#F9FAFB] border border-border focus:outline-none focus:ring-2 focus:ring-[#4F80FF]/20 focus:border-[#4F80FF] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={28}
                    className={`
                      ${(hoveredRating || rating) >= star ? "fill-[#FFD700] text-[#FFD700]" : "text-gray-200 fill-gray-200"}
                      transition-colors duration-150
                    `}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Detailed Feedback</label>
            <textarea
              placeholder="Tell us more about what you liked or what could be better..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-[#F9FAFB] border border-border focus:outline-none focus:ring-2 focus:ring-[#4F80FF]/20 focus:border-[#4F80FF] transition-all resize-none"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full md:w-auto px-10 h-12 bg-black hover:bg-gray-900 text-white font-bold rounded-md">
              Submit Feedback
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveFeedback;