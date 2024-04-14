"use client";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ScheduleType } from "./scheduleType";
import { useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import {
    addActiveDay,
    deleteActiveTime,
    deleteSchedule,
    getActiveDay,
} from "./actions";
import moment from "moment";
import toast from "react-hot-toast";

export default function MoreOptions({
    scheduleId,
    scheduleType,
    unFocus,
    handleDeleteEntry,
}: {
    scheduleId: number;
    scheduleType: ScheduleType;
    unFocus: Function;
    handleDeleteEntry: Function;
}) {
    const [entries, setEntries] = useState<Date[]>([]);
    useEffect(() => {
        getActiveDay(scheduleType, scheduleId).then((res) => {
            if (res.code === 200 && res.dates !== undefined) {
                const dates: Date[] = res.dates.map(({ date }) => date);
                setEntries(dates);
            }
        });
    }, [scheduleId, scheduleType]);

    return (
        <Box sx={{ display: "flex", flexFlow: "column", height: "100%" }}>
            <Card
                sx={{ overflow: "visible", borderRadius: 0, marginBlock: 1 }}
                variant="outlined"
            >
                <CardContent>
                    <Box
                        component={"form"}
                        action={async (formData: FormData) => {
                            const newDate = formData.get("active-date");
                            const { code } = await addActiveDay(
                                scheduleType,
                                scheduleId,
                                newDate as string
                            );
                            if (code === 200) {
                                toast.success("date added to schedule");
                                setEntries((prev) => [
                                    moment(
                                        newDate as string,
                                        "DD.MM.YYYY"
                                    ).toDate(),
                                    ...prev,
                                ]);
                            } else {
                                toast.error("date not added");
                            }
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                name="active-date"
                                format="DD.MM.YYYY"
                                label="Schedule Active Day"
                                sx={{ width: "100%" }}
                            />
                        </LocalizationProvider>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="small"
                            // onClick={()=> setChanged(false)}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Card
                variant="outlined"
                style={{
                    overflow: "hidden",
                    overflowY: "scroll", // added scroll
                    height: "100%",
                    borderRadius: 0,
                }}
            >
                {entries.map((date) => (
                    <Card
                        key={date.toISOString()}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: 1,
                        }}
                        variant="outlined"
                    >
                        <CardContent>
                            <Typography>
                                {moment(date).format("YYYY-MM-DD")}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box
                                component="form"
                                action={async () => {
                                    const res = await deleteActiveTime(
                                        scheduleId,
                                        scheduleType,
                                        date
                                    );
                                    if (res.code === 200) {
                                        setEntries((prev) =>
                                            prev.filter((d) => d !== date)
                                        );
                                        toast.success("deleted entry");
                                    } else {
                                        toast.error("failed to delete entry");
                                    }
                                }}
                            >
                                <Button
                                    size="small"
                                    color="error"
                                    type="submit"
                                >
                                    <DeleteIcon />
                                </Button>
                            </Box>
                        </CardActions>
                    </Card>
                ))}
            </Card>

            <Card
                variant="outlined"
                sx={{ overflow: "visible", marginBlock: 1, border: "none" }}
            >
                <CardContent>
                    <Box
                        component={"form"}
                        action={async () => {
                            const res = await deleteSchedule(
                                scheduleId,
                                scheduleType
                            );
                            if (res.code === 200) {
                                toast.success("deleted schedule");
                                handleDeleteEntry(scheduleId, scheduleType);
                                unFocus();
                            } else {
                                toast.error("failed to delete");
                            }
                        }}
                    >
                        <Button
                            type="submit"
                            color="error"
                            fullWidth
                            variant="contained"
                            size="small"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Delete Schedule
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
