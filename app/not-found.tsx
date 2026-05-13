"use client";

import Link from "next/link";
import { MoveLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-hintro-light-blue rounded-full flex items-center justify-center">
            <AlertCircle size={48} className="text-hintro-blue" />
          </div>
        </div>
        
        <h1 className="text-8xl font-black text-hintro-blue/10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none -z-10">
          404
        </h1>

        <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
          Page Not Found
        </h2>
        
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
        </p>

        <Link href="/Dashboard">
          <Button className="bg-hintro-blue hover:bg-hintro-blue/90 text-white px-8 h-12 rounded-md font-bold shadow-lg shadow-hintro-blue/20">
            <MoveLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
