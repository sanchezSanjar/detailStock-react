import { useEffect, useState } from "react";
import { useCountUp } from "../../components/hooks/useCountUp";
import { useInView } from "../../components/hooks/useInView";
import StatsService from "../../services/StatsService";
import type { ShopStats } from "../../../lib/types/stats";

const EMPTY: ShopStats = { products: 0, collections: 0, customers: 0, ordersDelivered: 0 };

/** real numbers from the server; they count up once the bar scrolls into view */
export default function Statistics() {
    const [stats, setStats] = useState<ShopStats>(EMPTY);
    const { ref, inView } = useInView<HTMLDivElement>(0.4);

    useEffect(() => {
        new StatsService()
            .getStats()
            .then(setStats)
            .catch(() => setStats(EMPTY));
    }, []);

    const show = inView ? stats : EMPTY;
    const items = [
        { label: "Products", value: useCountUp(show.products) },
        { label: "Collections", value: useCountUp(show.collections) },
        { label: "Customers", value: useCountUp(show.customers) },
        { label: "Orders delivered", value: useCountUp(show.ordersDelivered) },
    ];

    return (
        <div className={`stats-glass${inView ? " is-visible" : ""}`} ref={ref}>
            {items.map((item) => (
                <div className="stats-cell" key={item.label}>
                    <span className="stats-value">{item.value}</span>
                    <span className="stats-label">{item.label}</span>
                </div>
            ))}
        </div>
    );
}
