"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const common_1 = require("./common");
const file_1 = require("./file");
const blame_1 = require("./blame");
const history_1 = require("./history");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("openInGithub.openInGitHubFile", (0, file_1.default)(common_1.openQuickPickItem)), vscode.commands.registerCommand("openInGithub.openInGitHubBlame", (0, blame_1.default)(common_1.openQuickPickItem)), vscode.commands.registerCommand("openInGithub.openInGitHubHistory", (0, history_1.default)(common_1.openQuickPickItem)), vscode.commands.registerCommand("openInGithub.copyInGitHubFile", (0, file_1.default)(common_1.copyQuickPickItem)), vscode.commands.registerCommand("openInGithub.copyInGitHubBlame", (0, blame_1.default)(common_1.copyQuickPickItem)), vscode.commands.registerCommand("openInGithub.copyInGitHubHistory", (0, history_1.default)(common_1.copyQuickPickItem)));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map