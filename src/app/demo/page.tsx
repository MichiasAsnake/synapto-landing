import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Shop Overview Demo | Synapto",
    description: "Watch a quick walkthrough of how Synapto transforms your print shop's workflow.",
};

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
            <header className="border-b border-zinc-900 bg-zinc-950 p-4">
                <div className="mx-auto w-full max-w-[1200px] flex items-center justify-between">
                    <Button asChild variant="ghost" className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 pl-2">
                        <a href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </a>
                    </Button>
                    <div className="flex items-center gap-4">
                        <Button asChild className="h-9 rounded-lg bg-white px-5 text-sm font-medium text-zinc-950 shadow-none hover:bg-zinc-200">
                            <a href="https://calendly.com/mickyasnake/30min" target="_blank" rel="noopener noreferrer">
                                Request a Demo
                            </a>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-[1200px] mb-8 text-center sm:text-left">
                    <h1 className="font-display text-2xl sm:text-3xl font-semibold text-zinc-50 mb-2">Shop Overview Walkthrough</h1>
                    <p className="text-zinc-400">See how Synapto's risk engine identifies bottlenecks before they happen.</p>
                </div>

                <div className="w-full max-w-[1200px] mx-auto rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl relative aspect-video">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        playsInline
                        src="/synapto-demo.mp4"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </main>
    );
}
