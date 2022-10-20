"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBitbucketHistoryUrl = exports.formatGitHubHistoryUrl = void 0;
const common_1 = require("./common");
const bitbucketServer_1 = require("./bitbucketServer");
function historyCommand(action) {
    return () => (0, common_1.baseCommand)("history", action, {
        github: formatGitHubHistoryUrl,
        bitbucket: formatBitbucketHistoryUrl,
        bitbucketServer: bitbucketServer_1.formatBitbucketServerUrl,
        gitlab: formatGitHubHistoryUrl
    });
}
exports.default = historyCommand;
function formatGitHubHistoryUrl(remote, branch, filePath, lines) {
    return `${remote}/commits/${(0, common_1.formatGithubBranchName)(branch)}/${filePath}`;
}
exports.formatGitHubHistoryUrl = formatGitHubHistoryUrl;
function formatBitbucketHistoryUrl(remote, branch, filePath, lines) {
    return `${remote}/history-node/${branch}/${filePath}`;
}
exports.formatBitbucketHistoryUrl = formatBitbucketHistoryUrl;
//# sourceMappingURL=history.js.map