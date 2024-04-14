import { useState } from "react";
import ScheduleCard from "../Card";
import MileageBasedScheduleCard from "./MileageBasedScheduleCard";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container } from "@mui/material";
import { MileageBasedSchedule } from "../scheduleType";



export default function MileageScheduleContainer({
    entries,
    onFocus,
    setEntries
}: {
    entries: MileageBasedSchedule[];
    onFocus: Function,
    setEntries: Function
}) {
    const [creating, setCreating] = useState(false);
    const handleCreate = (
        id: number,
        desired_mileage: number,
        ready_by_time: string
    ) => {
        setCreating(false);
        setEntries((prev: MileageBasedSchedule[]) => {
            const newEntries = [...prev];
            newEntries[0] = {
                id,
                desired_mileage,
                ready_by_time,
            };
            return newEntries;
        });
    };
    return (
        <Container sx={{ paddingTop: 0 }}>
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
                        setEntries((prev: MileageBasedSchedule[]) => {
                            if (prev.length <= 9) {
                                setCreating(true);
                                return [
                                    {
                                        id: -1,
                                        desired_mileage: 0,
                                        ready_by_time: "00:00",
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

            {entries.map(({ id, desired_mileage, ready_by_time }) => (
                <ScheduleCard key={id}>
                    <MileageBasedScheduleCard
                        id={id}
                        desiredMileage={desired_mileage}
                        readyByTime={ready_by_time}
                        onCreate={handleCreate}
                        onFocus={onFocus}
                    />
                </ScheduleCard>
            ))}
        </Container>
    );
}
