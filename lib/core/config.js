var path = require('path');
var fs = require('fs');
(function (Environment) {
    Environment[Environment["DEVELOPMENT"] = 0] = "DEVELOPMENT";
    Environment[Environment["PRODUCTION"] = 1] = "PRODUCTION";
})(exports.Environment || (exports.Environment = {}));
var Environment = exports.Environment;
exports.defaultRunConfig = {
    ENV: Environment.DEVELOPMENT
};
exports.defaultHttpConfig = {
    port: 80
};
var Config = (function () {
    function Config(rcFilename) {
        if (rcFilename === void 0) { rcFilename = Config.RC_FILENAME; }
        this.rc = this.initRC(rcFilename);
        this.env = this.getEnvConfig();
        this.http = this.getConfig('http', exports.defaultHttpConfig);
    }
    Config.prototype.initRC = function (filename) {
        var config = _clone(exports.defaultRunConfig);
        fs.readFileSync(Config.getPath(filename), 'utf8').split('\n').forEach(function (line) {
            if (line.trim() !== '' && line[0] !== '#') {
                var parts = line.split('=');
                if (parts.length === 2) {
                    config[parts[0].trim()] = parts[1].trim();
                }
            }
        });
        return config;
    };
    Config.prototype.getConfig = function (name, defaultConfig) {
        var config = require(Config.getPath(Config.CONFIG_DIR + '/' + name));
        config = _extend(config, this.env[name]);
        return _extend(_clone(defaultConfig), config);
    };
    Config.prototype.getEnvConfig = function () {
        var env = Environment[Environment[this.rc.ENV]];
        return require(Config.getPath(Config.CONFIG_DIR + '/' + 'env/' + env.toLowerCase()));
    };
    Config.getPath = function (paths) {
        return path.join(path.dirname(process.argv[1]), paths);
    };
    Config.RC_FILENAME = '.badbrc';
    Config.CONFIG_DIR = 'config';
    return Config;
})();
exports.Config = Config;
function _clone(obj) {
    var copy = {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            copy[i] = obj[i];
        }
    }
    return copy;
}
function _extend(obj1, obj2) {
    for (var i in obj2) {
        if (obj2.hasOwnProperty(i)) {
            obj1[i] = obj2[i];
        }
    }
    return obj1;
}
//# sourceMappingURL=config.js.map