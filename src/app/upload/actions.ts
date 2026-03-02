"use server";

import { supabaseAdmin } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function uploadProduct(formData: FormData) {
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const priceStr = formData.get("price") as string;
    const token = formData.get("token") as string;

    if (!file || file.size === 0 || !name || !token) {
        throw new Error("Missing required fields");
    }

    // 1. Resolve token to shop
    const { data: shop, error: shopError } = await supabaseAdmin
        .from('shops')
        .select('id')
        .eq('upload_token', token)
        .single();

    if (shopError || !shop) {
        throw new Error("Invalid upload token");
    }

    // 2. Upload to Supabase Storage
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${shop.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabaseAdmin
        .storage
        .from('product-images')
        .upload(filename, buffer, {
            contentType: file.type,
            upsert: false
        });

    if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw new Error("Failed to upload image");
    }

    // 3. Get Public URL
    const { data: { publicUrl } } = supabaseAdmin
        .storage
        .from('product-images')
        .getPublicUrl(filename);

    // 4. Insert Product Record
    const priceCents = priceStr ? Math.round(parseFloat(priceStr) * 100) : null;

    const { error: insertError } = await supabaseAdmin
        .from('products')
        .insert([{
            shop_id: shop.id,
            name,
            image_url: publicUrl,
            price_cents: priceCents,
            is_active: true
        }]);

    if (insertError) {
        console.error("Database insert error:", insertError);
        throw new Error("Failed to create product record");
    }

    revalidatePath("/");
    redirect("/");
}
