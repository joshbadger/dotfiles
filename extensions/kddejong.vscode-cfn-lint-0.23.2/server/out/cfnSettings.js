#!/usr/bin/env node
"use strict";
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at

    http://www.apache.org/licenses/LICENSE-2.0

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextDocumentTestManager = exports.SettingsState = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const yamlSettings_1 = require("yaml-language-server/out/server/src/yamlSettings");
// This class is responsible for handling all the settings
class SettingsState extends yamlSettings_1.SettingsState {
    constructor() {
        super();
        this.cfnLintPath = "cfn-lint";
        this.cfnLintAppendRules = [];
        this.cfnLintIgnoreRules = [];
        this.cfnLintOverrideSpecPath = "";
        this.pendingValidationRequests = {};
        this.validationDelayMs = 200;
        this.isPreviewing = {};
        this.customTags = [
            "!And",
            "!And sequence",
            "!If",
            "!If sequence",
            "!Not",
            "!Not sequence",
            "!Equals",
            "!Equals sequence",
            "!Or",
            "!Or sequence",
            "!FindInMap",
            "!FindInMap sequence",
            "!Base64",
            "!Join",
            "!Join sequence",
            "!Cidr",
            "!Ref",
            "!Sub",
            "!Sub sequence",
            "!GetAtt",
            "!GetAZs",
            "!ImportValue",
            "!ImportValue sequence",
            "!Select",
            "!Select sequence",
            "!Split",
            "!Split sequence"
        ];
        this.schemaStoreEnabled = false;
    }
}
exports.SettingsState = SettingsState;
class TextDocumentTestManager extends vscode_languageserver_1.TextDocuments {
    constructor() {
        super(vscode_languageserver_textdocument_1.TextDocument);
        this.testTextDocuments = new Map();
    }
    get(uri) {
        return this.testTextDocuments.get(uri);
    }
    set(textDocument) {
        this.testTextDocuments.set(textDocument.uri, textDocument);
    }
}
exports.TextDocumentTestManager = TextDocumentTestManager;
//# sourceMappingURL=cfnSettings.js.map