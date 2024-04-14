"use client";
import ScheduleCard from "../Card";
import TimeBasedScheduleCard from "./TimeBasedScheduleCard";
import { Box, Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { TimeBasedSchedule } from "../scheduleType";



export default function TimeScheduleContainer({
    entries,
    onFocus,
    setEntries
}: {
    entries: TimeBasedSchedule[];
    onFocus: Function;
    setEntries: Function
}) {
    const [creating, setCreating] = useState(false);
    const handleCreate = (id: number, start_time: string, end_time: string) => {
        setCreating(false);
        setEntries((prev: TimeBasedSchedule[]) => {
            const newEntries = [...prev];
            newEntries[0] = {
                id,
                start_time,
                end_time,
            };
            return newEntries;
        });
    };

    return (
        <Container sx={{ paddingTop: 0, height: 640 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    marginBottom: 1,
                    marginTop: 1,
                }}
            >
                <Button
                    disabled={creating}
                    onClick={() => {
                        setEntries((prev: TimeBasedSchedule[]) => {
                            if (prev.length <= 9) {
                                setCreating(true);
                                return [
                                    {
                                        id: -1,
                                        start_time: "00:00",
                                        end_time: "00:00",
                                    },
                                    ...prev,
                                ];
                            } else {
                                return prev;
                            }
                        });
                    }}
                >
                    <AddIcon />
                </Button>
            </Box>

            {entries.map(({ id, start_time, end_time }) => (
                <ScheduleCard key={id}>
                    <TimeBasedScheduleCard
                        id={id}
                        startTime={start_time}
                        endTime={end_time}
                        onCreate={handleCreate}
                        onFocus={onFocus}
                    />
                </ScheduleCard>
            ))}
        </Container>
    );
}
