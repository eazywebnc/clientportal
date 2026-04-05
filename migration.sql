-- ClientPortal Migration
-- Tables with cp_ prefix

-- ============================================
-- cp_settings: user/account settings & billing
-- ============================================
CREATE TABLE IF NOT EXISTS cp_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'agency')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  company_name TEXT,
  company_logo TEXT,
  custom_domain TEXT,
  branding_color TEXT DEFAULT '#4f46e5',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================
-- cp_portals: client portals
-- ============================================
CREATE TABLE IF NOT EXISTS cp_portals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  accent_color TEXT DEFAULT '#4f46e5',
  is_active BOOLEAN NOT NULL DEFAULT true,
  custom_domain TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, slug)
);

-- ============================================
-- cp_clients: clients invited to portals
-- ============================================
CREATE TABLE IF NOT EXISTS cp_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id UUID NOT NULL REFERENCES cp_portals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  invited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- cp_files: files shared in portals
-- ============================================
CREATE TABLE IF NOT EXISTS cp_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id UUID NOT NULL REFERENCES cp_portals(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  mime_type TEXT,
  folder TEXT DEFAULT '/',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- cp_messages: messages/updates in portals
-- ============================================
CREATE TABLE IF NOT EXISTS cp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id UUID NOT NULL REFERENCES cp_portals(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'message' CHECK (message_type IN ('message', 'update', 'milestone', 'invoice')),
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_cp_settings_user ON cp_settings(user_id);
CREATE INDEX idx_cp_portals_user ON cp_portals(user_id);
CREATE INDEX idx_cp_portals_slug ON cp_portals(slug);
CREATE INDEX idx_cp_clients_portal ON cp_clients(portal_id);
CREATE INDEX idx_cp_clients_email ON cp_clients(email);
CREATE INDEX idx_cp_files_portal ON cp_files(portal_id);
CREATE INDEX idx_cp_messages_portal ON cp_messages(portal_id);
CREATE INDEX idx_cp_messages_created ON cp_messages(created_at DESC);

-- ============================================
-- RLS Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE cp_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_messages ENABLE ROW LEVEL SECURITY;

-- cp_settings policies
CREATE POLICY "Users can view own settings"
  ON cp_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON cp_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON cp_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- cp_portals policies
CREATE POLICY "Users can view own portals"
  ON cp_portals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create portals"
  ON cp_portals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portals"
  ON cp_portals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portals"
  ON cp_portals FOR DELETE
  USING (auth.uid() = user_id);

-- cp_clients policies
CREATE POLICY "Portal owners can view clients"
  ON cp_clients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cp_portals
      WHERE cp_portals.id = cp_clients.portal_id
      AND cp_portals.user_id = auth.uid()
    )
  );

CREATE POLICY "Portal owners can manage clients"
  ON cp_clients FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM cp_portals
      WHERE cp_portals.id = cp_clients.portal_id
      AND cp_portals.user_id = auth.uid()
    )
  );

-- cp_files policies
CREATE POLICY "Portal owners can view files"
  ON cp_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cp_portals
      WHERE cp_portals.id = cp_files.portal_id
      AND cp_portals.user_id = auth.uid()
    )
  );

CREATE POLICY "Portal owners can manage files"
  ON cp_files FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM cp_portals
      WHERE cp_portals.id = cp_files.portal_id
      AND cp_portals.user_id = auth.uid()
    )
  );

-- cp_messages policies
CREATE POLICY "Portal owners can view messages"
  ON cp_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cp_portals
      WHERE cp_portals.id = cp_messages.portal_id
      AND cp_portals.user_id = auth.uid()
    )
  );

CREATE POLICY "Portal owners can manage messages"
  ON cp_messages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM cp_portals
      WHERE cp_portals.id = cp_messages.portal_id
      AND cp_portals.user_id = auth.uid()
    )
  );

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_cp_settings_updated_at
  BEFORE UPDATE ON cp_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cp_portals_updated_at
  BEFORE UPDATE ON cp_portals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
