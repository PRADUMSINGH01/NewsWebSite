"use client";

import { useState, useEffect } from "react";

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    // read theme on mount (safe for SSR)
    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) setTheme(savedTheme);
        } catch (e) {
            // ignore (e.g., privacy mode)
        }
    }, []);

    // apply & persist theme when it changes
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.className = theme;
        }
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {
            // ignore
        }
    }, [theme]);

    // We do not render a wrapper div to avoid hydration mismatch if possible,
    // but since we apply theme to document.documentElement it's fine.
    return <>{children}</>;
}
