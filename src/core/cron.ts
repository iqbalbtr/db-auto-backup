import { CronJob } from "cron";
import { DailySchedule, WeeklySchedule } from "../types/cron";
import { parseDaysToNumber } from "../lib/util";

const startDailyJob = (time: DailySchedule, cb: () => void) => new CronJob(`0 ${time.minute} ${time.hour} * * *`, cb, null, true, 'Asia/Jakarta')

const startWeeklyJob = (time: WeeklySchedule, cb: () => void) =>  new CronJob(`0 ${time.minute} ${time.hour} * * ${parseDaysToNumber(time.days).join(",")}`, cb, null, true, 'Asia/Jakarta')

const startJob = (time: string, cb: () => void) => new CronJob(time, cb, null, true, 'Asia/Jakarta')

export {
    startDailyJob,
    startWeeklyJob,
    startJob
}