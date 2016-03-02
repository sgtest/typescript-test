/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var utils_1 = require("./utils");
var querystring = require("querystring");
var url = require("url");
var https = require("https");
var linkPattern = /(?:^|,\s*)<([^>]+)>; rel="([^"]+)"/g;
var noCachePattern = /(?:^|,)\s*no-cache\s*(?:=|,|$)/;
var noStorePattern = /(?:^|,)\s*no-store\s*(?:,|$)/;
var mustRevalidatePattern = /(?:^|,)\s*must-revalidate\s*(?:,|$)/;
var GitHubClient = (function () {
    function GitHubClient(options) {
        this.cache = new Map();
        if (options) {
            this.token = options.token;
        }
    }
    GitHubClient.prototype.getRateLimit = function () {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((_a = ["/rate_limit"], _a.raw = ["/rate_limit"], uri(_a)));
            var _a;
        });
    };
    GitHubClient.prototype.listMyRepositories = function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/user/repos"], _a.raw = ["/user/repos"], uri(_a)), options);
            var _a;
        });
    };
    GitHubClient.prototype.listUserRepositories = function (username, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/users/", "/repos"], _a.raw = ["/users/", "/repos"], uri(_a, username)), options);
            var _a;
        });
    };
    GitHubClient.prototype.listOrganizationRepositories = function (org, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/orgs/", "/repos"], _a.raw = ["/orgs/", "/repos"], uri(_a, org)), options);
            var _a;
        });
    };
    GitHubClient.prototype.listPublicRepositories = function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repositories"], _a.raw = ["/repositories"], uri(_a)), options);
            var _a;
        });
    };
    GitHubClient.prototype.getRepository = function (owner, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((_a = ["/repos/", "/", ""], _a.raw = ["/repos/", "/", ""], uri(_a, owner, repo)));
            var _a;
        });
    };
    GitHubClient.prototype.listContributors = function (owner, repo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/contributors"], _a.raw = ["/repos/", "/", "/contributors"], uri(_a, owner, repo)), options);
            var _a;
        });
    };
    GitHubClient.prototype.getLanguages = function (owner, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((_a = ["/repos/", "/", "/languages"], _a.raw = ["/repos/", "/", "/languages"], uri(_a, owner, repo)));
            var _a;
        });
    };
    GitHubClient.prototype.listTeams = function (owner, repo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/teams"], _a.raw = ["/repos/", "/", "/teams"], uri(_a, owner, repo)), options);
            var _a;
        });
    };
    GitHubClient.prototype.listTags = function (owner, repo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/tags"], _a.raw = ["/repos/", "/", "/tags"], uri(_a, owner, repo)), options);
            var _a;
        });
    };
    GitHubClient.prototype.listBranches = function (owner, repo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/branches"], _a.raw = ["/repos/", "/", "/branches"], uri(_a, owner, repo)), options);
            var _a;
        });
    };
    GitHubClient.prototype.getBranch = function (owner, repo, branch) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((_a = ["/repos/", "/", "/branches/", ""], _a.raw = ["/repos/", "/", "/branches/", ""], uri(_a, owner, repo, branch)));
            var _a;
        });
    };
    GitHubClient.prototype.listComments = function (owner, repo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/comments"], _a.raw = ["/repos/", "/", "/comments"], uri(_a, owner, repo)), options);
            var _a;
        });
    };
    GitHubClient.prototype.listCommitComments = function (owner, repo, ref, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/commits/", "/comments"], _a.raw = ["/repos/", "/", "/commits/", "/comments"], uri(_a, owner, repo, ref)), options);
            var _a;
        });
    };
    GitHubClient.prototype.getComment = function (owner, repo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((_a = ["/repos/", "/", "/comments/", ""], _a.raw = ["/repos/", "/", "/comments/", ""], uri(_a, owner, repo, id)));
            var _a;
        });
    };
    GitHubClient.prototype.listCommits = function (owner, repo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/commits"], _a.raw = ["/repos/", "/", "/commits"], uri(_a, owner, repo)), options);
            var _a;
        });
    };
    GitHubClient.prototype.getCommit = function (owner, repo, sha) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((_a = ["/repos/", "/", "/commits/", ""], _a.raw = ["/repos/", "/", "/commits/", ""], uri(_a, owner, repo, sha)));
            var _a;
        });
    };
    GitHubClient.prototype.compareCommits = function (owner, repo, base, head) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.get((_a = ["/repos/", "/", "/compare/", "...", ""], _a.raw = ["/repos/", "/", "/compare/", "...", ""], uri(_a, owner, repo, base, head)));
            return result;
            var _a;
        });
    };
    GitHubClient.prototype.listPullRequests = function (owner, repo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/pulls"], _a.raw = ["/repos/", "/", "/pulls"], uri(_a, owner, repo)), options);
            var _a;
        });
    };
    GitHubClient.prototype.getPullRequest = function (owner, repo, number) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((_a = ["/repos/", "/", "/pulls/", ""], _a.raw = ["/repos/", "/", "/pulls/", ""], uri(_a, owner, repo, number)));
            var _a;
        });
    };
    GitHubClient.prototype.listPullRequestCommits = function (owner, repo, number, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/pulls/", "/commits"], _a.raw = ["/repos/", "/", "/pulls/", "/commits"], uri(_a, owner, repo, number)), options);
            var _a;
        });
    };
    GitHubClient.prototype.listPullRequestFiles = function (owner, repo, number, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/pulls/", "/files"], _a.raw = ["/repos/", "/", "/pulls/", "/files"], uri(_a, owner, repo, number)), options);
            var _a;
        });
    };
    GitHubClient.prototype.listPullRequestComments = function (owner, repo, number, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list((_a = ["/repos/", "/", "/pulls/", "/comments"], _a.raw = ["/repos/", "/", "/pulls/", "/comments"], uri(_a, owner, repo, number)), options);
            var _a;
        });
    };
    GitHubClient.prototype.getPullRequestComment = function (owner, repo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get((_a = ["/repos/", "/", "/pulls/comments/", ""], _a.raw = ["/repos/", "/", "/pulls/comments/", ""], uri(_a, owner, repo, id)));
            var _a;
        });
    };
    GitHubClient.prototype.list = function (path, options) {
        return __awaiter(this, void 0, Promise, function* () {
            var responseMessage = yield this.sendAsync(this.prepareRequest("GET", path, options));
            var content = yield responseMessage.content;
            var result = JSON.parse(content);
            var link = responseMessage.headers.link;
            for (var match = linkPattern.exec(link); match; match = linkPattern.exec(link)) {
                var parsedUrl = url.parse(match[1], true);
                if (match[2] === "next") {
                    result.next = Object.assign({}, options, parsedUrl.query);
                }
                else if (match[2] === "last") {
                    result.last = Object.assign({}, options, parsedUrl.query);
                }
            }
            return result;
        });
    };
    GitHubClient.prototype.get = function (path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var responseMessage = yield this.sendAsync(this.prepareRequest("GET", path, options));
            var content = yield responseMessage.content;
            var result = JSON.parse(content);
            return result;
        });
    };
    GitHubClient.prototype.prepareRequest = function (method, requestUrl, query) {
        var parsedUrl = url.parse(url.resolve("https://api.github.com/", requestUrl), true);
        var hostname = "api.github.com";
        var headers = {
            "User-Agent": "github-api (NodeJS v4.0.0)",
            "Accept": "application/vnd.github.v3+json"
        };
        if (this.token) {
            headers["Authorization"] = "token " + this.token;
        }
        var pathname = parsedUrl.pathname;
        var search = querystring.stringify(Object.assign({}, parsedUrl.query, query));
        var path = search ? pathname + "?" + search : pathname;
        return { method: method, hostname: hostname, path: path, headers: headers };
    };
    GitHubClient.prototype.sendAsync = function (requestMessage) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var requestNoCache = noCachePattern.test(requestMessage.headers["Cache-Control"]);
            var requestNoStore = noStorePattern.test(requestMessage.headers["Cache-Control"]);
            var cachedResponse;
            if (!requestNoCache && !requestNoStore) {
                cachedResponse = _this.cache.get(requestMessage.path);
                if (cachedResponse) {
                    if (!mustRevalidatePattern.test(cachedResponse.headers["cache-control"]) &&
                        Date.parse(cachedResponse.headers["expires"]) > Date.now()) {
                        resolve(cachedResponse);
                        return;
                    }
                    if (cachedResponse.headers["etag"]) {
                        requestMessage.headers["If-None-Modified"] = cachedResponse.headers["etag"];
                    }
                    if (cachedResponse.headers["last-modified"]) {
                        requestMessage.headers["If-Modified-Since"] = cachedResponse.headers["last-modified"];
                    }
                }
            }
            var nodeRequest = https.request(requestMessage, function (nodeResponse) {
                if (nodeResponse.statusCode === 304 && cachedResponse) {
                    resolve(cachedResponse);
                    return;
                }
                var responseMessage = Object.freeze({
                    httpVersion: nodeResponse.httpVersion,
                    statusCode: nodeResponse.statusCode,
                    statusMessage: nodeResponse.statusMessage,
                    headers: nodeResponse.headers,
                    content: new utils_1.LazyPromise(function (resolve, reject) {
                        if (nodeResponse.statusCode < 200 || nodeResponse.statusCode >= 300) {
                            throw new Error(nodeResponse.statusCode + " " + nodeResponse.statusMessage);
                        }
                        var data = "";
                        nodeResponse.setEncoding("utf8");
                        nodeResponse.on("data", function (chunk) { data += chunk; });
                        nodeResponse.on("error", reject);
                        nodeResponse.on("end", function () { resolve(data); });
                    })
                });
                var responseNoCache = noCachePattern.test(nodeResponse.headers["cache-control"]);
                var responseNoStore = noStorePattern.test(nodeResponse.headers["cache-control"]);
                if (!requestNoCache && !requestNoStore && !responseNoCache && !responseNoStore &&
                    (responseMessage.headers["etag"] || responseMessage.headers["last-modified"] || responseMessage.headers["expires"])) {
                    _this.cache.set(requestMessage.path, responseMessage);
                }
                else if (cachedResponse) {
                    _this.cache.delete(requestMessage.path);
                }
                resolve(responseMessage);
            });
            nodeRequest.once("error", reject);
            nodeRequest.end();
        });
    };
    return GitHubClient;
}());
exports.GitHubClient = GitHubClient;
function uri(template) {
    var text = template[0];
    for (var i = 1; i < template.length; i++) {
        text += encodeURIComponent(String(arguments[i]));
        text += template[i];
    }
    return text;
}
