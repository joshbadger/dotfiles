#!/usr/bin/env node
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
exports.SettingsHandler = void 0;
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
const vscode_languageserver_1 = require("vscode-languageserver");
const yaml_language_server_1 = require("yaml-language-server");
const requestTypes_1 = require("yaml-language-server/out/server/src/requestTypes");
const schemaUrls_1 = require("yaml-language-server/out/server/src/languageservice/utils/schemaUrls");
const paths_1 = require("yaml-language-server/out/server/src/languageservice/utils/paths");
const path = require("path");
// code adopted from https://github.com/redhat-developer/yaml-language-server/blob/main/src/languageserver/handlers/settingsHandlers.ts
class SettingsHandler {
    constructor(connection, languageService, cfnSettings, validationHandler, telemetry) {
        this.connection = connection;
        this.languageService = languageService;
        this.cfnSettings = cfnSettings;
        this.validationHandler = validationHandler;
        this.telemetry = telemetry;
    }
    registerHandlers() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cfnSettings.hasConfigurationCapability && this.cfnSettings.clientDynamicRegisterSupport) {
                try {
                    // Register for all configuration changes.
                    yield this.connection.client.register(vscode_languageserver_1.DidChangeConfigurationNotification.type);
                }
                catch (err) { }
            }
            this.connection.onDidChangeConfiguration(() => this.pullConfiguration());
        });
    }
    /**
     *  The server pull the 'cfnLint', 'editor', 'files' settings sections
     */
    pullConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.connection.workspace.getConfiguration([
                { section: 'cfnLint' },
                { section: 'editor' },
                { section: 'files' },
            ]);
            const settings = {
                cfnLint: config[0],
                vscodeEditor: config[1],
                files: config[2],
            };
            yield this.setConfiguration(settings);
        });
    }
    setConfiguration(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cfnSettings.schemaConfigurationSettings = [];
            const yamlSchemas = {};
            const filename = path.join(__dirname, "../../../schema/all-spec.json");
            yamlSchemas[filename] = ["*.yaml", "*.yml"];
            for (const uri in yamlSchemas) {
                const globPattern = yamlSchemas[uri];
                const schemaObj = {
                    fileMatch: Array.isArray(globPattern) ? globPattern : [globPattern],
                    uri: (0, schemaUrls_1.checkSchemaURI)(this.cfnSettings.workspaceFolders, this.cfnSettings.workspaceRoot, uri, this.telemetry),
                };
                this.cfnSettings.schemaConfigurationSettings.push(schemaObj);
            }
            if (settings.cfnLint.format) {
                this.cfnSettings.yamlFormatterSettings = {
                    proseWrap: settings.cfnLint.format.proseWrap || 'preserve',
                    printWidth: settings.cfnLint.format.printWidth || 80,
                };
                if (settings.cfnLint.format.singleQuote !== undefined) {
                    this.cfnSettings.yamlFormatterSettings.singleQuote = settings.cfnLint.format.singleQuote;
                }
                if (settings.cfnLint.format.bracketSpacing !== undefined) {
                    this.cfnSettings.yamlFormatterSettings.bracketSpacing = settings.cfnLint.format.bracketSpacing;
                }
                if (settings.cfnLint.format.enable !== undefined) {
                    this.cfnSettings.yamlFormatterSettings.enable = settings.cfnLint.format.enable;
                }
            }
            if (settings.cfnLint) {
                this.cfnSettings.cfnLintPath = settings.cfnLint.path ? settings.cfnLint.path : "cfn-lint";
                this.cfnSettings.cfnLintAppendRules = settings.cfnLint.appendRules ? settings.cfnLint.appendRules : [];
                this.cfnSettings.cfnLintIgnoreRules = settings.cfnLint.ignoreRules ? settings.cfnLint.ignoreRules : [];
                this.cfnSettings.cfnLintOverrideSpecPath = settings.cfnLint.overrideSpecPath ? settings.cfnLint.overrideSpecPath : "";
            }
            this.updateConfiguration();
            if (this.cfnSettings.useSchemaSelectionRequests) {
                this.connection.sendNotification(requestTypes_1.SchemaSelectionRequests.schemaStoreInitialized, {});
            }
        });
    }
    /**
     * Called when server settings or schema associations are changed
     * Re-creates schema associations and re-validates any open YAML files
     */
    updateConfiguration() {
        let languageSettings = {
            validate: this.cfnSettings.yamlShouldValidate,
            hover: this.cfnSettings.yamlShouldHover,
            completion: this.cfnSettings.yamlShouldCompletion,
            schemas: [],
            customTags: this.cfnSettings.customTags,
            format: this.cfnSettings.yamlFormatterSettings.enable,
            indentation: this.cfnSettings.indentation,
            disableAdditionalProperties: this.cfnSettings.disableAdditionalProperties,
            disableDefaultProperties: this.cfnSettings.disableDefaultProperties,
            parentSkeletonSelectedFirst: this.cfnSettings.suggest.parentSkeletonSelectedFirst,
            yamlVersion: this.cfnSettings.yamlVersion,
        };
        if (this.cfnSettings.schemaConfigurationSettings) {
            this.cfnSettings.schemaConfigurationSettings.forEach((schema) => {
                let uri = schema.uri;
                if (!uri && schema.schema) {
                    uri = schema.schema.id;
                }
                if (!uri && schema.fileMatch) {
                    uri = 'vscode://schemas/custom/' + encodeURIComponent(schema.fileMatch.join('&'));
                }
                if (uri) {
                    if ((0, paths_1.isRelativePath)(uri)) {
                        console.log('Is relative');
                        uri = (0, paths_1.relativeToAbsolutePath)(this.cfnSettings.workspaceFolders, this.cfnSettings.workspaceRoot, uri);
                    }
                    languageSettings = this.configureSchemas(uri, schema.fileMatch, schema.schema, languageSettings, yaml_language_server_1.SchemaPriority.Settings);
                }
            });
        }
        console.log(languageSettings.schemas[0].fileMatch[0]);
        this.languageService.configure(languageSettings);
        // Revalidate any open text documents
        this.cfnSettings.documents.all().forEach((document) => this.validationHandler.validate(document));
    }
    /**
     * Stores schema associations in server settings, handling kubernetes
     * @param uri string path to schema (whether local or online)
     * @param fileMatch file pattern to apply the schema to
     * @param schema schema id
     * @param languageSettings current server settings
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    configureSchemas(uri, fileMatch, schema, languageSettings, priorityLevel) {
        uri = (0, schemaUrls_1.checkSchemaURI)(this.cfnSettings.workspaceFolders, this.cfnSettings.workspaceRoot, uri, this.telemetry);
        if (schema === null) {
            languageSettings.schemas.push({ uri, fileMatch: fileMatch, priority: priorityLevel });
        }
        else {
            languageSettings.schemas.push({ uri, fileMatch: fileMatch, schema: schema, priority: priorityLevel });
        }
        return languageSettings;
    }
}
exports.SettingsHandler = SettingsHandler;
//# sourceMappingURL=settingsHandler.js.map