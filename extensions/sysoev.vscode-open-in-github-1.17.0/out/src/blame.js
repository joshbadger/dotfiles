"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGitlabBlameUrl = exports.formatBitbucketBlameUrl = exports.formatGitHubBlameUrl = void 0;
const common_1 = require("./common");
const bitbucketServer_1 = require("./bitbucketServer");
function blameCommand(action) {
    return () => (0, common_1.baseCommand)("blame", action, {
        github: formatGitHubBlameUrl,
        bitbucket: formatBitbucketBlameUrl,
        bitbucketServer: bitbucketServer_1.formatBitbucketServerUrl,
        gitlab: formatGitlabBlameUrl
    });
}
exports.default = blameCommand;
function formatGitHubBlameUrl(remote, branch, filePath, lines) {
    return `${remote}/blame/${(0, common_1.formatGithubBranchName)(branch)}/${filePath}${(0, common_1.formatGitHubLinePointer)(lines)}`;
}
exports.formatGitHubBlameUrl = formatGitHubBlameUrl;
function formatBitbucketBlameUrl(remote, branch, filePath, lines) {
    return `${remote}/annotate/${branch}/${filePath}${(0, common_1.formatBitbucketLinePointer)(filePath, lines)}`;
}
exports.formatBitbucketBlameUrl = formatBitbucketBlameUrl;
function formatGitlabBlameUrl(remote, branch, filePath, lines) {
    return `${remote}/blame/${(0, common_1.formatGithubBranchName)(branch)}/${filePath}${(0, common_1.formatGitlabLinePointer)(lines)}`;
}
exports.formatGitlabBlameUrl = formatGitlabBlameUrl;
//# sourceMappingURL=blame.js.map