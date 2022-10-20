#!/usr/bin/env node
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
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const cfnSettings_1 = require("./cfnSettings");
const cfnServerInit_1 = require("./cfnServerInit");
const schemaRequestHandler_1 = require("yaml-language-server/out/server/src/languageservice/services/schemaRequestHandler");
const telemetry_1 = require("yaml-language-server/out/server/src/languageserver/telemetry");
const fs_1 = require("fs");
// Create a connection for the server.
let connection = null;
if (process.argv.indexOf('--stdio') === -1) {
    connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
}
else {
    connection = (0, node_1.createConnection)();
}
process.on('uncaughtException', (err) => {
    // send all uncaught exception to telemetry with stack traces
    connection.console.error(err.message);
});
const fileSystem = {
    readFile: (fsPath, encoding) => {
        return fs_1.promises.readFile(fsPath, encoding).then((b) => b.toString());
    },
};
/**
 * Handles schema content requests given the schema URI
 * @param uri can be a local file, vscode request, http(s) request or a custom request
 */
const schemaRequestHandlerWrapper = (connection, uri) => {
    return (0, schemaRequestHandler_1.schemaRequestHandler)(connection, uri, cfnSettings.workspaceFolders, cfnSettings.workspaceRoot, cfnSettings.useVSCodeContentRequest, fileSystem);
};
const schemaRequestService = schemaRequestHandlerWrapper.bind(this, connection);
const cfnSettings = new cfnSettings_1.SettingsState();
const telemetry = new telemetry_1.Telemetry(connection);
new cfnServerInit_1.CfnServerInit(connection, cfnSettings, schemaRequestHandler_1.workspaceContext, schemaRequestService, telemetry).start();
//# sourceMappingURL=server.js.map