import { useState, type SyntheticEvent } from "react";
import { Box, Container, Stack, Tabs, Tab, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
    const [value, setValue] = useState("1");

    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={"help-page"}>
            <Container className={"help-container"}>
                <TabContext value={value}>
                    <Box className={"help-menu"}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={value} onChange={handleChange} className={"table_list"}>
                                <Tab label="TERMS" value={"1"} />
                                <Tab label="FAQ" value={"2"} />
                                <Tab label="CONTACT" value={"3"} />
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
                                {faq.map((item, number) => (
                                    <Accordion key={number}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>{item.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>{item.answer}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Stack>
                        </TabPanel>

                        <TabPanel value={"3"}>
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