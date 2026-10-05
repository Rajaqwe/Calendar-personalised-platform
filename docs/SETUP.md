# Local + Supabase setup

## 1. Install

```bash
npm install
```

## 2. Supabase

Create a Supabase project, then run `supabase/schema.sql` in the SQL Editor.

The schema creates:
- profiles
- calendar_templates
- calendars
- calendar_pages
- private `calendar-assets` storage bucket
- RLS policies
- automatic profile creation after signup

## 3. Environment

Copy `.env.example` to `.env.local` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 4. Run

```bash
npm run dev
```

## Current product flow

Landing → authentication → template gallery → image upload → Supabase Storage → calendar record → persisted preview.

The next implementation phase is the rendering engine: SVG template configurations, twelve monthly compositions, page previews, and print-ready PDF generation.
