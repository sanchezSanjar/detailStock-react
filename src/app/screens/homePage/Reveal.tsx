import type { ReactNode } from "react";
import { useInView } from "../../components/hooks/useInView";

/** a home section that fades and slides in when it scrolls into view */
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
    const { ref, inView } = useInView<HTMLElement>(0.12);
    return (
        <section ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className}`}>
            {children}
        </section>
    );
}
