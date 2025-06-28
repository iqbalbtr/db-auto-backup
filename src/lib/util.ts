import { mkdirSync } from "fs";
import { ConfigBackup } from "../types/config"
import { join, resolve } from "path";
import { Weekly } from "../types/cron";

const getCommandBackup = (config: ConfigBackup) => {

    let outputPath: string = ""

    switch (config.type) {
        case "mysql":
            outputPath = getBackupPath(`${config.database}.sql`, config.path)
            return {
                cmd: `mysqldump -u ${config.username} ${getPasswordScript(config.password)} ${config.database} > "${outputPath}"`,
                outputPath
            };
        case "postgres":
            outputPath = getBackupPath(`${config.database}.dump`, config.path)
            return {
                cmd: `pg_dump -U ${config.username} -d ${config.database} -F c -f ${outputPath}`,
                outputPath
            }
        default:
            throw new Error("type is not valid")
    }
}

const getPasswordScript = (password?: string) => password ? `-p${password}` : "";

const getBackupPath = (filename: string, path?: string,) => {

    const now = new Date();
    const dateDir = `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
    const dir = resolve(join(process.cwd(), 'backups', path ?? '', dateDir));
    mkdirSync(dir, { recursive: true });

    return join(dir, filename);
}

const dayToCron: Record<Weekly, number> = {
    sunday: 1,
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
    saturday: 7,
};

const parseDaysToNumber = (days: Weekly[]): number[] => {
    return days.map(day => dayToCron[day]);
};


export {
    getBackupPath,
    getCommandBackup,
    getPasswordScript,
    parseDaysToNumber
}