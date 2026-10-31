import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/EmailOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import "../../css/footer.css";

const SOCIALS = [
    { label: "Facebook", icon: <FacebookIcon fontSize="small" /> },
    { label: "X", icon: <XIcon fontSize="small" /> },
    { label: "Instagram", icon: <InstagramIcon fontSize="small" /> },
    { label: "YouTube", icon: <YouTubeIcon fontSize="small" /> },
];

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-wrap">
                {/* closing call to action */}
                <div className="footer-cta">
                    <div>
                        <span className="footer-cta-eyebrow">Ready when you are</span>
                        <h2 className="footer-cta-title">
                            Get the <span>showroom finish</span> at home
                        </h2>
                    </div>
                    <NavLink to="/products" className="btn-shine">
                        Shop now <ArrowForwardIcon fontSize="small" />
                    </NavLink>
                </div>

                <div className="footer-grid">
                    <div className="footer-brand">
                        <NavLink to="/" className="footer-logo">
                            DETAIL<strong>STOCK</strong>
                        </NavLink>
                        <p className="footer-desc">
                            Premium car detailing products that bring professional-grade care to every driveway.
                            Clean. Protect. Perform.
                        </p>
                        <div className="footer-socials">
                            {SOCIALS.map((social) => (
                                <a key={social.label} href="#" aria-label={social.label}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <nav className="footer-col">
                        <h3 className="footer-heading">Shop</h3>
                        <NavLink to="/" className="footer-link">Home</NavLink>
                        <NavLink to="/products" className="footer-link">All products</NavLink>
                        <NavLink to="/products?collection=POLISH_CORRECTION" className="footer-link">Polish & correction</NavLink>
                        <NavLink to="/products?collection=INTERIOR_CARE" className="footer-link">Interior care</NavLink>
                    </nav>

                    <nav className="footer-col">
                        <h3 className="footer-heading">Help</h3>
                        <NavLink to="/help" className="footer-link">FAQ & notices</NavLink>
                        <NavLink to="/orders" className="footer-link">My orders</NavLink>
                        <NavLink to="/member-page" className="footer-link">My page</NavLink>
                    </nav>

                    <div className="footer-col">
                        <h3 className="footer-heading">Contact</h3>
                        <span className="footer-line"><PlaceOutlinedIcon fontSize="small" /> Daegu, Dalseo-gu</span>
                        <span className="footer-line"><PhoneOutlinedIcon fontSize="small" /> 010-1234-5678</span>
                        <span className="footer-line"><MailOutlineIcon fontSize="small" /> sanjarbek98@bk.ru</span>
                        <span className="footer-line"><ScheduleOutlinedIcon fontSize="small" /> Support 24/7</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} DetailStock. All rights reserved.</span>
                    <span>Free delivery on orders from $100</span>
                </div>
            </div>
        </footer>
    );
}
