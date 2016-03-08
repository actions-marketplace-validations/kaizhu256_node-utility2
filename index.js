/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init global.debug_print
        local.global['debug_print'.replace('_p', 'P')] = function (arg) {
        /*
         * this function will both print the arg to stderr and return it
         */
            // debug arguments
            local.utility2['_debug_printArguments'.replace('_p', 'P')] = arguments;
            console.error('\n\n\ndebug_print'.replace('_p', 'P'));
            console.error.apply(console, arguments);
            console.error();
            // return arg for inspection
            return arg;
        };
        // init global.debug_printCallback
        local.global['debug_printCallback'.replace('_p', 'P')] = function (onError) {
        /*
         * this function will inject debug_print into the callback onError
         */
            return function () {
                local.global['debug_print'.replace('_p', 'P')].apply(null, arguments);
                onError.apply(null, arguments);
            };
        };
        // init lib utility2
        local.utility2 = { assetsDict: {}, cacheDict: {}, local: local, taskUpsertDict: {} };
        local.utility2.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };
        // init lib bcrypt
        local.utility2.bcrypt = local.modeJs === 'browser'
            ? local.global.utility2_bcrypt
            : require('./lib.bcrypt.js');
        // init lib cryptojs
        local.utility2.cryptojs = local.modeJs === 'browser'
            ? local.global.utility2_cryptojs
            : require('./lib.cryptojs.js');
        // init lib istanbul
        local.utility2.istanbul = local.modeJs === 'browser'
            ? local.global.utility2_istanbul
            : require('./lib.istanbul.js');
        // init lib jslint
        local.utility2.jslint = local.modeJs === 'browser'
            ? local.global.utility2_jslint
            : require('./lib.jslint.js');
        // init lib uglifyjs
        local.utility2.uglifyjs = local.modeJs === 'browser'
            ? local.global.utility2_uglifyjs
            : require('./lib.uglifyjs.js');
        // init templates
/* jslint-ignore-begin */
// https://img.shields.io/badge/last_build-0000_00_00_00_00_00_UTC_--_master_--_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-0077ff.svg?style=flat
local.utility2.templateBuildBadgeSvg =
'<svg xmlns="http://www.w3.org/2000/svg" width="563" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="563" height="20" fill="#555"/><rect rx="0" x="61" width="502" height="20" fill="#07f"/><path fill="#07f" d="M61 0h4v20h-4z"/><rect rx="0" width="563" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="31.5" y="15" fill="#010101" fill-opacity=".3">last build</text><text x="31.5" y="14">last build</text><text x="311" y="15" fill="#010101" fill-opacity=".3">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text><text x="311" y="14">0000-00-00 00:00:00 UTC - master - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</text></g></svg>';



local.utility2.templateDocApiHtml = '\
<style>\n\
.docApiDiv {\n\
    font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n\
}\n\
.docApiDiv a {\n\
    color: #55f;\n\
    font-weight: bold;\n\
    text-decoration: none;\n\
}\n\
.docApiDiv a:hover {\n\
    text-decoration: underline;\n\
}\n\
.docApiSectionDiv {\n\
    border-top: 1px solid;\n\
    margin-top: 20px;\n\
}\n\
.docApiCodeCommentSpan {\n\
    background-color: #bbf;\n\
    color: #000;\n\
    display: block;\n\
}\n\
.docApiCodeKeywordSpan {\n\
    color: #f00;\n\
    font-weight: bold;\n\
}\n\
.docApiCodePre {\n\
    background-color: #eef;\n\
    border: 1px solid;\n\
    border-radius: 5px;\n\
    color: #777;\n\
    padding: 5px;\n\
    white-space: pre-wrap;\n\
}\n\
.docApiSignatureSpan {\n\
    color: #777;\n\
}\n\
</style>\n\
<div class="docApiDiv">\n\
<h1>api documentation</h1>\n\
<div class="docApiSectionDiv" id="toc"><h1>table of contents</h1><ul>\n\
{{#moduleList}}\n\
<li><a href="#{{id}}">module {{name}}</a><ul>\n\
{{#elementList}}\n\
    <li><a class="docApiElementLiA" href="#{{id}}">\n\
    {{name}}\n\
    <span class="docApiSignatureSpan">{{signature}}</span>\n\
    </a></li>\n\
{{/elementList}}\n\
</ul></li>\n\
{{/moduleList}}\n\
</ul></div>\n\
{{#moduleList}}\n\
<div class="docApiSectionDiv">\n\
<h1><a href="#{{id}}" id="{{id}}">module {{name}}</a></h1>\n\
{{#elementList}}\n\
    <h2><a href="#{{id}}" id="{{id}}">\n\
        {{name}}\n\
        <span class="docApiSignatureSpan">{{signature}}</span>\n\
    </a></h2>\n\
    {{#extra}}\n\
        <ul>\n\
        <li>description and source code<pre class="docApiCodePre">{{source}}</pre></li>\n\
        <li>example usage<pre class="docApiCodePre">{{example}}</pre></li>\n\
        </ul>\n\
    {{/extra}}\n\
{{/elementList}}\n\
</div>\n\
{{/moduleList}}\n\
</div>\n\
';



local.utility2.templateIndexHtml = '';



// https://img.shields.io/badge/tests_failed-999-dd0000.svg?style=flat
local.utility2.templateTestReportBadgeSvg =
'<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="103" height="20" fill="#555"/><rect rx="0" x="72" width="31" height="20" fill="#d00"/><path fill="#d00" d="M72 0h4v20h-4z"/><rect rx="0" width="103" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="37" y="15" fill="#010101" fill-opacity=".3">tests failed</text><text x="37" y="14">tests failed</text><text x="86.5" y="15" fill="#010101" fill-opacity=".3">999</text><text x="86.5" y="14">999</text></g></svg>';



local.utility2.templateTestReportHtml = '\
<style>\n\
.testReportPlatformDiv {\n\
    border: 1px solid;\n\
    border-radius: 5px;\n\
    font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n\
    margin-top: 20px;\n\
    padding: 0 10px 10px 10px;\n\
    text-align: left;\n\
}\n\
.testReportPlatformPre {\n\
    background-color: #fdd;\n\
    border: 1px;\n\
    border-radius: 0 0 5px 5px;\n\
    border-top-style: solid;\n\
    margin-bottom: 0;\n\
    padding: 10px;\n\
}\n\
.testReportPlatformPreHidden {\n\
    display: none;\n\
}\n\
.testReportPlatformScreenCaptureImg {\n\
    border: 1px solid;\n\
    border-color: #000;\n\
    margin: 5px 0 5px 0;\n\
    max-height:256px;\n\
    max-width:512px;\n\
}\n\
.testReportPlatformSpan {\n\
    display: inline-block;\n\
    width: 8em;\n\
}\n\
.testReportPlatformTable {\n\
    border: 1px;\n\
    border-top-style: solid;\n\
    text-align: left;\n\
    width: 100%;\n\
}\n\
.testReportPlatformTr:nth-child(odd) {\n\
    background-color: #bfb;\n\
}\n\
.testReportTestFailed {\n\
    background-color: #f99;\n\
}\n\
.testReportTestPending {\n\
    background-color: #99f;\n\
}\n\
.testReportSummaryDiv {\n\
    background-color: #bfb;\n\
}\n\
.testReportSummarySpan {\n\
    display: inline-block;\n\
    width: 6.5em;\n\
}\n\
</style>\n\
<div class="testReportPlatformDiv testReportSummaryDiv">\n\
<h2>{{envDict.npm_package_name}} test-report summary</h2>\n\
<h4>\n\
    <span class="testReportSummarySpan">version</span>-\n\
        {{envDict.npm_package_version}}<br>\n\
    <span class="testReportSummarySpan">test date</span>- {{date}}<br>\n\
    <span class="testReportSummarySpan">commit info</span>-\n\
        {{CI_COMMIT_INFO htmlSafe}}<br>\n\
</h4>\n\
<table class="testReportPlatformTable">\n\
<thead><tr>\n\
    <th>total time-elapsed</th>\n\
    <th>total tests failed</th>\n\
    <th>total tests passed</th>\n\
    <th>total tests pending</th>\n\
</tr></thead>\n\
<tbody><tr>\n\
    <td>{{timeElapsed}} ms</td>\n\
    <td class="{{testsFailedClass}}">{{testsFailed}}</td>\n\
    <td>{{testsPassed}}</td>\n\
    <td>{{testsPending}}</td>\n\
</tr></tbody>\n\
</table>\n\
</div>\n\
{{#testPlatformList}}\n\
<div class="testReportPlatformDiv">\n\
<h4>\n\
    {{testPlatformNumber}}. {{name htmlSafe}}<br>\n\
    {{screenCapture}}\n\
    <span class="testReportPlatformSpan">time-elapsed</span>- {{timeElapsed}} ms<br>\n\
    <span class="testReportPlatformSpan">tests failed</span>- {{testsFailed}}<br>\n\
    <span class="testReportPlatformSpan">tests passed</span>- {{testsPassed}}<br>\n\
    <span class="testReportPlatformSpan">tests pending</span>- {{testsPending}}<br>\n\
</h4>\n\
<table class="testReportPlatformTable">\n\
<thead><tr>\n\
    <th>#</th>\n\
    <th>time-elapsed</th>\n\
    <th>status</th>\n\
    <th>test-case</th>\n\
</tr></thead>\n\
<tbody>\n\
{{#testCaseList}}\n\
<tr class="testReportPlatformTr">\n\
    <td>{{testCaseNumber}}</td>\n\
    <td>{{timeElapsed}} ms</td>\n\
    <td class="{{testReportTestStatusClass}}">{{status}}</td>\n\
    <td>{{name}}</td>\n\
</tr>\n\
{{/testCaseList}}\n\
</tbody>\n\
</table>\n\
<pre class="{{testReportPlatformPreClass}}">\n\
{{#errorStackList}}\n\
{{errorStack htmlSafe}}\n\
{{/errorStackList}}\n\
</pre>\n\
</div>\n\
{{/testPlatformList}}\n\
';
/* jslint-ignore-end */
    }());



    // run shared js-env code - function
    (function () {
        local._ajaxProgressIncrement = function () {
        /*
         * this function will increment ajaxProgressBar
         */
            // this algorithm can indefinitely increment the ajaxProgressBar
            // with successively smaller increments without ever reaching 100%
            local._ajaxProgressState += 1;
            local._ajaxProgressUpdate(
                100 - 75 * Math.exp(-0.125 * local._ajaxProgressState) + '%',
                'ajaxProgressBarDivLoading',
                'loading'
            );
        };

        // init list of xhr used in ajaxProgress
        local._ajaxProgressList = [];

        // init _ajaxProgressState
        local._ajaxProgressState = 0;

        local._ajaxProgressUpdate = function (width, type, label) {
        /*
         * this function will visually update ajaxProgressBar
         */
            var ajaxProgressBarDiv;
            ajaxProgressBarDiv = document.querySelector('.ajaxProgressBarDiv');
            ajaxProgressBarDiv.style.width = width;
            ajaxProgressBarDiv.className = ajaxProgressBarDiv.className
                .replace((/ajaxProgressBarDiv\w+/), type);
            ajaxProgressBarDiv.innerHTML = label;
        };

        // init lib _http
        local._http = {};

        // init _http.IncomingMessage
        local._http.IncomingMessage = function (xhr) {
        /*
         * https://nodejs.org/api/all.html#all_http_incomingmessage
         * An IncomingMessage object is created by http.Server or http.ClientRequest
         * and passed as the first argument to the 'request' and 'response' event respectively
         */
            this.headers = {};
            this.method = xhr.method;
            this.onEvent = document.createDocumentFragment('onEvent');
            this.readable = true;
            this.url = xhr.url;
        };

        local._http.IncomingMessage.prototype.addListener = function (event, onEvent) {
        /*
         * https://nodejs.org/api/all.html#all_emitter_addlistener_event_listener
         * Adds a listener to the end of the listeners array for the specified event
         */
            this.onEvent.addEventListener(event, function (event) {
                onEvent(event.data);
            });
            if (this.readable && event === 'end') {
                this.readable = null;
                this.emit('data', this.data);
                this.emit('end');
            }
            return this;
        };

        local._http.IncomingMessage.prototype.emit = function (event, data) {
        /*
         * https://nodejs.org/api/all.html#all_emitter_emit_event_arg1_arg2
         * Calls each of the listeners in order with the supplied arguments
         */
            event = new local.global.Event(event);
            event.data = data;
            this.onEvent.dispatchEvent(event);
        };

        // https://nodejs.org/api/all.html#all_emitter_on_event_listener
        local._http.IncomingMessage.prototype.on =
            local._http.IncomingMessage.prototype.addListener;

        local._http.IncomingMessage.prototype.pipe = function (writable) {
        /*
         * https://nodejs.org/api/all.html#all_readable_pipe_destination_options
         * This method pulls all the data out of a readable stream, and writes it to the
         * supplied destination, automatically managing the flow so that the destination is not
         * overwhelmed by a fast readable stream
         */
            this.on('data', function (chunk) {
                writable.write(chunk);
            });
            this.on('end', function () {
                writable.end();
            });
            return writable;
        };

        // init _http.ServerResponse
        local._http.ServerResponse = function (onResponse) {
        /*
         * https://nodejs.org/api/all.html#all_class_http_serverresponse
         * This object is created internally by a HTTP server--not by the user
         */
            this.data = '';
            this.headers = {};
            this.onEvent = document.createDocumentFragment('onEvent');
            this.onResponse = onResponse;
            this.statusCode = 200;
        };

        // https://nodejs.org/api/all.html#all_emitter_addlistener_event_listener
        local._http.ServerResponse.prototype.addListener =
            local._http.IncomingMessage.prototype.addListener;

        // https://nodejs.org/api/all.html#all_emitter_emit_event_arg1_arg2
        local._http.ServerResponse.prototype.emit =
            local._http.IncomingMessage.prototype.emit;

        local._http.ServerResponse.prototype.end = function (data) {
        /* https://nodejs.org/api/all.html#all_response_end_data_encoding_callback
         * This method signals to the server that all of the response headers
         * and body have been sent
         */
            // emit writable events
            this.data += data || '';
            this.emit('finish');
            // emit readable events
            this.onResponse(this);
            this.emit('data', this.data);
            this.emit('end');
        };

        // https://nodejs.org/api/all.html#all_emitter_on_event_listener
        local._http.ServerResponse.prototype.on =
            local._http.IncomingMessage.prototype.addListener;

        // https://nodejs.org/api/all.html#all_response_setheader_name_value
        local._http.ServerResponse.prototype.setHeader = function (key, value) {
            this.headers[key.toLowerCase()] = value;
        };

        local._http.ServerResponse.prototype.write = function (data) {
        /*
         * https://nodejs.org/api/all.html#all_response_write_chunk_encoding_callback
         * This sends a chunk of the response body
         */
            this.data += data;
        };

        local._http.STATUS_CODES = {
            100: 'Continue',
            101: 'Switching Protocols',
            102: 'Processing',
            200: 'OK',
            201: 'Created',
            202: 'Accepted',
            203: 'Non-Authoritative Information',
            204: 'No Content',
            205: 'Reset Content',
            206: 'Partial Content',
            207: 'Multi-Status',
            208: 'Already Reported',
            226: 'IM Used',
            300: 'Multiple Choices',
            301: 'Moved Permanently',
            302: 'Found',
            303: 'See Other',
            304: 'Not Modified',
            305: 'Use Proxy',
            307: 'Temporary Redirect',
            308: 'Permanent Redirect',
            400: 'Bad Request',
            401: 'Unauthorized',
            402: 'Payment Required',
            403: 'Forbidden',
            404: 'Not Found',
            405: 'Method Not Allowed',
            406: 'Not Acceptable',
            407: 'Proxy Authentication Required',
            408: 'Request Timeout',
            409: 'Conflict',
            410: 'Gone',
            411: 'Length Required',
            412: 'Precondition Failed',
            413: 'Payload Too Large',
            414: 'URI Too Long',
            415: 'Unsupported Media Type',
            416: 'Range Not Satisfiable',
            417: 'Expectation Failed',
            418: 'I\'m a teapot',
            421: 'Misdirected Request',
            422: 'Unprocessable Entity',
            423: 'Locked',
            424: 'Failed Dependency',
            425: 'Unordered Collection',
            426: 'Upgrade Required',
            428: 'Precondition Required',
            429: 'Too Many Requests',
            431: 'Request Header Fields Too Large',
            500: 'Internal Server Error',
            501: 'Not Implemented',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
            505: 'HTTP Version Not Supported',
            506: 'Variant Also Negotiates',
            507: 'Insufficient Storage',
            508: 'Loop Detected',
            509: 'Bandwidth Limit Exceeded',
            510: 'Not Extended',
            511: 'Network Authentication Required'
        };

        // init _http.XMLHttpRequest
        local._http.XMLHttpRequest = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#XMLHttpRequest()
         * The constructor initiates an XMLHttpRequest
         */
            var xhr;
            xhr = this;
            ['onError', 'onResponse'].forEach(function (key) {
                xhr[key] = xhr[key].bind(xhr);
            });
            xhr.headers = {};
            xhr.onLoadList = [];
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
            xhr.readyState = 0;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
            xhr.response = null;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
            xhr.responseText = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            xhr.responseType = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
            xhr.status = xhr.statusCode = 0;
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
            xhr.statusText = '';
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
            xhr.timeout = local.utility2.timeoutDefault;
        };

        local._http.XMLHttpRequest.prototype.abort = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#abort()
         * Aborts the request if it has already been sent
         */
            this.onError(new Error('abort'));
        };

        local._http.XMLHttpRequest.prototype.addEventListener = function (event, onError) {
        /*
         * this function will add event listeners to the xhr-connection
         */
            switch (event) {
            case 'abort':
            case 'error':
            case 'load':
                this.onLoadList.push(onError);
                break;
            }
        };

        local._http.XMLHttpRequest.prototype.getAllResponseHeaders = function () {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
         * #getAllResponseHeaders()
         * Returns all the response headers, separated by CRLF, as a string,
         * or null if no response has been received
         */
            var xhr;
            xhr = this;
            return Object.keys(xhr.responseStream.headers).map(function (key) {
                return key + ': ' + xhr.responseStream.headers[key] + '\r\n';
            }).join('') + '\r\n';
        };

        local._http.XMLHttpRequest.prototype.getResponseHeader = function (key) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#getResponseHeader()
         * Returns the string containing the text of the specified header,
         * or null if either the response has not yet been received
         * or the header doesn't exist in the response
         */
            return (this.responseStream.headers && this.responseStream.headers[key]) || null;
        };

        local._http.XMLHttpRequest.prototype.onError = function (error, data) {
        /*
         * this function will handle the error and data passed back to the xhr-connection
         */
            if (this.done) {
                return;
            }
            this.error = error;
            this.response = data;
            this.responseText = (data && data.toString()) || '';
            // update xhr
            this.readyState = 4;
            this.onreadystatechange();
            // handle data
            this.onLoadList.forEach(function (onError) {
                onError({ type: error
                    ? 'error'
                    : 'load' });
            });
        };

        local._http.XMLHttpRequest.prototype.onResponse = function (responseStream) {
        /*
         * this function will handle the responseStream from the xhr-connection
         */
            this.responseStream = responseStream;
            // update xhr
            this.status = this.statusCode = this.responseStream.statusCode;
            this.statusText = local.http.STATUS_CODES[this.responseStream.statusCode] || '';
            this.readyState = 1;
            this.onreadystatechange();
            this.readyState = 2;
            this.onreadystatechange();
            this.readyState = 3;
            this.onreadystatechange();
            if (this.responseType === 'response') {
                this.onError(null, this.responseStream);
                return;
            }
            local.utility2.streamReadAll(this.responseStream, this.onError);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
        local._http.XMLHttpRequest.prototype.onreadystatechange = local.utility2.nop;

        local._http.XMLHttpRequest.prototype.open = function (method, url) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#open()
         * Initializes a request
         */
            this.method = method;
            this.url = url;
            // parse url
            this.urlParsed = local.utility2.urlParse(String(this.url));
            this.hostname = this.urlParsed.hostname;
            this.path = this.urlParsed.pathname + this.urlParsed.search;
            this.port = this.urlParsed.port;
            // init requestStream
            this.requestStream = (this.urlParsed.protocol === 'https:'
                ? local.https
                : local.http).request(this, this.onResponse)
                // handle request-error
                .on('error', this.onError);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#overrideMimeType()
        local._http.XMLHttpRequest.prototype.overrideMimeType = local.utility2.nop;

        local._http.XMLHttpRequest.prototype.send = function (data) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send()
         * Sends the request
         */
            this.data = data;
            // send data
            this.requestStream.end(this.data);
        };

        local._http.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#setRequestHeader()
         * Sets the value of an HTTP request header
         */
            key = key.toLowerCase();
            this.headers[key] = value;
            this.requestStream.setHeader(key, value);
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
        local._http.XMLHttpRequest.prototype.upload = {
            addEventListener: local.utility2.nop
        };

        local._http.createServer = function () {
            /*
             * https://nodejs.org/api/all.html#all_http_createserver_requestlistener
             * Returns a new instance of http.Server
             */
            return { listen: function (port, onError) {
            /*
             * https://nodejs.org/api/all.html#all_server_listen_handle_callback
             * This will cause the server to accept connections on the specified handle,
             * but it is presumed that the file descriptor or handle has already been bound
             * to a port or domain socket
             */
                // jslint-hack
                local.utility2.nop(port);
                onError();
            } };
        };

        local._http.request = function (xhr, onResponse) {
            var serverRequest, serverResponse;
            serverRequest = new local._http.IncomingMessage(xhr);
            serverResponse = new local._http.ServerResponse(onResponse);
            serverRequest.urlParsed = local.utility2.urlParse(xhr.url);
            return {
                end: function (data) {
                    serverRequest.data = data;
                    local.utility2.serverLocalRequestHandler(serverRequest, serverResponse);
                },
                on: function () {
                    return this;
                },
                setHeader: function (key, value) {
                    serverRequest.headers[key.toLowerCase()] = value;
                }
            };
        };

        local._timeElapsedStop = function (options) {
        /*
         * this function will stop options.timeElapsed
         */
            if (options.timeElapsed > 0xffffffff) {
                options.timeElapsed = Date.now() - options.timeElapsed;
            }
        };

        local.utility2.ajax = function (options, onError) {
        /*
         * this function will send an ajax-request with error-handling and timeout
         */
            var ajaxProgressDiv, ii, timerTimeout, xhr;
            onError = local.utility2.onErrorWithStack(onError);
            // init modeServerLocal
            if (local.utility2.serverLocalUrlTest &&
                    local.utility2.serverLocalUrlTest(options.url)) {
                xhr = new local._http.XMLHttpRequest();
            }
            // init xhr
            xhr = xhr || (local.modeJs === 'browser'
                ? new local.global.XMLHttpRequest()
                : new local._http.XMLHttpRequest());
            // debug xhr
            local.utility2._debugXhr = xhr;
            // init options
            local.utility2.objectSetOverride(xhr, options);
            // init headers
            xhr.headers = {};
            Object.keys(options.headers || {}).forEach(function (key) {
                xhr.headers[key.toLowerCase()] = options.headers[key];
            });
            // init method
            xhr.method = xhr.method || 'GET';
            // init timeout
            xhr.timeout = xhr.timeout || local.utility2.timeoutDefault;
            // init timerTimeout
            timerTimeout = local.utility2.onTimeout(function (errorTimeout) {
                xhr.error = errorTimeout;
                xhr.abort();
                // cleanup requestStream and responseStream
                local.utility2.requestResponseCleanup(xhr.requestStream, xhr.responseStream);
            }, xhr.timeout, 'ajax ' + xhr.method + ' ' + xhr.url);
            // init event handling
            xhr.onEvent = function (event) {
                // init statusCode
                xhr.statusCode = xhr.status;
                switch (event.type) {
                case 'abort':
                case 'error':
                case 'load':
                    // if already done, then do nothing
                    if (xhr.done) {
                        return;
                    }
                    xhr.done = true;
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    if (ajaxProgressDiv) {
                        // validate xhr is defined in _ajaxProgressList
                        ii = local._ajaxProgressList.indexOf(xhr);
                        local.utility2.assert(ii >= 0, 'missing xhr in _ajaxProgressList');
                        // remove xhr from ajaxProgressList
                        local._ajaxProgressList.splice(ii, 1);
                        // hide _ajaxProgressDiv
                        if (local._ajaxProgressList.length === 0) {
                            local._ajaxProgressBarHide = setTimeout(function () {
                                // hide ajaxProgressBar
                                ajaxProgressDiv.style.display = 'none';
                                // reset ajaxProgress
                                local._ajaxProgressState = 0;
                                local._ajaxProgressUpdate(
                                    '0%',
                                    'ajaxProgressBarDivLoading',
                                    'loading'
                                );
                            }, 1000);
                        }
                    }
                    // handle abort or error event
                    if (!xhr.error &&
                            (event.type === 'abort' ||
                            event.type === 'error' ||
                            xhr.statusCode >= 400)) {
                        xhr.error = new Error(event.type);
                    }
                    // handle completed xhr request
                    if (xhr.readyState === 4) {
                        if (xhr.modeJson) {
                            // try to JSON.parse the string
                            local.utility2.tryCatchOnError(function () {
                                xhr.responseJSON = JSON.parse(xhr.responseText);
                            }, function (error) {
                                xhr.error = xhr.error || error;
                            });
                        }
                        // handle string data
                        if (xhr.error) {
                            // debug statusCode
                            xhr.error.statusCode = xhr.statusCode;
                            // debug statusCode / method / url
                            local.utility2.errorMessagePrepend(xhr.error, local.modeJs + ' - ' +
                                xhr.statusCode + ' ' +
                                xhr.method + ' ' + xhr.url + '\n    ' +
                                JSON.stringify(xhr.responseText.slice(0, 256) + '...') + '\n');
                        }
                    }
                    onError(xhr.error, xhr, xhr.onEvent);
                    break;
                }
                if (ajaxProgressDiv) {
                    // increment ajaxProgressBar
                    if (local._ajaxProgressList.length > 0) {
                        local._ajaxProgressIncrement();
                        return;
                    }
                    // update ajaxProgressBar to done
                    local._ajaxProgressUpdate('100%', 'ajaxProgressBarDivSuccess', 'loaded');
                }
            };
            xhr.addEventListener('abort', xhr.onEvent);
            xhr.addEventListener('error', xhr.onEvent);
            xhr.addEventListener('load', xhr.onEvent);
            // init ajaxProgressDiv
            ajaxProgressDiv = local.modeJs === 'browser' &&
                document.querySelector('.ajaxProgressDiv');
            if (ajaxProgressDiv) {
                xhr.addEventListener('loadstart', local._ajaxProgressIncrement);
                xhr.addEventListener('progress', local._ajaxProgressIncrement);
                xhr.upload.addEventListener('progress', local._ajaxProgressIncrement);
                // if ajaxProgressBar is hidden, then display it
                if (local._ajaxProgressList.length === 0) {
                    ajaxProgressDiv.style.display = 'block';
                }
                // add xhr to _ajaxProgressList
                local._ajaxProgressList.push(xhr);
                // clear any timer to hide ajaxProgressDiv
                clearTimeout(local._ajaxProgressBarHide);
            }
            // open url
            xhr.open(xhr.method, xhr.url);
            // set request-headers
            Object.keys(xhr.headers).forEach(function (key) {
                xhr.setRequestHeader(key, xhr.headers[key]);
            });
            // send data
            xhr.send(xhr.data);
            return xhr;
        };

        local.utility2.assert = function (passed, message) {
        /*
         * this function will throw an error if the assertion fails
         */
            var error;
            if (passed) {
                return;
            }
            error = message && message.message
                // message is an Error object
                ? message
                : new Error(typeof message === 'string'
                    // if message is a string, then leave it as is
                    ? message
                    // else JSON.stringify message
                    : JSON.stringify(message));
            // debug error
            local.utility2._debugAssertError = error;
            throw error;
        };

        local.utility2.bcryptHashCreate = function (password, cost) {
        /*
         * this function will create a bcrypt-hash from the password and cost (default = 10)
         */
            return local.utility2.bcrypt.hashSync(password, cost);
        };

        local.utility2.bcryptPasswordValidate = function (password, hash) {
        /*
         * this function will validate the password against the bcrypt-hash
         */
            return local.utility2.bcrypt.compareSync(password || '', hash || '');
        };

        /* istanbul ignore next */
        local.utility2.browserTest = function (options, onError) {
        /*
         * this function will spawn an electron process to test options.url
         */
            var done, modeNext, onNext, onParallel, timerTimeout;
            if (local.modeJs === 'node') {
                local.utility2.objectSetDefault(options, local.utility2.envDict);
                options.timeoutDefault = options.timeoutDefault ||
                    local.utility2.timeoutDefault;
            }
            modeNext = Number(options.modeNext || 0);
            onNext = function (error, data) {
                modeNext = error instanceof Error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                // run node code
                case 1:
                    // init options
                    options.testName = local.utility2.envDict.MODE_BUILD + '.browser.' +
                        encodeURIComponent(local.utility2.urlParse(options.url).pathname);
                    local.utility2.objectSetDefault(options, {
                        fileCoverage: local.utility2.envDict.npm_config_dir_tmp +
                            '/coverage.' + options.testName + '.json',
                        fileScreenCapture: (local.utility2.envDict.npm_config_dir_build +
                            '/screen-capture.' + options.testName + '.png')
                            .replace((/%/g), '_')
                            .replace((/_2F\.png$/), '.png'),
                        fileTestReport: local.utility2.envDict.npm_config_dir_tmp +
                            '/test-report.' + options.testName + '.json',
                        modeBrowserTest: 'test',
                        timeExit: Date.now() + options.timeoutDefault
                    }, 1);
                    // init timerTimeout
                    timerTimeout = local.utility2.onTimeout(
                        onNext,
                        options.timeoutDefault,
                        options.testName
                    );
                    // init file urlBrowser
                    options.modeNext = 20;
                    options.urlBrowser = local.utility2.envDict.npm_config_dir_tmp +
                        '/electron.' + local.utility2.uuidTimeCreate() + '.html';
                    local.utility2.fsMkdirpSync(local.utility2.envDict.npm_config_dir_build);
                    local.fs.writeFileSync(options.urlBrowser, '<style>body {' +
                            'border: 1px solid black;' +
                            'margin: 0px;' +
                            'overflow: hidden;' +
                        '}</style>' +
                        '<webview id=webview src="' +
                        options.url.replace('{{timeExit}}', options.timeExit) +
                        '" style="' +
                            'display: inline-block;' +
                            'height: 100%;' +
                            'overflow: hidden;' +
                            'width: 100%;' +
                        '"></webview>' +
                        '<script>window.local = {}; (' + local.utility2.browserTest
                            .toString()
                            .replace((/<\//g), '<\\/')
                            // coverage-hack - uncover
                            .replace((/\b__cov_.*?\+\+/g), '0') +
                        '(' + JSON.stringify(options) + '))</script>');
                    console.log('\nbrowserTest - created electron entry-page ' +
                        options.urlBrowser + '\n');
                    // spawn an electron process to test a url
                    options.modeNext = 10;
                    local.utility2.processSpawnWithTimeout('electron', [
                        __filename,
                        'browserTest',
                        '--disable-overlay-scrollbar',
                        '--enable-logging'
                    ], {
                        env: local.utility2.jsonCopy(options),
                        stdio: options.modeSilent
                            ? 'ignore'
                            : ['ignore', 1, 2]
                    }).once('exit', onNext);
                    break;
                case 2:
                    console.log('\nbrowserTest - exit-code ' + error + ' - ' + options.url +
                        '\n');
                    // merge browser coverage
                    if (options.modeCoverageMerge) {
                        // try to JSON.parse the string
                        local.utility2.tryCatchOnError(function () {
                            data = JSON.parse(
                                local.fs.readFileSync(options.fileCoverage, 'utf8')
                            );
                        }, local.utility2.nop);
                        if (!local.utility2.tryCatchErrorCaught) {
                            local.utility2.istanbulCoverageMerge(
                                local.global.__coverage__,
                                data
                            );
                            console.log('\nbrowserTest - merged coverage from ' +
                                options.fileCoverage + '\n');
                        }
                    }
                    if (options.modeBrowserTest !== 'test') {
                        modeNext = Infinity;
                        onNext();
                        return;
                    }
                    // merge browser test-report
                    local.utility2.tryCatchOnError(function () {
                        data = JSON.parse(local.fs.readFileSync(
                            options.fileTestReport,
                            'utf8'
                        ));
                    }, local.utility2.nop);
                    if (local.utility2.tryCatchErrorCaught) {
                        onNext(local.utility2.tryCatchErrorCaught);
                        return;
                    }
                    console.log('\nbrowserTest - merging test-report from ' +
                        options.fileTestReport + '\n');
                    if (!options.modeTestIgnore) {
                        local.utility2.testReportMerge(local.utility2.testReport, data);
                    }
                    // create test-report.json
                    local.fs.writeFileSync(
                        local.utility2.envDict.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(local.utility2.testReport)
                    );
                    onNext(data && data.testsFailed && new Error(data.testsFailed));
                    break;
                // run electron-node code
                case 11:
                    // handle uncaughtexception
                    process.once('uncaughtException', onNext);
                    // wait for electron to init
                    require('app').once('ready', onNext);
                    break;
                case 12:
                    options.BrowserWindow = require('browser-window');
                    local.utility2.objectSetDefault(
                        options,
                        { frame: false, height: 768, width: 1024, x: 0, y: 0 }
                    );
                    // init browserWindow
                    options.browserWindow = new options.BrowserWindow(options);
                    options.browserWindow.once('page-title-updated', onNext);
                    // load url in browserWindow
                    options.browserWindow.loadURL('file://' + options.urlBrowser);
                    break;
                case 13:
                    console.log('\nbrowserTest - opened url ' + options.url + '\n');
                    onParallel = local.utility2.onParallel(onNext);
                    onParallel.counter += 1;
                    if (options.modeBrowserTest === 'test') {
                        onParallel.counter += 1;
                        options.browserWindow.once('page-title-updated', function () {
                            onParallel();
                        });
                    }
                    onParallel.counter += 1;
                    setTimeout(function () {
                        options.browserWindow.capturePage(options, function (data) {
                            local.fs.writeFileSync(options.fileScreenCapture, data.toPng());
                            console.log('\nbrowserTest - created screen-capture file://' +
                                options.fileScreenCapture + '\n');
                            onParallel();
                        });
                    }, Number(options.timeoutScreenCapture || 5000));
                    onParallel();
                    break;
                // run electron-browser code
                case 21:
                    options.fs = require('fs');
                    options.webview = document.getElementById('webview');
                    options.webview.addEventListener('did-get-response-details', function () {
                        document.title = 'opened ' + location.href;
                    });
                    options.webview.addEventListener('console-message', function (event) {
                        try {
                            options.global_test_results = event.message
                                .indexOf('{"global_test_results":{') === 0 &&
                                JSON.parse(event.message).global_test_results;
                            if (options.global_test_results.testReport) {
                                // merge screen-capture into test-report
                                options.global_test_results.testReport.testPlatformList[
                                    0
                                ].screenCaptureImg =
                                    options.fileScreenCapture.replace((/.*\//), '');
                                // save browser test-report
                                options.fs.writeFileSync(
                                    options.fileTestReport,
                                    JSON.stringify(options.global_test_results.testReport)
                                );
                                // save browser coverage
                                if (options.global_test_results.coverage) {
                                    require('fs').writeFileSync(
                                        options.fileCoverage,
                                        JSON.stringify(options.global_test_results.coverage)
                                    );
                                }
                                document.title = 'testReport written';
                                return;
                            }
                        } catch (errorCaught) {
                            console.error(errorCaught.stack);
                        }
                        console.log(event.message);
                    });
                    break;
                default:
                    if (done) {
                        return;
                    }
                    done = true;
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    onError(error);
                }
            };
            onNext();
        };

        local.utility2.cryptojsAesDecrypt = function (data, secret) {
        /*
         * this function will aes-decrypt the cipherParams data
         */
            return local.utility2.cryptojs.enc.Utf8.stringify(
                local.utility2.cryptojs.AES.decrypt(data, secret)
            );
        };

        local.utility2.cryptojsAesEncrypt = function (data, secret) {
        /*
         * this function will aes-encrypt the data into a cipherParams string
         */
            return local.utility2.cryptojs.AES.encrypt(data, secret).toString();
        };

        local.utility2.cryptojsHashHmacSha256Create = function (data, secret) {
        /*
         * this function will return the base64 hmac-sha256 hash of the data and secret
         */
            return local.utility2.cryptojs.enc.Base64.stringify(
                local.utility2.cryptojs.HmacSHA256(data, secret)
            );
        };

        local.utility2.cryptojsHashSha256Create = function (data) {
        /*
         * this function will return the base64 sha-256 hash of the data
         */
            return local.utility2.cryptojs.enc.Base64.stringify(
                local.utility2.cryptojs.SHA256(data)
            );
        };

        local.utility2.docApiCreate = function (options) {
        /*
         * this function will create an html api-doc from the given options
         */
            var element, elementCreate, elementName, module, moduleName, trimLeft;
            elementCreate = function () {
                element = {};
                element.id = encodeURIComponent('element.' + moduleName + '.' + elementName);
                element.typeof = typeof module.exports[elementName];
                element.name = element.typeof + ' <span class="docApiSignatureSpan">' +
                    moduleName + '.</span>' + elementName;
                if (element.typeof !== 'function') {
                    return element;
                }
                element.extra = element;
                // init source
                element.source = trimLeft(module.exports[elementName].toString());
                if (element.source.length > 4096) {
                    element.source = element.source.slice(0, 4096).trimRight() + ' ...';
                }
                element.source = local.utility2.stringHtmlSafe(element.source)
                    .replace(
                        (/( *?\/\*[\S\s]*?\*\/\n)/),
                        '<span class="docApiCodeCommentSpan">$1</span>'
                    )
                    .replace((/^function \(/), elementName + ' = function (');
                // init signature
                element.signature = (/\([\S\s]*?\)/).exec(element.source)[0];
                // init example
                (module.aliasList || [moduleName]).forEach(function (moduleAlias) {
                    if (!element.example) {
                        options.example.replace(
                            new RegExp('((?:\n.*?){8}' + (moduleAlias === '.'
                                ? '\\.'
                                : moduleAlias
                                ? '\\b' + moduleAlias + '(?:\\([^\\)].*?\\)){0,1}\\.'
                                : '\\b') + ')(' + elementName +
                                ')(\\((?:.*?\n){8})'),
                            function (match0, match1, match2, match3) {
                                // jslint-hack
                                local.utility2.nop(match0);
                                element.example = '...' + trimLeft(
                                    local.utility2.stringHtmlSafe(match1) +
                                        '<span class="docApiCodeKeywordSpan">' + match2 +
                                        '</span>' + local.utility2.stringHtmlSafe(match3)
                                ).trimRight() + '\n...';
                            }
                        );
                    }
                });
                element.example = element.example || 'n/a';
                return element;
            };
            trimLeft = function (text) {
                var tmp;
                tmp = '';
                text.trim().replace((/^ */gm), function (match0) {
                    if (!tmp || match0.length < tmp.length) {
                        tmp = match0;
                    }
                });
                text = text.replace(new RegExp('^' + tmp, 'gm'), '');
                // enforce 128 character column limit
                while ((/^.{128}[^\\\n]/m).test(text)) {
                    text = text.replace((/^(.{128})([^\\\n]+)/gm), '$1\\\n$2');
                }
                return text;
            };
            options.moduleList = Object.keys(options.moduleDict)
                .sort()
                .map(function (key) {
                    moduleName = key;
                    // init alias
                    module = options.moduleDict[moduleName];
                    // if module.exports is a function, then document it as a function
                    if (typeof module.exports === 'function') {
                        module.exports[moduleName.split('.').slice(-1)[0]] = module.exports;
                    }
                    return {
                        elementList: Object.keys(module.exports)
                            .filter(function (key) {
                                return key && key[0] !== '_' && !(/\W/).test(key);
                            })
                            .map(function (key) {
                                elementName = key;
                                return elementCreate();
                            })
                            .sort(function (aa, bb) {
                                return aa.name < bb.name
                                    ? -1
                                    : 1;
                            }),
                        id: 'module.' + moduleName,
                        name: moduleName
                    };
                });
            return local.utility2.templateRender(
                local.utility2.templateDocApiHtml,
                options,
                ''
            );
        };

        local.utility2.echo = function (arg) {
        /*
         * this function will return the arg
         */
            return arg;
        };

        local.utility2.errorMessagePrepend = function (error, message) {
        /*
         * this function will prepend the message to error.message and error.stack
         */
            error.message = message + error.message;
            error.stack = message + error.stack;
            return error;
        };

        local.utility2.exit = function (exitCode) {
        /*
         * this function will exit the current process with the given exitCode
         */
            exitCode = !exitCode || Number(exitCode) === 0
                ? 0
                : Number(exitCode) || 1;
            switch (local.modeJs) {
            case 'browser':
                switch (local.utility2.modeTest) {
                case 'consoleLogResult':
                    console.log(JSON.stringify({
                        global_test_results: local.global.global_test_results
                    }));
                    break;
                }
                break;
            case 'node':
                process.exit(exitCode);
                break;
            }
        };

        local.utility2.fsMkdirpSync = function (dir) {
        /*
         * this function will synchronously 'mkdir -p' the dir
         */
            local.child_process.spawnSync(
                'mkdir',
                ['-p', local.path.resolve(process.cwd(), dir)],
                { stdio: ['ignore', 1, 2] }
            );
        };

        local.utility2.fsRmrSync = function (dir) {
        /*
         * this function will synchronously 'rm -fr' the dir
         */
            local.child_process.spawnSync(
                'rm',
                ['-fr', local.path.resolve(process.cwd(), dir)],
                { stdio: ['ignore', 1, 2] }
            );
        };

        local.utility2.fsWriteFileWithMkdirp = function (file, data, onError) {
        /*
         * this function will save the data to file, and auto-mkdirp the parent dir
         */
            file = local.path.resolve(process.cwd(), file);
            // save data to file
            local.fs.writeFile(file, data, function (error) {
                if (error && error.code === 'ENOENT') {
                    // if save failed, then mkdirp file's parent dir
                    local.utility2.processSpawnWithTimeout(
                        'mkdir',
                        ['-p', local.path.dirname(file)],
                        { stdio: ['ignore', 1, 2] }
                    )
                        .on('exit', function () {
                            // save data to file
                            local.fs.writeFile(file, data, onError);
                        });
                    return;
                }
                onError(error);
            });
        };

        local.utility2.isNullOrUndefined = function (arg) {
        /*
         * this function will test if the arg is null or undefined
         */
            return arg === null || arg === undefined;
        };

        local.utility2.istanbulCoverageMerge = function (coverage1, coverage2) {
        /*
         * this function will merge coverage2 into coverage1
         */
            var dict1, dict2;
            coverage1 = coverage1 || {};
            coverage2 = coverage2 || {};
            Object.keys(coverage2).forEach(function (file) {
                // if file is undefined in coverage1, then add it
                if (!coverage1[file]) {
                    coverage1[file] = coverage2[file];
                    return;
                }
                // merge file from coverage2 into coverage1
                ['b', 'f', 's'].forEach(function (key) {
                    dict1 = coverage1[file][key];
                    dict2 = coverage2[file][key];
                    switch (key) {
                    // increment coverage for branch lines
                    case 'b':
                        Object.keys(dict2).forEach(function (key) {
                            dict2[key].forEach(function (count, ii) {
                                dict1[key][ii] += count;
                            });
                        });
                        break;
                    // increment coverage for function and statement lines
                    case 'f':
                    case 's':
                        Object.keys(dict2).forEach(function (key) {
                            dict1[key] += dict2[key];
                        });
                        break;
                    }
                });
            });
            return coverage1;
        };

        // init istanbulCoverageReportCreate
        local.utility2.istanbulCoverageReportCreate = (local.utility2.istanbul &&
            local.utility2.istanbul.coverageReportCreate) || local.utility2.echo;

        local.utility2.istanbulInstrumentInPackage = function (code, file, packageName) {
        /*
         * this function will cover the code only if packageName === $npm_package_name
         */
            return local.global.__coverage__ &&
                packageName &&
                packageName === local.utility2.envDict.npm_package_name &&
                !(/^\/\* istanbul ignore all \*\/$/m).test(code)
                ? local.utility2.istanbulInstrumentSync(code, file)
                : code;
        };

        // init istanbulInstrumentSync
        local.utility2.istanbulInstrumentSync = (local.utility2.istanbul &&
            local.utility2.istanbul.instrumentSync) || local.utility2.echo;

        // init jslintAndPrint
        local.utility2.jslintAndPrint = (local.utility2.jslint &&
            local.utility2.jslint.jslintAndPrint) || local.utility2.echo;

        local.utility2.jsonCopy = function (element) {
        /*
         * this function will return a deep-copy of the JSON element
         */
            return element === undefined
                ? undefined
                : JSON.parse(JSON.stringify(element));
        };

        local.utility2.jsonStringifyOrdered = function (element, replacer, space) {
        /*
         * this function will JSON.stringify the element with dictionaries in sorted order,
         * for testing purposes
         */
            var circularList, stringify, tmp;
            stringify = function (element) {
            /*
             * this function will recursively stringify the element,
             * with object-keys sorted and circular-references removed
             */
                // if element is an object, then recurse with its items, sorted by their keys
                if (element &&
                        typeof element === 'object' &&
                        typeof element.toJSON !== 'function') {
                    // remove circular-reference
                    if (circularList.indexOf(element) >= 0) {
                        return;
                    }
                    circularList.push(element);
                    // if element is an array, then recurse with its elements
                    if (Array.isArray(element)) {
                        return '[' + element.map(function (element) {
                            tmp = stringify(element);
                            return typeof tmp === 'string'
                                ? tmp
                                : 'null';
                        }).join(',') + ']';
                    }
                    return '{' + Object.keys(element)
                        .sort()
                        .map(function (key) {
                            tmp = stringify(element[key]);
                            return typeof tmp === 'string'
                                ? JSON.stringify(key) + ':' + tmp
                                : undefined;
                        })
                        .filter(function (element) {
                            return typeof element === 'string';
                        })
                        .join(',') + '}';
                }
                // else JSON.stringify normally
                return JSON.stringify(element);
            };
            circularList = [];
            return JSON.stringify(element && typeof element === 'object'
                ? JSON.parse(stringify(element))
                : element, replacer, space);
        };

        local.utility2.jwtHs256Decode = function (token, secret) {
        /*
         * https://jwt.io/
         * this function will return the payload from the hs256-encoded json-web-token,
         * with the given secret
         */
            local.utility2.tryCatchOnError(function () {
                token = token.split('.');
                // validate header
                local.utility2.assert(
                    token[0] === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                    token
                );
                // validate signature
                local.utility2.assert(local.utility2.cryptojsHashHmacSha256Create(
                    token[0] + '.' + token[1],
                    secret
                ).replace((/\=/g), '') === token[2]);
                token = JSON.parse(local.modeJs === 'browser'
                    ? local.global.atob(token[1])
                    : new Buffer(token[1], 'base64'));
            }, local.utility2.nop);
            // return decoded payload
            return token;
        };

        local.utility2.jwtHs256Encode = function (payload, secret) {
        /*
         * https://jwt.io/
         * this function will return a hs256-encoded json-web-token of the payload,
         * with the given secret
         */
            var token;
            token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + (local.modeJs === 'browser'
                ? local.global.btoa(JSON.stringify(payload))
                : new Buffer(JSON.stringify(payload)).toString('base64')).replace((/\=/g), '');
            return token + '.' +
                local.utility2.cryptojsHashHmacSha256Create(token, secret).replace((/\=/g), '');
        };

        local.utility2.listGetElementRandom = function (list) {
        /*
         * this function will return a random element from the list
         */
            return list[Math.floor(list.length * Math.random())];
        };

        local.utility2.listShuffle = function (list) {
        /*
         * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
         * this function will inplace shuffle the list, via fisher-yates algorithm
         */
            var ii, random, swap;
            for (ii = list.length - 1; ii > 0; ii -= 1) {
                // coerce to finite integer
                random = (Math.random() * (ii + 1)) | 0;
                swap = list[ii];
                list[ii] = list[random];
                list[random] = swap;
            }
            return list;
        };

        local.utility2.middlewareAssetsCached = function (request, response, nextMiddleware) {
        /*
         * this function will run the cached-assets-middleware
         */
            var modeNext, onNext, result;
            modeNext = 0;
            onNext = function (error, data) {
                result = result || local.utility2.assetsDict[request.urlParsed.pathname];
                if (error || !result) {
                    nextMiddleware(error);
                    return;
                }
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    // skip gzip
                    if (response.headersSent ||
                            !(/\bgzip\b/).test(request.headers['accept-encoding'])) {
                        modeNext += 1;
                        onNext();
                        return;
                    }
                    // gzip and cache result
                    local.utility2.taskCallbackAndUpdateCached({
                        cacheDict: 'middlewareAssetsCachedGzip',
                        key: request.urlParsed.pathname
                    }, onNext, function (onError) {
                        local.zlib.gzip(result, function (error, data) {
                            onError(error, !error && data.toString('base64'));
                        });
                    });
                    break;
                case 2:
                    // set gzip header
                    result = new Buffer(data, 'base64');
                    response.setHeader('Content-Encoding', 'gzip');
                    response.setHeader('Content-Length', result.length);
                    onNext();
                    break;
                case 3:
                    local.utility2.middlewareCacheControlLastModified(
                        request,
                        response,
                        onNext
                    );
                    break;
                case 4:
                    response.end(result);
                    break;
                }
            };
            onNext();
        };

        local.utility2.middlewareBodyRead = function (request, response, nextMiddleware) {
        /*
         * this function will read the request-body and save it as request.bodyRaw
         */
            // jslint-hack
            local.utility2.nop(response);
            // if request is already read, then goto nextMiddleware
            if (!request.readable) {
                nextMiddleware();
                return;
            }
            local.utility2.streamReadAll(request, function (error, data) {
                request.bodyRaw = request.bodyRaw || data;
                nextMiddleware(error);
            });
        };

        local.utility2.middlewareCacheControlLastModified = function (
            request,
            response,
            nextMiddleware
        ) {
        /*
         * this function will respond with the data cached by Last-Modified header
         */
            // do not cache if headers already sent or url has '?' search indicator
            if (!response.headersSent && request.url.indexOf('?') < 0) {
                // init serverResponseHeaderLastModified
                local.utility2.serverResponseHeaderLastModified =
                    local.utility2.serverResponseHeaderLastModified ||
                    // resolve to 1000 ms
                    new Date(new Date(Math.floor(Date.now() / 1000) * 1000).toGMTString());
                // respond with 304 If-Modified-Since serverResponseHeaderLastModified
                if (new Date(request.headers['if-modified-since']) >=
                        local.utility2.serverResponseHeaderLastModified) {
                    response.statusCode = 304;
                    response.end();
                    return;
                }
                response.setHeader('Cache-Control', 'no-cache');
                response.setHeader(
                    'Last-Modified',
                    local.utility2.serverResponseHeaderLastModified.toGMTString()
                );
            }
            nextMiddleware();
        };

        local.utility2.middlewareError = function (error, request, response) {
        /*
         * this function will run the error-middleware
         */
            // if error occurred, then respond with '500 Internal Server Error',
            // else respond with '404 Not Found'
            local.utility2.serverRespondDefault(request, response, error
                ? (error.statusCode >= 400 && error.statusCode < 600
                    ? error.statusCode
                    : 500)
                : 404, error);
        };

        local.utility2.middlewareFileServer = function (request, response, nextMiddleware) {
        /*
         * this function will run the file-server-middleware
         */
            if (request.method !== 'GET' || local.modeJs === 'browser') {
                nextMiddleware();
                return;
            }
            request.urlFile = (process.cwd() + request.urlParsed.pathname
                // security - disable parent directory lookup
                .replace((/.*\/\.\.\//g), '/'))
                // replace trailing '/' with '/index.html'
                .replace((/\/$/), '/index.html');
            // serve file from cache
            local.utility2.taskCallbackAndUpdateCached({
                cacheDict: 'middlewareFileServer',
                key: request.urlFile
            }, function (error, data) {
                // default to nextMiddleware
                if (error) {
                    nextMiddleware();
                    return;
                }
                // init response-header content-type
                request.urlParsed.contentType = (/\.[^\.]*$/).exec(request.urlParsed.pathname);
                request.urlParsed.contentType = local.utility2.contentTypeDict[
                    request.urlParsed.contentType && request.urlParsed.contentType[0]
                ];
                local.utility2.serverRespondHeadSet(request, response, null, {
                    'Content-Type': request.urlParsed.contentType
                });
                // serve file from cache
                response.end(new Buffer(data, 'base64'));
            // run background-task to re-cache file
            }, function (onError) {
                local.fs.readFile(request.urlFile, function (error, data) {
                    onError(error, data && data.toString('base64'));
                });
            });
        };

        local.utility2.middlewareGroupCreate = function (middlewareList) {
        /*
         * this function will return a middleware-group,
         * that will sequentially run the middlewares in middlewareList
         */
            var self;
            self = function (request, response, nextMiddleware) {
                var modeNext, onNext;
                modeNext = -1;
                onNext = function (error) {
                    modeNext = error
                        ? Infinity
                        : modeNext + 1;
                    // recurse with next middleware in middlewareList
                    if (modeNext < self.middlewareList.length) {
                        // call sub-middleware in a try-catch block
                        local.utility2.tryCatchOnError(function () {
                            self.middlewareList[modeNext](request, response, onNext);
                        }, onNext);
                        return;
                    }
                    // default to nextMiddleware
                    nextMiddleware(error);
                };
                onNext();
            };
            self.middlewareList = middlewareList;
            return self;
        };

        local.utility2.middlewareInit = function (request, response, nextMiddleware) {
        /*
         * this function will run the init-middleware
         */
            // debug server-request
            local.utility2._debugServerRequest = request;
            // debug server-response
            local.utility2._debugServerResponse = response;
            // init timerTimeout
            local.utility2.serverRespondTimeoutDefault(
                request,
                response,
                local.utility2.timeoutDefault
            );
            // init request.urlParsed
            request.urlParsed = local.utility2.urlParse(request.url);
            // init response-header content-type
            request.urlParsed.contentType = (/\.[^\.]*$/).exec(request.urlParsed.pathname);
            request.urlParsed.contentType = local.utility2.contentTypeDict[
                request.urlParsed.contentType && request.urlParsed.contentType[0]
            ];
            local.utility2.serverRespondHeadSet(request, response, null, {
                'Content-Type': request.urlParsed.contentType
            });
            // set main-page content-type to text/html
            if (request.urlParsed.pathname === '/') {
                local.utility2.serverRespondHeadSet(request, response, null, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
            }
            // default to nextMiddleware
            nextMiddleware();
        };

        local.utility2.objectGetElementFirst = function (arg) {
        /*
         * this function will get the first element of the arg
         */
            var item;
            item = {};
            item.key = Object.keys(arg)[0];
            item.value = arg[item.key];
            return item;
        };

        local.utility2.objectKeysTypeof = function (arg) {
        /*
         * this function will return a list of the arg's keys, sorted by item-type
         */
            return Object.keys(arg).map(function (key) {
                return typeof arg[key] + ' ' + key;
            }).sort().join('\n');
        };

        local.utility2.objectSetDefault = function (arg, defaults, depth) {
        /*
         * this function will recursively set default values for unset leaf nodes
         * in the arg
         */
            Object.keys(defaults).forEach(function (key) {
                var arg2, defaults2;
                arg2 = arg[key];
                defaults2 = defaults[key];
                if (defaults2 === undefined) {
                    return;
                }
                // init arg[key] to default value defaults[key]
                if (!arg2) {
                    arg[key] = defaults2;
                    return;
                }
                // if arg2 and defaults2 are both non-null and non-array objects,
                // then recurse with arg2 and defaults2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2) &&
                        // defaults2 is a non-null and non-array object
                        defaults2 &&
                        typeof defaults2 === 'object' &&
                        !Array.isArray(defaults2)) {
                    local.utility2.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg;
        };

        local.utility2.objectSetOverride = function (arg, overrides, depth) {
        /*
         * this function will recursively override the arg, with the overrides-object
         */
            var arg2, overrides2;
            Object.keys(overrides).forEach(function (key) {
                arg2 = arg[key];
                overrides2 = overrides[key];
                if (overrides2 === undefined) {
                    return;
                }
                // if both arg2 and overrides2 are non-null and non-array objects,
                // then recurse with arg2 and overrides2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        (arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2)) &&
                        // overrides2 is a non-null and non-array object
                        (overrides2 &&
                        typeof overrides2 === 'object' &&
                        !Array.isArray(overrides2))) {
                    local.utility2.objectSetOverride(arg2, overrides2, depth - 1);
                    return;
                }
                // else set arg[key] with overrides[key]
                arg[key] = arg === local.utility2.envDict
                    // if arg is envDict, then overrides falsey value with empty string
                    ? overrides2 || ''
                    : overrides2;
            });
            return arg;
        };

        local.utility2.objectTraverse = function (arg, onSelf, circularList) {
        /*
         * this function will recursively traverse the arg,
         * and run onSelf with the arg's properties
         */
            onSelf(arg);
            circularList = circularList || [];
            if (arg &&
                    typeof arg === 'object' &&
                    circularList.indexOf(arg) === -1) {
                circularList.push(arg);
                Object.keys(arg).forEach(function (key) {
                    // recurse with arg[key]
                    local.utility2.objectTraverse(arg[key], onSelf, circularList);
                });
            }
            return arg;
        };

        local.utility2.onErrorDefault = function (error) {
        /*
         * this function will print error.stack or error.message to stderr
         */
            // if error is defined, then print error.stack
            if (error && !local.global.__coverage__) {
                console.error('\nonErrorDefault - error\n' +
                    error.message + '\n' + error.stack + '\n');
            }
        };

        local.utility2.onErrorWithStack = function (onError) {
        /*
         * this function will return a new callback that calls onError,
         * and add the current stack to any error encountered
         */
            var stack;
            stack = new Error().stack;
            return function (error) {
                if (error) {
                    // save current-stack to error.stack
                    error.stack = error.stack + '\n' + stack;
                }
                onError.apply(null, arguments);
            };
        };

        local.utility2.onFileModifiedRestart = function (file) {
        /*
         * this function will watch the file, and if modified, then restart the process
         */
            if (local.utility2.envDict.npm_config_mode_auto_restart &&
                    local.fs.existsSync(file) &&
                    local.fs.statSync(file).isFile()) {
                local.fs.watchFile(file, {
                    interval: 1000,
                    persistent: false
                }, function (stat2, stat1) {
                    if (stat2.mtime > stat1.mtime) {
                        console.log('file modified - ' + file);
                        local.utility2.exit(77);
                    }
                });
            }
        };

        local.utility2.onParallel = function (onError, onDebug) {
        /*
         * this function will return a function that will
         * 1. runs async tasks in parallel
         * 2. if counter === 0 or error occurs, then run callback onError
         */
            var self;
            onError = local.utility2.onErrorWithStack(onError);
            onDebug = onDebug || local.utility2.nop;
            self = function (error) {
                onDebug(error, self);
                // if counter === 0 or error already occurred, then return
                if (self.counter === 0 || self.error) {
                    return;
                }
                // handle error
                if (error) {
                    self.error = error;
                    // ensure counter will decrement to 0
                    self.counter = 1;
                }
                // decrement counter
                self.counter -= 1;
                // if counter === 0, then run callback onError with error
                if (self.counter === 0) {
                    onError(error);
                }
            };
            // init counter
            self.counter = 0;
            // return callback
            return self;
        };

        local.utility2.onTimeout = function (onError, timeout, message) {
        /*
         * this function will create a timeout-error-handler,
         * that will append the current stack to any error encountered
         */
            onError = local.utility2.onErrorWithStack(onError);
            // create timeout timer
            return setTimeout(function () {
                onError(new Error('onTimeout - timeout-error - ' +
                    timeout + ' ms - ' + (typeof message === 'function'
                    ? message()
                    : message)));
            // coerce to finite integer
            }, timeout | 0);
        };

        local.utility2.profile = function (task, onError) {
        /*
         * this function will profile the async task in milliseconds
         */
            var timeStart;
            timeStart = Date.now();
            // run async task
            task(function (error) {
                // call onError with difference in milliseconds between Date.now() and timeStart
                onError(error, Date.now() - timeStart);
            });
        };

        local.utility2.profileSync = function (task) {
        /*
         * this function will profile the sync task in milliseconds
         */
            var timeStart;
            timeStart = Date.now();
            // run sync task
            task();
            // return difference in milliseconds between Date.now() and timeStart
            return Date.now() - timeStart;
        };

        local.utility2.processSpawnWithTimeout = function () {
        /*
         * this function will run like child_process.spawn,
         * but with auto-timeout after timeoutDefault milliseconds
         */
            var childProcess;
            // spawn childProcess
            childProcess = local.child_process.spawn.apply(local.child_process, arguments)
                // kill timerTimeout on exit
                .on('exit', function () {
                    local.utility2.tryCatchOnError(function () {
                        process.kill(childProcess.timerTimeout.pid);
                    }, local.utility2.nop);
                });
            // init failsafe timerTimeout
            childProcess.timerTimeout = local.child_process.spawn('/bin/sh', ['-c', 'sleep ' +
                // coerce to finite integer
                (((0.001 * local.utility2.timeoutDefault) | 0) +
                // add 2 second delay to failsafe timerTimeout
                2) + '; kill -9 ' + childProcess.pid + ' 2>/dev/null'], { stdio: 'ignore' });
            return childProcess;
        };

        local.utility2.replStart = function () {
        /*
         * this function will start the repl debugger
         */
            /*jslint evil: true*/
            // start repl server
            local._replServer = require('repl').start({ useGlobal: true });
            local._replServer.onError = function (error) {
            /*
             * this function will debug any repl-error
             */
                local.utility2._debugReplError = error || local.utility2._debugReplError;
            };
            local._replServer._domain.on('error', local._replServer.onError);
            // save repl eval function
            local._replServer.evalDefault = local._replServer.eval;
            // hook custom repl eval function
            local._replServer.eval = function (script, context, file, onError) {
                var match, onError2;
                match = (/^(\S+)(.*?)\n/).exec(script);
                onError2 = function (error, data) {
                    // debug error
                    local._replServer.onError(error);
                    onError(error, data);
                };
                switch (match && match[1]) {
                // syntax sugar to run async shell command
                case '$':
                    switch (match[2]) {
                    // syntax sugar to run git diff
                    case ' git diff':
                        match[2] = ' git diff --color | cat';
                        break;
                    // syntax sugar to run git log
                    case ' git log':
                        match[2] = ' git log -n 4 | cat';
                        break;
                    }
                    // run async shell command
                    local.utility2.processSpawnWithTimeout(
                        '/bin/sh',
                        ['-c', '. ' + __dirname + '/index.sh && ' + match[2]],
                        { stdio: ['ignore', 1, 2] }
                    )
                        // on shell exit, print return prompt
                        .on('exit', function (exitCode) {
                            console.log('exit-code ' + exitCode);
                            local._replServer.evalDefault('\n', context, file, onError2);
                        });
                    script = '\n';
                    break;
                // syntax sugar to grep current dir
                case 'grep':
                    // run async shell command
                    local.utility2.processSpawnWithTimeout(
                        '/bin/sh',
                        ['-c', 'find . -type f | grep -v ' +
                            '"/\\.\\|.*\\(\\b\\|_\\)\\(\\.\\d\\|' +
                            'archive\\|artifact\\|' +
                            'bower_component\\|build\\|' +
                            'coverage\\|' +
                            'doc\\|' +
                            'external\\|' +
                            'fixture\\|' +
                            'git_module\\|' +
                            'jquery\\|' +
                            'log\\|' +
                            'min\\|mock\\|' +
                            'node_module\\|' +
                            'rollup\\|' +
                            'swp\\|' +
                            'tmp\\)\\(\\b\\|[_s]\\)" ' +
                            '| tr "\\n" "\\000" | xargs -0 grep -in "' +
                            match[2].trim() + '"'],
                        { stdio: ['ignore', 1, 2] }
                    )
                        // on shell exit, print return prompt
                        .on('exit', function (exitCode) {
                            console.log('exit-code ' + exitCode);
                            local._replServer.evalDefault('\n', context, file, onError2);
                        });
                    script = '\n';
                    break;
                // syntax sugar to list object's keys, sorted by item-type
                case 'keys':
                    script = 'console.log(Object.keys(' + match[2] + ').map(function (key) {' +
                        'return typeof ' + match[2] + '[key] + " " + key;' +
                        '}).sort().join("\\n"))\n';
                    break;
                // syntax sugar to print stringified arg
                case 'print':
                    script = 'console.log(String(' + match[2] + '))\n';
                    break;
                }
                // eval modified script in a try-catch block
                local.utility2.tryCatchOnError(function () {
                    local._replServer.evalDefault(script, context, file, onError2);
                }, onError2);
            };
        };

        local.utility2.requestResponseCleanup = function (request, response) {
        /*
         * this function will end or destroy the request and response objects
         */
            [request, response].forEach(function (stream) {
                // try to end the stream
                local.utility2.tryCatchOnError(function () {
                    stream.end();
                }, function () {
                    // if error, then try to destroy the stream
                    local.utility2.tryCatchOnError(function () {
                        stream.destroy();
                    }, local.utility2.nop);
                });
            });
        };

        local.utility2.requireFromScript = function (file, script) {
        /*
         * this function will
         * 1. create a new module with the given file
         * 2. load module with the given script
         * 3. return module.exports
         */
            var module;
            if (require.cache[file]) {
                return require.cache[file].exports;
            }
            // 1. create a new module with the given file
            module = require.cache[file] = new local.Module(file);
            module.utility2 = local.utility2;
            // 2. load module with the given script
            module._compile(script, file);
            // 3. return module.exports
            return module.exports;
        };

        local.utility2.serverRespondDefault = function (request, response, statusCode, error) {
        /*
         * this function will respond with a default message,
         * or error.stack for the given statusCode
         */
            // init statusCode and contentType
            local.utility2.serverRespondHeadSet(
                request,
                response,
                statusCode,
                { 'Content-Type': 'text/plain; charset=utf-8' }
            );
            if (error) {
                // debug statusCode / method / url
                local.utility2.errorMessagePrepend(error, response.statusCode + ' ' +
                    request.method + ' ' + request.url + '\n');
                // print error.stack to stderr
                local.utility2.onErrorDefault(error);
                // end response with error.stack
                response.end(error.stack);
                return;
            }
            // end response with default statusCode message
            response.end(
                statusCode + ' ' + local.http.STATUS_CODES[statusCode]
            );
        };

        local.utility2.serverRespondEcho = function (request, response) {
        /*
         * this function will respond with debug info
         */
            response.write(request.method + ' ' + request.url +
                ' HTTP/' + request.httpVersion + '\r\n' +
                Object.keys(request.headers).map(function (key) {
                    return key + ': ' + request.headers[key] + '\r\n';
                }).join('') + '\r\n');
            request.pipe(response);
        };

        local.utility2.serverRespondHeadSet = function (
            request,
            response,
            statusCode,
            headers
        ) {
        /*
         * this function will set the response object's statusCode / headers
         */
            // jslint-hack
            local.utility2.nop(request);
            if (response.headersSent) {
                return;
            }
            // init response.statusCode
            if (Number(statusCode)) {
                response.statusCode = Number(statusCode);
            }
            Object.keys(headers).forEach(function (key) {
                if (headers[key]) {
                    response.setHeader(key, headers[key]);
                }
            });
            return true;
        };

        local.utility2.serverRespondTimeoutDefault = function (request, response, timeout) {
        /*
         * this function will create a timeout-error-handler for the server-request
         */
            request.onTimeout = request.onTimeout || function (error) {
                local.utility2.serverRespondDefault(request, response, 500, error);
                setTimeout(function () {
                    // cleanup request and response
                    local.utility2.requestResponseCleanup(request, response);
                }, 1000);
            };
            request.timerTimeout = local.utility2.onTimeout(
                request.onTimeout,
                timeout || local.utility2.timeoutDefault,
                'server ' + request.method + ' ' + request.url
            );
            response.on('finish', function () {
                clearTimeout(request.timerTimeout);
            });
        };

        local.utility2.streamReadAll = function (stream, onError) {
        /*
         * this function will concat data from the stream,
         * and pass it to onError when done reading
         */
            var chunkList;
            chunkList = [];
            // read data from the stream
            stream
                // on data event, push the buffer chunk to chunkList
                .on('data', function (chunk) {
                    chunkList.push(chunk);
                })
                // on end event, pass concatenated read buffer to onError
                .on('end', function () {
                    onError(null, local.modeJs === 'browser'
                        ? chunkList[0]
                        : Buffer.concat(chunkList));
                })
                // on error event, pass error to onError
                .on('error', onError);
        };

        local.utility2.stringHtmlSafe = function (text) {
        /*
         * this function will replace '&' to '&amp;', '<' to '&lt;',
         * and '>' to '&gt;' in the text to make it htmlSafe
         */
            return text
                .replace((/&/g), '&amp;')
                .replace((/</g), '&lt;')
                .replace((/>/g), '&gt;');
        };

        local.utility2.taskCallbackAdd = function (options, onError) {
        /*
         * this function will add the callback onError to the task named options.key
         */
            var task;
            onError = local.utility2.onErrorWithStack(onError);
            // init task
            task = local.utility2.taskUpsertDict[options.key] =
                local.utility2.taskUpsertDict[options.key] || { callbackList: [] };
            // add callback onError to the task
            task.callbackList.push(onError);
        };

        local.utility2.taskCallbackAndUpdateCached = function (options, onError, onTask) {
        /*
         * this function will run the callback onError from cache,
         * and auto-update the cache with background-task onTask
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    onError = local.utility2.onErrorWithStack(onError);
                    // read cacheValue from memory-cache
                    local.utility2.cacheDict[options.cacheDict] =
                        local.utility2.cacheDict[options.cacheDict] || {};
                    options.cacheValue =
                        local.utility2.cacheDict[options.cacheDict][options.key];
                    if (options.cacheValue) {
                        options.modeCacheHit = true;
                        // run callback onError with cacheValue
                        onError(null, JSON.parse(options.cacheValue));
                        if (!options.modeCacheUpdate) {
                            break;
                        }
                    }
                    // run background-task with lower priority for cache-hit
                    setTimeout(onNext, options.modeCacheHit && options.cacheTtl);
                    break;
                case 2:
                    // handle next cache-hit
                    local.utility2.taskCallbackAdd(options, onNext);
                    // run background-task to update cache
                    local.utility2.taskUpsert(options, onTask);
                    break;
                case 3:
                    // JSON.stringify data to prevent side-effects on cache
                    options.cacheValue = JSON.stringify(data);
                    if (!error && options.cacheValue) {
                        // save cacheValue to memory-cache
                        local.utility2.cacheDict[options.cacheDict][options.key] =
                            options.cacheValue;
                    }
                    // if cache-miss, then run callback onError with cacheValue
                    if (!options.modeCacheHit) {
                        onError(error, options.cacheValue && JSON.parse(options.cacheValue));
                    }
                    (options.onCacheWrite || local.utility2.nop)();
                    break;
                }
            };
            onNext();
        };

        local.utility2.taskUpsert = function (options, onTask) {
        /*
         * this function will upsert the task named options.key
         */
            var task;
            // init task
            task = local.utility2.taskUpsertDict[options.key] =
                local.utility2.taskUpsertDict[options.key] || { callbackList: [] };
            // if task is defined, then return
            if (task.onTask) {
                return task;
            }
            task.onDone = function () {
                // if already done, then do nothing
                if (task.done) {
                    return;
                }
                task.done = true;
                // cleanup timerTimeout
                clearTimeout(task.timerTimeout);
                // cleanup task
                delete local.utility2.taskUpsertDict[options.key];
                // preserve error.message and error.stack
                task.result = JSON.stringify(Array.prototype.slice.call(arguments)
                    .map(function (element) {
                        if (element && element.stack) {
                            element = local.utility2.objectSetDefault(local.utility2.jsonCopy(
                                element
                            ), {
                                message: element.message,
                                name: element.name,
                                stack: element.stack
                            });
                        }
                        return element;
                    }));
                // pass result to callbacks in callbackList
                task.callbackList.forEach(function (onError) {
                    onError.apply(null, JSON.parse(task.result));
                });
            };
            // init timerTimeout
            task.timerTimeout = local.utility2.onTimeout(
                task.onDone,
                options.timeout || local.utility2.timeoutDefault,
                'taskUpsert ' + options.key
            );
            task.onTask = onTask;
            // run onTask
            task.onTask(task.onDone);
            return task;
        };

        local.utility2.templateRender = function (template, dict, valueDefault) {
        /*
         * this function will replace the keys in the template with the dict's key / value
         */
            var argList, match, renderDefault, replace, rgx, value;
            dict = dict || {};
            renderDefault = function (match0) {
                return valueDefault === undefined
                    ? match0
                    : valueDefault;
            };
            replace = function (match0, fragment) {
                // if value is an array, then iteratively format the array fragment with it
                if (Array.isArray(dict[match])) {
                    return dict[match].map(function (dict) {
                        // recurse with fragment and dict
                        return local.utility2.templateRender(fragment, dict, valueDefault);
                    }).join('');
                }
                if (dict[match] && typeof dict[match] === 'object') {
                    return local.utility2.templateRender(fragment, dict[match], valueDefault);
                }
                return renderDefault(match0);
            };
            rgx = (/\{\{#[^}]+?\}\}/g);
            // search for array fragments in the template
            for (match = rgx.exec(template); match; match = rgx.exec(template)) {
                match = match[0].slice(3, -2);
                template = template.replace(
                    new RegExp('\\{\\{#' + match +
                        '\\}\\}([\\S\\s]*?)\\{\\{\\/' + match +
                        '\\}\\}'),
                    replace
                );
            }
            // search for keys in the template
            return template.replace((/\{\{[^}]+?\}\}/g), function (match0) {
                argList = match0.slice(2, -2).split(' ');
                value = dict;
                // iteratively lookup nested values in the dict
                argList[0].split('.').forEach(function (key) {
                    value = value && value[key];
                });
                if (value === undefined) {
                    return renderDefault(match0);
                }
                argList.slice(1).forEach(function (arg) {
                    switch (arg) {
                    case 'encodeURIComponent':
                        value = encodeURIComponent(value);
                        break;
                    case 'htmlSafe':
                        value = local.utility2.stringHtmlSafe(String(value));
                        break;
                    case 'json':
                        value = JSON.stringify(value);
                        break;
                    }
                });
                return String(value);
            });
        };

        local.utility2.testMock = function (mockList, onTestCase, onError) {
        /*
         * this function will mock the objects in mockList while running the onTestCase
         */
            var onError2;
            onError2 = function (error) {
                // restore mock[0] from mock[2]
                mockList.reverse().forEach(function (mock) {
                    local.utility2.objectSetOverride(mock[0], mock[2]);
                });
                onError(error);
            };
            // call onError with mock-objects in a try-catch block
            local.utility2.tryCatchOnError(function () {
                // mock-objects
                mockList.forEach(function (mock) {
                    mock[2] = {};
                    // backup mock[0] into mock[2]
                    Object.keys(mock[1]).forEach(function (key) {
                        mock[2][key] = mock[0][key];
                    });
                    // override mock[0] with mock[1]
                    local.utility2.objectSetOverride(mock[0], mock[1]);
                });
                // run onTestCase
                onTestCase(onError2);
            }, onError2);
        };

        local.utility2.testReportCreate = function (testReport) {
        /*
         * this function will create test-report artifacts
         */
            // print test-report summary
            console.log('\n' + new Array(56).join('-') + '\n' + testReport.testPlatformList
                .filter(function (testPlatform) {
                    // if testPlatform has no tests, then filter it out
                    return testPlatform.testCaseList.length;
                })
                .map(function (testPlatform) {
                    return '| test-report - ' + testPlatform.name + '\n|' +
                        ('        ' + testPlatform.timeElapsed + ' ms     ')
                        .slice(-16) +
                        ('        ' + testPlatform.testsFailed + ' failed ')
                        .slice(-16) +
                        ('        ' + testPlatform.testsPassed + ' passed ')
                        .slice(-16) + '     |\n' + new Array(56).join('-');
                })
                .join('\n') + '\n');
            // create test-report.html
            local.fs.writeFileSync(
                local.utility2.envDict.npm_config_dir_build + '/test-report.html',
                local.utility2.testReportMerge(testReport, {})
            );
            // create build.badge.svg
            local.fs.writeFileSync(local.utility2.envDict.npm_config_dir_build +
                '/build.badge.svg', local.utility2.templateBuildBadgeSvg
                // edit branch name
                .replace((/0000-00-00 00:00:00/g),
                    new Date().toISOString().slice(0, 19).replace('T', ' '))
                // edit branch name
                .replace((/- master -/g), '| ' + local.utility2.envDict.CI_BRANCH + ' |')
                // edit commit id
                .replace((/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/g),
                    local.utility2.envDict.CI_COMMIT_ID));
            // create test-report.badge.svg
            local.fs.writeFileSync(local.utility2.envDict.npm_config_dir_build +
                '/test-report.badge.svg', local.utility2.templateTestReportBadgeSvg
                // edit number of tests failed
                .replace((/999/g), testReport.testsFailed)
                // edit badge color
                .replace(
                    (/d00/g),
                    // coverage-hack - cover both fail and pass cases
                    '0d00'.slice(!!testReport.testsFailed).slice(0, 3)
                ));
            console.log('created test-report file://' +
                local.utility2.envDict.npm_config_dir_build + '/test-report.html\n');
            // if any test failed, then exit with non-zero exit-code
            console.log('\n' + local.utility2.envDict.MODE_BUILD +
                ' - ' + testReport.testsFailed + ' failed tests\n');
            // exit with number of tests failed
            local.utility2.exit(testReport.testsFailed);
        };

        local.utility2.testReportMerge = function (testReport1, testReport2) {
        /*
         * this function will
         * 1. merge testReport2 into testReport1
         * 2. return testReport1 in html-format
         */
            var errorStackList, testCaseNumber, testReport;
            // 1. merge testReport2 into testReport1
            [testReport1, testReport2].forEach(function (testReport, ii) {
                ii += 1;
                local.utility2.objectSetDefault(testReport, {
                    date: new Date().toISOString(),
                    errorStackList: [],
                    testPlatformList: [],
                    timeElapsed: 0
                }, 8);
                // security - handle malformed testReport
                local.utility2.assert(
                    testReport && typeof testReport === 'object',
                    ii + ' invalid testReport ' + typeof testReport
                );
                local.utility2.assert(
                    typeof testReport.timeElapsed === 'number',
                    ii + ' invalid testReport.timeElapsed ' + typeof testReport.timeElapsed
                );
                // security - handle malformed testReport.testPlatformList
                testReport.testPlatformList.forEach(function (testPlatform) {
                    local.utility2.objectSetDefault(testPlatform, {
                        name: 'undefined',
                        testCaseList: [],
                        timeElapsed: 0
                    }, 8);
                    local.utility2.assert(
                        typeof testPlatform.name === 'string',
                        ii + ' invalid testPlatform.name ' + typeof testPlatform.name
                    );
                    // insert $MODE_BUILD into testPlatform.name
                    if (local.utility2.envDict.MODE_BUILD) {
                        testPlatform.name = testPlatform.name.replace(
                            (/^(browser|node)\b/),
                            local.utility2.envDict.MODE_BUILD + ' - $1'
                        );
                    }
                    local.utility2.assert(
                        typeof testPlatform.timeElapsed === 'number',
                        ii + ' invalid testPlatform.timeElapsed ' +
                            typeof testPlatform.timeElapsed
                    );
                    // security - handle malformed testPlatform.testCaseList
                    testPlatform.testCaseList.forEach(function (testCase) {
                        local.utility2.objectSetDefault(testCase, {
                            errorStack: '',
                            name: 'undefined',
                            timeElapsed: 0
                        }, 8);
                        local.utility2.assert(
                            typeof testCase.errorStack === 'string',
                            ii + ' invalid testCase.errorStack ' + typeof testCase.errorStack
                        );
                        local.utility2.assert(
                            typeof testCase.name === 'string',
                            ii + ' invalid testCase.name ' + typeof testCase.name
                        );
                        local.utility2.assert(
                            typeof testCase.timeElapsed === 'number',
                            ii + ' invalid testCase.timeElapsed ' + typeof testCase.timeElapsed
                        );
                    });
                });
            });
            // merge testReport2.testPlatformList into testReport1.testPlatformList
            testReport2.testPlatformList.forEach(function (testPlatform2) {
                // add testPlatform2 to testReport1.testPlatformList
                testReport1.testPlatformList.push(testPlatform2);
            });
            // update testReport1.timeElapsed
            if (testReport1.timeElapsed < 0xffffffff) {
                testReport1.timeElapsed += testReport2.timeElapsed;
            }
            testReport = testReport1;
            testReport.testsFailed = 0;
            testReport.testsPassed = 0;
            testReport.testsPending = 0;
            testReport.testPlatformList.forEach(function (testPlatform) {
                testPlatform.testsFailed = 0;
                testPlatform.testsPassed = 0;
                testPlatform.testsPending = 0;
                testPlatform.testCaseList.forEach(function (testCase) {
                    // update failed tests
                    if (testCase.errorStack) {
                        testCase.status = 'failed';
                        testPlatform.testsFailed += 1;
                        testReport.testsFailed += 1;
                    // update passed tests
                    } else if (testCase.timeElapsed < 0xffffffff) {
                        testCase.status = 'passed';
                        testPlatform.testsPassed += 1;
                        testReport.testsPassed += 1;
                    // update pending tests
                    } else {
                        testCase.status = 'pending';
                        testPlatform.testsPending += 1;
                        testReport.testsPending += 1;
                    }
                });
                // update testPlatform.status
                testPlatform.status = testPlatform.testsFailed
                    ? 'failed'
                    : testPlatform.testsPending
                    ? 'pending'
                    : 'passed';
                // sort testCaseList by status and name
                testPlatform.testCaseList.sort(function (arg1, arg2) {
                    arg1 = arg1.status
                        .replace('passed', 'z') + arg1.name.toLowerCase();
                    arg2 = arg2.status
                        .replace('passed', 'z') + arg2.name.toLowerCase();
                    return arg1 <= arg2
                        ? -1
                        : 1;
                });
            });
            // sort testPlatformList by status and name
            testReport.testPlatformList.sort(function (arg1, arg2) {
                arg1 = arg1.status
                    .replace('passed', 'z') + arg1.name.toLowerCase();
                arg2 = arg2.status
                    .replace('passed', 'z') + arg2.name.toLowerCase();
                return arg1 <= arg2
                    ? -1
                    : 1;
            });
            // stop testReport timer
            if (testReport.testsPending === 0) {
                local._timeElapsedStop(testReport);
            }
            // 2. return testReport1 in html-format
            // json-copy testReport that will be modified for html templating
            testReport = local.utility2.jsonCopy(testReport1);
            // update timeElapsed
            local._timeElapsedStop(testReport);
            testReport.testPlatformList.forEach(function (testPlatform) {
                local._timeElapsedStop(testPlatform);
                testPlatform.testCaseList.forEach(function (testCase) {
                    local._timeElapsedStop(testCase);
                    testPlatform.timeElapsed = Math.max(
                        testPlatform.timeElapsed,
                        testCase.timeElapsed
                    );
                });
                // update testReport.timeElapsed with testPlatform.timeElapsed
                testReport.timeElapsed =
                    Math.max(testReport.timeElapsed, testPlatform.timeElapsed);
            });
            // create html test-report
            testCaseNumber = 0;
            return local.utility2.templateRender(
                local.utility2.templateTestReportHtml,
                local.utility2.objectSetOverride(testReport, {
                    CI_COMMIT_INFO: local.utility2.envDict.CI_COMMIT_INFO,
                    envDict: local.utility2.envDict,
                    // map testPlatformList
                    testPlatformList: testReport.testPlatformList
                        .filter(function (testPlatform) {
                            // if testPlatform has no tests, then filter it out
                            return testPlatform.testCaseList.length;
                        })
                        .map(function (testPlatform, ii) {
                            errorStackList = [];
                            return local.utility2.objectSetOverride(testPlatform, {
                                errorStackList: errorStackList,
                                name: testPlatform.name,
                                screenCapture: testPlatform.screenCaptureImg
                                    ? '<a href="' + testPlatform.screenCaptureImg + '">' +
                                        '<img ' +
                                        'class="testReportPlatformScreenCaptureImg" ' +
                                        'src="' + testPlatform.screenCaptureImg + '">' +
                                        '</a><br>'
                                    : '',
                                // map testCaseList
                                testCaseList: testPlatform.testCaseList.map(function (
                                    testCase
                                ) {
                                    testCaseNumber += 1;
                                    if (testCase.errorStack) {
                                        errorStackList.push({
                                            errorStack: testCaseNumber + '. ' + testCase.name +
                                                '\n' + testCase.errorStack
                                        });
                                    }
                                    return local.utility2.objectSetOverride(testCase, {
                                        testCaseNumber: testCaseNumber,
                                        testReportTestStatusClass: 'testReportTest' +
                                            testCase.status[0].toUpperCase() +
                                            testCase.status.slice(1)
                                    }, 8);
                                }),
                                testReportPlatformPreClass:
                                    'testReportPlatformPre' + (errorStackList.length
                                    ? ''
                                    : 'Hidden'),
                                testPlatformNumber: ii + 1
                            });
                        }, 8),
                    testsFailedClass: testReport.testsFailed
                        ? 'testReportTestFailed'
                        : 'testReportTestPassed'
                }, 8),
                'undefined'
            );
        };

        local.utility2.testRun = function (options) {
        /*
         * this function will run all tests in testPlatform.testCaseList
         */
            var exit, onParallel, testPlatform, testReport, testReportDiv, timerInterval;
            // init modeTest
            local.utility2.modeTest = local.utility2.modeTest ||
                local.utility2.envDict.npm_config_mode_npm_test;
            if (!(local.utility2.modeTest || options.modeTest)) {
                return;
            }
            if (!options.onReady) {
                options.onReady = function () {
                    local.utility2.testRun(options);
                };
                local.utility2.taskCallbackAdd({ key: 'utility2.onReady' }, options.onReady);
                local.utility2.onReady.counter += 1;
                setTimeout(local.utility2.onReady);
                return;
            }
            // init onParallel
            onParallel = local.utility2.onParallel(function () {
            /*
             * this function will create the test-report after all tests are done
             */
                // stop testPlatform timer
                local._timeElapsedStop(testPlatform);
                // finalize testReport
                local.utility2.testReportMerge(testReport, {});
                switch (local.modeJs) {
                case 'browser':
                    // notify saucelabs of test results
                    // https://docs.saucelabs.com/reference/rest-api/
                    // #js-unit-testing
                    local.global.global_test_results = {
                        coverage: local.global.__coverage__,
                        failed: testReport.testsFailed,
                        testReport: testReport
                    };
                    break;
                case 'node':
                    // create test-report.json
                    local.fs.writeFileSync(
                        local.utility2.envDict.npm_config_dir_build + '/test-report.json',
                        JSON.stringify(testReport)
                    );
                    // restore exit
                    process.exit = exit;
                    break;
                }
                setTimeout(function () {
                    if (local.modeJs === 'browser') {
                        // update coverageReport
                        local.utility2.istanbulCoverageReportCreate({
                            coverage: local.global.__coverage__
                        });
                    }
                    // exit with number of tests failed
                    local.utility2.exit(testReport.testsFailed);
                // coverage-hack - wait 1000 ms for timerInterval
                }, 1000);
            });
            onParallel.counter += 1;
            // mock exit
            switch (local.modeJs) {
            case 'node':
                exit = process.exit;
                process.exit = local.utility2.nop;
                break;
            }
            // init modeTestCase
            local.utility2.modeTestCase = local.utility2.modeTestCase ||
                local.utility2.envDict.npm_config_mode_test_case;
            // init testReport
            testReport = local.utility2.testReport;
            // init testReport timer
            testReport.timeElapsed = Date.now();
            // init testPlatform
            testPlatform = local.utility2.testReport.testPlatformList[0];
            // init testPlatform timer
            testPlatform.timeElapsed = Date.now();
            // reset testPlatform.testCaseList
            testPlatform.testCaseList.length = 0;
            // add tests into testPlatform.testCaseList
            Object.keys(options).forEach(function (key) {
                // add testCase options[key] to testPlatform.testCaseList
                if ((local.utility2.modeTestCase && local.utility2.modeTestCase === key) ||
                        (!local.utility2.modeTestCase && key.indexOf('testCase_') === 0)) {
                    testPlatform.testCaseList.push({
                        name: key,
                        onTestCase: options[key],
                        timeElapsed: Date.now()
                    });
                }
            });
            // visually update test-progress until done
            // init testReportDiv element
            if (local.modeJs === 'browser') {
                testReportDiv = document.querySelector('.testReportDiv');
            }
            testReportDiv = testReportDiv || { style: {} };
            testReportDiv.style.display = 'block';
            testReportDiv.innerHTML = local.utility2.testReportMerge(testReport, {});
            // update test-report status every 1000 ms until done
            timerInterval = setInterval(function () {
                // update testReportDiv in browser
                testReportDiv.innerHTML = local.utility2.testReportMerge(testReport, {});
                if (testReport.testsPending === 0) {
                    // cleanup timerInterval
                    clearInterval(timerInterval);
                }
            }, 1000);
            // shallow copy testPlatform.testCaseList,
            // to guard against in-place sort from testReportMerge
            testPlatform.testCaseList.slice().forEach(function (testCase) {
                var done, onError, timerTimeout;
                onError = function (error) {
                    // cleanup timerTimeout
                    clearTimeout(timerTimeout);
                    // if testCase already done, then fail testCase with error for ending again
                    if (done) {
                        error = error || new Error('callback in testCase ' +
                            testCase.name + ' called multiple times');
                    }
                    // if error occurred, then fail testCase
                    if (error) {
                        console.error('\ntestCase ' + testCase.name + ' failed\n' +
                            error.message + '\n' + error.stack);
                        testCase.errorStack = testCase.errorStack ||
                            error.message + '\n' + error.stack;
                        // validate errorStack is non-empty
                        local.utility2.assert(testCase.errorStack, 'invalid errorStack ' +
                            testCase.errorStack);
                    }
                    // if already done, then do nothing
                    if (done) {
                        return;
                    }
                    done = true;
                    // stop testCase timer
                    local._timeElapsedStop(testCase);
                    console.log('[' + local.modeJs + ' test-case ' +
                        testPlatform.testCaseList.filter(function (testCase) {
                            return testCase.timeElapsed < 0xffffffff;
                        }).length + ' of ' + testPlatform.testCaseList.length +
                        (testCase.errorStack
                        ? ' failed'
                        : ' passed') + '] - ' + testCase.name);
                    // if all tests are done, then create test-report
                    onParallel();
                };
                // init timerTimeout
                timerTimeout = local.utility2.onTimeout(
                    onError,
                    local.utility2.timeoutDefault,
                    testCase.name
                );
                // increment number of tests remaining
                onParallel.counter += 1;
                // run testCase in a try-catch block
                local.utility2.tryCatchOnError(function () {
                    // start testCase timer
                    testCase.timeElapsed = Date.now();
                    testCase.onTestCase(null, onError);
                }, onError);
            });
            onParallel();
        };

        local.utility2.testRunServer = function (options) {
        /*
         * this function will
         * 1. create server from options.middleware
         * 2. start server on options.port
         * 3. run tests
         */
            var requestHandler, server;
            // 1. create server from options.middleware
            requestHandler = function (request, response) {
                options.middleware(request, response, function (error) {
                    options.middlewareError(error, request, response);
                });
            };
            server = local.http.createServer(requestHandler);
            // 2. start server on options.port
            options.port = options.port || local.utility2.envDict.PORT;
            local.utility2.serverLocalRequestHandler = requestHandler;
            console.log('server starting on port ' + options.port);
            local.utility2.onReady.counter += 1;
            server.listen(options.port, local.utility2.onReady);
            // if $npm_config_timeout_exit is defined,
            // then exit this process after $npm_config_timeout_exit ms
            if (Number(local.utility2.envDict.npm_config_timeout_exit)) {
                setTimeout(function () {
                    // screen-capture main-page
                    local.utility2.browserTest({
                        modeBrowserTest: 'screenCapture',
                        url: local.utility2.serverLocalHost
                    }, function (error) {
                        console.log('server stopping on port ' + options.port);
                        local.utility2.exit(error);
                    });
                }, Number(local.utility2.envDict.npm_config_timeout_exit));
            }
            // 3. run tests
            local.utility2.testRun(options);
            return server;
        };

        local.utility2.timeoutDefaultInit = function () {
        /*
         * this function will init timeoutDefault
         */
            // init utility2 properties
            switch (local.modeJs) {
            case 'browser':
                location.search.replace(
                    (/\b(mode[A-Z]\w+|timeExit|timeoutDefault)=([\w\-\.\%]+)/g),
                    function (match0, key, value) {
                        // jslint-hack
                        local.utility2.nop(match0);
                        local.utility2[key] = value;
                        // try to JSON.parse the string
                        local.utility2.tryCatchOnError(function () {
                            local.utility2[key] = JSON.parse(value);
                        }, local.utility2.nop);
                    }
                );
                break;
            case 'node':
                local.utility2.timeExit = local.utility2.envDict.npm_config_time_exit;
                local.utility2.timeoutDefault =
                    local.utility2.envDict.npm_config_timeout_default;
                break;
            }
            // init timeExit
            local.utility2.timeExit = Number(local.utility2.timeExit);
            if (local.utility2.timeExit) {
                local.utility2.timeoutDefault = local.utility2.timeExit - Date.now();
                local.utility2.onTimeout(
                    local.utility2.exit,
                    local.utility2.timeoutDefault,
                    'exit'
                );
            }
            // init timeoutDefault
            local.utility2.timeoutDefault = Number(local.utility2.timeoutDefault || 30000);
        };

        local.utility2.tryCatchOnError = function (task, onError) {
        /*
         * this function will try to run the task in a try-catch block,
         * else call onError with the errorCaught
         */
            var stack;
            stack = new Error().stack;
            try {
                task();
                local.utility2.tryCatchErrorCaught = null;
            } catch (errorCaught) {
                // save current-stack to errorCaught.stack
                errorCaught.stack = errorCaught.stack + '\n' + stack;
                onError(errorCaught);
                local.utility2.tryCatchErrorCaught = errorCaught;
            }
        };

        local.utility2.uglify = (local.utility2.uglifyjs &&
            local.utility2.uglifyjs.uglify) || local.utility2.echo;

        local.utility2.uglifyIfProduction = function (code) {
        /*
         * this function will uglify the js-code, if $npm_config_production is true
         */
            return local.utility2.envDict.npm_config_production
                ? local.utility2.uglify(code)
                : code;
        };

        local.utility2.urlParse = function (url) {
        /*
         * https://developer.mozilla.org/en-US/docs/Web/API/URL
         * this function will parse the url according to the above spec, plus a query param
         */
            var urlParsed;
            urlParsed = {};
            local.utility2.tryCatchOnError(function () {
                // resolve host-less url
                switch (local.modeJs) {
                case 'browser':
                    local.utility2.serverLocalHost = local.utility2.serverLocalHost ||
                        location.protocol + '//' + location.host;
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.utility2.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.utility2.serverLocalHost +
                            location.pathname.replace((/\/[^\/]*?$/), '') + '/' + url;
                    }
                    urlParsed = new local.global.URL(url);
                    break;
                case 'node':
                    local.utility2.serverLocalHost = local.utility2.serverLocalHost ||
                        'http://localhost:' + (local.utility2.envDict.PORT || '80');
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.utility2.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.utility2.serverLocalHost + '/' + url;
                    }
                    urlParsed = local.url.parse(url);
                    break;
                }
                // init query
                urlParsed.query = {};
                urlParsed.search.slice(1).replace((/[^&]+/g), function (item) {
                    item = item.split('=');
                    item[0] = decodeURIComponent(item[0]);
                    item[1] = decodeURIComponent(item.slice(1).join('='));
                    // parse repeating query-param as an array
                    if (urlParsed.query[item[0]]) {
                        if (!Array.isArray(urlParsed.query[item[0]])) {
                            urlParsed.query[item[0]] = [urlParsed.query[item[0]]];
                        }
                        urlParsed.query[item[0]].push(item[1]);
                    } else {
                        urlParsed.query[item[0]] = item[1];
                    }
                });
            }, local.utility2.nop);
            // https://developer.mozilla.org/en/docs/Web/API/URL#Properties
            return {
                hash: urlParsed.hash || '',
                host: urlParsed.host || '',
                hostname: urlParsed.hostname || '',
                href: urlParsed.href || '',
                pathname: urlParsed.pathname || '',
                port: urlParsed.port || '',
                protocol: urlParsed.protocol || '',
                query: urlParsed.query || {},
                search: urlParsed.search || ''
            };
        };

        local.utility2.uuid4Create = function () {
        /*
         * this function will return a random uuid,
         * with form "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
         */
            // code derived from http://jsperf.com/uuid4
            var id, ii;
            id = '';
            for (ii = 0; ii < 32; ii += 1) {
                switch (ii) {
                case 8:
                case 20:
                    id += '-';
                    // coerce to finite integer
                    id += (Math.random() * 16 | 0).toString(16);
                    break;
                case 12:
                    id += '-';
                    id += '4';
                    break;
                case 16:
                    id += '-';
                    id += (Math.random() * 4 | 8).toString(16);
                    break;
                default:
                    // coerce to finite integer
                    id += (Math.random() * 16 | 0).toString(16);
                }
            }
            return id;
        };

        local.utility2.uuidTimeCreate = function () {
        /*
         * this function will return a time-based variant of uuid4,
         * with form "tttttttt-tttx-4xxx-yxxx-xxxxxxxxxxxx"
         */
            return Date.now().toString(16).replace((/(.{8})/), '$1-') +
                local.utility2.uuid4Create().slice(12);
        };
    }());



    // run shared js-env code - post-init
    (function () {
        local.utility2.contentTypeDict = {
            // application
            '.js': 'application/javascript; charset=UTF-8',
            '.json': 'application/json; charset=UTF-8',
            '.pdf': 'application/pdf',
            '.xml': 'application/xml; charset=UTF-8',
            // image
            '.bmp': 'image/bmp',
            '.gif': 'image/gif',
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.svg': 'image/svg+xml; charset=UTF-8',
            // text
            '.css': 'text/css; charset=UTF-8',
            '.htm': 'text/html; charset=UTF-8',
            '.html': 'text/html; charset=UTF-8',
            '.md': 'text/markdown; charset=UTF-8',
            '.txt': 'text/plain; charset=UTF-8'
        };
        local.utility2.envDict = local.modeJs === 'browser'
            ? {}
            : process.env;
        local.utility2.errorDefault = new Error('default error');
        // http://www.w3.org/TR/html5/forms.html
        /* jslint-ignore-next-line */
        local.utility2.regexpEmailValidate = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        local.utility2.regexpUriComponentCharset = (/[\w\!\%\'\(\)\*\-\.\~]/);
        local.utility2.regexpUuidValidate =
            (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        local.utility2.stringAsciiCharset = local.utility2.stringExampleAscii ||
            '\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f' +
            '\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f' +
            ' !"#$%&\'()*+,-./0123456789:;<=>?' +
            '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
            '`abcdefghijklmnopqrstuvwxyz{|}~\x7f';
        local.utility2.stringUriComponentCharset = '!%\'()*-.' +
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~';
        local.utility2.testReport = { testPlatformList: [{
            name: local.modeJs === 'browser'
                ? 'browser - ' +
                    location.pathname + ' - ' +
                    navigator.userAgent + ' - ' +
                    new Date().toISOString()
                : 'node - ' + process.platform + ' ' + process.version + ' - ' +
                    new Date().toISOString(),
            screenCaptureImg: local.utility2.envDict.MODE_BUILD_SCREEN_CAPTURE,
            testCaseList: []
        }] };
        // init serverLocalHost
        local.utility2.urlParse('');
        // init timeoutDefault
        local.utility2.timeoutDefaultInit();
        // init onReady
        local.utility2.onReady = local.utility2.onParallel(function (error) {
            local.utility2.taskCallbackAdd({ key: 'utility2.onReady' }, function (error) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                // hide ajaxProgressDiv
                if (local.modeJs === 'browser' &&
                        document.querySelector('.ajaxProgressDiv') &&
                        document.querySelector('.ajaxProgressDiv').style.display !==
                        'none') {
                    local.utility2.ajax({ url: "" }, local.utility2.nop);
                }
            });
            local.utility2.taskUpsert({ key: 'utility2.onReady' }, function (onError) {
                onError(error);
            });
        });
        local.utility2.onReady.counter += 1;
        setTimeout(local.utility2.onReady);
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.utility2 = local.utility2;
        // require modules
        local.http = local._http;
        local.https = local._http;
        break;



    // run node js-env code - post-init
    case 'node':
        // init exports
        module.exports = local.utility2;
        module.exports.__dirname = __dirname;
        // require modules
        local.Module = require('module');
        local.child_process = require('child_process');
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.path = require('path');
        local.url = require('url');
        local.vm = require('vm');
        local.zlib = require('zlib');
        // init utility2 properties
        local.utility2.objectSetDefault(local.utility2.envDict, {
            npm_config_dir_build: process.cwd() + '/tmp/build',
            npm_config_dir_tmp: process.cwd() + '/tmp',
            npm_package_name: 'example-module',
            npm_package_description: 'this is an example module',
            npm_package_version: '0.0.1'
        });
        // init assets
        local.utility2.assetsDict['/assets.utility2.js'] =
            local.utility2.uglifyIfProduction(
                local.utility2.istanbulInstrumentInPackage(
                    local.fs.readFileSync(__filename, 'utf8'),
                    __filename,
                    'utility2'
                )
            );
        local.utility2.assetsDict['/assets.utility2.css'] =
            local.fs.readFileSync(__dirname + '/index.css', 'utf8');
        ['bcrypt', 'cryptojs', 'istanbul', 'jslint', 'uglifyjs'].forEach(function (key) {
            local.utility2.assetsDict['/assets.utility2.lib.' + key + '.js'] =
                local.utility2.uglifyIfProduction(
                    local.utility2.istanbulInstrumentInPackage(
                        local.fs.readFileSync(__dirname + '/lib.' + key + '.js', 'utf8')
                            .replace((/^#!/), '//'),
                        __dirname + '/lib.' + key + '.js',
                        'utility2'
                    )
                );
        });
        /* istanbul ignore next */
        // run the cli
        local.cliRun = function () {
        /*
         * this function will run the cli
         */
            var options;
            // merge previous test-report
            if (local.utility2.envDict.npm_config_file_test_report_merge) {
                local.utility2.testReportMerge(
                    local.utility2.testReport,
                    JSON.parse(local.fs.readFileSync(
                        local.utility2.envDict.npm_config_file_test_report_merge,
                        'utf8'
                    ))
                );
            }
            if (module !== require.main) {
                return;
            }
            switch (process.argv[2]) {
            case 'browserTest':
                local.utility2.browserTest({}, local.utility2.exit);
                break;
            case 'docApiCreate':
                options = local.utility2.requireFromScript('docApiCreate', process.argv[3]);
                // init example
                options.example = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
                options.exampleFileList.forEach(function (file) {
                    var dir;
                    file = process.cwd() + '/' + file;
                    // try to read the file
                    local.utility2.tryCatchOnError(function () {
                        options.example += local.fs.readFileSync(file, 'utf8') +
                            '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
                    }, function () {
                        // try to read the dir
                        dir = file;
                        local.fs.readdirSync(dir).sort().forEach(function (file) {
                            if (file.slice(-3) === '.js') {
                                file = dir + '/' + file;
                                // try to read the file
                                local.utility2.tryCatchOnError(function () {
                                    options.example += local.fs.readFileSync(file, 'utf8') +
                                        '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
                                }, local.utility2.nop);
                            }
                        });
                    });
                });
                // create doc.api.html
                local.utility2.fsWriteFileWithMkdirp(
                    local.utility2.envDict.npm_config_dir_build + '/doc.api.html',
                    local.utility2.docApiCreate(options),
                    local.utility2.exit
                );
                break;
            }
        };
        local.cliRun();
        break;
    }
}());
