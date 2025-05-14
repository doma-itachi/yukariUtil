/**
 * ロガーのオプション設定
 * @typedef {object} LoggerOptions
 * @property {boolean} [showTimestamps] - タイムスタンプを表示するかどうか (デフォルト: false)
 * @property {boolean} [showStatus] - ログステータス（INFO, ERRなど）を表示するかどうか (デフォルト: false)
 */
type LoggerOptions = {
    showTimestamps?: boolean;
    showStatus?: boolean;
};

/**
 * コンソールにログを出力するクラス
 * @class Logger
 */
export class Logger {
    private loggerName: string;
    private options: LoggerOptions;
    public static globalOptions: Required<LoggerOptions> = {
        showStatus: false,
        showTimestamps: false,
    };

    /**
     * Loggerクラスのインスタンスを生成します
     * @param {string} loggerName - ロガーを識別するための名前
     * @param {LoggerOptions} [options={}] - ロガーの動作をカスタマイズするオプション
     */
    constructor(loggerName: string, options: LoggerOptions = {}) {
        this.loggerName = loggerName;
        this.options = options;
    }

    private createLogPrefix(status: string) {
        return `${
            this.options.showTimestamps ?? Logger.globalOptions.showTimestamps
                ? `[${new Date().toLocaleString("ja-JP")}]`
                : ""
        }${this.options.showStatus ?? Logger.globalOptions.showStatus
            ? `[${status}]`
            : ""}[${this.loggerName}]`;
    }

    /**
     * 情報レベルのログをコンソールに出力します
     * @param {...any} args - ログに出力する任意の値（複数指定可能）
     */
    log(...args: any[]) {
        console.log(this.createLogPrefix("INFO"), ...args);
    }

    /**
     * 警告レベルのログをコンソールに出力します
     * @param {...any} args - ログに出力する任意の値（複数指定可能）
     */
    warn(...args: any[]) {
        console.log(this.createLogPrefix("WARN"), ...args);
    }

    /**
     * エラーレベルのログをコンソールに出力します
     * @param {...any} args - ログに出力する任意の値（複数指定可能）
     */
    error(...args: any[]) {
        console.log(this.createLogPrefix("ERR"), ...args);
    }
}
