/**
 * getter関数が例外をスローしたとき、成功するか指定された回数を超えるまで処理をリトライします。
 * @param getter 試行する回数
 * @param retryCount 最大試行回数
 * @param retryFunc リトライが発生したときに実行される関数（ユースケース：トークンの再発行など）
 * @returns getterの戻り値
 */
export async function retry<T>(getter: ()=>Promise<T> | T, retryCount: number = 5, retryFunc?: ()=>Promise<T> | T): Promise<T> {
    let lastThrow: any;
    for(let i = 0; i < retryCount; i++ ) {
        try {
            const result = await getter();
            return result;
        }
        catch(e) {
            lastThrow = e;
        }
        
        if(i < retryCount-1) {
            retryFunc?.();
        }
    }
    throw lastThrow;
}