# SiagaKu

![CI](https://github.com/nicholasowen11/disaster-education-platform/actions/workflows/ci.yml/badge.svg)

<!-- REPLACE-ME: ganti dengan link live demo dan (kalau ada) screenshot/GIF singkat aplikasinya -->
**Live demo:** https://disaster-education-platform.vercel.app/

SiagaKu is a web-based disaster education platform that recommends
mitigation content based on the actual disaster risk level of a user's
location — instead of showing the same generic advice to everyone.

## The problem

Disaster-preparedness education in Indonesia is often generic: the same
content is shown regardless of how disaster risk actually varies by region.
Someone living in a low-risk flood area gets the same advice as someone in a
high-risk one, which makes the content less relevant and less likely to be
acted on.

## What it does

- Detects the user's location via geolocation and matches it to the nearest
  known province in the risk dataset (falls back to "no match" beyond a
  ~33km radius, rather than guessing at a location)
- Recommends mitigation content filtered specifically to `high` risk
  classifications for that province
- Provides an admin panel for managing disasters, provinces, disaster risks,
  and mitigation guides, with full CRUD support

## Tech stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, MUI
- **Backend:** Supabase (Auth, Database, Storage)
- **Database:** PostgreSQL with Row-Level Security (RLS) policies to keep
  public and admin data properly isolated
- **CI:** GitHub Actions (lint + build on every push to `main`)

## Getting started locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

You'll need a `.env.local` file with your own Supabase project credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Background

SiagaKu was built as an undergraduate thesis project at Bina Nusantara
University (Computer Science), focused on a risk-based content
recommendation approach for disaster education.