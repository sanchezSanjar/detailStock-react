import { useEffect, useRef, useState } from "react";

/** true once the element has scrolled into view (stays true), for count-ups and reveal animations */
export function useInView<T extends Element>(threshold = 0.3) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || inView) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, inView]);

    return { ref, inView };
}
