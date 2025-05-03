type LoggerOptions = {
    showTimestamps?: boolean;
    showStatus?: boolean;
};

export class Logger {
    private loggerName: string;
    private options: LoggerOptions;

    constructor(loggerName: string, options: LoggerOptions = {}) {
        this.loggerName = loggerName;
        this.options = options;
    }

    createLogPrefix(status: string) {
        return `${
            this.options.showTimestamps
                ? `[${new Date().toLocaleString("ja-JP")}]`
                : ""
        }${this.options.showStatus ? `[${status}]` : ""}[${this.loggerName}]`;
    }

    log(...args: any[]) {
        console.log(this.createLogPrefix("INFO"), ...args);
    }

    error(...args: any[]) {
        console.log(this.createLogPrefix("ERR"), ...args);
    }
}
