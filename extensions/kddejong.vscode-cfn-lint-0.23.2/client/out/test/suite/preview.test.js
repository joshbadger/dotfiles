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
const assert = require("assert");
const fs = require("fs");
const helper_1 = require("./helper");
suite('Previews should work', () => {
    const fixtureFolder = 'validation';
    const docUri = 'preview.yaml';
    const dotUri = 'preview.yaml.dot';
    test('Does NOT create .dot file if a preview was not requested', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, helper_1.activate)((0, helper_1.getDocUri)(fixtureFolder, docUri));
        assert.strictEqual(!fs.existsSync((0, helper_1.getDocPath)(fixtureFolder, dotUri)), true);
    }));
    test('Does create .dot file if a preview was requested', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, helper_1.activateAndPreview)((0, helper_1.getDocUri)(fixtureFolder, docUri));
        assert.strictEqual(fs.existsSync((0, helper_1.getDocPath)(fixtureFolder, dotUri)), true);
        // cleanup
        fs.unlinkSync((0, helper_1.getDocPath)(fixtureFolder, dotUri));
    }));
});
//# sourceMappingURL=preview.test.js.map