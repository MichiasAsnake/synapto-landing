import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Setup Admin Client (Bypass RLS, run directly from node)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing SUPABASE URL or SERVICE KEY. Please set them in your environment.");
    process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
    console.log("Seeding initial shop...");

    const uploadToken = crypto.randomBytes(16).toString('hex');

    // Hollywood location
    const shop = {
        name: "Hollywood Gifts Demo",
        address: "7000 Hollywood Blvd",
        latitude: 34.1016,
        longitude: -118.3336,
        upload_token: uploadToken,
        is_active: true
    };

    const { data: shopData, error: shopError } = await supabaseAdmin
        .from('shops')
        .insert([shop])
        .select()
        .single();

    if (shopError) {
        console.error("Failed to insert shop:", shopError);
        process.exit(1);
    }

    console.log("Shop created:", shopData.name);
    console.log("Uploading mock images to Storage...");

    // Mock SVGs (equivalent to what was generated earlier)
    const hoodieSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#64748b" font-weight="bold">LA Hoodie</text><circle cx="200" cy="150" r="40" fill="#cbd5e1"/><path d="M 160 220 L 240 220 L 250 280 L 150 280 Z" fill="#94a3b8"/></svg>`;

    const magnetSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f8fafc"/><rect x="50" y="50" width="300" height="300" rx="20" fill="#bae6fd" stroke="#38bdf8" stroke-width="8"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#0369a1" font-weight="900">HOLLYWOOD</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#0284c7" font-weight="bold">MAGNET</text></svg>`;

    // Upload files
    const hoodieFilename = `${shopData.id}/la_hoodie.svg`;
    const magnetFilename = `${shopData.id}/hollywood_magnet.svg`;

    await supabaseAdmin.storage.from('product-images').upload(hoodieFilename, Buffer.from(hoodieSvg), { contentType: 'image/svg+xml' });
    await supabaseAdmin.storage.from('product-images').upload(magnetFilename, Buffer.from(magnetSvg), { contentType: 'image/svg+xml' });

    console.log("Images uploaded. Creating product listings...");

    const hoodieUrl = await supabaseAdmin.storage.from('product-images').getPublicUrl(hoodieFilename).data.publicUrl;
    const magnetUrl = await supabaseAdmin.storage.from('product-images').getPublicUrl(magnetFilename).data.publicUrl;

    const { error: productsError } = await supabaseAdmin
        .from('products')
        .insert([
            { shop_id: shopData.id, name: "LA Hoodie", price_cents: 1800, image_url: hoodieUrl, is_active: true },
            { shop_id: shopData.id, name: "Hollywood Magnet", price_cents: 500, image_url: magnetUrl, is_active: true }
        ]);

    if (productsError) {
        console.error("Failed to insert products:", productsError);
        process.exit(1);
    }

    console.log("\n✅ Database Seeded Successfully!");
    console.log("-----------------------------------------");
    console.log(`Shop ID: ${shopData.id}`);
    console.log(`Name: ${shopData.name}`);
    console.log(`Products: 2 items created`);
    console.log("\n🛍️  UPLOAD LINK (Give this to the shop owner):");
    console.log(`http://localhost:3000/upload/${uploadToken}`);
    console.log("-----------------------------------------");
}

main().catch(console.error);
