"use client";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import {
    Button,
    CardContent,
    CardActionArea,
    InputAdornment,
    TextField,
    Box,
    CardActions,
} from "@mui/material";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
    createMileageScheduleEntry,
    updateMileageScheduleEntry,
} from "../actions";
import { ScheduleType } from "../scheduleType";
export default function MileageBasedScheduleCard({
    id,
    desiredMileage,
    readyByTime,
    onCreate,
    onFocus,
}: {
    id?: number;
    desiredMileage?: number;
    readyByTime?: string;
    onCreate: Function;
    onFocus: Function;
}) {
    const session = useSession() as any;
    const [changed, setChanged] = useState(false);
    const readyByMoment = moment(readyByTime, "hh:mm");
    const handleSubmit = async (formData: FormData) => {
        setChanged(false);
        const user_id = session.data?.user?.id;
        let newDesiredMileage = formData.get("desired-mileage");
        let newReadyByTime = formData.get("ready-by-time") as string;
        if (id === -1) {
            if (onCreate && user_id) {
                const res = await createMileageScheduleEntry(
                    newDesiredMileage as any,
                    newReadyByTime,
                    user_id
                );
                if (res.code === 200) {
                    id = res.id;
                    onCreate(id, newDesiredMileage, newReadyByTime);
                    toast.success("Schedule Created");
                }
            }
        } else {
            if (id && user_id) {
                const res = await updateMileageScheduleEntry(
                    id,
                    newDesiredMileage as any,
                    newReadyByTime,
                    user_id
                );
                if (res.code === 200) {
                    toast.success("Schedule Updated");
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
                        <TextField
                            id="desired-mileage"
                            name="desired-mileage"
                            type="number"
                            defaultValue={desiredMileage}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        miles
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{ min: 0, max: 250 }}
                            label="Mileage"
                            onChange={() => {
                                setChanged(true);
                            }}
                        />
                        <TimePicker
                            label="Ready By"
                            name="ready-by-time"
                            value={readyByMoment}
                            sx={{ maxWidth: 100 }}
                            onChange={() => {
                                setChanged(true);
                            }}
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
                        onFocus(id, ScheduleType.Mileage);
                    }}
                >
                    More options
                </Button>
            </CardActions>
        </>
    );
}
