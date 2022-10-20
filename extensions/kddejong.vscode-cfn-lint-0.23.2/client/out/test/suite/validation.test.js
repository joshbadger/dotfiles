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
const vscode = require("vscode");
const helper_1 = require("./helper");
suite('Should validate a template against cfn-lint', () => {
    const fixtureFolder = 'validation';
    suite('Should have failures with a bad template', () => {
        test('Diagnose bad YAML template', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUri = (0, helper_1.getDocUri)(fixtureFolder, 'bad.yaml');
            yield (0, helper_1.activate)(docUri);
            yield (0, helper_1.testDiagnostics)(docUri, [
                {
                    severity: vscode.DiagnosticSeverity.Error,
                    message: '[cfn-lint] E1001: Top level template section Errors is not valid',
                    range: toRange(2, 0, 2, 6)
                },
                {
                    severity: vscode.DiagnosticSeverity.Warning,
                    message: '[cfn-lint] W2001: Parameter myParam not used.',
                    range: toRange(5, 2, 5, 9)
                },
                {
                    severity: vscode.DiagnosticSeverity.Error,
                    message: '[cfn-lint] E3001: Invalid or unsupported Type AWS::EC2::Instance1 for resource MyEC2Instance1 in us-east-1',
                    range: toRange(12, 4, 12, 8)
                }
            ]);
        }));
        test('Diagnose bad JSON template', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUri = (0, helper_1.getDocUri)(fixtureFolder, 'bad.json');
            yield (0, helper_1.activate)(docUri);
            yield (0, helper_1.testDiagnostics)(docUri, [
                {
                    severity: vscode.DiagnosticSeverity.Error,
                    message: '[cfn-lint] E1001: Top level template section Errors is not valid',
                    range: toRange(3, 2, 3, 10)
                },
                {
                    severity: vscode.DiagnosticSeverity.Warning,
                    message: '[cfn-lint] W2001: Parameter myParam not used.',
                    range: toRange(5, 4, 5, 13)
                },
                {
                    severity: vscode.DiagnosticSeverity.Error,
                    message: '[cfn-lint] E3001: Invalid or unsupported Type AWS::EC2::Instance1 for resource MyEC2Instance1 in us-east-1',
                    range: toRange(13, 6, 13, 12)
                }
            ]);
        }));
        test('Diagnoses a bad template without AWSTemplateFormatVersion', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUri = (0, helper_1.getDocUri)(fixtureFolder, 'still_a_template.yaml');
            yield (0, helper_1.activate)(docUri);
            yield (0, helper_1.testDiagnostics)(docUri, [
                {
                    severity: vscode.DiagnosticSeverity.Error,
                    message: '[cfn-lint] E3002: Invalid Property Resources/RootRole/Properties/BadKey',
                    range: toRange(5, 6, 5, 12)
                }
            ]);
        }));
        test('Diagnoses a bad template without AWSTemplateFormatVersion 2', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUri = (0, helper_1.getDocUri)(fixtureFolder, 'still_a_template_2.yaml');
            yield (0, helper_1.activate)(docUri);
            yield (0, helper_1.testDiagnostics)(docUri, [
                {
                    severity: vscode.DiagnosticSeverity.Error,
                    message: '[cfn-lint] E3002: Invalid Property Resources/RootRole/Properties/BadKey',
                    range: toRange(4, 6, 4, 12)
                }
            ]);
        }));
        test('Diagnoses a bad template with spaces in the name', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUri = (0, helper_1.getDocUri)(fixtureFolder, 'a template.yaml');
            yield (0, helper_1.activate)(docUri);
            yield (0, helper_1.testDiagnostics)(docUri, [
                {
                    severity: vscode.DiagnosticSeverity.Error,
                    message: '[cfn-lint] E3002: Invalid Property Resources/RootRole/Properties/BadKey',
                    range: toRange(5, 6, 5, 12)
                }
            ]);
        }));
    });
    suite('Should not have false positives', () => {
        test('Diagnose good template', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUri = (0, helper_1.getDocUri)(fixtureFolder, 'good.yaml');
            yield (0, helper_1.activate)(docUri);
            yield (0, helper_1.testDiagnostics)(docUri, []);
        }));
        test('Diagnose a yaml file that isn\'t CloudFormation', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUri = (0, helper_1.getDocUri)(fixtureFolder, 'not_template.yaml');
            yield (0, helper_1.activate)(docUri);
            yield (0, helper_1.testDiagnostics)(docUri, []);
        }));
    });
});
function toRange(sLine, sChar, eLine, eChar) {
    const start = new vscode.Position(sLine, sChar);
    const end = new vscode.Position(eLine, eChar);
    return new vscode.Range(start, end);
}
//# sourceMappingURL=validation.test.js.map