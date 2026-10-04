import { Container } from "@mui/material";

export default function Advertisement() {
    return (
        <div className="ads-section">
            <Container>
                <div className="ads-frame">
                    <video
                        className={"ads-video"}
                        autoPlay={true}
                        loop
                        muted
                        playsInline
                        data-video-media=""
                    >
                        <source type="video/mp4" src="/video/detailStock-ads.mp4" />
                    </video>
                </div>
            </Container>
        </div>
    );
}