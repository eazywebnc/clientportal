"use client";


import NextImage from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  FolderOpen,
  MessageSquare,
  Palette,
  Shield,
  Zap,
  Globe,
  FileText,
  Image,
  FileSpreadsheet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  wide: boolean;
}

const features: Feature[] = [
  {
    icon: FolderOpen,
    title: "File Sharing",
    description:
      "Share files securely with your clients. Organize by folders, track downloads, and manage versions.",
    wide: true,
  },
  {
    icon: MessageSquare,
    title: "Real-time Messages",
    description:
      "Keep communication in one place. Send updates, milestones, and messages directly through the portal.",
    wide: true,
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description:
      "Match your brand perfectly. Custom colors, logos, and white-label options make it yours.",
    wide: false,
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption, role-based access control, and audit logs keep your data safe.",
    wide: false,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on edge infrastructure for instant load times. Your clients will never wait.",
    wide: false,
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description:
      "Use your own domain for a seamless experience. portal.yourbrand.com looks professional.",
    wide: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Mini file-list visual (File Sharing card)                          */
/* ------------------------------------------------------------------ */

const files = [
  { name: "Brand-Guide.pdf", size: "2.4 MB", Icon: FileText, color: "text-red-400" },
  { name: "Homepage-v3.png", size: "1.1 MB", Icon: Image, color: "text-emerald-400" },
  { name: "Invoice-Q1.xlsx", size: "340 KB", Icon: FileSpreadsheet, color: "text-blue-400" },
];

function FileListVisual() {
  return (
    <div className="mt-6 space-y-2">
      {files.map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.12, duration: 0.4 }}
          className="flex items-center gap-3 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2"
        >
          <f.Icon className={`w-4 h-4 shrink-0 ${f.color}`} />
          <span className="text-xs text-zinc-300 truncate flex-1">
            {f.name}
          </span>
          <span className="text-[10px] text-zinc-500 shrink-0">{f.size}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat bubble visual (Real-time Messages card)                       */
/* ------------------------------------------------------------------ */

const bubbles = [
  { text: "Hey, the new mockups are ready!", fromClient: false },
  { text: "Awesome, I'll review them now", fromClient: true },
  { text: "Let me know if you need changes", fromClient: false },
];

function ChatBubblesVisual() {
  return (
    <div className="mt-6 space-y-2">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.18, type: "spring", stiffness: 260, damping: 20 }}
          className={`flex ${b.fromClient ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[75%] rounded-xl px-3 py-1.5 text-xs leading-relaxed ${
              b.fromClient
                ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/20"
                : "bg-white/[0.06] text-zinc-300 border border-white/[0.06]"
            }`}
          >
            {b.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax-wrapped card                                              */
/* ------------------------------------------------------------------ */

function ParallaxCard({
  feature,
  index,
  scrollYProgress,
}: {
  feature: Feature;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Stagger parallax per card row
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [30 + index * 8, -20 - index * 4]
  );

  const Icon = feature.icon;
  const isFileSharing = feature.title === "File Sharing";
  const isMessages = feature.title === "Real-time Messages";

  return (
    <motion.div
      style={{ y: yOffset }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1] ${
        feature.wide ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>

        {/* Visual elements for wide cards */}
        {isFileSharing && <FileListVisual />}
        {isMessages && <ChatBubblesVisual />}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} id="features" className="relative py-24 sm:py-32">
      {/* Top divider */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Impress Clients
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A complete toolkit for creating professional client experiences that
            build trust and streamline your workflow.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <ParallaxCard
              key={feature.title}
              feature={feature}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Feature Screenshots */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <NextImage
              src="/images/feature-1.webp"
              alt="Secure file sharing and client management"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <NextImage
              src="/images/feature-2.webp"
              alt="Real-time team collaboration interface"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
