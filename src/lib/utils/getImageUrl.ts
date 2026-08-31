import { serverApi } from "../config";
export const getImageUrl = (path?: string | null, fallback = "/icons/default-user.png"): string => {
    if (!path) return fallback;
    return path.startsWith("http") ? path : `${serverApi}/${path}`;
};