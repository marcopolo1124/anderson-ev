"use client";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Box,
    Button,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import { createTimeScheduleEntry, updateTimeScheduleEntry } from "../actions";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { ScheduleType } from "../scheduleType";
export default function TimeBasedScheduleCard({
    id,
    startTime,
    endTime,
    onCreate,
    onFocus,
}: {
    id?: number;
    startTime?: string;
    endTime?: string;
    onCreate: Function;
    onFocus: Function;
}) {
    const session = useSession() as any;
    const [changed, setChanged] = useState(false);
    const startMoment = moment(startTime || "00:00:00", "HH:mm:ss");
    const endMoment = moment(endTime || "00:00:00", "HH:mm:ss");
    const [minTime, setMinTime] = useState(startMoment);
    const handleSubmit = async (formData: FormData) => {
        const user_id = session.data?.user?.id;
        let newStartTime = formData.get("startTime") as string;
        let newEndTime = formData.get("endTime") as string;
        if (id === -1) {
            if (user_id) {
                const res = await createTimeScheduleEntry(
                    newStartTime,
                    newEndTime,
                    user_id
                );
                if (res.code === 200) {
                    id = res.id;
                    onCreate(id, newStartTime, newEndTime);
                    toast.success("Schedule Created");
                    setChanged(false);
                }
            }
        } else {
            if (id && user_id) {
                const res = await updateTimeScheduleEntry(
                    id,
                    newStartTime,
                    newEndTime,
                    user_id
                );
                if (res.code === 200) {
                    toast.success("Schedule Updated");
                    setChanged(false);
                } else {
                    toast.error("Schedule failed to update");
                }
            }
        }
    };

    return (
        <>
            <CardContent>
                <Box component="form" action={handleSubmit}>
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 0,
                        }}
                    >
                        <TimePicker
                            label="Start Time"
                            value={startMoment}
                            sx={{ maxWidth: 100 }}
                            onChange={(newValue) => {
                                setChanged(true);
                                if (newValue) {
                                    setMinTime(newValue);
                                }
                            }}
                            name="startTime"
                        />
                        <Typography sx={{ fontSize: 30 }}><RemoveIcon/></Typography>
                        <TimePicker
                            label="End Time"
                            value={endMoment}
                            onChange={() => {
                                setChanged(true);
                            }}
                            minTime={minTime}
                            sx={{ maxWidth: 100 }}
                            name="endTime"
                        />
                    </Box>

                    {(changed || id === -1) && (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // onClick={()=> setChanged(false)}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {id === -1 ? "Create" : "Update"}
                        </Button>
                    )}
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        onFocus(id, ScheduleType.Time);
                    }}
                >
                    More options
                </Button>
            </CardActions>
        </>
    );
}
