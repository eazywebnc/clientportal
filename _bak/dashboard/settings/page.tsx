"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  CreditCard,
  Loader2,
  Building2,
  Palette,
  Globe,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { PLANS, type PlanKey } from "@/lib/stripe";
import type { CpSettings } from "@/lib/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<CpSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [brandingColor, setBrandingColor] = useState("#4f46e5");
  const [customDomain, setCustomDomain] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function loadSettings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("cp_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setSettings(data);
        setCompanyName(data.company_name || "");
        setBrandingColor(data.branding_color || "#4f46e5");
        setCustomDomain(data.custom_domain || "");
      }
      setLoading(false);
    }

    loadSettings();
  }, [supabase]);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);

    await supabase
      .from("cp_settings")
      .update({
        company_name: companyName,
        branding_color: brandingColor,
        custom_domain: customDomain,
      })
      .eq("id", settings.id);

    setSaving(false);
  }

  async function handleUpgrade(plan: PlanKey) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentPlan = settings?.plan || "starter";
  const planKeys: PlanKey[] = ["starter", "pro", "agency"];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your account, branding, and subscription.
        </p>
      </div>

      {/* Company Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Company Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
                className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-4 h-4" />
                  Brand Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandingColor}
                    onChange={(e) => setBrandingColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={brandingColor}
                    onChange={(e) => setBrandingColor(e.target.value)}
                    className="flex-1 h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  Custom Domain
                </label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="portal.yourdomain.com"
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subscription Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              Subscription Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {planKeys.map((key) => {
                const plan = PLANS[key];
                const isCurrent = currentPlan === key;

                return (
                  <div
                    key={key}
                    className={`relative rounded-xl border p-5 transition-all ${
                      isCurrent
                        ? "border-indigo-500/50 bg-indigo-500/5"
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-md bg-indigo-500 text-[10px] font-semibold text-white">
                        Current
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="w-4 h-4 text-indigo-400" />
                      <span className="font-semibold text-white">
                        {plan.name}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      ${plan.price}
                      <span className="text-sm font-normal text-zinc-500">
                        /mo
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4">
                      {plan.storage} storage, {plan.portals === -1 ? "unlimited" : plan.portals} portals
                    </p>

                    {isCurrent ? (
                      <Button variant="secondary" size="sm" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleUpgrade(key)}
                      >
                        Upgrade
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
