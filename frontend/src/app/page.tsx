"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, MessageSquareText, Search, FileCheck, ArrowRight, Sparkles, FileText, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

// For the animated gradient text
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
  }
};

const floatingAnimation = {
  y: ["-10px", "10px"],
  rotate: [-5, 5],
  transition: {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const
  }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-orange-200 overflow-hidden relative">
      {/* Background Animated Gradient Mesh */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-400/20 blur-[120px] animate-[pulse_8s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-rose-400/20 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_alternate_reverse]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] rounded-full bg-amber-400/20 blur-[120px] animate-[pulse_12s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-xl">Y</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">YojanaSetu</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
            <Link href="#features" className="hover:text-orange-600 transition-colors">Features</Link>
            <Link href="#about" className="hover:text-orange-600 transition-colors">About</Link>
            <Link href="#impact" className="hover:text-orange-600 transition-colors">Impact</Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold text-zinc-700 hover:text-orange-600">
                Log In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white shadow-lg shadow-orange-500/25 border-0 rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32">
        {/* Dynamic Hero Section */}
        <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* Floating Icons Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div animate={floatingAnimation} className="absolute top-[20%] left-[10%] text-orange-400/40">
              <ShieldCheck className="w-16 h-16" />
            </motion.div>
            <motion.div animate={floatingAnimation} style={{ animationDelay: "1s" }} className="absolute top-[60%] right-[15%] text-rose-400/40">
              <FileText className="w-20 h-20" />
            </motion.div>
            <motion.div animate={floatingAnimation} style={{ animationDelay: "2s" }} className="absolute top-[30%] right-[10%] text-amber-400/40">
              <Sparkles className="w-12 h-12" />
            </motion.div>
            <motion.div animate={floatingAnimation} style={{ animationDelay: "1.5s" }} className="absolute bottom-[10%] left-[20%] text-blue-400/30">
              <CheckCircle className="w-14 h-14" />
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="relative z-10"
          >
            <motion.span variants={textVariants} className="px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm text-orange-700 text-sm font-semibold mb-8 inline-flex items-center gap-2 border border-orange-200/50 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-[pulse_2s_infinite]" />
              Bharat's Smartest Welfare Navigator
            </motion.span>
            
            <motion.h2 variants={textVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] max-w-4xl mx-auto">
              Discover Government <br className="hidden md:block" />
              Schemes in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-[length:200%_auto] animate-[pulse_4s_ease-in-out_infinite_alternate]">Seconds</span>
            </motion.h2>
            
            <motion.p variants={textVariants} className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              YojanaSetu uses vernacular AI to match your profile with hundreds of central and state welfare schemes. Zero paperwork, full clarity.
            </motion.p>
            
            <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button size="lg" className="h-14 px-8 text-lg bg-zinc-900 hover:bg-zinc-800 text-white rounded-full group shadow-xl shadow-zinc-900/20 transition-all hover:scale-105">
                  Check Eligibility 
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-zinc-200 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 transition-all hover:scale-105 bg-white/50 backdrop-blur-sm">
                  <MessageSquareText className="mr-2 w-5 h-5" />
                  Chat with AI Assistant
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Bento Grid Features Section */}
        <section id="features" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h3 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-900">Empowering Citizens with Tech</h3>
              <p className="text-zinc-600 max-w-2xl mx-auto text-lg">We've removed the complexity from government schemes so you can claim what's rightfully yours with just a few clicks.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
              {/* Feature 1: Large Span */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2 rounded-[2rem] bg-white border border-zinc-200/60 p-8 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-100">
                  <Search className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold mb-3 text-zinc-900">Smart Discovery Engine</h4>
                <p className="text-zinc-600 leading-relaxed max-w-md text-lg">Our proprietary matching engine scans over 1000+ schemes across state and central databases to find the exact matches for your demographic and financial profile.</p>
              </motion.div>

              {/* Feature 2: Tall Span */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:row-span-2 rounded-[2rem] bg-gradient-to-b from-orange-500 to-rose-600 text-white p-8 shadow-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-12 transition-transform duration-300 border border-white/30">
                  <MessageSquareText className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold mb-3">Vernacular AI</h4>
                <p className="text-orange-50 leading-relaxed text-lg mb-8">Chat naturally in Hindi, Tamil, Marathi, or Telugu. Our AI understands your context and explains complex legal jargon in simple, accessible terms.</p>
                <div className="mt-auto p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-medium italic">"क्या मुझे पीएम किसान योजना का लाभ मिल सकता है?"</p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-[2rem] bg-white border border-zinc-200/60 p-8 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-green-100">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Secure Vault</h4>
                <p className="text-zinc-600 leading-relaxed">Upload documents once. We use advanced OCR to securely auto-fill your application forms with 99% accuracy.</p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-[2rem] bg-white border border-zinc-200/60 p-8 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-purple-100">
                  <FileCheck className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Track Progress</h4>
                <p className="text-zinc-600 leading-relaxed">Monitor all your applications in real-time and find nearby offline Jan Seva Kendras if you need physical assistance.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
