import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const PLANS = {
  starter: {
    name: "Starter",
    price: 19,
    priceId: "price_starter_monthly",
    portals: 3,
    storage: "5GB",
    features: [
      "3 Client Portals",
      "5GB Storage",
      "Basic Branding",
      "File Sharing",
      "Messages & Updates",
      "Email Notifications",
    ],
  },
  pro: {
    name: "Pro",
    price: 49,
    priceId: "price_pro_monthly",
    portals: 15,
    storage: "50GB",
    popular: true,
    features: [
      "15 Client Portals",
      "50GB Storage",
      "Custom Domain",
      "White-Label Branding",
      "Priority Support",
      "Advanced Analytics",
    ],
  },
  agency: {
    name: "Agency",
    price: 99,
    priceId: "price_agency_monthly",
    portals: -1,
    storage: "500GB",
    features: [
      "Unlimited Portals",
      "500GB Storage",
      "API Access",
      "Team Seats (up to 10)",
      "Custom Integrations",
      "Dedicated Support",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
