# StreetShelf MVP (Supabase Integration)

This is a Next.js application designed to help tourists discover souvenirs available in nearby shops, with an extremely fast photo-driven listing flow for shop owners.

It has been upgraded from a local mock JSON database to use **Supabase (PostgreSQL + Storage)** for real persistence.

## Technologies Used
* Next.js 15 (App Router, Server Actions)
* TailwindCSS
* Lucide React Icons
* Supabase (`@supabase/supabase-js`, PostgreSQL, Storage)

## Setup Instructions

### 1. Supabase Project Setup
1. Create a new project in [Supabase](https://supabase.com).
2. Go to the SQL Editor and run the contents of `schema.sql`. This will create the `shops` and `products` tables.
3. Go to Storage and create a **Public** bucket named `product-images`.

### 2. Environment Variables
Create a `.env.local` file in the root of the project by copying the example:
```bash
cp .env.example .env.local
```

Fill in your actual Supabase credentials found in Project Settings -> API:
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbG..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbG..."
```
*Note: The service role key securely allows the next.js server actions to bypass RLS and upload directly to Storage.*

### 3. Running the App
Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

### 4. Creating Shops & Generating Upload Links
To create an initial shop and generate a secure upload link for the merchant, run the included seed script:

```bash
npx ts-node scripts/seedShops.ts
```

This will log an `upload_token` and a direct link (e.g., `http://localhost:3000/upload/ab12cd34...`) which you can give to the shop owner to start uploading products instantly.
