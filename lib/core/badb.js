var config_1 = require('./config');
var express_engine_1 = require('../http/express_engine');
var Badb = (function () {
    function Badb() {
        if (Badb.instance) {
            throw new Error('Error: Instantiation failed: Use Badb.getInstance() instead of new.');
        }
        this.config = new config_1.Config();
        this.server = new express_engine_1.ExpressEngine();
    }
    Badb.start = function () {
        var badb = this.instance = new Badb();
        try {
            badb.server.start(badb.config);
        }
        catch (e) {
            console.error(e);
        }
    };
    return Badb;
})();
exports.Badb = Badb;
//# sourceMappingURL=badb.js.map