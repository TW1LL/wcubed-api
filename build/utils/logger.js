"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Console = console.Console;
var Logger = (function () {
    function Logger() {
        this.console = new Console(process.stdout, process.stderr);
    }
    Logger.prototype.debug = function (text) {
        this.console.log(this.getTime, '>>', text);
    };
    Logger.prototype.info = function (text) {
        this.console.info(this.getTime, '>>', text);
    };
    Logger.prototype.error = function (text) {
        this.console.error(this.getTime, '>>', text);
    };
    Logger.prototype.log = function (text) {
        this.console.log(this.getTime, '>>', text);
    };
    Object.defineProperty(Logger.prototype, "getTime", {
        get: function () {
            return new Date().toLocaleString();
        },
        enumerable: true,
        configurable: true
    });
    return Logger;
}());
exports.logger = new Logger();
