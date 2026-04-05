"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  MessageSquare,
  Palette,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: FolderOpen,
    title: "File Sharing",
    description:
      "Share files securely with your clients. Organize by folders, track downloads, and manage versions.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Messages",
    description:
      "Keep communication in one place. Send updates, milestones, and messages directly through the portal.",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description:
      "Match your brand perfectly. Custom colors, logos, and white-label options make it yours.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption, role-based access control, and audit logs keep your data safe.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on edge infrastructure for instant load times. Your clients will never wait.",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description:
      "Use your own domain for a seamless experience. portal.yourbrand.com looks professional.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
