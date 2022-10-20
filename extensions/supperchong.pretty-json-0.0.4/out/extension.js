"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const util_1 = require("./util");
const pretty = require("pretty-object-string");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "json" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand("extension.prettyJson", (textEditor, edit, args) => {
        // The code you place here will be executed every time your command is executed
        //get indent from user configure, default tab
        const indent = util_1.getConfiguration();
        let selectText = textEditor.document.getText(textEditor.selections[0]);
        let prettyText;
        try {
            prettyText = pretty(selectText, { delComment: true, indent });
        }
        catch (err) {
            vscode.window.showInformationMessage(err.message);
            return;
        }
        textEditor.edit((editBuilder) => {
            editBuilder.replace(textEditor.selections[0], prettyText);
        });
        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map