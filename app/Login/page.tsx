"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE_URL = "https://mock-backend-hintro.vercel.app";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const id = identifier.trim();
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/profile`, {
        headers: {
          "x-user-id": id,
        },
      });

      if (response.ok) {
        localStorage.setItem("hintro_user_id", id);
        router.push("/Dashboard");
      } else {
        setError("Invalid User ID or Email");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex md:items-center items-start md:justify-center justify-center bg-background px-4">
      <div className="w-full p-3 max-w-sm">
        <h1 className="md:text-3xl text-2xl font-bold text-center text-foreground mb-12 pt-16 md:pt-0">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="identifier"
              className="text-md font-medium text-foreground"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                id="identifier"
                type="text"
                placeholder="Example@email.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
                className="w-full pl-11 pr-4 py-3 rounded-md bg-muted border border-border focus:outline-none focus:ring focus:ring-ring focus:bg-background text-md text-foreground placeholder:text-muted-foreground transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-md font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-4 pr-10 py-3 rounded-md bg-muted border border-border focus:outline-none focus:ring focus:ring-ring focus:bg-background text-md text-foreground placeholder:text-muted-foreground transition-all duration-200"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive text-center -mt-4 animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="default"
            size="xl"
            disabled={loading || !identifier.trim()}
            className="w-full mt-4"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;