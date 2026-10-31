import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import LocalCarWashOutlinedIcon from "@mui/icons-material/LocalCarWashOutlined";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import TireRepairOutlinedIcon from "@mui/icons-material/TireRepairOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { ProductCollection } from "../../../lib/enums/product.enum";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const COLLECTIONS: { value: ProductCollection; title: string; text: string; icon: ReactNode }[] = [
    { value: ProductCollection.EXTERIOR_CARE, title: "Exterior care", text: "Shampoos, waxes and sealants", icon: <LocalCarWashOutlinedIcon /> },
    { value: ProductCollection.POLISH_CORRECTION, title: "Polish & correction", text: "Compounds, polishes and pads", icon: <AutoAwesomeOutlinedIcon /> },
    { value: ProductCollection.INTERIOR_CARE, title: "Interior care", text: "Leather, fabric and dashboard", icon: <AirlineSeatReclineExtraOutlinedIcon /> },
    { value: ProductCollection.WHEELS_TIRES, title: "Wheels & tires", text: "Cleaners, brushes and shine", icon: <TireRepairOutlinedIcon /> },
    { value: ProductCollection.GLASS_MIRRORS, title: "Glass & mirrors", text: "Streak-free, crystal clear", icon: <VisibilityOutlinedIcon /> },
    { value: ProductCollection.TOOLS_ACCESSORIES, title: "Tools & accessories", text: "Towels, applicators and more", icon: <HandymanOutlinedIcon /> },
    { value: ProductCollection.OTHERS, title: "Everything else", text: "Fresheners, kits and extras", icon: <CategoryOutlinedIcon /> },
];

/** one tile per collection; a click opens the shop already filtered */
export default function Collections() {
    return (
        <Reveal className="home-band">
            <div className="home-wrap">
                <SectionHeader
                    eyebrow="Shop by need"
                    title="Collections"
                    subtitle="Everything for a showroom finish, sorted by the job it does"
                />
                <div className="collection-grid">
                    {COLLECTIONS.map((item, index) => (
                        <NavLink
                            key={item.value}
                            to={`/products?collection=${item.value}`}
                            className={`collection-tile ${index === 0 ? "is-featured" : ""}`}
                            style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                            <span className="collection-icon">{item.icon}</span>
                            <span className="collection-title">{item.title}</span>
                            <span className="collection-text">{item.text}</span>
                            <NorthEastIcon className="collection-go" fontSize="small" />
                        </NavLink>
                    ))}
                </div>
            </div>
        </Reveal>
    );
}
