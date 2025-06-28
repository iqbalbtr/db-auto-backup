type DailySchedule = {
    type: "daily";
    hour: number;
    minute: number
}

type Weekly = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

type WeeklySchedule = {
    type: "weekly";
    hour: number;
    minute: number
    days: Weekly[];
}

type ScheduleTime = DailySchedule | WeeklySchedule

export {
    Weekly,
    DailySchedule,
    WeeklySchedule,
    ScheduleTime
}