import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import moment from "moment";
import ArticleService from "../../services/ArticleService";
import { ArticleType } from "../../../lib/enums/article.enum";
import type { Article } from "../../../lib/types/article";

const NOTICE_LIMIT = 3;
const FAQ_LIMIT = 4;

export default function InfoCenter() {
    const [notices, setNotices] = useState<Article[]>([]);
    const [faq, setFaq] = useState<Article[]>([]);

    useEffect(() => {
        const article = new ArticleService();
        article.getArticles(ArticleType.NOTICE)
            .then((data) => setNotices(data.slice(0, NOTICE_LIMIT)))
            .catch((err) => console.log(err));
        article.getArticles(ArticleType.FAQ)
            .then((data) => setFaq(data.slice(0, FAQ_LIMIT)))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={"info-center-frame"}>
            <Container>
                <Box className={"category-title"}>Notices & FAQ</Box>
                <Box className={"section-subtitle"}>Latest news from DetailStock and answers to common questions</Box>

                <Stack direction={{ xs: "column", md: "row" }} className={"info-columns"}>
                    <Box className={"info-panel"}>
                        <div className={"info-panel-head"}>
                            <span><CampaignOutlinedIcon /> Notices</span>
                            <NavLink to="/help" className={"info-more"}>View all</NavLink>
                        </div>
                        {notices.map((notice) => (
                            <div key={notice._id} className={"info-notice"}>
                                <span className={"info-date"}>{moment(notice.createdAt).format("YYYY.MM.DD")}</span>
                                <strong>{notice.articleTitle}</strong>
                                <p>{notice.articleContent}</p>
                            </div>
                        ))}
                        {notices.length === 0 && <div className={"info-empty"}>No notices yet.</div>}
                    </Box>

                    <Box className={"info-panel"}>
                        <div className={"info-panel-head"}>
                            <span><HelpOutlineIcon /> FAQ</span>
                            <NavLink to="/help" className={"info-more"}>View all</NavLink>
                        </div>
                        {faq.map((item) => (
                            <Accordion key={item._id} disableGutters className={"info-faq"}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{item.articleTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{item.articleContent}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                        {faq.length === 0 && <div className={"info-empty"}>No FAQ yet.</div>}
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
