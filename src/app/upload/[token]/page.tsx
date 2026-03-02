import { supabase } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import UploadForm from "./UploadForm";

export default async function UploadPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params;

    // Validate token exists and map to shop name for display
    const { data: shop, error } = await supabase
        .from('shops')
        .select('name')
        .eq('upload_token', token)
        .single();

    if (error || !shop) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-black">
                <div className="text-center space-y-4 max-w-sm">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                    </div>
                    <h1 className="text-2xl font-bold">Invalid Link</h1>
                    <p className="text-gray-500">This upload link is invalid or has expired. Please contact support for a new merchant link.</p>
                </div>
            </div>
        );
    }

    return <UploadForm token={token} shopName={shop.name} />;
}
