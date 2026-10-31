import type { ReactNode } from "react";

interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    subtitle?: string;
    /** buttons on the right: "view all", slider arrows... */
    actions?: ReactNode;
}

/** the same heading on every home section: small red label, narrow title, short line */
export default function SectionHeader({ eyebrow, title, subtitle, actions }: SectionHeaderProps) {
    return (
        <div className="sec-head">
            <div className="sec-head-text">
                <span className="sec-eyebrow">{eyebrow}</span>
                <h2 className="sec-title">{title}</h2>
                {subtitle && <p className="sec-subtitle">{subtitle}</p>}
            </div>
            {actions && <div className="sec-actions">{actions}</div>}
        </div>
    );
}
