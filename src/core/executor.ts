import { exec } from "child_process";

const execCommand = async (command: string) => {
    return new Promise((resolve, reject) => {
        exec(command, (error) => {
            if (error) {
                reject(error)
            } else {
                resolve("success execute")
            }
        });
    })
}

export {
    execCommand
}