"use client";

import { useState, useEffect } from "react";
import { createShop, parseMapUrl } from "./actions";
import { Loader2, Store, MapPin, Link as LinkIcon, Download, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function AdminPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successData, setSuccessData] = useState<{ uploadToken: string, shopName: string } | null>(null);
    const [copied, setCopied] = useState(false);
    const [uploadUrl, setUploadUrl] = useState("");

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [isAutofilling, setIsAutofilling] = useState(false);

    // Safely get base URL on client side
    useEffect(() => {
        setUploadUrl(window.location.origin);
    }, []);

    const handleMapLinkChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setMapLink(url);

        if (url.startsWith("http") && !url.includes("@")) {
            setIsAutofilling(true);
            try {
                const { name: parsedName } = await parseMapUrl(url);
                if (parsedName && !name) {
                    setName(parsedName);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsAutofilling(false);
            }
        } else if (url.startsWith("http") && url.includes("/place/")) {
            // It's a long link, we can extract the name client side instantly without a network call
            const nameMatch = url.match(/\/place\/([^\/]+)\//);
            if (nameMatch && !name) {
                setName(decodeURIComponent(nameMatch[1].replace(/\+/g, ' ')));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessData(null);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("mapLink", mapLink);

            const result = await createShop(formData);
            setSuccessData(result);
            // Reset form for next entry
            setName("");
            setAddress("");
            setMapLink("");
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopyLink = () => {
        if (successData) {
            navigator.clipboard.writeText(`${uploadUrl}/upload/${successData.uploadToken}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const downloadQR = () => {
        const svg = document.getElementById("qr-code");
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `${successData?.shopName.replace(/\s+/g, '_')}_QR.png`;
                downloadLink.href = `${pngFile}`;
                downloadLink.click();
            };

            img.src = "data:image/svg+xml;base64," + btoa(svgData);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6">
            <div className="max-w-xl mx-auto space-y-8">

                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 mb-4">
                        <Store size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Add New Merchant</h1>
                    <p className="text-gray-500">Generate a secure upload link by dropping a Google Maps pin.</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                {!successData ? (
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">

                        <div className="space-y-2">
                            <label htmlFor="mapLink" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Google Maps Link <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500 pb-1">Paste a Location Share Link (maps.app.goo.gl/...) to autofill the name</p>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="url"
                                    id="mapLink"
                                    name="mapLink"
                                    required
                                    value={mapLink}
                                    onChange={handleMapLinkChange}
                                    placeholder="https://maps.app.goo.gl/..."
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                                {isAutofilling && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <Loader2 size={16} className="animate-spin text-indigo-500" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Shop Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Venice Beach Souvenirs"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Address (Optional)
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="123 Boardwalk Ave"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isAutofilling}
                            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? (
                                <><Loader2 size={20} className="animate-spin" /> Generating Link...</>
                            ) : (
                                "Save & Generate Link"
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center space-y-6">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <Check size={32} strokeWidth={3} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">{successData.shopName} Created!</h2>
                            <p className="text-gray-500 mt-2">Share this QR code or link directly with the merchant. They do not need to download an app or create an account.</p>
                        </div>

                        <div className="bg-gray-50 dark:bg-black p-6 rounded-2xl flex flex-col items-center justify-center border border-gray-200 dark:border-gray-800 shadow-inner">
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <QRCodeSVG
                                    id="qr-code"
                                    value={`${uploadUrl}/upload/${successData.uploadToken}`}
                                    size={200}
                                    level={"H"}
                                    includeMargin={true}
                                />
                            </div>
                            <button
                                onClick={downloadQR}
                                className="mt-6 flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 rounded-full font-semibold transition-colors"
                            >
                                <Download size={18} /> Download QR Image
                            </button>
                        </div>

                        <div className="space-y-2 pt-2">
                            <p className="text-sm font-medium text-gray-500 text-left">Direct Link</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={`${uploadUrl}/upload/${successData.uploadToken}`}
                                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono text-gray-600 dark:text-gray-300 outline-none"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-white rounded-xl font-medium transition-colors flex items-center gap-2 shrink-0"
                                >
                                    {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                    {copied ? "Copied" : "Copy"}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setSuccessData(null)}
                            className="mt-4 text-indigo-600 font-medium hover:underline"
                        >
                            Add another shop
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
