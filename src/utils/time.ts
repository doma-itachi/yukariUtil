type TimeFormat = 
    "HHMMSS" | //01:23:45
    "hHMMSS" | //1:23:45
    "HHMM" | //01:23
    "hHMM" //1:23
    
export class Time{
    static set(hour: number, minute: number, second: number): number{
        return hour*3600 + minute*60+second;
    }

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
    
    static getHours(time: number): number{
        return Math.floor(Math.abs(time)/3600);
    }

    static getMinutes(time: number): number{
        return Math.floor(Math.abs(time)%3600/60);
    }

    static getSeconds(time: number): number{
        return Math.floor(Math.abs(time)%3600%60);
    }

    static now(): number{
        const now = new Date();
        return Time.set(now.getHours(), now.getMinutes(), now.getSeconds());
    }
}