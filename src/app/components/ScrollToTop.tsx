import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router keeps the scroll position between pages, so a footer link opened the next page at its bottom.
 * A new page starts at the top; a new filter on the same page (?collection=...) glides up smoothly.
 */
export default function ScrollToTop() {
    const { pathname, search } = useLocation();
    const lastPath = useRef(pathname);

    useEffect(() => {
        const samePage = lastPath.current === pathname;
        lastPath.current = pathname;
        window.scrollTo({ top: 0, behavior: samePage ? "smooth" : "auto" });
    }, [pathname, search]);

    return null;
}
