export class Cache<T> {
    private value: T | null = null;
    private getter: () => Promise<T> | T;
    private expiresAt = 0;
    private expireMs: number;
    private pending?: Promise<T>;

    constructor(getter: () => Promise<T> | T, expireMs: number) {
        this.getter = getter;
        this.expireMs = expireMs;
    }

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

    clear() {
        this.value = null;
    }
}