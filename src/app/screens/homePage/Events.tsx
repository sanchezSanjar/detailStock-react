import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import moment from "moment";
import ArticleService from "../../services/ArticleService";
import { ArticleType } from "../../../lib/enums/article.enum";
import type { Article } from "../../../lib/types/article";
import { getImageUrl } from "../../../lib/utils/getImageUrl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Events() {
    const [events, setEvents] = useState<Article[]>([]);

    useEffect(() => {
        new ArticleService()
            .getArticles(ArticleType.EVENT)
            .then((data) => setEvents(data))
            .catch((err) => console.log(err));
    }, []);

    if (events.length === 0) return null;

    return (
        <div className={"events-frame"}>
            <Stack className={"events-main"}>
                <Box className={"events-text"}>
                    <span className={"category-title"}>Events</span>
                </Box>

                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    className={"events-info"}
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={30}
                    navigation={{
                        nextEl: ".events-nav-next",
                        prevEl: ".events-nav-prev",
                    }}
                    pagination={{
                        el: ".events-dots",
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                >
                    {events.map((event) => (
                        <SwiperSlide key={event._id} className={"events-info-frame"}>
                            <div className={"events-img"}>
                                <img src={getImageUrl(event.articleImage, "/img/default.png")} className={"events-img-el"} alt={event.articleTitle} />
                            </div>
                            <Box className={"events-desc"}>
                                <div className={"event-title-speaker"}>
                                    <strong>{event.articleTitle}</strong>
                                    <p className={"spec-text-author"}>{event.articleAuthor || "DetailStock Team"}</p>
                                </div>
                                <p className={"text-desc"}>{event.articleContent}</p>
                                <div className={"bott-info"}>
                                    <span className={"bott-info-main"}>{moment(event.createdAt).fromNow()}</span>
                                    <span className={"bott-info-main"}>{event.articleLocation}</span>
                                </div>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Box className={"prev-next-frame"}>
                    <button className={"events-nav-prev"}>‹</button>
                    <div className={"events-dots"}></div>
                    <button className={"events-nav-next"}>›</button>
                </Box>
            </Stack>
        </div>
    );
}
