import React from "react";
import { AuthOptions, getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "@/auth";
import getSchedules from "./getSchedules";
import Panel from "./Panel";

export default async function DashBoard() {
    const session = await getServerSession(authOptions as AuthOptions);
    if (!session || !session.user || !session.user.email) {
        signOut();
    }
    const {
        time_based_schedules,
        charge_based_schedules,
        mileage_based_schedules,
    } = await getSchedules(session?.user?.email as string);
    return (
        <Panel
            time_based_schedules={time_based_schedules}
            charge_based_schedules={charge_based_schedules}
            mileage_based_schedules={mileage_based_schedules}
        />
    );
}
