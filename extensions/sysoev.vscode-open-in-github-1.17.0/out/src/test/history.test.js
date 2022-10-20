"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const history = require("../history");
suite("historyCommand # formatGitHubHistoryUrl", () => {
    test("should format strings for quick pick view", () => {
        const results = history.formatGitHubHistoryUrl("https://remote.url", "master", "rel/path/to/file.js", { start: 10, end: 20 });
        assert.equal(results, "https://remote.url/commits/master/rel/path/to/file.js");
    });
});
suite("historyCommand # formatBitbucketHistoryUrl", () => {
    test("should format strings for quick pick view", () => {
        const results = history.formatBitbucketHistoryUrl("https://bitbucket.org/some/repo", "master", "rel/path/to/file.js", { start: 10, end: 20 });
        assert.equal(results, "https://bitbucket.org/some/repo/history-node/master/rel/path/to/file.js");
    });
});
//# sourceMappingURL=history.test.js.map