#!/usr/bin/env node
/*
 * lib.github_crud.js (2019.8.24)
 * https://github.com/kaizhu256/node-github-crud
 * this zero-dependency package will provide a simple cli-tool to PUT / GET / DELETE github files
 *
 */



/* istanbul instrument in package github_crud */
// assets.utility2.header.js - start
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let ArrayPrototypeFlat;
    let TextXxcoder;
    let consoleError;
    let debugName;
    let local;
    debugName = "debug" + String("Inline");
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debug_inline
    if (!globalThis[debugName]) {
        consoleError = console.error;
        globalThis[debugName] = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\n" + debugName);
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // polyfill
    ArrayPrototypeFlat = function (depth) {
    /*
     * this function will polyfill Array.prototype.flat
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        depth = (
            globalThis.isNaN(depth)
            ? 1
            : Number(depth)
        );
        if (!depth) {
            return Array.prototype.slice.call(this);
        }
        return Array.prototype.reduce.call(this, function (acc, cur) {
            if (Array.isArray(cur)) {
                // recurse
                acc.push.apply(acc, ArrayPrototypeFlat.call(cur, depth - 1));
            } else {
                acc.push(cur);
            }
            return acc;
        }, []);
    };
    Array.prototype.flat = Array.prototype.flat || ArrayPrototypeFlat;
    Array.prototype.flatMap = Array.prototype.flatMap || function flatMap(
        ...argList
    ) {
    /*
     * this function will polyfill Array.prototype.flatMap
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        return this.map(...argList).flat();
    };
    (function () {
        try {
            globalThis.TextDecoder = (
                globalThis.TextDecoder || require("util").TextDecoder
            );
            globalThis.TextEncoder = (
                globalThis.TextEncoder || require("util").TextEncoder
            );
        } catch (ignore) {}
    }());
    TextXxcoder = function () {
    /*
     * this function will polyfill TextDecoder/TextEncoder
     * https://gist.github.com/Yaffle/5458286
     */
        return;
    };
    TextXxcoder.prototype.decode = function (octets) {
    /*
     * this function will polyfill TextDecoder.prototype.decode
     * https://gist.github.com/Yaffle/5458286
     */
        let bytesNeeded;
        let codePoint;
        let ii;
        let kk;
        let octet;
        let string;
        string = "";
        ii = 0;
        while (ii < octets.length) {
            octet = octets[ii];
            bytesNeeded = 0;
            codePoint = 0;
            if (octet <= 0x7F) {
                bytesNeeded = 0;
                codePoint = octet & 0xFF;
            } else if (octet <= 0xDF) {
                bytesNeeded = 1;
                codePoint = octet & 0x1F;
            } else if (octet <= 0xEF) {
                bytesNeeded = 2;
                codePoint = octet & 0x0F;
            } else if (octet <= 0xF4) {
                bytesNeeded = 3;
                codePoint = octet & 0x07;
            }
            if (octets.length - ii - bytesNeeded > 0) {
                kk = 0;
                while (kk < bytesNeeded) {
                    octet = octets[ii + kk + 1];
                    codePoint = (codePoint << 6) | (octet & 0x3F);
                    kk += 1;
                }
            } else {
                codePoint = 0xFFFD;
                bytesNeeded = octets.length - ii;
            }
            string += String.fromCodePoint(codePoint);
            ii += bytesNeeded + 1;
        }
        return string;
    };
    TextXxcoder.prototype.encode = function (string) {
    /*
     * this function will polyfill TextEncoder.prototype.encode
     * https://gist.github.com/Yaffle/5458286
     */
        let bits;
        let cc;
        let codePoint;
        let ii;
        let length;
        let octets;
        octets = [];
        length = string.length;
        ii = 0;
        while (ii < length) {
            codePoint = string.codePointAt(ii);
            cc = 0;
            bits = 0;
            if (codePoint <= 0x0000007F) {
                cc = 0;
                bits = 0x00;
            } else if (codePoint <= 0x000007FF) {
                cc = 6;
                bits = 0xC0;
            } else if (codePoint <= 0x0000FFFF) {
                cc = 12;
                bits = 0xE0;
            } else if (codePoint <= 0x001FFFFF) {
                cc = 18;
                bits = 0xF0;
            }
            octets.push(bits | (codePoint >> cc));
            cc -= 6;
            while (cc >= 0) {
                octets.push(0x80 | ((codePoint >> cc) & 0x3F));
                cc -= 6;
            }
            ii += (
                codePoint >= 0x10000
                ? 2
                : 1
            );
        }
        return octets;
    };
    globalThis.TextDecoder = globalThis.TextDecoder || TextXxcoder;
    globalThis.TextEncoder = globalThis.TextEncoder || TextXxcoder;
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    local.isWebWorker = (
        local.isBrowser
        && typeof globalThis.importScript === "function"
    );
    // init function
    local.assertOrThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        let err;
        if (passed) {
            return;
        }
        err = (
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is errObj, then leave as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
    };
    local.fsRmrfSync = function (dir) {
    /*
     * this function will sync "rm -rf" <dir>
     */
        let child_process;
        try {
            child_process = require("child_process");
        } catch (ignore) {
            return;
        }
        child_process.spawnSync("rm", [
            "-rf", dir
        ], {
            stdio: [
                "ignore", 1, 2
            ]
        });
    };
    local.fsWriteFileWithMkdirpSync = function (file, data) {
    /*
     * this function will sync write <data> to <file> with "mkdir -p"
     */
        let fs;
        try {
            fs = require("fs");
        } catch (ignore) {
            return;
        }
        // try to write file
        try {
            fs.writeFileSync(file, data);
        } catch (ignore) {
            // mkdir -p
            require("child_process").spawnSync(
                "mkdir",
                [
                    "-p", require("path").dirname(file)
                ],
                {
                    stdio: [
                        "ignore", 1, 2
                    ]
                }
            );
            // rewrite file
            fs.writeFileSync(file, data);
        }
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
     * then overwrite them with items from <source>
     */
        target = target || {};
        Object.keys(source || {}).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    local.value = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.valueOrEmptyList = function (val) {
    /*
     * this function will return <val> or []
     */
        return val || [];
    };
    local.valueOrEmptyObject = function (val) {
    /*
     * this function will return <val> or {}
     */
        return val || {};
    };
    local.valueOrEmptyString = function (val) {
    /*
     * this function will return <val> or ""
     */
        return val || "";
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}((typeof globalThis === "object" && globalThis) || (function () {
    return Function("return this")(); // jslint ignore:line
}())));
// assets.utility2.header.js - end



(function (local) {
"use strict";



/* istanbul ignore next */
// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    // || globalThis.utility2_rollup_old
    // || require("./assets.utility2.rollup.js")
    || globalThis.globalLocal
);
// init exports
if (local.isBrowser) {
    globalThis.utility2_github_crud = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.github_crud = local;



/* validateLineSortedReset */
local.ajax = function (opt, onError) {
/*
 * this function will send an ajax-req
 * with given <opt>.url and callback <onError>
 * with err and timeout handling
 * example usage:
    local.ajax({
        data: "hello world",
        header: {"x-header-hello": "world"},
        method: "POST",
        url: "/index.html"
    }, function (err, xhr) {
        console.log(xhr.statusCode);
        console.log(xhr.responseText);
    });
 */
    let ajaxProgressUpdate;
    let bufferValidateAndCoerce;
    let isDone;
    let local2;
    let onError2;
    let onEvent;
    let stack;
    let streamCleanup;
    let timeout;
    let tmp;
    let xhr;
    let xhrInit;
    // init local2
    local2 = opt.local2 || local.utility2 || {};
    // init function
    ajaxProgressUpdate = local2.ajaxProgressUpdate || function () {
        return;
    };
    bufferValidateAndCoerce = local2.bufferValidateAndCoerce || function (
        buf,
        mode
    ) {
    /*
     * this function will validate and coerce/convert
     * <buf> to Buffer/Uint8Array, or String if <mode> = "string"
     */
        // coerce ArrayBuffer to Buffer
        if (Object.prototype.toString.call(buf) === "[object ArrayBuffer]") {
            buf = new Uint8Array(buf);
        }
        // convert Buffer to utf8
        if (mode === "string" && typeof buf !== "string") {
            buf = String(buf);
        }
        return buf;
    };
    onEvent = function (evt) {
    /*
     * this function will handle events
     */
        if (Object.prototype.toString.call(evt) === "[object Error]") {
            xhr.err = xhr.err || evt;
            xhr.onEvent({
                type: "error"
            });
            return;
        }
        // init statusCode
        xhr.statusCode = (xhr.statusCode || xhr.status) | 0;
        switch (evt.type) {
        case "abort":
        case "error":
        case "load":
            if (isDone) {
                return;
            }
            isDone = true;
            // decrement counter
            ajaxProgressUpdate.counter = Math.max(
                ajaxProgressUpdate.counter - 1,
                0
            );
            ajaxProgressUpdate();
            // handle abort or err event
            switch (!xhr.err && evt.type) {
            case "abort":
            case "error":
                xhr.err = new Error("ajax - event " + evt.type);
                break;
            case "load":
                if (xhr.statusCode >= 400) {
                    xhr.err = new Error(
                        "ajax - statusCode " + xhr.statusCode
                    );
                }
                break;
            }
            // debug statusCode / method / url
            if (xhr.err) {
                xhr.statusCode = xhr.statusCode || 500;
                xhr.err.statusCode = xhr.statusCode;
                tmp = (
                    (
                        local.isBrowser
                        ? "browser"
                        : "node"
                    )
                    + " - " + xhr.statusCode + " " + xhr.method + " " + xhr.url
                    + "\n"
                );
                xhr.err.message = tmp + xhr.err.message;
                xhr.err.stack = tmp + xhr.err.stack;
            }
            // update resHeaders
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
            if (xhr.getAllResponseHeaders) {
                xhr.getAllResponseHeaders().replace((
                    /(.*?):\u0020*(.*?)\r\n/g
                ), function (ignore, key, val) {
                    xhr.resHeaders[key.toLowerCase()] = val;
                });
            }
            // debug ajaxResponse
            xhr.resContentLength = (
                xhr.response
                && (xhr.response.byteLength || xhr.response.length)
            ) | 0;
            xhr.timeElapsed = Date.now() - xhr.timeStart;
            if (xhr.modeDebug) {
                console.error("serverLog - " + JSON.stringify({
                    time: new Date(xhr.timeStart).toISOString(),
                    type: "ajaxResponse",
                    method: xhr.method,
                    url: xhr.url,
                    statusCode: xhr.statusCode,
                    timeElapsed: xhr.timeElapsed,
                    // extra
                    resContentLength: xhr.resContentLength
                }));
            }
            // init responseType
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            switch (xhr.response && xhr.responseType) {
            // init responseText
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
            case "":
            case "text":
                if (typeof xhr.responseText === "string") {
                    break;
                }
                xhr.responseText = bufferValidateAndCoerce(
                    xhr.response,
                    "string"
                );
                break;
            case "arraybuffer":
                xhr.responseBuffer = bufferValidateAndCoerce(xhr.response);
                break;
            }
            // cleanup timerTimeout
            clearTimeout(xhr.timerTimeout);
            // cleanup reqStream and resStream
            streamCleanup(xhr.reqStream);
            streamCleanup(xhr.resStream);
            onError2(xhr.err, xhr);
            break;
        }
    };
    // init onError2
    stack = new Error().stack;
    onError2 = function (err, xhr) {
        if (err && typeof err.stack === "string") {
            err.stack += "\n" + stack;
        }
        onError(err, xhr);
    };
    streamCleanup = function (stream) {
    /*
     * this function will try to end or destroy <stream>
     */
        let err;
        // try to end stream
        try {
            stream.end();
        } catch (errCaught) {
            err = errCaught;
        }
        // if err, then try to destroy stream
        if (err) {
            try {
                stream.destroy();
            } catch (ignore) {}
        }
    };
    xhrInit = function () {
    /*
     * this function will init xhr
     */
        // init opt
        Object.keys(opt).forEach(function (key) {
            if (key[0] !== "_") {
                xhr[key] = opt[key];
            }
        });
        // init timeout
        timeout = xhr.timeout || local2.timeoutDefault || 30000;
        // init default
        local.objectAssignDefault(xhr, {
            corsForwardProxyHost: local2.corsForwardProxyHost,
            headers: {},
            location: (local.isBrowser && location) || {},
            method: "GET",
            responseType: ""
        });
        // init headers
        Object.keys(xhr.headers).forEach(function (key) {
            xhr.headers[key.toLowerCase()] = xhr.headers[key];
        });
        // coerce Uint8Array to Buffer
        if (
            !local.isBrowser
            && !Buffer.isBuffer(xhr.data)
            && Object.prototype.toString.call(xhr.data)
            === "[object Uint8Array]"
        ) {
            Object.setPrototypeOf(xhr.data, Buffer.prototype);
        }
        // init misc
        local2._debugXhr = xhr;
        xhr.onEvent = onEvent;
        xhr.resHeaders = {};
        xhr.timeStart = xhr.timeStart || Date.now();
    };
    // init xhr - XMLHttpRequest
    xhr = (
        local.isBrowser
        && !opt.httpReq
        && !(local2.serverLocalUrlTest && local2.serverLocalUrlTest(opt.url))
        && new XMLHttpRequest()
    );
    // init xhr - http.request
    if (!xhr) {
        xhr = local.value(local2.urlParse || require("url").parse)(opt.url);
        // init xhr
        xhrInit();
        // init xhr - http.request
        xhr = local.value(
            opt.httpReq
            || (local.isBrowser && local2.http.request)
            || require(xhr.protocol.slice(0, -1)).request
        )(xhr, function (resStream) {
        /*
         * this function will read <resStream>
         */
            let bufList;
            bufList = [];
            xhr.resHeaders = resStream.headers || xhr.resHeaders;
            xhr.resStream = resStream;
            xhr.statusCode = resStream.statusCode;
            resStream.dataLength = 0;
            resStream.on("data", function (buf) {
                bufList.push(buf);
            });
            resStream.on("end", function () {
                xhr.response = (
                    local.isBrowser
                    ? bufList[0]
                    : Buffer.concat(bufList)
                );
                resStream.dataLength = (
                    xhr.response.byteLength || xhr.response.length
                );
                xhr.onEvent({
                    type: "load"
                });
            });
            resStream.on("error", xhr.onEvent);
        });
        xhr.abort = function () {
        /*
         * this function will abort xhr-req
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
         */
            xhr.onEvent({
                type: "abort"
            });
        };
        xhr.addEventListener = local.nop;
        xhr.open = local.nop;
        xhr.reqStream = xhr;
        xhr.send = xhr.end;
        xhr.setRequestHeader = local.nop;
        xhr.on("error", onEvent);
    }
    // init xhr
    xhrInit();
    // init timerTimeout
    xhr.timerTimeout = setTimeout(function () {
        xhr.err = xhr.err || new Error(
            "onTimeout - "
            + timeout + " ms - " + "ajax " + xhr.method + " " + xhr.url
        );
        xhr.abort();
        // cleanup reqStream and resStream
        streamCleanup(xhr.reqStream);
        streamCleanup(xhr.resStream);
    }, timeout);
    // increment counter
    ajaxProgressUpdate.counter |= 0;
    ajaxProgressUpdate.counter += 1;
    // handle evt
    xhr.addEventListener("abort", xhr.onEvent);
    xhr.addEventListener("error", xhr.onEvent);
    xhr.addEventListener("load", xhr.onEvent);
    xhr.addEventListener("loadstart", ajaxProgressUpdate);
    xhr.addEventListener("progress", ajaxProgressUpdate);
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
    if (xhr.upload && xhr.upload.addEventListener) {
        xhr.upload.addEventListener("progress", ajaxProgressUpdate);
    }
    // open url - corsForwardProxyHost
    if (local.functionOrNop(local2.corsForwardProxyHostIfNeeded)(xhr)) {
        xhr.open(xhr.method, local2.corsForwardProxyHostIfNeeded(xhr));
        xhr.setRequestHeader(
            "forward-proxy-headers",
            JSON.stringify(xhr.headers)
        );
        xhr.setRequestHeader("forward-proxy-url", xhr.url);
    // open url - default
    } else {
        xhr.open(xhr.method, xhr.url);
    }
    // send headers
    Object.keys(xhr.headers).forEach(function (key) {
        xhr.setRequestHeader(key, xhr.headers[key]);
    });
    // send data
    switch ((xhr.data && xhr.data.constructor) || true) {
    // Blob
    // https://developer.mozilla.org/en-US/docs/Web/API/Blob
    case local2.Blob:
    // FormData
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    case local2.FormData:
        local2.blobRead(xhr.data, function (err, data) {
            if (err) {
                xhr.onEvent(err);
                return;
            }
            // send data
            xhr.send(data);
        });
        break;
    default:
        xhr.send(xhr.data);
    }
    return xhr;
};

local.cliRun = function (opt) {
/*
 * this function will run the cli with given <opt>
 */
    local.cliDict._eval = local.cliDict._eval || function () {
    /*
     * <code>
     * will eval <code>
     */
        globalThis.local = local;
        local.vm.runInThisContext(process.argv[3]);
    };
    local.cliDict._help = local.cliDict._help || function () {
    /*
     *
     * will print help
     */
        let commandList;
        let file;
        let packageJson;
        let text;
        let textDict;
        commandList = [
            {
                argList: "<arg2>  ...",
                description: "usage:",
                command: [
                    "<arg1>"
                ]
            }, {
                argList: "'console.log(\"hello world\")'",
                description: "example:",
                command: [
                    "--eval"
                ]
            }
        ];
        file = __filename.replace((
            /.*\//
        ), "");
        opt = Object.assign({}, opt);
        packageJson = require("./package.json");
        // validate comment
        opt.rgxComment = opt.rgxComment || (
            /\)\u0020\{\n(?:|\u0020{4})\/\*\n(?:\u0020|\u0020{5})\*((?:\u0020<[^>]*?>|\u0020\.\.\.)*?)\n(?:\u0020|\u0020{5})\*\u0020(will\u0020.*?\S)\n(?:\u0020|\u0020{5})\*\/\n(?:\u0020{4}|\u0020{8})\S/
        );
        textDict = {};
        Object.keys(local.cliDict).sort().forEach(function (key, ii) {
            if (key[0] === "_" && key !== "_default") {
                return;
            }
            text = String(local.cliDict[key]);
            if (key === "_default") {
                key = "";
            }
            textDict[text] = textDict[text] || (ii + 2);
            ii = textDict[text];
            if (commandList[ii]) {
                commandList[ii].command.push(key);
                return;
            }
            try {
                commandList[ii] = opt.rgxComment.exec(text);
                commandList[ii] = {
                    argList: local.valueOrEmptyString(
                        commandList[ii][1]
                    ).trim(),
                    command: [
                        key
                    ],
                    description: commandList[ii][2]
                };
            } catch (ignore) {
                local.assertOrThrow(null, new Error(
                    "cliRun - cannot parse comment in COMMAND "
                    + key
                    + ":\nnew RegExp("
                    + JSON.stringify(opt.rgxComment.source)
                    + ").exec(" + JSON.stringify(text).replace((
                        /\\\\/g
                    ), "\u0000").replace((
                        /\\n/g
                    ), "\\n\\\n").replace((
                        /\u0000/g
                    ), "\\\\") + ");"
                ));
            }
        });
        text = "";
        text += packageJson.name + " (" + packageJson.version + ")\n\n";
        text += commandList.filter(function (elem) {
            return elem;
        }).map(function (elem, ii) {
            elem.command = elem.command.filter(function (elem) {
                return elem;
            });
            switch (ii) {
            case 0:
            case 1:
                elem.argList = [
                    elem.argList
                ];
                break;
            default:
                elem.argList = elem.argList.split(" ");
                elem.description = (
                    "# COMMAND "
                    + (elem.command[0] || "<none>") + "\n# "
                    + elem.description
                );
            }
            return (
                elem.description + "\n  " + file
                + "  " + elem.command.sort().join("|") + "  "
                + elem.argList.join("  ")
            );
        }).join("\n\n");
        console.log(text);
    };
    local.cliDict["--eval"] = local.cliDict["--eval"] || local.cliDict._eval;
    local.cliDict["--help"] = local.cliDict["--help"] || local.cliDict._help;
    local.cliDict["-e"] = local.cliDict["-e"] || local.cliDict._eval;
    local.cliDict["-h"] = local.cliDict["-h"] || local.cliDict._help;
    local.cliDict._default = local.cliDict._default || local.cliDict._help;
    local.cliDict.help = local.cliDict.help || local.cliDict._help;
    local.cliDict._interactive = local.cliDict._interactive || function () {
    /*
     *
     * will start interactive-mode
     */
        globalThis.local = local;
        local.value(local.replStart || require("repl").start)({
            useGlobal: true
        });
    };
    local.cliDict["--interactive"] = (
        local.cliDict["--interactive"]
        || local.cliDict._interactive
    );
    local.cliDict["-i"] = local.cliDict["-i"] || local.cliDict._interactive;
    local.cliDict._version = local.cliDict._version || function () {
    /*
     *
     * will print version
     */
        console.log(require(__dirname + "/package.json").version);
    };
    local.cliDict["--version"] = (
        local.cliDict["--version"]
        || local.cliDict._version
    );
    local.cliDict["-v"] = local.cliDict["-v"] || local.cliDict._version;
    // default to --help command if no arguments are given
    if (process.argv.length <= 2) {
        local.cliDict._help();
        return;
    }
    if (local.cliDict[process.argv[2]]) {
        local.cliDict[process.argv[2]]();
        return;
    }
    local.cliDict._default();
};

local.gotoNext = function (opt, onError) {
/*
 * this function will wrap onError inside recursive-function <opt>.gotoNext,
 * and append current-stack to any err
 */
    opt.gotoNext = local.onErrorWithStack(function (err, data, meta) {
        try {
            opt.gotoState += (
                (err && !opt.modeErrorIgnore)
                ? 1000
                : 1
            );
            if (opt.modeDebug) {
                console.error("gotoNext - " + JSON.stringify({
                    gotoState: opt.gotoState,
                    errorMessage: err && err.message
                }));
                if (err && err.stack) {
                    console.error(err.stack);
                }
            }
            onError(err, data, meta);
        } catch (errCaught) {
            // throw errCaught to break infinite recursion-loop
            if (opt.errCaught) {
                local.assertOrThrow(null, opt.errCaught);
            }
            opt.errCaught = errCaught;
            opt.gotoNext(errCaught, data, meta);
        }
    });
    opt.gotoNextData = opt.gotoNext.bind(null, null);
    return opt;
};

local.onErrorDefault = function (err) {
/*
 * this function will if <err> exists, then print it to stderr
 */
    if (err) {
        console.error(err);
    }
    return err;
};

local.onErrorWithStack = function (onError) {
/*
 * this function will create wrapper around <onError>
 * that will append current-stack to err.stack
 */
    let onError2;
    let stack;
    stack = new Error().stack.replace((
        /(.*?)\n.*?$/m
    ), "$1");
    onError2 = function (err, data, meta) {
        // append current-stack to err.stack
        if (
            err
            && typeof err.stack === "string"
            && err !== local.errDefault
            && String(err.stack).indexOf(stack.split("\n")[2]) < 0
        ) {
            err.stack += "\n" + stack;
        }
        onError(err, data, meta);
    };
    // debug onError
    onError2.toString = function () {
        return String(onError);
    };
    return onError2;
};

local.onParallel = function (onError, onEach, onRetry) {
/*
 * this function will create a function that will
 * 1. run async tasks in parallel
 * 2. if counter === 0 or err occurred, then call onError(err)
 */
    let onParallel;
    onError = local.onErrorWithStack(onError);
    onEach = onEach || local.nop;
    onRetry = onRetry || local.nop;
    onParallel = function (err, data) {
        if (onRetry(err, data)) {
            return;
        }
        // decrement counter
        onParallel.counter -= 1;
        // validate counter
        if (!(onParallel.counter >= 0 || err || onParallel.err)) {
            err = new Error(
                "invalid onParallel.counter = " + onParallel.counter
            );
        // ensure onError is run only once
        } else if (onParallel.counter < 0) {
            return;
        }
        // handle err
        if (err) {
            onParallel.err = err;
            // ensure counter <= 0
            onParallel.counter = -Math.abs(onParallel.counter);
        }
        // call onError when isDone
        if (onParallel.counter <= 0) {
            onError(err, data);
            return;
        }
        onEach();
    };
    // init counter
    onParallel.counter = 0;
    // return callback
    return onParallel;
};

local.onParallelList = function (opt, onEach, onError) {
/*
 * this function will
 * 1. async-run onEach in parallel,
 *    with given <opt>.rateLimit and <opt>.retryLimit
 * 2. call <onError> when onParallel.ii + 1 === <opt>.list.length
 */
    let isListEnd;
    let onEach2;
    let onParallel;
    opt.list = opt.list || [];
    onEach2 = function () {
        while (true) {
            if (!(onParallel.ii + 1 < opt.list.length)) {
                isListEnd = true;
                return;
            }
            if (!(onParallel.counter < opt.rateLimit + 1)) {
                return;
            }
            onParallel.ii += 1;
            onEach({
                elem: opt.list[onParallel.ii],
                ii: onParallel.ii,
                list: opt.list,
                retry: 0
            }, onParallel);
        }
    };
    onParallel = local.onParallel(onError, onEach2, function (err, data) {
        if (err && data && data.retry < opt.retryLimit) {
            local.onErrorDefault(err);
            data.retry += 1;
            setTimeout(function () {
                onParallel.counter -= 1;
                onEach(data, onParallel);
            }, 1000);
            return true;
        }
        // restart if opt.list has grown
        if (isListEnd && (onParallel.ii + 1 < opt.list.length)) {
            isListEnd = null;
            onEach2();
        }
    });
    onParallel.ii = -1;
    opt.rateLimit = Number(opt.rateLimit) || 6;
    opt.rateLimit = Math.max(opt.rateLimit, 1);
    opt.retryLimit = Number(opt.retryLimit) || 2;
    onParallel.counter += 1;
    onEach2();
    onParallel();
};
}());



// run shared js-env code - function
(function () {
local.githubCrudAjax = function (opt, onError) {
/*
 * this function will make a low-level content-req to github
 * https://developer.github.com/v3/repos/contents/
 */
    // init opt
    opt = {
        content: opt.content,
        headers: Object.assign({
            // github oauth authentication
            Authorization: "token " + (
                typeof process === "object"
                && process && process.env.GITHUB_TOKEN
            ),
            // bug-workaround
            // https://developer.github.com/v3/#user-agent-required
            "User-Agent": "undefined"
        }, opt.headers),
        httpReq: opt.httpReq,
        message: opt.message,
        method: opt.method || "GET",
        responseJson: {},
        sha: opt.sha,
        url: opt.url
    };
    // parse https://github.com/:owner/:repo/blob/:branch/:path
    opt.url = opt.url.replace((
        /^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/blob\/([^\/]+?)\/(.+)/
    ), "https://api.github.com/repos/$1/contents/$3?branch=$2");
    // parse https://github.com/:owner/:repo/tree/:branch/:path
    opt.url = opt.url.replace((
        /^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/tree\/([^\/]+?)\/(.+)/
    ), "https://api.github.com/repos/$1/contents/$3?branch=$2");
    // parse https://raw.githubusercontent.com/:owner/:repo/:branch/:path
    opt.url = opt.url.replace((
        /^https:\/\/raw.githubusercontent.com\/([^\/]+?\/[^\/]+?)\/([^\/]+?)\/(.+)/
    ), "https://api.github.com/repos/$1/contents/$3?branch=$2");
    // parse https://:owner.github.io/:repo/:path
    opt.url = opt.url.replace((
        /^https:\/\/([^.]+?)\.github\.io\/([^\/]+?)\/(.+)/
    ), "https://api.github.com/repos/$1/$2/contents/$3?branch=gh-pages");
    // parse :owner/:repo
    opt.url = opt.url.replace((
        /^([^\/]+?\/[^\/]+?)$/
    ), "https://github.com/$1");
    opt.url = opt.url.replace((
        /\?branch=(.*)/
    ), function (match0, match1) {
        opt.branch = match1;
        if (opt.method === "GET") {
            match0 = match0.replace("branch", "ref");
        }
        return match0;
    });
    if ((
        /^https:\/\/github\.com\/[^\/]+?\/[^\/]+?$/
    ).test(opt.url)) {
        opt.data = JSON.stringify({
            name: opt.url.split("/")[4]
        });
        switch (opt.method) {
        case "DELETE":
            opt.url = (
                "https://api.github.com/repos/"
                + opt.url.split("/").slice(3).join("/")
            );
            break;
        case "POST_ORG":
            opt.url = (
                "https://api.github.com/orgs/"
                + opt.url.split("/")[3] + "/repos"
            );
            break;
        case "POST_USER":
            opt.url = "https://api.github.com/user/repos";
            break;
        }
        opt.method = opt.method.split("_")[0];
    } else {
        if (opt.url.indexOf("https://api.github.com/repos/") !== 0) {
            console.error("githubCrud - invalid url " + opt.url);
            onError(new Error("invalid url " + opt.url));
            return;
        }
        if (opt.method !== "GET") {
            opt.message = (
                opt.message
                || "[ci skip] " + opt.method + " file "
                + opt.url.replace((
                    /\?.*/
                ), "")
            );
            opt.url += "&message=" + encodeURIComponent(opt.message);
            if (opt.sha) {
                opt.url += "&sha=" + opt.sha;
            }
            opt.data = JSON.stringify({
                branch: opt.branch,
                content: Buffer.from(opt.content || "").toString("base64"),
                message: opt.message,
                sha: opt.sha
            });
        }
    }
    local.ajax(opt, function (err, xhr) {
        console.error("serverLog - " + JSON.stringify({
            time: new Date(xhr.timeStart).toISOString(),
            type: "githubCrudResponse",
            method: xhr.method,
            url: xhr.url,
            statusCode: xhr.statusCode,
            timeElapsed: xhr.timeElapsed
        }));
        local.onErrorDefault(
            err
            && err.statusCode !== 404
            && xhr
            && ("githubCrud - " + xhr.responseText)
        );
        try {
            opt.responseJson = JSON.parse(xhr.responseText);
        } catch (ignore) {}
        onError(
            !(opt.method === "DELETE" && xhr.statusCode === 404) && err,
            opt.responseJson
        );
    });
};

local.githubCrudContentDelete = function (opt, onError) {
/*
 * this function will delete github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#delete-a-file
 */
    opt = {
        httpReq: opt.httpReq,
        message: opt.message,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpReq: opt.httpReq,
                url: opt.url
            }, opt.gotoNext);
            break;
        case 2:
            // delete file with sha
            if (!err && data.sha) {
                local.githubCrudAjax({
                    httpReq: opt.httpReq,
                    message: opt.message,
                    method: "DELETE",
                    sha: data.sha,
                    url: opt.url
                }, opt.gotoNext);
                return;
            }
            // delete tree
            local.onParallelList({
                list: data
            }, function (option2, onParallel) {
                onParallel.counter += 1;
                // recurse
                local.githubCrudContentDelete({
                    httpReq: opt.httpReq,
                    message: opt.message,
                    url: option2.elem.url
                }, onParallel);
            }, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentGet = function (opt, onError) {
/*
 * this function will get github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#get-contents
 */
    opt = {
        httpReq: opt.httpReq,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            local.githubCrudAjax({
                httpReq: opt.httpReq,
                url: opt.url
            }, opt.gotoNext);
            break;
        case 2:
            opt.gotoNext(null, Buffer.from(data.content || "", "base64"));
            break;
        default:
            onError(err, !err && data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentPut = function (opt, onError) {
/*
 * this function will put <opt>.content to github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#create-a-file
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    opt = {
        content: opt.content,
        httpReq: opt.httpReq,
        message: opt.message,
        modeErrorIgnore: true,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpReq: opt.httpReq,
                url: opt.url
            }, opt.gotoNext);
            break;
        case 2:
            // put file with sha
            local.githubCrudAjax({
                content: opt.content,
                httpReq: opt.httpReq,
                message: opt.message,
                method: "PUT",
                sha: data.sha,
                url: opt.url
            }, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentPutFile = function (opt, onError) {
/*
 * this function will put opt.file to github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    opt = {
        file: opt.file,
        httpReq: opt.httpReq,
        message: opt.message,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // get file from url
            if ((
                /^(?:http|https):\/\//
            ).test(opt.file)) {
                local.ajax({
                    httpReq: opt.httpReq,
                    url: opt.file
                }, function (err, res) {
                    opt.gotoNext(err, res && res.data);
                });
                return;
            }
            // get file
            local.fs.readFile(opt.file, opt.gotoNext);
            break;
        case 2:
            local.githubCrudContentPut({
                content: data,
                httpReq: opt.httpReq,
                message: opt.message,
                // resolve file in url
                url: (
                    (
                        /\/$/
                    ).test(opt.url)
                    ? opt.url + local.path.basename(opt.file)
                    : opt.url
                )
            }, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentTouch = function (opt, onError) {
/*
 * this function will touch github-file <opt>.url
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    opt = {
        httpReq: opt.httpReq,
        message: opt.message,
        modeErrorIgnore: true,
        url: opt.url
    };
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // get sha
            local.githubCrudAjax({
                httpReq: opt.httpReq,
                url: opt.url
            }, opt.gotoNext);
            break;
        case 2:
            // put file with sha
            local.githubCrudAjax({
                content: Buffer.from(data.content || "", "base64"),
                httpReq: opt.httpReq,
                message: opt.message,
                method: "PUT",
                sha: data.sha,
                url: opt.url
            }, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.githubCrudContentTouchList = function (opt, onError) {
/*
 * this function will touch github-files <opt>.urlList in parallel
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
    local.onParallelList({
        list: opt.urlList
    }, function (option2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudContentTouch({
            httpReq: opt.httpReq,
            message: opt.message,
            url: option2.elem
        }, onParallel);
    }, onError);
};

local.githubCrudRepoCreate = function (opt, onError) {
/*
 * this function will create github-repo <opt>.url
 * https://developer.github.com/v3/repos/#create
 */
    local.githubCrudAjax({
        httpReq: opt.httpReq,
        method: "POST_ORG",
        url: opt.url
    }, function (err, data) {
        if (!(err && err.statusCode === 404)) {
            onError(err, data);
            return;
        }
        local.githubCrudAjax({
            httpReq: opt.httpReq,
            method: "POST_USER",
            url: opt.url
        }, onError);
    });
};

local.githubCrudRepoCreateList = function (opt, onError) {
/*
 * this function will create github-repos <opt>.urlList in parallel
 * https://developer.github.com/v3/repos/#create
 */
    local.onParallelList({
        list: opt.urlList
    }, function (option2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudRepoCreate({
            httpReq: opt.httpReq,
            url: option2.elem
        }, onParallel);
    }, onError);
};

local.githubCrudRepoDelete = function (opt, onError) {
/*
 * this function will delete github-repo <opt>.url
 * https://developer.github.com/v3/repos/#delete-a-repository
 */
    local.githubCrudAjax({
        httpReq: opt.httpReq,
        method: "DELETE",
        url: opt.url
    }, onError);
};

local.githubCrudRepoDeleteList = function (opt, onError) {
/*
 * this function will delete github-repos <opt>.urlList in parallel
 * https://developer.github.com/v3/repos/#delete-a-repository
 */
    local.onParallelList({
        list: opt.urlList
    }, function (option2, onParallel) {
        onParallel.counter += 1;
        local.githubCrudRepoDelete({
            httpReq: opt.httpReq,
            url: option2.elem
        }, onParallel);
    }, onError);
};
}());



// run node js-env code - init-after
/* istanbul ignore next */
(function () {
if (local.isBrowser) {
    return;
}



local.cliDict = {};
local.cliDict.delete = function () {
/*
 * <fileRemote|dirRemote> <commitMessage>
 * will delete from github <fileRemote|dirRemote>
 */
    local.github_crud.githubCrudContentDelete({
        message: process.argv[4],
        url: process.argv[3]
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict.get = function () {
/*
 * <fileRemote>
 * will get from github <fileRemote>
 */
    local.github_crud.githubCrudContentGet({
        url: process.argv[3]
    }, function (err, data) {
        try {
            process.stdout.write(data);
        } catch (ignore) {}
        process.exit(Boolean(err));
    });
};

local.cliDict.put = function () {
/*
 * <fileRemote> <fileLocal> <commitMessage>
 * will put on github <fileRemote> to <fileLocal>
 */
    local.github_crud.githubCrudContentPutFile({
        message: process.argv[5],
        url: process.argv[3],
        file: process.argv[4]
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict.repo_create = function () {
/*
 * <repoList>
 * will create on github in parallel, comma-separated <repoList>
 */
    local.github_crud.githubCrudRepoCreateList({
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.value)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict.repo_delete = function () {
/*
 * <repoList>
 * will delete from github in parallel, comma-separated <repoList>
 */
    local.github_crud.githubCrudRepoDeleteList({
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.value)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

local.cliDict.touch = function () {
/*
 * <fileRemoteList> <commitMessage>
 * will touch on github in parallel, comma-separated <fileRemoteList>
 */
    local.github_crud.githubCrudContentTouchList({
        message: process.argv[4],
        urlList: process.argv[3].split(
            /[,\s]/g
        ).filter(local.value)
    }, function (err) {
        process.exit(Boolean(err));
    });
};

// run the cli
if (module === require.main && !globalThis.utility2_rollup) {
    local.cliRun();
}
}());
}());
