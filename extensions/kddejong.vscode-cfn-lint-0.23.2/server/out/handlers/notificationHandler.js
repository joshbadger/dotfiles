#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationHandler = void 0;
const requestTypes_1 = require("../requestTypes");
// code adopted from https://github.com/redhat-developer/yaml-language-server/blob/main/src/languageserver/handlers/notificationHandlers.ts
class NotificationHandler {
    constructor(connection, yamlSettings, validationHandler) {
        this.connection = connection;
        this.cfnSettings = yamlSettings;
        this.validationHandler = validationHandler;
    }
    registerHandlers() {
        this.connection.onNotification(requestTypes_1.RequestPreview.type, (uri) => this.requestPreview(uri));
        this.connection.onNotification(requestTypes_1.PreviewClosed.type, (uri) => this.previewClosed(uri));
    }
    requestPreview(uri) {
        this.connection.console.log('preview requested: ' + uri);
        this.cfnSettings.isPreviewing[uri] = true;
        this.validationHandler.validateTextDocument(this.cfnSettings.documents.get(uri));
    }
    previewClosed(uri) {
        this.connection.console.log('preview closed: ' + uri);
        this.cfnSettings.isPreviewing[uri] = false;
    }
}
exports.NotificationHandler = NotificationHandler;
//# sourceMappingURL=notificationHandler.js.map