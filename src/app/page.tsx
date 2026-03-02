import Image from "next/image";
import Link from "next/link";
import { calculateDistanceFt } from "@/lib/data";
import { supabase } from "@/lib/supabase/client";
import ProductCard from "@/components/ProductCard";
import SearchBarWrapper from "@/components/SearchBarWrapper";
import Navbar from "@/components/Navbar";

// Mock user's location (Hollywood, LA) for MVP prototype
const USER_LAT = 34.1010;
const USER_LON = -118.3300;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";

  // Fetch active products and joined active shops safely
  let sbQuery: any;

  if (query) {
    // Use the custom RPC for trigram similarity search (typo tolerance)
    sbQuery = supabase
      .rpc('search_products', { search_term: query })
      .select('*, shops!inner(*)')
      .eq('shops.is_active', true);
  } else {
    // Normal query for empty search
    sbQuery = supabase
      .from('products')
      .select('*, shops!inner(*)')
      .eq('is_active', true)
      .eq('shops.is_active', true);
  }

  const { data: rawProducts, error } = await sbQuery.order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase Error fetching products:", error);
  }

  // Compute enriched products with distance
  let products = (rawProducts || []).map((product: any) => {
    // Array since it's a join, or an object depending on schema. Inner join usually returns an object.
    const shop = Array.isArray(product.shops) ? product.shops[0] : product.shops;
    let distanceFt = 0;

    if (shop) {
      distanceFt = calculateDistanceFt(USER_LAT, USER_LON, shop.latitude, shop.longitude);
    }

    return {
      ...product,
      shop,
      distanceFt
    };
  });

  // Sort by distance (since MVP requires proximity sort)
  products.sort((a: any, b: any) => a.distanceFt - b.distanceFt);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="max-w-md mx-auto pt-24 px-4 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Discover Nearby</h1>
          <p className="text-gray-500 dark:text-gray-400">Find souvenirs available in shops right around the corner.</p>
        </header>

        <section className="sticky top-20 z-40 py-2 bg-background/95 backdrop-blur-sm -mx-4 px-4">
          <SearchBarWrapper initialQuery={query} />
        </section>

        <section className="space-y-4 pt-2">
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800">
              <p className="text-gray-500 font-medium">No products found nearby.</p>
              {query && (
                <Link href="/" className="text-indigo-500 mt-2 inline-block font-semibold">
                  Clear search
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  shopName={product.shop?.name || "Unknown Shop"}
                  distanceFt={product.distanceFt}
                  imageUrl={product.image_url}
                  price={product.price_cents ? product.price_cents / 100 : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
