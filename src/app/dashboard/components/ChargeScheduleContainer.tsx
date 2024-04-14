import { useState } from "react";
import ScheduleCard from "../Card";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container } from "@mui/material";
import ChargeBasedScheduleCard from "./ChargeBasedScheduleCard";
import { ChargeBasedSchedule } from "../scheduleType";



export default function ChargeScheduleContainer({
    entries,
    onFocus,
    setEntries,
}: {
    entries: ChargeBasedSchedule[];
    onFocus: Function;
    setEntries: Function;
}) {
    const [creating, setCreating] = useState(false);
    const handleCreate = (
        id: number,
        desired_charge_level: number,
        ready_by_time: string
    ) => {
        setCreating(false);
        setEntries((prev: ChargeBasedSchedule[]) => {
            const newEntries = [...prev];
            newEntries[0] = {
                id,
                desired_charge_level,
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
                        setEntries((prev: ChargeBasedSchedule[]) => {
                            if (prev.length <= 9) {
                                setCreating(true);
                                return [
                                    {
                                        id: -1,
                                        desired_charge_level: 0,
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

            {entries.map(({ id, desired_charge_level, ready_by_time }) => (
                <ScheduleCard key={id}>
                    <ChargeBasedScheduleCard
                        id={id}
                        desiredCharge={desired_charge_level}
                        readyByTime={ready_by_time}
                        onCreate={handleCreate}
                        onFocus={onFocus}
                    />
                </ScheduleCard>
            ))}
        </Container>
    );
}
