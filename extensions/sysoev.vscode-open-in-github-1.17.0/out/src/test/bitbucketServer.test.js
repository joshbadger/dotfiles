"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const bitbucketServer_1 = require("../bitbucketServer");
suite("#formatBitbucketServerFileUrl", () => {
    test("should format strings for quick pick view", () => {
        const results = (0, bitbucketServer_1.formatBitbucketServerUrl)("https://bitbucket.org/my-project/my-repo", "master", "rel/path/to/file.js", { start: 10 });
        assert.equal(results, "https://bitbucket.org/projects/my-project/repos/my-repo/browse/rel/path/to/file.js?at=refs%2Fheads%2Fmaster#10");
    });
    test("should format strings for quick pick view", () => {
        const results = (0, bitbucketServer_1.formatBitbucketServerUrl)("https://bitbucket.org/my-project/my-repo", "master", "rel/path/to/file.js", { start: 10, end: 20 });
        assert.equal(results, "https://bitbucket.org/projects/my-project/repos/my-repo/browse/rel/path/to/file.js?at=refs%2Fheads%2Fmaster#10-20");
    });
    test("should format strings for quick pick view", () => {
        const results = (0, bitbucketServer_1.formatBitbucketServerUrl)("https://bitbucket.org/my-project/my-repo", "master", "rel/path/to/file.js", { start: 10, end: 10 });
        assert.equal(results, "https://bitbucket.org/projects/my-project/repos/my-repo/browse/rel/path/to/file.js?at=refs%2Fheads%2Fmaster#10");
    });
    test("should format strings for quick pick view", () => {
        const results = (0, bitbucketServer_1.formatBitbucketServerUrl)("https://bitbucket.org/my-project/my-repo", "master", "rel/path/to/file.js");
        assert.equal(results, "https://bitbucket.org/projects/my-project/repos/my-repo/browse/rel/path/to/file.js?at=refs%2Fheads%2Fmaster");
    });
});
//# sourceMappingURL=bitbucketServer.test.js.map