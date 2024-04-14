import { Card, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ReactNode } from "react";

export default function ScheduleCard({ children }: { children: ReactNode }) {
    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: 345,
                marginBottom: 1,
            }}
        >
            {children}

        </Card>
    );
}
