/**
 * 指定された長さにテキストを切り詰め、末尾に指定された記号を付加します。
 *
 * @param text - 切り詰める対象の文字列。
 * @param length - テキストの最大長さ（デフォルトは20文字）。
 * @param symbol - 切り詰めた後に付加する記号（デフォルトは"…"）。
 * @returns 切り詰められた文字列。元の文字列が指定された長さ以下の場合はそのまま返します。
 */
export function truncateText(
    text: string,
    length: number = 20,
    symbol: string = "…"
): string {
    if (text.length <= length) return text;
    return text.slice(0, length - symbol.length) + symbol;
}

/**
 * ひらがなからカタカナに変換
 * @param hiragana ひらがなを含む文字列
 * @returns 置換された文字列
 */
export function hiraganaToKatakana(hiragana: string): string {
    return hiragana.replace(/[\u3041-\u3096]/g, (match) => {
        const chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}

/**
 * カタカナからひらがなに変換
 * @param katakana カタカナを含む文字列
 * @returns 置換された文字列
 */
export function katakanaToHiragana(katakana: string): string {
    return katakana.replace(/[\u30a1-\u30f6]/g, (match) => {
        const chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

/**
 * 指定したパターンが文字列中に占める割合が、しきい値以上かどうかを判定する関数
 * @param text 調べる対象の文字列
 * @param pattern 検索する文字列
 * @param ratioThreshold しきい値（例: 0.2 は20%）
 * @returns pattern が text の中で ratioThreshold 以上の割合を占めていれば true、それ以外は false
 */
export function includesWithRatio(
    text: string,
    pattern: string,
    ratioThreshold: number
): boolean {
    if (pattern.length === 0) return false;

    let count = 0;
    let index = 0;

    // 非重複で pattern の出現回数を数える
    while (true) {
        index = text.indexOf(pattern, index);
        if (index === -1) break;
        count++;
        index += pattern.length;
    }

    // pattern の全体に占める文字数の割合を計算
    const totalPatternLength = count * pattern.length;
    const ratio = totalPatternLength / text.length;

    return ratio >= ratioThreshold;
}
