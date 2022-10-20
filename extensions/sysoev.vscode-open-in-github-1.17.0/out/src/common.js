"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyQuickPickItem = exports.openQuickPickItem = exports.showQuickPickWindow = exports.formatGitlabLinePointer = exports.formatGitHubQueryParams = exports.formatGitHubLinePointer = exports.formatBitbucketLinePointer = exports.isGitlab = exports.isBitbucket = exports.formatGithubBranchName = exports.prepareQuickPickItems = exports.formatQuickPickItems = exports.getCurrentRevision = exports.getBranches = exports.formatRemotes = exports.getRemoteByName = exports.getAllRemotes = exports.getRemotes = exports.getRepoRoot = exports.baseCommand = exports.BRANCH_URL_SEP = void 0;
const vscode_1 = require("vscode");
const exec = require("child_process").exec;
const path = require("path");
const open = require("open");
const R = require("ramda");
const clipboardy = require("clipboardy");
exports.BRANCH_URL_SEP = " — ";
/**
 * Makes initial preparations for all commands.
 *
 * @return {Promise}
 */
function baseCommand(commandName, action, formatters) {
    const activeTextEditor = vscode_1.window.activeTextEditor;
    if (!activeTextEditor) {
        vscode_1.window.showErrorMessage("No opened files.");
        return;
    }
    const filePath = vscode_1.window.activeTextEditor.document.fileName;
    const fileUri = vscode_1.window.activeTextEditor.document.uri;
    const lineStart = vscode_1.window.activeTextEditor.selection.start.line + 1;
    const lineEnd = vscode_1.window.activeTextEditor.selection.end.line + 1;
    const selectedLines = { start: lineStart, end: lineEnd };
    const config = vscode_1.workspace.getConfiguration("openInGitHub", vscode_1.window.activeTextEditor.document.uri);
    const defaultBranch = vscode_1.workspace
        .getConfiguration("openInGitHub", fileUri)
        .get("defaultBranch") || "master";
    const defaultRemote = vscode_1.workspace
        .getConfiguration("openInGitHub", fileUri)
        .get("defaultRemote") || "origin";
    const maxBuffer = vscode_1.workspace
        .getConfiguration("openInGithub", fileUri)
        .get("maxBuffer") || undefined;
    const excludeCurrentRevision = vscode_1.workspace
        .getConfiguration("openInGitHub")
        .get("excludeCurrentRevision") || false;
    const repositoryType = config.get("repositoryType");
    const projectPath = path.dirname(filePath);
    return getRepoRoot(exec, projectPath).then((repoRootPath) => {
        const relativeFilePath = path.relative(repoRootPath, filePath);
        return getBranches(exec, projectPath, defaultBranch, maxBuffer, excludeCurrentRevision)
            .then((branches) => {
            const getRemotesPromise = getRemotes(exec, projectPath, defaultRemote, defaultBranch, branches).then(formatRemotes);
            return Promise.all([getRemotesPromise, branches]);
        })
            .then((result) => prepareQuickPickItems(repositoryType, formatters, commandName, relativeFilePath, selectedLines, result))
            .then(showQuickPickWindow)
            .then((item) => action(item))
            .catch((err) => vscode_1.window.showErrorMessage(err));
    });
}
exports.baseCommand = baseCommand;
/**
 * Returns repo root path.
 *
 * @param {Function} exec
 * @param {String} workspacePath
 *
 * @return {Promise<String>}
 */
function getRepoRoot(exec, workspacePath) {
    return new Promise((resolve, reject) => {
        exec("git rev-parse --show-toplevel", { cwd: workspacePath }, (error, stdout, stderr) => {
            if (stderr || error)
                return reject(stderr || error);
            resolve(stdout.trim());
        });
    });
}
exports.getRepoRoot = getRepoRoot;
/**
 * Returns raw list of remotes.
 *
 * @param {Function} exec
 * @param {String} projectPath
 * @param {String} defaultRemote
 * @param {String} defaultBranch
 * @param {String[]} branches
 *
 * @return {Promise<String[]>}
 */
function getRemotes(exec, projectPath, defaultRemote, defaultBranch, branches) {
    /**
     * If there is only default branch that was pushed to remote then return only default remote.
     */
    if (branches.length === 1 && branches[0] === defaultBranch) {
        return getRemoteByName(exec, projectPath, defaultRemote);
    }
    return getAllRemotes(exec, projectPath, defaultRemote);
}
exports.getRemotes = getRemotes;
/**
 * Returns raw list of all remotes.
 *
 * @todo: Should work on windows too...
 *
 * @param {Function} exec
 * @param {String} projectPath
 *
 * @return {Promise<String[]>}
 */
function getAllRemotes(exec, projectPath, defaultRemote) {
    const sortRemoteByDefaultRemote = (defaultRemote) => defaultRemote
        ? R.sort((a, b) => a[0].startsWith(defaultRemote)
            ? -1
            : b[0].startsWith(defaultRemote)
                ? 1
                : 0)
        : R.identity;
    const process = R.compose(R.uniq, R.map(R.head), R.map(R.split(" ")), R.reject(R.isEmpty), R.map(R.last), sortRemoteByDefaultRemote(defaultRemote), R.map(R.split(/\t/)), R.split("\n"));
    return new Promise((resolve, reject) => {
        exec("git remote -v", { cwd: projectPath }, (error, stdout, stderr) => {
            if (stderr || error)
                return reject(stderr || error);
            resolve(process(stdout));
        });
    });
}
exports.getAllRemotes = getAllRemotes;
/**
 * Returns raw remote by given name e.g. – origin
 *
 * @param {Function} exec
 * @param {String} projectPath
 * @param {String} remoteName
 *
 * @return {Promise<String[]>}
 */
function getRemoteByName(exec, projectPath, remoteName) {
    return new Promise((resolve, reject) => {
        exec(`git config --get remote.${remoteName}.url`, { cwd: projectPath }, (error, stdout, stderr) => {
            if (stderr || error)
                return reject(stderr || error);
            resolve([stdout]);
        });
    });
}
exports.getRemoteByName = getRemoteByName;
/**
 * Returns formatted list of remotes.
 *
 * @param {String[]} remotes
 *
 * @return {String[]}
 */
function formatRemotes(remotes) {
    const process = R.compose(R.uniq, R.map(R.replace(/\/$/, "")), R.reject(R.isEmpty), R.map(R.replace(/\n/, "")), R.map(R.trim), R.map((rem) => rem.replace(/\/\/(.+)@github/, "//github")), R.map((rem) => rem.match(/github\.com/) ? rem.replace(/\.git(\b|$)/, "") : rem), R.reject(R.isNil), R.map((rem) => {
        if (rem.match(/^https?:/)) {
            return rem.replace(/\.git(\b|$)/, "");
        }
        else if (rem.match(/@/)) {
            return ("https://" +
                rem
                    .replace(/^.+@/, "")
                    .replace(/\.git(\b|$)/, "")
                    .replace(/:/g, "/"));
        }
        else if (rem.match(/^ftps?:/)) {
            return rem.replace(/^ftp/, "http");
        }
        else if (rem.match(/^ssh:/)) {
            return rem.replace(/^ssh/, "https");
        }
        else if (rem.match(/^git:/)) {
            return rem.replace(/^git/, "https");
        }
    }));
    return process(remotes);
}
exports.formatRemotes = formatRemotes;
/**
 * Returns current branch.
 *
 * @todo: Should work on windows too...
 *
 * @param {Function} exec
 * @param {String} filePath
 * @param {String} defaultBranch
 *
 * @return {Promise<String>}
 */
function getBranches(exec, projectPath, defaultBranch, maxBuffer, excludeCurrentRevision) {
    return new Promise((resolve, reject) => {
        const options = { cwd: projectPath };
        if (maxBuffer)
            options.maxBuffer = maxBuffer;
        exec("git branch --no-color -a", options, (error, stdout, stderr) => {
            if (stderr || error)
                return reject(stderr || error);
            const getCurrentBranch = R.compose(R.trim, R.replace("*", ""), R.find((line) => line.startsWith("*")), R.split("\n"));
            const processBranches = R.compose(R.filter((br) => stdout.match(new RegExp(`remotes\/.*\/${br}`))), R.uniq);
            const currentBranch = getCurrentBranch(stdout);
            const branches = processBranches([currentBranch, defaultBranch]);
            return excludeCurrentRevision
                ? resolve(branches)
                : getCurrentRevision(exec, projectPath).then((currentRevision) => {
                    return resolve(branches.concat(currentRevision));
                });
        });
    });
}
exports.getBranches = getBranches;
/**
 * Returns the commit sha for HEAD.
 *
 * @param {Function} exec
 * @param {String} projectPath
 * @param {String} defaultBranch
 *
 * @return {Promise<String>}
 */
function getCurrentRevision(exec, projectPath) {
    return new Promise((resolve, reject) => {
        exec("git rev-parse HEAD", { cwd: projectPath }, (error, stdout, stderr) => {
            if (stderr || error)
                return reject(stderr || error);
            resolve(stdout.trim());
        });
    });
}
exports.getCurrentRevision = getCurrentRevision;
function formatQuickPickItems(repositoryType, formatters, commandName, relativeFilePath, lines, remotes, branch) {
    return remotes
        .map((remote) => ({
        remote,
        url: chooseFormatter(formatters, repositoryType, remote)(remote, branch, relativeFilePath, lines),
    }))
        .map((remote) => ({
        label: relativeFilePath,
        detail: `${branch} | ${remote.remote}`,
        description: `[${commandName}]`,
        url: remote.url,
    }));
}
exports.formatQuickPickItems = formatQuickPickItems;
/**
 * Builds quick pick items list.
 *
 * @param {String} relativeFilePath
 * @param {SelectedLines} lines
 *
 * @return {String[]}
 */
function prepareQuickPickItems(repositoryType, formatters, commandName, relativeFilePath, lines, [remotes, branches]) {
    if (!branches.length) {
        return [];
    }
    if (branches.length === 1) {
        return formatQuickPickItems(repositoryType, formatters, commandName, relativeFilePath, lines, remotes, branches[0]);
    }
    const processBranches = R.compose(R.flatten, 
    // Join: [1,2,3], [4,5,6], [7,8,9] -> [1,4,7], [2,5,8], [3,6,9]
    (results) => R.map((i) => R.map((item) => item[i], results), R.range(0, results[0].length)), R.map((branch) => formatQuickPickItems(repositoryType, formatters, commandName, relativeFilePath, lines, remotes, branch)));
    return processBranches(branches);
}
exports.prepareQuickPickItems = prepareQuickPickItems;
function formatGithubBranchName(branch) {
    return branch
        .split("/")
        .map((c) => encodeURIComponent(c))
        .join("/");
}
exports.formatGithubBranchName = formatGithubBranchName;
/**
 * Returns true if remote is bitbucket.
 */
function isBitbucket(remote) {
    return !!remote.match("bitbucket.org");
}
exports.isBitbucket = isBitbucket;
/**
 * Returns true if remote is gitlab.
 */
function isGitlab(remote) {
    return !!remote.match("gitlab.com");
}
exports.isGitlab = isGitlab;
function formatBitbucketLinePointer(filePath, lines) {
    if (!lines || !lines.start) {
        return "";
    }
    const fileBasename = `#${path.basename(filePath)}`;
    let linePointer = `${fileBasename}-${lines.start}`;
    if (lines.end && lines.end != lines.start)
        linePointer += `:${lines.end}`;
    return linePointer;
}
exports.formatBitbucketLinePointer = formatBitbucketLinePointer;
function formatGitHubLinePointer(lines) {
    if (!lines || !lines.start) {
        return "";
    }
    let linePointer = `#L${lines.start}`;
    if (lines.end && lines.end != lines.start)
        linePointer += `-L${lines.end}`;
    return linePointer;
}
exports.formatGitHubLinePointer = formatGitHubLinePointer;
function formatGitHubQueryParams(filePath) {
    if (filePath.endsWith(".md")) {
        return "?plain=1";
    }
    return "";
}
exports.formatGitHubQueryParams = formatGitHubQueryParams;
function formatGitlabLinePointer(lines) {
    if (!lines || !lines.start) {
        return "";
    }
    let linePointer = `#L${lines.start}`;
    if (lines.end && lines.end != lines.start)
        linePointer += `-${lines.end}`;
    return linePointer;
}
exports.formatGitlabLinePointer = formatGitlabLinePointer;
/**
 * Shows quick pick window.
 *
 * @param {String[]} quickPickList
 */
function showQuickPickWindow(quickPickList) {
    if (quickPickList.length === 1) {
        return Promise.resolve(quickPickList[0]);
    }
    return vscode_1.window.showQuickPick(quickPickList);
}
exports.showQuickPickWindow = showQuickPickWindow;
/**
 * Opens given quick pick item in browser.
 *
 * @param {String} item
 */
function openQuickPickItem(item) {
    if (!item)
        return;
    open(item.url);
}
exports.openQuickPickItem = openQuickPickItem;
/**
 * Copies given quick pick item to the clipboard.
 *
 * @param {String} item
 */
function copyQuickPickItem(item) {
    if (!item)
        return;
    const url = item.url;
    clipboardy.writeSync(url);
    vscode_1.window.showInformationMessage("Copied to the clipboard: " + url);
}
exports.copyQuickPickItem = copyQuickPickItem;
/**
 * Chooses proper formatter based on repository type.
 */
function chooseFormatter(formatters, repositoryType, remote) {
    switch (repositoryType) {
        case "auto": {
            if (isBitbucket(remote)) {
                return formatters.bitbucket;
            }
            if (isGitlab(remote)) {
                return formatters.gitlab;
            }
            return formatters.github;
        }
        case "github":
            return formatters.github;
        case "bitbucket":
            return formatters.bitbucket;
        case "bitbucket-server":
            return formatters.bitbucketServer;
        case "gitlab":
            return formatters.gitlab;
    }
}
//# sourceMappingURL=common.js.map