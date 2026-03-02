"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadProduct } from "../actions";
import { Camera, ImagePlus, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function UploadForm({ token, shopName }: { token: string, shopName: string }) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    return (
        <div className="min-h-screen pb-20 bg-gray-50 dark:bg-black">
            <Navbar />

            <main className="max-w-md mx-auto pt-20 px-4">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Cancel</span>
                </Link>

                <div className="space-y-2 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-2">
                        Uploading for: {shopName}
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">List a Product</h1>
                    <p className="text-gray-500 dark:text-gray-400">Add a new item to your shop's inventory instantly.</p>
                </div>

                <form
                    action={async (formData) => {
                        setIsSubmitting(true);
                        try {
                            await uploadProduct(formData);
                        } catch (err) {
                            console.error(err);
                            setIsSubmitting(false);
                            alert("Failed to upload. Make sure all fields are filled.");
                        }
                    }}
                    className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
                >
                    <input type="hidden" name="token" value={token} />

                    {/* Image Upload Area */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Product Photo <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                capture="environment"
                                onChange={handleImageChange}
                                required
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className={`w-full aspect-square md:aspect-video rounded-2xl flex flex-col items-center justify-center border-2 border-dashed transition-all ${preview
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 overflow-hidden'
                                    : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}>
                                {preview ? (
                                    <div className="relative w-full h-full">
                                        <Image src={preview} alt="Preview" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <span className="text-white font-medium flex items-center gap-2">
                                                <Camera size={20} />
                                                Tap to retake
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-3 p-6">
                                        <div className="bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
                                            <ImagePlus size={28} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-lg">Tap to take a photo</p>
                                            <p className="text-sm text-gray-500">or upload from your library</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="e.g. LA Hollywood Hoodie"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow placeholder:text-gray-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Price (Optional)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-gray-500 font-medium">$</span>
                            </div>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={22} className="animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            "Publish Listing"
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}
