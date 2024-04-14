"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TimeScheduleContainer from "./components/TimeScheduleContainer";
import MileageScheduleContainer from "./components/MileageScheduleContainer";
import ChargeScheduleContainer from "./components/ChargeScheduleContainer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                overflow: "hidden",
                overflowY: "scroll", // added scroll
                height: "100%",
            }}
            {...other}
        >
            {value === index && <Box sx={{ padding: 0 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function Schedules({
    timeBasedEntries,
    setTimeBasedEntries,
    chargeBasedEntries,
    setChargeBasedEntries,
    mileageBasedEntries,
    setMileageBasedEntries,
    onFocus,
}: {
    timeBasedEntries: {
        id: number;
        start_time: string;
        end_time: string;
    }[];
    mileageBasedEntries: {
        id: number;
        desired_mileage: number;
        ready_by_time: string;
    }[];
    chargeBasedEntries: {
        id: number;
        desired_charge_level: number;
        ready_by_time: string;
    }[];
    onFocus: Function;
    setTimeBasedEntries: Function;
    setChargeBasedEntries: Function;
    setMileageBasedEntries: Function;
}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ maxWidth: 426, height: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Time Based" {...a11yProps(0)} />
                    <Tab label="Mileage Based" {...a11yProps(1)} />
                    <Tab label="Charge Based" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <CustomTabPanel value={value} index={0}>
                    <TimeScheduleContainer
                        entries={timeBasedEntries}
                        setEntries={setTimeBasedEntries}
                        onFocus={onFocus}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <MileageScheduleContainer
                        entries={mileageBasedEntries}
                        setEntries={setMileageBasedEntries}
                        onFocus={onFocus}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ChargeScheduleContainer
                        entries={chargeBasedEntries}
                        setEntries={setChargeBasedEntries}
                        onFocus={onFocus}
                    />
                </CustomTabPanel>
            </LocalizationProvider>
        </Box>
    );
}
