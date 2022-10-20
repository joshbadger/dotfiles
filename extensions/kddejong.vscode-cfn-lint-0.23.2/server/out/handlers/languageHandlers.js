#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageHandlers = void 0;
const languageHandlers_1 = require("yaml-language-server/out/server/src/languageserver/handlers/languageHandlers");
const helpers_1 = require("./helpers");
// code adopted from https://github.com/redhat-developer/yaml-language-server/blob/main/src/languageserver/handlers/languageHandlers.ts
class LanguageHandlers extends languageHandlers_1.LanguageHandlers {
    constructor(connection, languageService, cfnSettings, validationHandler) {
        super(connection, languageService, cfnSettings, validationHandler);
        this.cfnSettings = cfnSettings;
        this.cfnLanguageService = languageService;
    }
    /**
     * Called when auto-complete is triggered in an editor
     * Returns a list of valid completion items
     */
    completionHandler(textDocumentPosition) {
        const textDocument = this.cfnSettings.documents.get(textDocumentPosition.textDocument.uri);
        const result = {
            items: [],
            isIncomplete: false,
        };
        if (!textDocument) {
            return Promise.resolve(result);
        }
        return this.cfnLanguageService.doComplete(textDocument, textDocumentPosition.position, false);
    }
    /**
     * Called when the formatter is invoked
     * Returns the formatted document content using prettier
     */
    formatterHandler(formatParams) {
        const uri = formatParams.textDocument.uri;
        const document = this.cfnSettings.documents.get(uri);
        if (!document) {
            // @ts-ignore
            return;
        }
        let fileIsYaml = (0, helpers_1.isYaml)(uri.toString());
        if (!fileIsYaml) {
            // @ts-ignore
            return;
        }
        const customFormatterSettings = Object.assign({ tabWidth: formatParams.options.tabSize }, this.cfnSettings.yamlFormatterSettings);
        return this.cfnLanguageService.doFormat(document, customFormatterSettings);
    }
}
exports.LanguageHandlers = LanguageHandlers;
//# sourceMappingURL=languageHandlers.js.map