import { useEffect, useState, type SyntheticEvent } from "react";
import { Box, Container, Stack, Tabs, Tab, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import "../../css/help.css";
import { terms } from "../../../lib/data/terms";
import ArticleService from "../../services/ArticleService";
import { ArticleType } from "../../../lib/enums/article.enum";
import type { Article } from "../../../lib/types/article";

export default function HelpPage() {
    const [value, setValue] = useState("1");
    const [faq, setFaq] = useState<Article[]>([]);
    const [notices, setNotices] = useState<Article[]>([]);

    useEffect(() => {
        const article = new ArticleService();
        article.getArticles(ArticleType.FAQ)
            .then((data) => setFaq(data))
            .catch((err) => console.log(err));
        article.getArticles(ArticleType.NOTICE)
            .then((data) => setNotices(data))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (_e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={"help-page"}>
            <Container className={"help-container"}>
                <TabContext value={value}>
                    <Box className={"help-menu"}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" className={"table_list"}>
                                <Tab label="TERMS" value={"1"} />
                                <Tab label="FAQ" value={"2"} />
                                <Tab label="NOTICES" value={"3"} />
                                <Tab label="CONTACT" value={"4"} />
                            </Tabs>
                        </Box>
                    </Box>

                    <Stack className={"help-main-content"}>
                        <TabPanel value={"1"}>
                            <Stack className={"rules-box"}>
                                <Box className={"rules-frame"}>
                                    {terms.map((term, number) => (
                                        <p key={number}>{term}</p>
                                    ))}
                                </Box>
                            </Stack>
                        </TabPanel>

                        <TabPanel value={"2"}>
                            <Stack className={"accordion-menu"}>
                                {faq.map((item) => (
                                    <Accordion key={item._id}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>{item.articleTitle}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>{item.articleContent}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                                {faq.length === 0 && <Box className={"help-empty"}>No FAQ yet.</Box>}
                            </Stack>
                        </TabPanel>

                        <TabPanel value={"3"}>
                            <Stack className={"notice-list"}>
                                {notices.map((notice) => (
                                    <Box key={notice._id} className={"notice-card"}>
                                        <span className={"notice-date"}>{moment(notice.createdAt).format("YYYY.MM.DD")}</span>
                                        <strong className={"notice-title"}>{notice.articleTitle}</strong>
                                        <p className={"notice-content"}>{notice.articleContent}</p>
                                    </Box>
                                ))}
                                {notices.length === 0 && <Box className={"help-empty"}>No notices yet.</Box>}
                            </Stack>
                        </TabPanel>

                        <TabPanel value={"4"}>
                            <Stack className={"admin-letter-box"}>
                                <Stack className={"admin-letter-container"}>
                                    <Box className={"admin-letter-frame"}>
                                        <span>Contact us</span>
                                        <p>Email us directly at sanjarbek98@bk.ru, or call 010-1234-5678.</p>
                                    </Box>
                                </Stack>
                            </Stack>
                        </TabPanel>
                    </Stack>
                </TabContext>
            </Container>
        </div>
    );
}
