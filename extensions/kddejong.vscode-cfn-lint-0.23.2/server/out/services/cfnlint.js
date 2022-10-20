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
exports.CfnLint = void 0;
const child_process_1 = require("child_process");
const vscode_languageserver_1 = require("vscode-languageserver");
class CfnLint {
    constructor(cmd, params) {
        this.child = (0, child_process_1.spawn)(cmd, params, {
            shell: true
        });
        this.start = 0;
        this.end = Number.MAX_VALUE;
        this.stdout = "";
        this.diagnostics = [];
    }
    exec() {
        return new Promise((resolve, reject) => {
            const handlers = {
                resolve,
                reject,
            };
            this.child.on('error', (err) => this._onError(err, handlers));
            this.child.stderr.on('data', (data) => this._onStdErrData(data));
            this.child.stdout.on('data', (data) => this._onStdOutData(data));
            this.child.on('exit', () => this._onExit());
            this.child.on('close', () => this._onClose(handlers));
        });
    }
    _onError(err, handlers) {
        let start = 0;
        let end = Number.MAX_VALUE;
        let errorMessage = `Unable to start cfn-lint (${err}). Is cfn-lint installed correctly?`;
        let lineNumber = 0;
        let diagnostic = {
            range: {
                start: { line: lineNumber, character: start },
                end: { line: lineNumber, character: end }
            },
            severity: vscode_languageserver_1.DiagnosticSeverity.Error,
            message: '[cfn-lint] ' + errorMessage
        };
        handlers.reject([diagnostic]);
    }
    ;
    _onStdErrData(data) {
        let err = data.toString();
        let lineNumber = 0;
        let diagnostic = {
            range: {
                start: { line: lineNumber, character: this.start },
                end: { line: lineNumber, character: this.end },
            },
            severity: vscode_languageserver_1.DiagnosticSeverity.Warning,
            message: '[cfn-lint] ' + err + '\nGo to https://github.com/aws-cloudformation/cfn-python-lint/#install for more help'
        };
        this.diagnostics.push(diagnostic);
        return;
    }
    _onStdOutData(data) {
        this.stdout = this.stdout.concat(data.toString());
        return;
    }
    _onExit() {
        let tmp = this.stdout.toString();
        let obj;
        try {
            obj = JSON.parse(tmp);
        }
        catch (err) {
            let lineNumber = 0;
            let diagnostic = {
                range: {
                    start: { line: lineNumber, character: this.start },
                    end: { line: lineNumber, character: this.end }
                },
                severity: vscode_languageserver_1.DiagnosticSeverity.Warning,
                message: '[cfn-lint] ' + err + '\nGo to https://github.com/aws-cloudformation/cfn-python-lint/#install for more help'
            };
            this.diagnostics.push(diagnostic);
            return;
        }
        for (let element of obj) {
            let severity;
            switch (element.Level) {
                case "Warning":
                    severity = vscode_languageserver_1.DiagnosticSeverity.Warning;
                    break;
                case "Informational":
                    severity = vscode_languageserver_1.DiagnosticSeverity.Information;
                    break;
                case "Hint":
                    severity = vscode_languageserver_1.DiagnosticSeverity.Hint;
                    break;
                default:
                    severity = vscode_languageserver_1.DiagnosticSeverity.Error;
                    break;
            }
            let lineNumber = (Number.parseInt(element.Location.Start.LineNumber) - 1);
            let columnNumber = (Number.parseInt(element.Location.Start.ColumnNumber) - 1);
            let lineNumberEnd = (Number.parseInt(element.Location.End.LineNumber) - 1);
            let columnNumberEnd = (Number.parseInt(element.Location.End.ColumnNumber) - 1);
            let diagnostic = {
                range: {
                    start: { line: lineNumber, character: columnNumber },
                    end: { line: lineNumberEnd, character: columnNumberEnd }
                },
                severity: severity,
                message: '[cfn-lint] ' + element.Rule.Id + ': ' + element.Message
            };
            this.diagnostics.push(diagnostic);
        }
        ;
    }
    _onClose(handlers) {
        handlers.resolve(this.diagnostics);
    }
}
exports.CfnLint = CfnLint;
//# sourceMappingURL=cfnlint.js.map