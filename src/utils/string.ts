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
 * @param hiragana カタカナを含む文字列
 * @returns 置換された文字列
 */
export function katakanaToHiragana(katakana: string): string {
    return katakana.replace(/[\u30a1-\u30f6]/g, (match) => {
        const chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}