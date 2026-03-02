"use client";

import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function SearchBarWrapper({ initialQuery }: { initialQuery?: string }) {
    const router = useRouter();

    const handleSearch = (query: string) => {
        if (query) {
            router.push(`/?q=${encodeURIComponent(query)}`);
        } else {
            router.push("/");
        }
    };

    return <SearchBar onSearch={handleSearch} initialQuery={initialQuery} />;
}
