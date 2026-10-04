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

export default function Advertisement() {
    return (
        <div className="ads-section">
            <Container>
                <div className="ads-frame">
                    <video
                        ref={slowDown}
                        className={"ads-video"}
                        autoPlay={true}
                        loop
                        muted
                        playsInline
                        data-video-media=""
                        onLoadedMetadata={(e) => slowDown(e.currentTarget)}
                    >
                        <source type="video/mp4" src="/video/detailStock-ads.mp4" />
                    </video>
                </div>
            </Container>
        </div>
    );
}
