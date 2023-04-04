import * as vscode from 'vscode';
import { window } from 'vscode';

const plusMinusLines = 60;
const widthPadding = 6;
const heightPadding = 4;
// TODO: Make letters a custom setting
// Custom letters
const letters = 'fjdkslahgeirutybvcn'.split('');

export function createCodeArray(): string[] {
    const codeArray = letters.flatMap(first => letters.map(second => `${first}${second}`));

    return codeArray;
}

let darkDataUriCache: { [index: string]: vscode.Uri } = {};
let lightDataUriCache: { [index: string]: vscode.Uri } = {};

export interface Decoration {
    bgColor: string | vscode.ThemeColor;
    fgColor: string | vscode.ThemeColor;

    fontFamily: string;
    fontSize: number;
}

export function createDataUriCaches(codeArray: string[], darkDecoration: Decoration, lightDecoration: Decoration) {
    codeArray.forEach(code => (darkDataUriCache[code] = getSvgDataUri(code, darkDecoration)));
    codeArray.forEach(code => (lightDataUriCache[code] = getSvgDataUri(code, lightDecoration)));
}

export function getCodeIndex(codeArray: string[], code: string): number {
    const codeIndex = codeArray.indexOf(code);
    // if we don't find the code, jump to start of document
    if (codeIndex === -1) {
        window.showErrorMessage(`Jumpy: No match for ${code} found.`);

        return 0;
    }
    return codeIndex;
}

export function getLines(editor: vscode.TextEditor): { firstLineNumber: number; lines: string[] } {
    const document = editor.document;
    const activePosition = editor.selection.active;

    const startLine = activePosition.line < plusMinusLines ? 0 : activePosition.line - plusMinusLines;
    const endLine =
        document.lineCount - activePosition.line < plusMinusLines
            ? document.lineCount
            : activePosition.line + plusMinusLines;

    const lines: string[] = [];
    for (let i = startLine; i < endLine; i++) {
        lines.push(document.lineAt(i).text);
    }

    return {
        firstLineNumber: startLine,
        lines,
    };
}

export function createTextEditorDecorationType(dec: Decoration) {
    const width = dec.fontSize + widthPadding;
    const marginLeft = -width; // used to be -width - 2, making the text jump

    return vscode.window.createTextEditorDecorationType({
        after: {
            margin: `0 0 0 ${marginLeft}px`,
            height: `100%`, // full height of line
            width: `${width}px`,
            backgroundColor: dec.bgColor,
            color: dec.fgColor,
        },
    });
}

export function createDecorationOptions(
    line: number,
    startCharacter: number,
    endCharacter: number,
    context: vscode.ExtensionContext,
    code: string,
): vscode.DecorationOptions {
    return {
        range: new vscode.Range(line, startCharacter, line, endCharacter),
        renderOptions: {
            dark: {
                after: {
                    contentText: code,
                    // Any colors set here will override the Decoration colors
                },
            },
            // light and dark can be the same since we use the editr colors
            light: {
                after: {
                    contentText: code,
                },
            },
        },
    };
}

/**
 * Create a data URI (SVG) for the given code.
 */
function getSvgDataUri(code: string, dec: Decoration) {
    // TODO: Make setting
    const width = dec.fontSize + widthPadding;
    const height = dec.fontSize + heightPadding;

    // prettier-ignore
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" height="${height}" width="${width}">`;
    // prettier-ignore
    svg += `<rect width="${width}" height="${height}" style="fill: ${dec.bgColor};"></rect>`;
    // prettier-ignore
    svg += `<text font-family="${dec.fontFamily}" font-size="${dec.fontSize}px" textLength="${width - 2}" fill="${dec.fgColor}" x="1" y="${height - 4}" alignment-baseline="baseline">`;
    svg += code;
    svg += `</text></svg>`;

    return vscode.Uri.parse(`data:image/svg+xml;utf8,${svg}`);
}
