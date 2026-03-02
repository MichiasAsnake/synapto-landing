"use server";

import { supabaseAdmin } from "@/lib/supabase/server";
import crypto from "crypto";

export async function parseMapUrl(shortUrl: string) {
    try {
        // Fetch to follow redirects (handles maps.app.goo.gl)
        const response = await fetch(shortUrl, { method: "GET", redirect: "follow" });
        const finalUrl = response.url;

        let name = "";

        // Extract name: /place/Name+Here/
        const nameMatch = finalUrl.match(/\/place\/([^\/]+)\//);
        if (nameMatch) {
            name = decodeURIComponent(nameMatch[1].replace(/\+/g, ' '));
        }

        return { finalUrl, name };
    } catch (e) {
        return { error: "Failed to resolve link" };
    }
}

export async function createShop(formData: FormData) {
    let name = formData.get("name") as string;
    const address = formData.get("address") as string;
    let mapLink = formData.get("mapLink") as string;

    if (!mapLink) {
        throw new Error("Map link is required");
    }

    // Attempt to resolve shortlinks or clean URL if it lacks coordinates
    if (!mapLink.includes('@')) {
        try {
            const response = await fetch(mapLink, { method: "GET", redirect: "follow" });
            mapLink = response.url;
        } catch (e) {
            throw new Error("Could not resolve the provided map link.");
        }
    }

    const latLngMatch = mapLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

    if (!latLngMatch) {
        throw new Error("Could not parse coordinates from the provided map link. Make sure it's a valid Google Maps location.");
    }

    const latitude = parseFloat(latLngMatch[1]);
    const longitude = parseFloat(latLngMatch[2]);

    // Try to extract the unique Google Place ID or Name segment to prevent duplicates
    let google_place_id = null;
    const placeMatch = mapLink.match(/\/place\/([^\/]+)\//);

    if (placeMatch) {
        google_place_id = placeMatch[1]; // This is usually a unique slug like "Venice+Beach+Shop" or a CID
    } else {
        // Fallback to a hash of the coordinates if the URL format is strictly a pin
        google_place_id = crypto.createHash('md5').update(`${latitude.toFixed(4)},${longitude.toFixed(4)}`).digest('hex');
    }

    // If name is fundamentally missing, try to scrape it from the resolved URL as a fallback
    if (!name) {
        name = placeMatch ? decodeURIComponent(placeMatch[1].replace(/\+/g, ' ')) : "Unknown Shop";
    }

    const uploadToken = crypto.randomBytes(16).toString('hex');

    const { data, error } = await supabaseAdmin
        .from('shops')
        .insert([{
            name,
            address: address || "Address not provided",
            latitude,
            longitude,
            upload_token: uploadToken,
            google_place_id,
            is_active: true
        }])
        .select()
        .single();

    if (error) {
        console.error("Failed to create shop:", error);
        if (error.code === '23505') { // Postgres unique_violation error code
            throw new Error(`This map location has already been registered as a shop.`);
        }
        throw new Error("Database error occurred while saving the shop details.");
    }

    if (!data) {
        throw new Error("Database error occurred while saving the shop details.");
    }

    return { uploadToken, shopName: data.name };
}
