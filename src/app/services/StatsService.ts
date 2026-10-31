import axios from "axios";
import { serverApi } from "../../lib/config";
import type { ShopStats } from "../../lib/types/stats";

class StatsService {
    private readonly path: string;
    constructor() {
        this.path = serverApi;
    }

    /** home page numbers, counted by the server */
    public async getStats(): Promise<ShopStats> {
        try {
            const result = await axios.get(`${this.path}/stats`);
            return result.data;
        } catch (err) {
            console.log("Error, getStats:", err);
            throw err;
        }
    }
}

export default StatsService;
