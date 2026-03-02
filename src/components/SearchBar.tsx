"use client";

import { Search, X } from "lucide-react";
import { useState, useRef } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialQuery?: string;
}

export default function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
    const [query, setQuery] = useState(initialQuery);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
        inputRef.current?.blur();
    };

    const clearSearch = () => {
        setQuery("");
        onSearch("");
        inputRef.current?.focus();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`relative w-full transition-all duration-300 ${isFocused ? 'scale-105 shadow-lg shadow-indigo-500/10' : 'shadow-md'}`}
        >
            <div className={`flex items-center overflow-hidden rounded-2xl border-2 bg-white dark:bg-black transition-colors ${isFocused ? 'border-indigo-500' : 'border-gray-200 dark:border-gray-800'}`}>
                <div className="pl-4 text-gray-400">
                    <Search size={20} className={isFocused ? 'text-indigo-500' : ''} />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search for LA hoodie, magnets..."
                    className="w-full bg-transparent p-4 text-base outline-none placeholder:text-gray-400 dark:text-white"
                />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
        </form>
    );
}
