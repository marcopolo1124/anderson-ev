import { getUserChargeBasedSchedules, getUserMileageBasedSchedules, getUserTimeBasedSchedules } from "@/lib/db"

export default async function getSchedules(email: string){
    const time_based_schedules = await getUserTimeBasedSchedules(1, 10, email)
    const charge_based_schedules = await getUserChargeBasedSchedules(1, 10, email)
    const mileage_based_schedules = await getUserMileageBasedSchedules(1, 10, email)
    return {
        time_based_schedules,
        charge_based_schedules,
        mileage_based_schedules
    }
}