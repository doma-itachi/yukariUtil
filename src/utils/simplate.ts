type ExtractTags<T extends string> = 
    T extends `${infer _Start}\${${infer Tag}}${infer Rest}`
        ? Tag | ExtractTags<Rest>
        : never;

type SimplateTemplate<T> = T extends string
    ? string extends T
        ? Record<string, any>
        : {
            [K in ExtractTags<T>]: string;
        }
    : never;

/**
 * Simplate形式の文字列に変数を注入します
 * @param text 対象の文字列
 * @param templates 変数
 * @returns 埋め込み後の文字列
 * @example
 * const text = "今日は${now}だよ";
 * console.log(simplate(text, {now: new Date().toLocaleDateString()}));
 * const text2 = `テンプレートリテラルにはこうします\${tag}`
 */
export function simplate<T extends string>(text: T, templates: SimplateTemplate<T>): string {
    const regex = /\${.+?}/g;
    const tags = text.match(regex);
    const split = text.split(regex);
    let res = "";
    for (let i = 0; i < (tags ? tags.length : 0); i++) {
        if (tags) {
            const template = templates[tags[i].slice(2, -1)];
            res += split.shift() + (template ? template : "");
        }
    }
    res += split.shift();
    return res;
}