/**
 * 非同期にスリープします
 * @param ms 待つ時間
 * @returns void
 */
export function sleep(ms: number) {
    return new Promise(resolve=>setTimeout(resolve, ms));
}

/**
 * 関数の実行時間を計測してログします
 * @param func ベンチマークする関数
 * @param title ログのラベル
 */
export async function bench<T>(func: () => T | Promise<T>, title?: string): Promise<T> {
    const start = performance.now();
    const result = await func();
    const end = performance.now();

    console.log(`${title ? `[${title}] `:""}実行時間: ${(Math.round(end-start)/1000).toLocaleString()} 秒 (${Math.round(end - start).toLocaleString()} ms)`);
    return result;
}