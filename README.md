# ZetaVex Tech Solutions Website & Admin Panel

Production marketing website and client-editable admin dashboard built for **ZetaVex Tech Solutions** (*Innovate · Develop · Deliver*).

- **Proprietor:** Vivek Chauhan
- **Location:** Rewari, Haryana, India
- **Udyam Registration No.:** UDYAM-HR-15-0041364
- **WhatsApp & Phone:** +91 9721176040
- **Email:** zetavextech@outlook.com

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS (Navy `#0B1330`, `#101B45`, `#1C2B57` & Orange `#F4791F`, `#FF9A4D`)
- **Animation:** Framer Motion (pixel-block assembly hero & scroll reveals)
- **Database & Auth:** Supabase (Postgres + Supabase Auth + RLS)
- **Icons:** `lucide-react`
- **Deployment:** Vercel

---

## Project Architecture & Information Architecture

### Public Website (`/`)
1. **Hero**: Animated pixel-block Z logo assembly, slogan (*"Your Vision, Our Solution"*), tagline, and primary WhatsApp CTA.
2. **Services**: 5 core service offerings loaded dynamically from Supabase.
3. **Projects / Delivery**: Portfolio projects grid with tech stack tags and links.
4. **Our Team**: Team member profiles seeded with Vivek Chauhan, Founder & Proprietor.
5. **Client Reviews**: Client testimonials with star ratings.
6. **Contact**: Interactive contact form submitting entries to Supabase, direct business details, and quick WhatsApp/Call actions.
7. **Footer**: Brand marks, Udyam registration badge, social links, and copyright line.
8. **Persistent Floating Actions**: Bottom-right WhatsApp (`https://wa.me/919721176040`) & Call (`tel:+919721176040`) quick buttons.

### Admin Panel (`/admin`)
- Protected route group using Next.js middleware session check.
- **Login (`/admin/login`)**: Supabase Auth email & password authentication.
- **Dashboard (`/admin`)**: Summary metrics and quick links.
- **Resource Management Pages**:
  - `/admin/services` — CRUD for core services.
  - `/admin/projects` — CRUD for portfolio projects.
  - `/admin/team` — CRUD for team members.
  - `/admin/reviews` — CRUD for client testimonials.
  - `/admin/messages` — Inbox for contact form inquiries.

---

## Getting Started Locally

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Environment Variables Setup
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Fill in your Supabase project credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 3. Database & RLS Setup
1. Go to your [Supabase Dashboard](https://database.new).
2. Open the **SQL Editor**.
3. Copy the full contents of `supabase/schema.sql` and run it.
   - This creates `services`, `projects`, `team_members`, `reviews`, and `contact_messages` tables.
   - Enables Row Level Security (RLS) policies (public `SELECT`, authenticated write).
   - Seeds initial services, team members (Vivek Chauhan), projects, and reviews.

### 4. Create the First Admin Account
1. In your Supabase Dashboard, navigate to **Authentication > Users**.
2. Click **Add User > Create User**.
3. Enter the admin email (e.g. `zetavextech@outlook.com`) and a secure password.
4. Auto-confirm email or click the confirmation link.
5. You can now sign in at `http://localhost:3000/admin/login`.

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build & Verification

To test the production build locally:
```bash
npm run build
npm run start
```

---

## Deploying to Vercel

1. Push this project repository to GitHub / GitLab / Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variables under **Project Settings > Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**.
