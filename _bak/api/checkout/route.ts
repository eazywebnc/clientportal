import { NextResponse } from "next/server";
import { stripe, PLANS, type PlanKey } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { plan } = (await request.json()) as { plan: PlanKey };
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const planConfig = PLANS[plan];
    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const priceId = "priceId" in planConfig ? planConfig.priceId : undefined;

    if (!priceId) {
      return NextResponse.json(
        { error: "Plan has no price configured" },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    const { data: settings } = await supabase
      .from("cp_settings")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    let customerId = settings?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from("cp_settings")
        .update({ stripe_customer_id: customerId })
        .eq("user_id", user.id);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?canceled=true`,
      metadata: {
        user_id: user.id,
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
