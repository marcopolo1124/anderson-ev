export enum ScheduleType {
    Time,
    Charge,
    Mileage,
}

export interface MileageBasedSchedule {
    id: number;
    desired_mileage: number;
    ready_by_time: string;
}
export interface ChargeBasedSchedule {
    id: number;
    desired_charge_level: number;
    ready_by_time: string;
}

export interface TimeBasedSchedule {
    id: number;
    start_time: string;
    end_time: string;
}

export function getActiveTimeTableName(scheduleType: ScheduleType) {
    if (scheduleType === ScheduleType.Time) {
        return "public.time_based_schedule_active_days";
    } else if (scheduleType === ScheduleType.Mileage) {
        return "public.mileage_schedule_active_days";
    } else if (scheduleType === ScheduleType.Charge) {
        return "public.charge_schedules_active_days";
    } else {
        return "";
    }
}

export function getScheduleTableName(scheduleType: ScheduleType) {
    if (scheduleType === ScheduleType.Time) {
        return "public.time_based_schedules";
    } else if (scheduleType === ScheduleType.Mileage) {
        return "public.mileage_based_schedules";
    } else if (scheduleType === ScheduleType.Charge) {
        return "public.charge_based_schedules";
    } else {
        return "";
    }
}
