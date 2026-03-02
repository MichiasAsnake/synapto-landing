import { calculateDistanceFt } from "@/lib/data";
import { supabase } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Store, Navigation } from "lucide-react";
import Navbar from "@/components/Navbar";

const USER_LAT = 34.1010;
const USER_LON = -118.3300;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: product, error } = await supabase
        .from('products')
        .select(`
      *,
      shops!inner(*)
    `)
        .eq('id', id)
        .single();

    if (error || !product) {
        console.error("Failed to load product:", error);
        return notFound();
    }

    const shop = Array.isArray(product.shops) ? product.shops[0] : product.shops;
    if (!shop || !shop.is_active) return notFound();

    const distanceFt = calculateDistanceFt(USER_LAT, USER_LON, shop.latitude, shop.longitude);

    // Google Maps Universal Link
    const mapLink = `https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`;

    const priceFormatted = product.price_cents ? (product.price_cents / 100).toFixed(2) : null;

    return (
        <div className="min-h-screen pb-28">
            <Navbar />

            <main className="max-w-md mx-auto pt-16">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-4 py-4 mb-2">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to feed</span>
                </Link>

                <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800">
                    {product.image_url ? (
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-medium">No Image</div>
                    )}
                </div>

                <div className="p-5 space-y-6">
                    <div className="flex justify-between items-start">
                        <h1 className="text-3xl font-extrabold tracking-tight">{product.name}</h1>
                        {priceFormatted && (
                            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                                ${priceFormatted}
                            </div>
                        )}
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/60 dark:to-purple-900/60 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 mt-1 shadow-inner">
                                <Store size={24} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-xl">{shop.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5 text-sm">
                                    <MapPin size={16} />
                                    {shop.address}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl -mx-2 px-2 pb-2">
                            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 w-fit px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Available in store now
                            </div>
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                {distanceFt} ft away
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 z-50">
                <div className="max-w-md mx-auto">
                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
                    >
                        <Navigation size={22} fill="currentColor" strokeWidth={2.5} />
                        Navigate to Store
                    </a>
                </div>
            </div>
        </div>
    );
}
