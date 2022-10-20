#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationHandler = void 0;
const vscode_uri_1 = require("vscode-uri");
const fs_1 = require("fs");
const fast_json_patch_1 = require("fast-json-patch");
const cfnlint_1 = require("../services/cfnlint");
const validationHandlers_1 = require("yaml-language-server/out/server/src/languageserver/handlers/validationHandlers");
const helpers_1 = require("./helpers");
// code adopted from https://github.com/redhat-developer/yaml-language-server/blob/main/src/languageserver/handlers/validationHandlers.ts
class ValidationHandler extends validationHandlers_1.ValidationHandler {
    constructor(connection, languageService, cfnSettings) {
        super(connection, languageService, cfnSettings);
        this.cfnSettings = cfnSettings;
        this.cfnConnection = connection;
        this.cfnSettings.documents.onDidSave((event) => {
            this.validate(event.document);
        });
        this.cfnSettings.documents.onDidOpen((event) => {
            this.validate(event.document);
        });
    }
    patchTemplateSchema(registrySchemaDirectory) {
        const stub = (0, fs_1.readFileSync)(__dirname + '/../../schema/resource-patch-stub.json', 'utf8');
        let templateSchema = JSON.parse((0, fs_1.readFileSync)(__dirname + '/../../schema/all-spec.json', 'utf8'));
        for (const schemaFile of (0, fs_1.readdirSync)(registrySchemaDirectory)) {
            const registrySchema = (0, fs_1.readFileSync)(registrySchemaDirectory + schemaFile, 'utf8');
            const patch = JSON.parse(stub.replace(/RESOURCE_TYPE/g, JSON.parse(registrySchema)['typeName']).replace(/"RESOURCE_SCHEMA"/g, registrySchema));
            templateSchema = (0, fast_json_patch_1.applyPatch)(templateSchema, patch).newDocument;
        }
        (0, fs_1.writeFileSync)(__dirname + '/../../schema/all-spec.json', JSON.stringify(templateSchema));
    }
    validateTextDocument(document) {
        if (!document) {
            return new Promise((resolve, _) => {
                resolve([]);
            });
        }
        let uri = document.uri;
        let fileToLint = vscode_uri_1.URI.parse(uri).fsPath;
        let isCfn = (0, helpers_1.isCloudFormation)(document.getText(), uri.toString(), this.cfnConnection);
        this.cfnConnection.sendNotification('cfn/isPreviewable', isCfn);
        let buildGraph = this.cfnSettings.isPreviewing[uri];
        return new Promise((resolve, reject) => {
            if (isCfn) {
                if (this.cfnSettings.cfnLintPath.includes(' --registry-schemas ') || this.cfnSettings.cfnLintPath.includes(' -s ')) {
                    for (const segment of this.cfnSettings.cfnLintPath.split('-')) {
                        if (segment.startsWith('schemas ') || segment.startsWith('s ')) {
                            this.patchTemplateSchema(segment.split(' ')[1] + "/");
                        }
                    }
                }
                let args = ['--format', 'json'];
                if (!(this.cfnSettings.cfnLintPath.includes(' --include-checks ') || this.cfnSettings.cfnLintPath.includes(' -c '))) {
                    args.push('--include-checks');
                    args.push('I'); // informational
                }
                if (buildGraph) {
                    args.push('--build-graph');
                }
                if (this.cfnSettings.cfnLintIgnoreRules.length > 0) {
                    for (var ignoreRule of this.cfnSettings.cfnLintIgnoreRules) {
                        args.push('--ignore-checks');
                        args.push(ignoreRule);
                    }
                }
                if (this.cfnSettings.cfnLintAppendRules.length > 0) {
                    for (var appendRule of this.cfnSettings.cfnLintAppendRules) {
                        args.push('--append-rules');
                        args.push(appendRule);
                    }
                }
                if (this.cfnSettings.cfnLintOverrideSpecPath !== "") {
                    args.push('--override-spec', this.cfnSettings.cfnLintOverrideSpecPath);
                }
                args.push('--', `"${fileToLint}"`);
                this.cfnConnection.console.log(`Running... ${this.cfnSettings.cfnLintPath} ${args}`);
                const cfnLint = new cfnlint_1.CfnLint(this.cfnSettings.cfnLintPath, args);
                const cfnLintExec = cfnLint.exec();
                cfnLintExec.then(value => {
                    this.cfnConnection.sendDiagnostics({ uri: uri.toString(), diagnostics: value });
                    resolve(value);
                });
                cfnLintExec.catch(value => {
                    this.cfnConnection.sendDiagnostics({ uri: uri.toString(), diagnostics: value });
                    if (this.cfnSettings.isPreviewing[uri]) {
                        this.cfnConnection.console.log('preview file is available');
                        this.cfnConnection.sendNotification('cfn/previewIsAvailable', uri);
                    }
                    resolve(value);
                });
            }
            else {
                const message = `Don't believe this is a CloudFormation template. ${uri.toString()}. If it is please add AWSTemplateFormatVersion: '2010-09-09' (YAML) or "AWSTemplateFormatVersion": "2010-09-09" (JSON) into the root level of the document.`;
                this.cfnConnection.console.log(message);
                reject(message);
            }
        });
    }
}
exports.ValidationHandler = ValidationHandler;
//# sourceMappingURL=validationHandler.js.map