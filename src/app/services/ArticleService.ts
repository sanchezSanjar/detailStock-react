import axios from "axios";
import { serverApi } from "../../lib/config";
import type { Article } from "../../lib/types/article";
import type { ArticleType } from "../../lib/enums/article.enum";

class ArticleService {
    private readonly path: string;
    constructor() {
        this.path = serverApi;
    }

    public async getArticles(type: ArticleType): Promise<Article[]> {
        try {
            const url = `${this.path}/article/all?type=${type}`;
            const result = await axios.get(url);
            return result.data;
        } catch (err) {
            console.log("Error, getArticles:", err);
            throw err;
        }
    }
}

export default ArticleService;
