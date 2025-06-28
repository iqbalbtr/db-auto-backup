import { startScheduleBackup } from "./src";

startScheduleBackup({
    type: "daily",
    hour: 3,
    minute: 14
}, [
    { type: "mysql", database: "ngempak", username: "root", password: "" },
    { type: "mysql", database: "psbd_mhs", username: "root", password: "" },
    { type: "mysql", database: "pengaduan_db", username: "root", password: "" },
    { type: "mysql", database: "portal_desa", username: "root", password: "" },
    { type: "mysql", database: "study_api", username: "root", password: "" },
])
