import { statSync } from "fs"
import logger from "../lib/loggin"
import { getCommandBackup } from "../lib/util"
import { ConfigBackup } from "../types/config"
import { execCommand } from "./executor"
import { ScheduleTime } from "../types/cron"
import { startDailyJob, startWeeklyJob } from "./cron"


const backupDatabase = async (config: ConfigBackup) => {

    const start = Date.now();

    const output = getCommandBackup(config)

    await execCommand(output.cmd)

    const duration = ((Date.now() - start) / 1000).toFixed(2);

    const sizeKB = (statSync(output.outputPath).size / 1024).toFixed(2);
    logger.info(`${config.database} backup success`);
    logger.info(`Saved to: ${output.outputPath}`);
    logger.info(`Duration: ${duration}s | Size: ${sizeKB} KB`);
}

const startScheduleBackup = (time: ScheduleTime, config: ConfigBackup | ConfigBackup[]) => {

    let count = Array.isArray(config) ? config.length : 1;

    logger.info(`Starting backups with ${count} database`)

    if (time.type == "weekly") {
        return startWeeklyJob(time, () => runBackup(config)).start()
    } else {
        return startDailyJob(time, () => runBackup(config)).start()
    }

}

const runBackup = async (config: ConfigBackup | ConfigBackup[]) => {
    if (Array.isArray(config)) {
        for (const schedule of config) {
            try {
                await backupDatabase(schedule)
            } catch (error: any) {
                logger.error(error?.message ?? "unknown error")
            }
        }
    } else {
        try {
            await backupDatabase(config)
        } catch (error: any) {
            logger.error(error?.message ?? "unknown error")
        }
    }
}

export {
    backupDatabase,
    startScheduleBackup,
    runBackup
}
