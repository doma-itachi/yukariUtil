/**
 * 指定された期間、値をキャッシュする汎用クラス
 * 値の取得処理（同期/非同期）をラップし、有効期限内のアクセスではキャッシュされた値を返します
 *
 * @class Cache
 * @template T キャッシュされる値の型
 */
export class Cache<T> {
    private value: T | null = null;
    private getter: () => Promise<T> | T;
    private expiresAt = 0;
    private expireMs: number;
    private pending?: Promise<T>;

    /**
     * Cacheクラスのインスタンスを生成します。
     * @param {() => Promise<T> | T} getter キャッシュする値を取得するための関数。同期的に値を返すか、値を解決するPromiseを返すことができます。
     * @param {number} expireMs キャッシュの有効期間（ミリ秒）
     */
    constructor(getter: () => Promise<T> | T, expireMs: number) {
        this.getter = getter;
        this.expireMs = expireMs;
    }

    /**
     * キャッシュされた値を取得します
     * キャッシュが存在し、有効期限内であればその値を返します
     * キャッシュが無効な場合や期限切れの場合は、コンストラクタで指定された`getter`関数を呼び出して新しい値を取得・キャッシュし、その値を返します
     * 複数の`get`呼び出しが同時に発生した場合、`getter`の実行は一度だけ行われ、結果が共有されます
     * @returns {Promise<T>} キャッシュされた値、または新しく取得された値を解決するPromise
     */
    async get(): Promise<T> {
        const now = Date.now();

        if (this.value !== null && now < this.expiresAt) {
            return this.value;
        }

        if (this.pending) {
            return this.pending;
        }

        const promise = Promise.resolve(this.getter()).then((result) => {
            this.value = result;
            this.expiresAt = Date.now() + this.expireMs;
            this.pending = undefined;
            return result;
        });

        this.pending = promise;
        return promise;
    }

    /**
     * 現在のキャッシュをクリアします。
     * このメソッド呼び出し後、次に`get`が呼ばれた際には、強制的に`getter`関数が実行されます
     */
    clear() {
        this.value = null;
    }
}
