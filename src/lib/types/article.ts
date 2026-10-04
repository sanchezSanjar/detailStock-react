import { ArticleType } from "../enums/article.enum";

export interface Article {
    _id: string;
    articleType: ArticleType;
    articleTitle: string;
    articleContent: string;
    createdAt: Date;
    updatedAt: Date;
}
