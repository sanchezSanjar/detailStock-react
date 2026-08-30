import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { events } from "../../../lib/data/events";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Events() {
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
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    pagination={{
                        el: ".swiper-pagination",
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                >
                    {events.map((value, number) => (
                        <SwiperSlide key={number} className={"events-info-frame"}>
                            <div className={"events-img"}>
                                <img src={value.img} className={"events-img-el"} alt="" />
                            </div>
                            <Box className={"events-desc"}>
                                <div className={"event-title-speaker"}>
                                    <strong>{value.title}</strong>
                                    <p className={"spec-text-author"}>{value.author}</p>
                                </div>
                                <p className={"text-desc"}>{value.desc}</p>
                                <div className={"bott-info"}>
                                    <span className={"bott-info-main"}>{value.date}</span>
                                    <span className={"bott-info-main"}>{value.location}</span>
                                </div>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Box className={"prev-next-frame"}>
                    <button className={"swiper-button-prev"}>‹</button>
                    <div className={"dot-frame-pagination swiper-pagination"}></div>
                    <button className={"swiper-button-next"}>›</button>
                </Box>
            </Stack>
        </div>
    );
}