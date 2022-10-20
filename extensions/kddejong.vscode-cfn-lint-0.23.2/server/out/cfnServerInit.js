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
exports.CfnServerInit = void 0;
const yaml_language_server_1 = require("yaml-language-server");
const vscode_languageserver_1 = require("vscode-languageserver");
const validationHandler_1 = require("./handlers/validationHandler");
const settingsHandler_1 = require("./handlers/settingsHandler");
const notificationHandler_1 = require("./handlers/notificationHandler");
const languageHandlers_1 = require("./handlers/languageHandlers");
const fs_1 = require("fs");
const workspaceHandlers_1 = require("yaml-language-server/out/server/src/languageserver/handlers/workspaceHandlers");
const commandExecutor_1 = require("yaml-language-server/out/server/src/languageserver/commandExecutor");
const path = require("path");
// code adopted from https://github.com/redhat-developer/yaml-language-server/blob/main/src/yamlServerInit.ts
class CfnServerInit {
    constructor(connection, cfnSettings, workspaceContext, schemaRequestService, telemetry) {
        this.connection = connection;
        this.cfnSettings = cfnSettings;
        this.workspaceContext = workspaceContext;
        this.schemaRequestService = schemaRequestService;
        this.telemetry = telemetry;
        this.cfnSettings.documents.listen(this.connection);
        /**
         * Run when the client connects to the server after it is activated.
         * The server receives the root path(s) of the workspace and the client capabilities.
         */
        this.connection.onInitialize((params) => {
            return this.connectionInitialized(params);
        });
        this.connection.onInitialized(() => {
            //if (this.yamlSettings.hasWsChangeWatchedFileDynamicRegistration) {
            //  this.connection.workspace.onDidChangeWorkspaceFolders((changedFolders) => {
            //    this.yamlSettings.workspaceFolders = workspaceFoldersChanged(this.yamlSettings.workspaceFolders, changedFolders);
            //  });
            //}
            // need to call this after connection initialized
            this.settingsHandler.registerHandlers();
            this.settingsHandler.pullConfiguration();
        });
    }
    // public for test setup
    connectionInitialized(params) {
        this.cfnSettings.capabilities = params.capabilities;
        this.languageService = (0, yaml_language_server_1.getLanguageService)(this.schemaRequestService, this.workspaceContext, this.connection, this.telemetry, this.cfnSettings, params.capabilities);
        (0, fs_1.readFile)(path.join(__dirname, `../../schema/all-spec.json`), 'utf8', (err, data) => {
            if (err) {
                this.connection.console.log(err.message);
            }
            let schema;
            schema = data;
            this.languageService.addSchema('CLOUDFORMATION', schema);
        });
        this.registerHandlers();
        return {
            capabilities: {
                textDocumentSync: vscode_languageserver_1.TextDocumentSyncKind.Incremental,
                completionProvider: {},
                hoverProvider: true,
                documentSymbolProvider: true,
                documentFormattingProvider: false,
                documentOnTypeFormattingProvider: {
                    firstTriggerCharacter: '\n',
                },
                documentRangeFormattingProvider: false,
                definitionProvider: true,
                documentLinkProvider: {},
                foldingRangeProvider: true,
                codeActionProvider: true,
                workspace: {
                    workspaceFolders: {
                        changeNotifications: false,
                        supported: true,
                    },
                },
            },
        };
    }
    registerHandlers() {
        // Register all features that the language server has
        this.validationHandler = new validationHandler_1.ValidationHandler(this.connection, this.languageService, this.cfnSettings);
        new notificationHandler_1.NotificationHandler(this.connection, this.cfnSettings, this.validationHandler).registerHandlers();
        this.settingsHandler = new settingsHandler_1.SettingsHandler(this.connection, this.languageService, this.cfnSettings, this.validationHandler, this.telemetry);
        this.languageHandler = new languageHandlers_1.LanguageHandlers(this.connection, this.languageService, this.cfnSettings, this.validationHandler);
        this.languageHandler.registerHandlers();
        new workspaceHandlers_1.WorkspaceHandlers(this.connection, commandExecutor_1.commandExecutor).registerHandlers();
    }
    start() {
        this.connection.listen();
    }
}
exports.CfnServerInit = CfnServerInit;
//# sourceMappingURL=cfnServerInit.js.map