"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRef } from "react";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const router = useRouter();
  const { signin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = emailref.current?.value;
    const password = passwordref.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await signin(email, password);
    
    if (result.success) {
      router.push("/dashboard");
    } else {
      console.log(result);
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-indigo-700/10 to-blue-700/20 blur-3xl" />

      <Card className="relative w-full max-w-md bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-white/60">
            Sign in to your Easy Router account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <Label className={"text-white"}>Email</Label>
              <Input
                ref={emailref}
                type="email"
                placeholder="you@example.com"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className={"text-white"}>Password</Label>
              <Input
                ref={passwordref}
                type="password"
                placeholder="••••••••"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-purple-400 hover:text-purple-300"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
