/*
  # Digital Loyalty System - Leads & Subscriptions

  ## Summary
  Sets up the core data tables for the loyalty SaaS landing page onboarding flow.

  ## New Tables

  ### `leads`
  Captures all cafe owner signups from the landing page.
  - `id` - UUID primary key
  - `name` - Owner's full name
  - `cafe_name` - Name of the cafe
  - `phone` - WhatsApp-compatible phone number
  - `city` - City of operation
  - `email` - Optional email for marketing
  - `status` - Flow state: lead → paid → onboarded
  - `razorpay_order_id` - Razorpay order reference
  - `razorpay_payment_id` - Confirmed payment ID
  - `plan` - Subscription plan selected
  - `created_at` / `updated_at` - Timestamps

  ## Security
  - RLS enabled on all tables
  - Anon users can INSERT new leads (form submissions)
  - Authenticated users (admins) can SELECT/UPDATE all leads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cafe_name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  email text DEFAULT '',
  status text NOT NULL DEFAULT 'lead',
  razorpay_order_id text DEFAULT '',
  razorpay_payment_id text DEFAULT '',
  plan text NOT NULL DEFAULT 'early_access',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS leads_phone_idx ON leads (phone);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
