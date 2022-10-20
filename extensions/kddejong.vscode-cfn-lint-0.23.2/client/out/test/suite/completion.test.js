"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCompletion = void 0;
const vscode = require("vscode");
const assert = require("assert");
const helper_1 = require("./helper");
suite('Should code complete', () => {
    const docUri = (0, helper_1.getDocUri)('completion', 'completion.yaml');
    test('Complete on empty template', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, helper_1.activate)(docUri);
        yield testCompletion(docUri, new vscode.Position(0, 0), {
            items: [
                {
                    label: '!And',
                    kind: 11,
                },
                {
                    label: '!Base64',
                    kind: 11,
                },
                {
                    label: '!Cidr',
                    kind: 11,
                },
                {
                    label: '!Equals',
                    kind: 11,
                },
                {
                    label: '!FindInMap',
                    kind: 11,
                },
                {
                    label: '!GetAtt',
                    kind: 11,
                },
                {
                    label: '!GetAZs',
                    kind: 11,
                },
                {
                    label: '!If',
                    kind: 11,
                },
                {
                    label: '!ImportValue',
                    kind: 11,
                },
                {
                    label: '!Join',
                    kind: 11,
                },
                {
                    label: '!Not',
                    kind: 11,
                },
                {
                    label: '!Or',
                    kind: 11,
                },
                {
                    label: '!Ref',
                    kind: 11,
                },
                {
                    label: '!Select',
                    kind: 11,
                },
                {
                    label: '!Split',
                    kind: 11,
                },
                {
                    label: '!Sub',
                    kind: 11,
                },
                {
                    label: 'object',
                    kind: 6,
                },
                {
                    label: 'AWSTemplateFormatVersion',
                    kind: 9,
                },
                {
                    label: 'Conditions',
                    kind: 9,
                },
                {
                    label: 'Description',
                    kind: 9,
                },
                {
                    label: 'Hooks',
                    kind: 9,
                },
                {
                    label: 'Mappings',
                    kind: 9,
                },
                {
                    label: 'Metadata',
                    kind: 9,
                },
                {
                    label: 'Outputs',
                    kind: 9,
                },
                {
                    label: 'Parameters',
                    kind: 9,
                },
                {
                    label: 'Resources',
                    kind: 9,
                },
                {
                    label: 'Rules',
                    kind: 9,
                },
                {
                    label: 'Transform',
                    kind: 9,
                },
            ],
        });
    }));
});
function testCompletion(docUri, position, expectedCompletionList) {
    return __awaiter(this, void 0, void 0, function* () {
        // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
        const actualCompletionList = (yield vscode.commands.executeCommand('vscode.executeCompletionItemProvider', docUri, position));
        const sortedActualCompletionList = actualCompletionList.items.sort((a, b) => (a.label > b.label ? 1 : -1));
        assert.equal(actualCompletionList.items.length, expectedCompletionList.items.length, "Completion List doesn't have expected size");
        expectedCompletionList.items
            .sort((a, b) => (a.label > b.label ? 1 : -1))
            .forEach((expectedItem, i) => {
            const actualItem = sortedActualCompletionList[i];
            assert.equal(actualItem.label, expectedItem.label, `Actual Label: ${actualItem.label} != Expected ${expectedItem.label}`);
            assert.equal(actualItem.kind, expectedItem.kind, `Actual Kind: ${actualItem.kind} != Expected ${expectedItem.kind} for ${actualItem.label}`);
        });
    });
}
exports.testCompletion = testCompletion;
//# sourceMappingURL=completion.test.js.map