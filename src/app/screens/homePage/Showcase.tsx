import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Reveal from "./Reveal";

// the clip is short and fast, play it at half speed
const PLAYBACK_RATE = 0.5;

// the browser resets playbackRate to defaultPlaybackRate whenever the video (re)loads,
// so both are set as soon as the element exists
const slowDown = (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.defaultPlaybackRate = PLAYBACK_RATE;
    video.playbackRate = PLAYBACK_RATE;
};

export default function Showcase() {
    return (
        <Reveal className="home-band">
            <div className="home-wrap">
                <div className="showcase-frame">
                    <video
                        ref={slowDown}
                        className={"showcase-video"}
                        autoPlay={true}
                        loop
                        muted
                        playsInline
                        // shown while the video loads or when the device blocks autoplay (e.g. battery saver)
                        poster="/img/showcase-poster.jpg"
                        data-video-media=""
                        onLoadedMetadata={(e) => slowDown(e.currentTarget)}
                    >
                        <source type="video/mp4" src="/video/detailstock-showcase.mp4" />
                    </video>
                    <div className="showcase-overlay">
                        <span className="sec-eyebrow">Inside the garage</span>
                        <h2 className="showcase-title">
                            Made for people who
                            <br />
                            <span>love a perfect finish</span>
                        </h2>
                        <p className="showcase-text">
                            The same polishes, pads and towels the pros use, ready for your driveway.
                        </p>
                        <NavLink to="/products" className="btn-shine">
                            Explore the shop <ArrowForwardIcon fontSize="small" />
                        </NavLink>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}
