"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const blame = require("../blame");
suite("blameCommand # formatGitHubBlameUrl", () => {
    test("should format strings for quick pick view", () => {
        const results = blame.formatGitHubBlameUrl("https://remote.url", "master", "rel/path/to/file.js", { start: 10 });
        assert.equal(results, "https://remote.url/blame/master/rel/path/to/file.js#L10");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatGitHubBlameUrl("https://remote.url", "master", "rel/path/to/file.js", { start: 10, end: 20 });
        assert.equal(results, "https://remote.url/blame/master/rel/path/to/file.js#L10-L20");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatGitHubBlameUrl("https://remote.url", "master", "rel/path/to/file.js", { start: 10, end: 10 });
        assert.equal(results, "https://remote.url/blame/master/rel/path/to/file.js#L10");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatGitHubBlameUrl("https://remote.url", "master", "rel/path/to/file.js");
        assert.equal(results, "https://remote.url/blame/master/rel/path/to/file.js");
    });
});
suite("blameCommand # formatBitbucketBlameUrl", () => {
    test("should format strings for quick pick view", () => {
        const results = blame.formatBitbucketBlameUrl("https://bitbucket.org/some/repo", "master", "rel/path/to/file.js", { start: 10 });
        assert.equal(results, "https://bitbucket.org/some/repo/annotate/master/rel/path/to/file.js#file.js-10");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatBitbucketBlameUrl("https://bitbucket.org/some/repo", "master", "rel/path/to/file.js", { start: 10, end: 20 });
        assert.equal(results, "https://bitbucket.org/some/repo/annotate/master/rel/path/to/file.js#file.js-10:20");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatBitbucketBlameUrl("https://bitbucket.org/some/repo", "master", "rel/path/to/file.js", { start: 10, end: 10 });
        assert.equal(results, "https://bitbucket.org/some/repo/annotate/master/rel/path/to/file.js#file.js-10");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatBitbucketBlameUrl("https://bitbucket.org/some/repo", "master", "rel/path/to/file.js");
        assert.equal(results, "https://bitbucket.org/some/repo/annotate/master/rel/path/to/file.js");
    });
});
suite("blameCommand # formatGitlabBlameUrl", () => {
    test("should format strings for quick pick view", () => {
        const results = blame.formatGitlabBlameUrl("https://gitlab.com/test/repo", "master", "rel/path/to/file.js", { start: 10 });
        assert.equal(results, "https://gitlab.com/test/repo/blame/master/rel/path/to/file.js#L10");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatGitlabBlameUrl("https://gitlab.com/test/repo", "master", "rel/path/to/file.js", { start: 10, end: 20 });
        assert.equal(results, "https://gitlab.com/test/repo/blame/master/rel/path/to/file.js#L10-20");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatGitlabBlameUrl("https://gitlab.com/test/repo", "master", "rel/path/to/file.js", { start: 10, end: 10 });
        assert.equal(results, "https://gitlab.com/test/repo/blame/master/rel/path/to/file.js#L10");
    });
    test("should format strings for quick pick view", () => {
        const results = blame.formatGitlabBlameUrl("https://gitlab.com/test/repo", "master", "rel/path/to/file.js");
        assert.equal(results, "https://gitlab.com/test/repo/blame/master/rel/path/to/file.js");
    });
});
//# sourceMappingURL=blame.test.js.map