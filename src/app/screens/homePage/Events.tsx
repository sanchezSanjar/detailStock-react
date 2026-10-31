import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import moment from "moment";
import ArticleService from "../../services/ArticleService";
import { ArticleType } from "../../../lib/enums/article.enum";
import type { Article } from "../../../lib/types/article";
import { getImageUrl } from "../../../lib/utils/getImageUrl";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import "swiper/css";
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
        <Reveal className="home-band home-band-raised">
            <div className="home-wrap">
                <SectionHeader
                    eyebrow="What's on"
                    title="Events"
                    subtitle="Workshops, launches and offers from the DetailStock team"
                    actions={
                        <>
                            <button className="rail-arrow events-prev" aria-label="previous event">
                                <ArrowBackIcon fontSize="small" />
                            </button>
                            <button className="rail-arrow events-next" aria-label="next event">
                                <ArrowForwardIcon fontSize="small" />
                            </button>
                        </>
                    }
                />

                <Swiper
                    className="event-rail"
                    modules={[Autoplay, Navigation, Pagination, A11y]}
                    navigation={{ prevEl: ".events-prev", nextEl: ".events-next" }}
                    pagination={{ el: ".event-dots", clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    spaceBetween={20}
                    slidesPerView={1.1}
                    breakpoints={{ 700: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
                >
                    {events.map((event) => (
                        <SwiperSlide key={event._id}>
                            <article className="event-card">
                                <div className="event-photo">
                                    <img src={getImageUrl(event.articleImage, "/img/default.png")} alt={event.articleTitle} />
                                </div>
                                <div className="event-caption">
                                    <span className="event-when">{moment(event.createdAt).fromNow()}</span>
                                    <h3 className="event-title">{event.articleTitle}</h3>
                                    <p className="event-text">{event.articleContent}</p>
                                    <div className="event-meta">
                                        <span>{event.articleAuthor || "DetailStock Team"}</span>
                                        {event.articleLocation && (
                                            <span>
                                                <PlaceOutlinedIcon fontSize="inherit" /> {event.articleLocation}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="event-dots" />
            </div>
        </Reveal>
    );
}
