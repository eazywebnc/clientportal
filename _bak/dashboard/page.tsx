"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  FolderOpen,
  MessageSquare,
  FileText,
  Users,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import type { CpPortal, CpMessage } from "@/lib/types";

export default function DashboardPage() {
  const [portals, setPortals] = useState<CpPortal[]>([]);
  const [recentMessages, setRecentMessages] = useState<CpMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const [portalsRes, messagesRes] = await Promise.all([
        supabase
          .from("cp_portals")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("cp_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (portalsRes.data) setPortals(portalsRes.data);
      if (messagesRes.data) setRecentMessages(messagesRes.data);
      setLoading(false);
    }

    loadData();
  }, [supabase]);

  const stats = [
    {
      label: "Active Portals",
      value: portals.filter((p) => p.is_active).length,
      icon: FolderOpen,
      color: "from-indigo-500 to-blue-500",
    },
    {
      label: "Total Clients",
      value: portals.length * 2,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Messages",
      value: recentMessages.length,
      icon: MessageSquare,
      color: "from-violet-500 to-indigo-500",
    },
    {
      label: "Files Shared",
      value: 0,
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Welcome back! Here is an overview of your portals.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          New Portal
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white/80" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Portals list */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Your Portals</h2>
        {portals.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No portals yet
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                Create your first client portal and start sharing files and
                updates.
              </p>
              <Button>
                <Plus className="w-4 h-4" />
                Create Your First Portal
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portals.map((portal) => (
              <Card
                key={portal.id}
                className="hover:border-indigo-500/20 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{portal.name}</CardTitle>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        portal.is_active ? "bg-emerald-400" : "bg-zinc-500"
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                    {portal.description || "No description"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(portal.created_at).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm">
                      Open <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      {recentMessages.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {msg.content}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 capitalize">
                      {msg.message_type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
