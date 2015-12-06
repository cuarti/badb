var express = require('express');
var ExpressEngine = (function () {
    function ExpressEngine() {
        this.listening = false;
        try {
            this.core = express();
        }
        catch (e) {
            console.error(e);
        }
    }
    ExpressEngine.prototype.isListening = function () {
        return this.listening;
    };
    ExpressEngine.prototype.start = function (config) {
    };
    ExpressEngine.prototype.close = function () {
    };
    return ExpressEngine;
})();
exports.ExpressEngine = ExpressEngine;
//# sourceMappingURL=express_engine.js.map