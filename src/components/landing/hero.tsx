"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  FolderOpen,
  MessageSquare,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Lock,
  Bell,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Animated Portal Dashboard Mockup                                   */
/* ------------------------------------------------------------------ */

const recentFiles = [
  { name: "Brand-Guidelines.pdf", icon: FileText, color: "text-rose-400", bg: "bg-rose-500/10", time: "2m ago" },
  { name: "Homepage-Final.png", icon: ImageIcon, color: "text-emerald-400", bg: "bg-emerald-500/10", time: "1h ago" },
  { name: "Contract-v2.pdf", icon: FileText, color: "text-rose-400", bg: "bg-rose-500/10", time: "3h ago" },
];

const activities = [
  { text: "Sarah viewed Brand-Guidelines.pdf", icon: FileText, time: "2m" },
  { text: "New message from client", icon: MessageSquare, time: "15m" },
  { text: "Project milestone completed", icon: CheckCircle2, time: "1h" },
];

function PortalMockup() {
  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#0c0c14]/80 overflow-hidden shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-zinc-500 flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            portal.yourbrand.com
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-12 gap-0 min-h-[320px]">
        {/* Sidebar */}
        <div className="col-span-3 border-r border-white/[0.06] p-3 space-y-1">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/15">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">A</span>
            </div>
            <span className="text-[11px] text-indigo-300 font-medium">Acme Corp</span>
          </div>
          {[
            { icon: FolderOpen, label: "Files", active: true },
            { icon: MessageSquare, label: "Messages", badge: "3" },
            { icon: Users, label: "Team" },
            { icon: Bell, label: "Updates" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] transition-colors ${
                item.active ? "bg-white/[0.06] text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[9px] font-medium">
                  {item.badge}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="col-span-9 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm font-semibold text-white"
              >
                Project Files
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[11px] text-zinc-500"
              >
                12 files · 48.5 MB total
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/20 text-[10px] text-indigo-400 font-medium"
            >
              + Upload
            </motion.div>
          </div>

          {/* File list */}
          <div className="space-y-1.5 mb-4">
            {recentFiles.map((file, i) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.12, type: "spring", stiffness: 200 }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors group"
              >
                <div className={`w-7 h-7 rounded-lg ${file.bg} flex items-center justify-center`}>
                  <file.icon className={`w-3.5 h-3.5 ${file.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-zinc-200 truncate">{file.name}</p>
                </div>
                <span className="text-[9px] text-zinc-600">{file.time}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* Activity feed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="border-t border-white/[0.04] pt-3"
          >
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2 font-medium">Recent Activity</p>
            <div className="space-y-1.5">
              {activities.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.15 }}
                  className="flex items-center gap-2 text-[10px]"
                >
                  <a.icon className="w-3 h-3 text-zinc-600" />
                  <span className="text-zinc-400 flex-1">{a.text}</span>
                  <span className="text-zinc-600">{a.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating notification badges                                       */
/* ------------------------------------------------------------------ */

function FloatingBadges() {
  return (
    <>
      {/* New message notification */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 120 }}
        className="absolute -right-4 top-20 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-lg shadow-lg"
      >
        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-indigo-400" />
        </div>
        <div>
          <p className="text-[10px] font-medium text-indigo-300">New Message</p>
          <p className="text-[9px] text-zinc-500">Sarah left feedback</p>
        </div>
      </motion.div>

      {/* File uploaded notification */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 120 }}
        className="absolute -left-4 bottom-24 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-lg shadow-lg"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        </div>
        <div>
          <p className="text-[10px] font-medium text-emerald-300">File Delivered</p>
          <p className="text-[9px] text-zinc-500">Client downloaded assets</p>
        </div>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-600/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-[80px]" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text content */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">
              The #1 Client Portal Builder
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">Give Your Clients a</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Premium Experience
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            Create branded client portals in minutes. Share files, send messages,
            and keep your clients updated — all in one professional space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/auth/login">
              <Button size="xl" className="group">
                Start Building for Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="xl">
                See How It Works
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "10k+", label: "Portals Created" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "User Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Dashboard Mockup */}
        <motion.div
          style={{ y: mockupY, scale: mockupScale }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 80 }}
          className="relative max-w-4xl mx-auto"
        >
          <FloatingBadges />
          <PortalMockup />

          {/* Bottom glow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-indigo-500/20 blur-[60px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
