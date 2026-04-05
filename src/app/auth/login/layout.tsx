import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ClientPortal",
  description: "Sign in to manage your client portals",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
