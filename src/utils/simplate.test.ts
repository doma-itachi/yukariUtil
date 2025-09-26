import { expect, test } from "vitest";
import { simplate } from "./simplate";

test("文字の埋め込みができるか", () => {
    expect(simplate(`こんにちは！{{name}}`, {name: "yukari"})).toBe(`こんにちは！yukari`);
});

test("複数文字の埋め込みができるか", () => {
    expect(simplate(`こんにちは！{{name}}と{{name}}, {{name2}}`, {name: "yukari", name2: "yuzuki"})).toBe(`こんにちは！yukariとyukari, yuzuki`);
});