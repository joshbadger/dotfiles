"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
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
exports.testDiagnostics = exports.setTestContent = exports.getDocUri = exports.getDocPath = exports.sleep = exports.activateAndPreview = exports.activate = exports.platformEol = exports.documentEol = exports.editor = exports.doc = void 0;
const vscode = require("vscode");
const assert = require("assert");
const path = require("path");
/**
 * Activates the kddejong.vscode-cfn-lint extension
 */
function activate(docUri) {
    return __awaiter(this, void 0, void 0, function* () {
        const extension = vscode.extensions.getExtension("kddejong.vscode-cfn-lint");
        const activation = yield (extension === null || extension === void 0 ? void 0 : extension.activate());
        try {
            exports.doc = yield vscode.workspace.openTextDocument(docUri);
            exports.editor = yield vscode.window.showTextDocument(exports.doc, {
                preview: true,
                preserveFocus: false,
            });
            yield sleep(5000);
            return activation;
        }
        catch (e) {
            console.error("Error from activation -> ", e);
        }
    });
}
exports.activate = activate;
function activateAndPreview(docUri) {
    return __awaiter(this, void 0, void 0, function* () {
        yield activate(docUri);
        yield vscode.commands.executeCommand('extension.sidePreview');
        yield sleep(4000); // Wait for preview to become available
    });
}
exports.activateAndPreview = activateAndPreview;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
exports.sleep = sleep;
const getDocPath = (d, p) => {
    return path.resolve(__dirname, '../../../src/test/suite/fixtures', d, p);
};
exports.getDocPath = getDocPath;
const getDocUri = (d, p) => {
    return vscode.Uri.file((0, exports.getDocPath)(d, p));
};
exports.getDocUri = getDocUri;
function setTestContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const all = new vscode.Range(exports.doc.positionAt(0), exports.doc.positionAt(exports.doc.getText().length));
        return exports.editor.edit(eb => eb.replace(all, content));
    });
}
exports.setTestContent = setTestContent;
function testDiagnostics(docUri, expectedDiagnostics) {
    return __awaiter(this, void 0, void 0, function* () {
        yield activate(docUri);
        const actualDiagnostics = vscode.languages.getDiagnostics(docUri);
        assert.equal(actualDiagnostics.length, expectedDiagnostics.length);
        expectedDiagnostics.forEach((expectedDiagnostic, i) => {
            const actualDiagnostic = actualDiagnostics[i];
            assert.equal(actualDiagnostic.message, expectedDiagnostic.message);
            assert.deepEqual(actualDiagnostic.range, expectedDiagnostic.range);
            assert.equal(actualDiagnostic.severity, expectedDiagnostic.severity);
        });
    });
}
exports.testDiagnostics = testDiagnostics;
//# sourceMappingURL=helper.js.map