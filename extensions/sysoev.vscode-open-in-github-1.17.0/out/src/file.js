"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGitlabFileUrl = exports.formatBitbucketFileUrl = exports.formatGitHubFileUrl = void 0;
const common_1 = require("./common");
const bitbucketServer_1 = require("./bitbucketServer");
function fileCommand(action) {
    return () => (0, common_1.baseCommand)("file", action, {
        github: formatGitHubFileUrl,
        bitbucket: formatBitbucketFileUrl,
        bitbucketServer: bitbucketServer_1.formatBitbucketServerUrl,
        gitlab: formatGitlabFileUrl,
    });
}
exports.default = fileCommand;
function formatGitHubFileUrl(remote, branch, filePath, lines) {
    return `${remote}/blob/${(0, common_1.formatGithubBranchName)(branch)}/${filePath}${(0, common_1.formatGitHubQueryParams)(filePath)}${(0, common_1.formatGitHubLinePointer)(lines)}`;
}
exports.formatGitHubFileUrl = formatGitHubFileUrl;
function formatBitbucketFileUrl(remote, branch, filePath, lines) {
    return `${remote}/src/${branch}/${filePath}${(0, common_1.formatBitbucketLinePointer)(filePath, lines)}`;
}
exports.formatBitbucketFileUrl = formatBitbucketFileUrl;
function formatGitlabFileUrl(remote, branch, filePath, lines) {
    return `${remote}/blob/${(0, common_1.formatGithubBranchName)(branch)}/${filePath}${(0, common_1.formatGitlabLinePointer)(lines)}`;
}
exports.formatGitlabFileUrl = formatGitlabFileUrl;
//# sourceMappingURL=file.js.map