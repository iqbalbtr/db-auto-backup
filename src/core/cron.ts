import { CronJob } from "cron";
import { DailySchedule, WeeklySchedule } from "../types/cron";
import { parseDaysToNumber } from "../lib/util";

const startDailyJob = (time: DailySchedule, cb: () => void) => new CronJob(`0 ${time.minute} ${time.hour} * * *`, cb)

const startWeeklyJob = (time: WeeklySchedule, cb: () => void) =>  new CronJob(`0 ${time.minute} ${time.hour} * * ${parseDaysToNumber(time.days).join(",")}`, cb)

export {
    startDailyJob,
    startWeeklyJob
}