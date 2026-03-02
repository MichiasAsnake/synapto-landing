import Link from "next/link";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";

interface ProductCardProps {
    id: string;
    name: string;
    shopName: string;
    distanceFt: number;
    imageUrl: string;
    price?: number;
}

export default function ProductCard({ id, name, shopName, distanceFt, imageUrl, price }: ProductCardProps) {
    return (
        <Link href={`/product/${id}`} className="block group">
            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 h-full flex flex-col transform group-hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    {price && (
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            ${price.toFixed(2)}
                        </div>
                    )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg line-clamp-1 mb-1 group-hover:text-indigo-500 transition-colors">{name}</h3>

                    <div className="mt-auto space-y-2 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1.5 shrink-0">
                                <Store size={14} />
                                <span className="truncate max-w-[100px]">{shopName}</span>
                            </span>
                            <span className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full shrink-0">
                                <Navigation size={12} />
                                {distanceFt} ft
                            </span>
                        </div>
                        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Available in store
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Ensure we have access to the Store icon here too since we used it
import { Store } from "lucide-react";
