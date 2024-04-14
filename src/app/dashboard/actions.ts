"use server";

import pool from "@/lib/db";
import {
    ScheduleType,
    getActiveTimeTableName,
    getScheduleTableName,
} from "./scheduleType";
import moment from "moment";

export async function updateTimeScheduleEntry(
    id: number,
    startTime: string,
    endTime: string,
    user_id: number
) {
    try {
        const res = await pool.query(
            `UPDATE public.time_based_schedules
            SET start_time = $2, end_time = $3
            WHERE id = $1 AND user_id = $4;`,
            [id, startTime, endTime, user_id]
        );
        return {
            code: 200,
        };
    } catch (e) {
        return {
            code: 400,
        };
    }
}

export async function createTimeScheduleEntry(
    startTime: string,
    endTime: string,
    user_id: number
) {
    try {
        const res = await pool.query(
            `INSERT INTO public.time_based_schedules (start_time, end_time, user_id)
            VALUES ($1, $2, $3) RETURNING id`,
            [startTime, endTime, user_id]
        );
        return {
            code: 200,
            id: res.rows[0].id,
        };
    } catch (e) {
        return {
            code: 400,
        };
    }
}

export async function updateMileageScheduleEntry(
    id: number,
    desiredMileage: number,
    readyByTime: string,
    user_id: number
) {
    console.log({ desiredMileage, readyByTime });
    try {
        const res = await pool.query(
            `UPDATE public.mileage_based_schedules
            SET desired_mileage = $2, ready_by_time = $3
            WHERE id = $1 AND user_id = $4;`,
            [id, desiredMileage, readyByTime, user_id]
        );
        return {
            code: 200,
        };
    } catch (e) {
        console.log({ e });
        return {
            code: 400,
        };
    }
}

export async function createMileageScheduleEntry(
    desiredMileage: number,
    readyByTime: string,
    user_id: number
) {
    try {
        const res = await pool.query(
            `INSERT INTO public.mileage_based_schedules (desired_mileage, ready_by_time, user_id)
            VALUES ($1, $2, $3) RETURNING id`,
            [desiredMileage, readyByTime, user_id]
        );
        return {
            code: 200,
            id: res.rows[0].id,
        };
    } catch (e) {
        return {
            code: 400,
        };
    }
}

export async function updateChargeScheduleEntry(
    id: number,
    desiredChargeLevel: number,
    readyByTime: string,
    user_id: number
) {
    console.log({ desiredChargeLevel, readyByTime });
    try {
        const res = await pool.query(
            `UPDATE public.charge_based_schedules
            SET desired_charge_level = $2, ready_by_time = $3
            WHERE id = $1 AND user_id = $4;`,
            [id, desiredChargeLevel, readyByTime, user_id]
        );
        return {
            code: 200,
        };
    } catch (e) {
        console.log({ e });
        return {
            code: 400,
        };
    }
}

export async function createChargeScheduleEntry(
    desiredChargeLevel: number,
    readyByTime: string,
    user_id: number
) {
    try {
        const res = await pool.query(
            `INSERT INTO public.charge_based_schedules (desired_charge_level, ready_by_time, user_id)
            VALUES ($1, $2, $3) RETURNING id`,
            [desiredChargeLevel, readyByTime, user_id]
        );
        return {
            code: 200,
            id: res.rows[0].id,
        };
    } catch (e) {
        return {
            code: 400,
        };
    }
}

export async function addActiveDay(
    scheduleType: ScheduleType,
    scheduleId: number,
    date: string
) {
    let tablename: string = getActiveTimeTableName(scheduleType);
    try {
        const res = await pool.query(
            `INSERT INTO ${tablename} (schedule_id, date)
            VALUES ($1, $2)`,
            [scheduleId, date]
        );
        return {
            code: 200,
        };
    } catch (e) {
        console.log({ e });
        return {
            code: 400,
        };
    }
}

export async function getActiveDay(
    scheduleType: ScheduleType,
    scheduleId: number
) {
    let tablename: string = getActiveTimeTableName(scheduleType);
    console.log({ tablename });
    try {
        const res = await pool.query(
            `SELECT date FROM ${tablename} WHERE schedule_id=$1`,
            [scheduleId]
        );
        return {
            code: 200,
            dates: res.rows || [],
        };
    } catch (e) {
        console.log({ e });
        return {
            code: 400,
        };
    }
}

export async function deleteSchedule(
    scheduleId: number,
    scheduleType: ScheduleType
) {
    const tablename = getScheduleTableName(scheduleType);
    try {
        const res = await pool.query(`DELETE FROM ${tablename} WHERE id = $1`, [
            scheduleId,
        ]);
        return {
            code: 200,
        };
    } catch (e) {
        console.log(e);
        return {
            code: 400,
        };
    }
}

export async function deleteActiveTime(
    scheduleId: number,
    scheduleType: ScheduleType,
    date: Date
) {
    const tablename = getActiveTimeTableName(scheduleType);
    try {
        const res = await pool.query(
            `DELETE FROM ${tablename} WHERE schedule_id = $1 AND date = $2`,
            [scheduleId, moment(date).format("YYYY-MM-DD")]
        );
        return {
            code: 200,
        };
    } catch (e) {
        console.log(e);
        return {
            code: 400,
        };
    }
}
