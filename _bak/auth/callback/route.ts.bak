import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Create cp_settings if not exists
      const admin = createAdminClient();
      const { data: existing } = await admin
        .from("cp_settings")
        .select("id")
        .eq("user_id", data.user.id)
        .single();

      if (!existing) {
        await admin.from("cp_settings").insert({
          user_id: data.user.id,
          plan: "starter",
          branding_color: "#4f46e5",
        });
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=callback_failed`);
}
