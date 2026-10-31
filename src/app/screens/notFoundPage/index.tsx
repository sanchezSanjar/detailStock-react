import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function NotFoundPage() {
    return (
        <div className="not-found">
            <span className="not-found-code" aria-hidden>
                404
            </span>
            <span className="page-eyebrow">Wrong turn</span>
            <h1 className="page-title">This page took a detour</h1>
            <p className="not-found-text">The page you are looking for does not exist or was moved.</p>
            <div className="not-found-actions">
                <NavLink to="/" className="btn-shine">
                    Back to home <ArrowForwardIcon fontSize="small" />
                </NavLink>
                <NavLink to="/products" className="btn-glass">
                    Browse the shop
                </NavLink>
            </div>
        </div>
    );
}
