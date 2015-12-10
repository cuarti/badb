
import * as fs from 'fs';
import * as path from 'path';

import {RC} from './rc';
import {Enumeration} from '../_utils/enumeration';
import {TObject} from '../_utils/tobject';


/*
 * Environment
 */
export enum Environment {
    DEVELOPMENT,
    PRODUCTION
    //DEVELOPMENT = 'DEVELOPMENT',
    //PRODUCTION = 'PRODUCTION'
}

export interface RunConfig {
    ENV: Environment;
}

export const defaultRunConfig: RunConfig = {
    ENV: Environment.DEVELOPMENT
};

/*
 * Http
 */
export interface HttpConfig {
    port: number
}

export const defaultHttpConfig: HttpConfig = {
    port: 80
};


/**
 *
 */
export class Config {

    public static RC_FILENAME = '.badbrc';
    public static CONFIG_DIR = 'config';

    private env: Object;

    public rc: RunConfig;
    public http: HttpConfig;

    /**
     *
     * @param rcFilename
     */
    public constructor(rcFilename: string = Config.RC_FILENAME) {
        this.rc = TObject.extend(defaultRunConfig, RC.parse(rcFilename));
        this.env = this.getEnvConfig();
        this.http = this.getConfig('http', defaultHttpConfig);
    }

    private getConfig<T>(name: string, defaultConfig: T): T {
        var config = require(Config.getPath(Config.CONFIG_DIR + '/' + name));
        config = TObject.extend(config, this.env[name]);
        return TObject.extend(TObject.clone(defaultConfig), config);
    }

    private getEnvConfig(): Object {
        return require(Config.getPath(Config.CONFIG_DIR + '/' + 'env/' + Enumeration.getKey(Environment, this.rc.ENV).toLowerCase()));
    }

    private static getPath(paths: string): string {
        return path.join(path.dirname(process.argv[1]), paths);
    }

}
