"use client";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import {
    Button,
    CardContent,
    InputAdornment,
    TextField,
    Box,
    CardActionArea,
    CardActions,
} from "@mui/material";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
    createChargeScheduleEntry,
    updateChargeScheduleEntry,
} from "../actions";
import { ScheduleType } from "../scheduleType";
export default function ChargeBasedScheduleCard({
    id,
    desiredCharge,
    readyByTime,
    onCreate,
    onFocus,
}: {
    id?: number;
    desiredCharge?: number;
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
        let newDesiredCharge = formData.get("desired-charge-level");
        let newReadyByTime = formData.get("ready-by-time") as string;
        if (id === -1) {
            if (onCreate && user_id) {
                const res = await createChargeScheduleEntry(
                    newDesiredCharge as any,
                    newReadyByTime,
                    user_id
                );
                if (res.code === 200) {
                    id = res.id;
                    onCreate(id, newDesiredCharge, newReadyByTime);
                    toast.success("Schedule Created");
                }
            }
        } else {
            if (id && user_id) {
                const res = await updateChargeScheduleEntry(
                    id,
                    newDesiredCharge as any,
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
            <CardContent style={{ padding: 16 }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
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
                                id="desired-charge-level"
                                name="desired-charge-level"
                                type="number"
                                defaultValue={desiredCharge}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            %
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{ min: 0, max: 250 }}
                                label="Charge Level"
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
                </LocalizationProvider>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        onFocus(id, ScheduleType.Charge);
                    }}
                >
                    More options
                </Button>
            </CardActions>
        </>
    );
}
