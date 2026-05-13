"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface LogoutModalProps {
  onCancel: () => void;
}

export default function LogoutModal({ onCancel }: LogoutModalProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLogout = () => {
    router.push("/Login");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8"
      onClick={onCancel}
    >
      <div
        className="bg-background rounded-md shadow-md w-full max-w-[500px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-10 flex flex-col">
          <div className="border-b border-border pb-2 md:pb-5 mb-5 md:mb-8">
            <h2 className="text-[14px] md:text-2xl font-bold text-foreground leading-tight">
              Leaving already?
            </h2>
          </div>

          <div className="mb-8 md:mb-10">
            <p className="text-[10px] md:text-sm text-muted-foreground font-medium leading-relaxed">
              You can log back in anytime to continue your meetings with Hintro.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="xs"
              className="md:h-11 md:px-8 md:text-sm h-8 px-4 text-[10px] font-bold border-border rounded-md"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="xs"
              className="md:h-11 md:px-10 md:text-sm h-8 px-6 text-[10px] font-bold bg-foreground hover:bg-foreground/90 text-background rounded-md"
              onClick={handleLogout} 
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}