export interface CpSettings {
  id: string;
  user_id: string;
  plan: "starter" | "pro" | "agency";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  company_name: string | null;
  company_logo: string | null;
  custom_domain: string | null;
  branding_color: string;
  created_at: string;
  updated_at: string;
}

export interface CpPortal {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  accent_color: string;
  is_active: boolean;
  custom_domain: string | null;
  created_at: string;
  updated_at: string;
}

export interface CpClient {
  id: string;
  portal_id: string;
  user_id: string | null;
  name: string;
  email: string;
  avatar_url: string | null;
  role: "viewer" | "editor" | "admin";
  invited_at: string;
  accepted_at: string | null;
  created_at: string;
}

export interface CpFile {
  id: string;
  portal_id: string;
  uploaded_by: string;
  name: string;
  file_path: string;
  file_size: number;
  mime_type: string | null;
  folder: string;
  created_at: string;
}

export interface CpMessage {
  id: string;
  portal_id: string;
  sender_id: string;
  content: string;
  message_type: "message" | "update" | "milestone" | "invoice";
  metadata: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}
