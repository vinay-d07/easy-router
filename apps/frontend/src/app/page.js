import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full border-b border-white/10 backdrop-blur-xl bg-black/40 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            Easy<span className="text-purple-500">Router</span>
          </h1>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition">
              Pricing
            </a>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-indigo-700/10 to-blue-700/20 blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            The Smartest Way to
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Route AI Models
            </span>
          </h2>

          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Easy Router intelligently routes your API requests to the best
            performing AI model — automatically optimizing for cost, speed, and
            reliability.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Start Building
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              View Docs
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-16">
            Why Developers Love Easy Router
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-8 text-left">
                <Zap className="text-purple-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">
                  Intelligent Routing
                </h4>
                <p className="text-white/60">
                  Automatically select the best AI model for every request based
                  on latency, cost, and performance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-8 text-left">
                <Shield className="text-purple-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">
                  Enterprise Security
                </h4>
                <p className="text-white/60">
                  Built-in rate limiting, API key management, and secure
                  infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-8 text-left">
                <Globe className="text-purple-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Unified API</h4>
                <p className="text-white/60">
                  Access multiple AI providers through one simple, consistent
                  API interface.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/20 to-blue-700/20 blur-3xl" />
        <div className="relative max-w-4xl mx-auto">
          <h3 className="text-5xl font-bold mb-6">
            Start Routing Smarter Today
          </h3>
          <p className="text-white/60 mb-10">
            Join developers building the next generation of AI-powered apps.
          </p>
          <Link
            href={"/signup"}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 p-3.5 rounded-3xl"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Easy Router. All rights reserved.
      </footer>
    </main>
  );
}
