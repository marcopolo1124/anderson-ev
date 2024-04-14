"use client";
import { useEffect, useState } from "react";
import Schedules from "./Schedules";
import { Box } from "@mui/material";
import MoreOptions from "./MoreOptions";
import {
    ChargeBasedSchedule,
    MileageBasedSchedule,
    ScheduleType,
    TimeBasedSchedule,
} from "./scheduleType";

export default function Panel({
    time_based_schedules,
    charge_based_schedules,
    mileage_based_schedules,
}: any) {
    const [currentFocus, setCurrentFocus] = useState<{
        scheduleId: number;
        scheduleType: ScheduleType;
    } | null>(null);
    const [timeBasedEntries, setTimeBasedEntries] =
        useState<TimeBasedSchedule[]>(time_based_schedules);
    const [chargeBasedEntries, setChargeBasedEntries] = useState<
        ChargeBasedSchedule[]
    >(charge_based_schedules);
    const [mileageBasedEntries, setMileageBasedEntries] = useState<
        MileageBasedSchedule[]
    >(mileage_based_schedules);

    const handleFocus = (scheduleId: number, scheduleType: ScheduleType) => {
        setCurrentFocus({ scheduleId, scheduleType });
    };
    const handleDeleteEntry = (
        scheduleId: number,
        scheduleType: ScheduleType
    ) => {
        if (scheduleType === ScheduleType.Time) {
            setTimeBasedEntries((prev) =>
                prev.filter(({ id }) => id !== scheduleId)
            );
        } else if (scheduleType === ScheduleType.Charge) {
            setChargeBasedEntries((prev) =>
                prev.filter(({ id }) => id !== scheduleId)
            );
        } else if (scheduleType === ScheduleType.Mileage) {
            setMileageBasedEntries((prev) =>
                prev.filter(({ id }) => id !== scheduleId)
            );
        }
    };

    const unFocus = () => {
        setCurrentFocus(null);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "start", height: "90vh" }}>
            <Box sx={{ marginRight: 3, height: "80vh" }}>
                <Schedules
                    timeBasedEntries={timeBasedEntries}
                    setTimeBasedEntries={setTimeBasedEntries}
                    chargeBasedEntries={chargeBasedEntries}
                    setChargeBasedEntries={setChargeBasedEntries}
                    mileageBasedEntries={mileageBasedEntries}
                    setMileageBasedEntries={setMileageBasedEntries}
                    onFocus={handleFocus}
                />
            </Box>

            {currentFocus && (
                <Box sx={{ height: "80vh" }}>
                    <MoreOptions
                        scheduleId={currentFocus.scheduleId}
                        scheduleType={currentFocus.scheduleType}
                        unFocus={unFocus}
                        handleDeleteEntry={handleDeleteEntry}
                    />
                </Box>
            )}
        </Box>
    );
}
