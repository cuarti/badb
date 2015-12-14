
import {join} from 'path';

import {parseRC} from './rc';
import {enumKey, enumValue} from '../_utils/enumeration';
import {extend} from '../_utils/object';


/*
 * Environment
 */
export enum Environment {
    DEVELOPMENT,
    PRODUCTION
}

export interface RunConfig {
    ENV: Environment;
    MAINTENANCE: boolean;
    CONFIG_PATH: string;
}

/*
 * Http
 */
export interface HttpConfig {
    port: number
}


/**
 *
 */
export class Config {

    public static RC_FILENAME = '.badbrc';
    public static ROOT = process.cwd();

    public rc: RunConfig = {
        ENV: Environment.DEVELOPMENT,
        MAINTENANCE: false,
        CONFIG_PATH: 'config'
    };

    public http: HttpConfig = {
        port: 3000
    };

    public constructor(rc) {
        rc.ENV = enumValue(Environment, rc.ENV);
        extend(this.rc, rc);
    }

    /**
     * Init configuration
     *
     * @param {string} [rcFilename = '.badbrc']
     * @returns {Config}
     */
    public static init(rcFilename: string = Config.RC_FILENAME): Config {

        let config: Config = new Config(parseRC(rcFilename));
        let envName: string = enumKey(Environment, config.rc.ENV).toLowerCase();
        let env: any = _readConfigFile('env', envName);

        _initConfigModule('http');

        return config;

        /**
         * Init a config module
         *
         * @param {string} name name of config module
         * @private
         */
        function _initConfigModule(name: string): void {

            extend(config[name], extend(_readConfigFile(name), env[name] || {}));
        }

        /**
         * Read config file
         *
         * @param {...string} paths
         * @returns {Object}
         * @private
         */
        function _readConfigFile(...paths): any {

            try {
                let cfg: any = require(join.apply(null, [Config.ROOT, config.rc.CONFIG_PATH].concat(paths)));
                return typeof cfg === 'object' ? cfg : {};

            } catch(e) {
                return {};
            }
        }

    }

}
