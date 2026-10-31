import { Container } from "@mui/material";

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
        <div className="showcase-section">
            <Container>
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
                </div>
            </Container>
        </div>
    );
}
