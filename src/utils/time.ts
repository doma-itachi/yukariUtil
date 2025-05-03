type TimeFormat = 
    "HHMMSS" | //01:23:45
    "hHMMSS" | //1:23:45
    "HHMM" | //01:23
    "hHMM" //1:23

/**
 * 簡易的に時間(Dateではない)を管理するためのクラス
 * うるう年などの計算はされない
 * 計算がし易いようにnumber型で管理します
 * @class Time
 */
export class Time{
    /**
     * 時間をnumber型に変換する
     * @param hour 時
     * @param minute 分
     * @param second 秒
     * @returns 時間
     */
    static set(hour: number, minute: number, second: number): number{
        return hour*3600 + minute*60+second;
    }

    /**
     * 時間をフォーマットします
     * @param time 時間
     * @param format フォーマット
     * @returns 文字列
     */
    static toString(time: number, format: TimeFormat): string{
        if(format == "HHMMSS"){
            return `${Time.getHours(time).toString().padStart(2, "0")}:${Time.getMinutes(time).toString().padStart(2, "0")}:${Time.getSeconds(time).toString().padStart(2, "0")}`;
        }
        else if(format == "hHMMSS"){
            return `${Time.getHours(time).toString()}:${Time.getMinutes(time).toString().padStart(2, "0")}:${Time.getSeconds(time).toString().padStart(2, "0")}`;
        }
        else if(format == "HHMM"){
            return `${Time.getHours(time).toString().padStart(2, "0")}:${Time.getMinutes(time).toString().padStart(2, "0")}`;
        }
        else if(format == "hHMM"){
            return `${Time.getHours(time).toString()}:${Time.getMinutes(time).toString().padStart(2, "0")}`;
        }
        else{
            throw new Error(`Argument exception: ${format}`);
        }
    }
    
    /**
     * 時間から時を取得
     * @param time 時間
     * @returns 時
     */
    static getHours(time: number): number{
        return Math.floor(Math.abs(time)/3600);
    }
    
    /**
     * 時間から分を取得
     * @param time 時間
     * @returns 分
     */
    static getMinutes(time: number): number{
        return Math.floor(Math.abs(time)%3600/60);
    }
    
    /**
     * 時間から秒を取得
     * @param time 時間
     * @returns 秒
     */
    static getSeconds(time: number): number{
        return Math.floor(Math.abs(time)%3600%60);
    }

    /**
     * 現在時刻をnumber型で取得
     * @returns 時間
     */
    static now(): number{
        const now = new Date();
        return Time.set(now.getHours(), now.getMinutes(), now.getSeconds());
    }
}