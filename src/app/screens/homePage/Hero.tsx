import { useRef, type MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useAppSelector } from "../../hooks";
import Statistics from "./Statistics";
import "../../css/hero.css";

const TITLE_TOP = ["Detailing", "gear", "for", "a"];
const TITLE_ACCENT = ["showroom", "finish."];

export default function Hero() {
    const authMember = useAppSelector((state) => state.auth.authMember);
    const heroRef = useRef<HTMLDivElement>(null);

    // the red glow follows the mouse (CSS reads --mx / --my)
    const moveGlow = (e: MouseEvent<HTMLDivElement>) => {
        const hero = heroRef.current;
        if (!hero) return;
        const box = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${((e.clientX - box.left) / box.width) * 100}%`);
        hero.style.setProperty("--my", `${((e.clientY - box.top) / box.height) * 100}%`);
    };

    // each word rises in a little after the previous one
    let wordIndex = 0;
    const word = (text: string, accent = false) => (
        <span
            key={`${text}-${wordIndex}`}
            className={`hero-word${accent ? " accent" : ""}`}
            style={{ animationDelay: `${0.15 + wordIndex++ * 0.08}s` }}
        >
            {text}
        </span>
    );

    return (
        <section className="hero" ref={heroRef} onMouseMove={moveGlow}>
            <video className="hero-bg-video" autoPlay muted loop playsInline poster="/img/default.png">
                <source type="video/mp4" src="/video/detailstock-hero.mp4" />
            </video>
            <div className="hero-shade" />
            <div className="hero-glow" />

            <div className="hero-inner">
                <span className="hero-eyebrow">
                    <span className="hero-eyebrow-dot" />
                    Premium car care supplies
                </span>

                <h1 className="hero-heading">
                    <span className="hero-line">{TITLE_TOP.map((w) => word(w))}</span>
                    <span className="hero-line">{TITLE_ACCENT.map((w) => word(w, true))}</span>
                </h1>

                <p className="hero-lead">
                    Pro-grade polishes, pads and tools for every part of your car. Hand-picked, honestly priced,
                    delivered fast.
                </p>

                <div className="hero-actions">
                    <NavLink to="/products" className="btn-shine">
                        Shop now <ArrowForwardIcon fontSize="small" />
                    </NavLink>
                    <NavLink to={authMember ? "/orders" : "/signup"} className="btn-glass">
                        {authMember ? "My orders" : "Create account"}
                    </NavLink>
                </div>

                <ul className="hero-perks">
                    <li>
                        <LocalShippingOutlinedIcon fontSize="small" /> Free delivery from $100
                    </li>
                    <li>
                        <VerifiedOutlinedIcon fontSize="small" /> Pro-grade quality
                    </li>
                    <li>
                        <SupportAgentOutlinedIcon fontSize="small" /> Support 24/7
                    </li>
                </ul>
            </div>

            <div className="hero-scroll" aria-hidden>
                <span />
            </div>

            <Statistics />
        </section>
    );
}
