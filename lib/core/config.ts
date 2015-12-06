
import * as path from 'path';
import * as fs from 'fs';


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
        this.rc = this.initRC(rcFilename);
        this.env = this.getEnvConfig();
        this.http = this.getConfig('http', defaultHttpConfig);
    }

    private initRC(filename: string): RunConfig {

        var config: RunConfig = _clone(defaultRunConfig);

        fs.readFileSync(Config.getPath(filename), 'utf8').split('\n').forEach((line: string) => {

            if(line.trim() !== '' && line[0] !== '#') {
                var parts: string[] = line.split('=');
                if(parts.length === 2) {
                    config[parts[0].trim()] = parts[1].trim();
                }
            }

        });

        return config;
    }

    private getConfig<T>(name: string, defaultConfig: T): T {
        var config = require(Config.getPath(Config.CONFIG_DIR + '/' + name));
        config = _extend(config, this.env[name]);
        return _extend(_clone(defaultConfig), config);
    }

    private getEnvConfig(): Object {
        var env = Environment[Environment[this.rc.ENV]];
        return require(Config.getPath(Config.CONFIG_DIR + '/' + 'env/' + env.toLowerCase()));
    }

    private static getPath(paths: string): string {
        return path.join(path.dirname(process.argv[1]), paths);
    }

}

//TODO: esto se tiene que abstraer a una biblioteca de utilidades
function _clone<T>(obj: T): T {

    var copy: any = {};
    for(var i in obj) {
        if(obj.hasOwnProperty(i)) {
            copy[i] = obj[i];
        }
    }

    return copy;
}

//TODO: esto se tiene que abstraer a una biblioteca de utilidades
function _extend<T>(obj1: T, obj2: Object): T {

    for(var i in obj2) {
        if(obj2.hasOwnProperty(i)) {
            obj1[i] = obj2[i];
        }
    }

    return obj1;
}

//function _getEnumName(enumeration, v) {
//
//    console.log(enumeration);
//
//    for(var i in enumeration) {
//        if(enumeration.hasOwnProperty(i) && enumeration[i] === v) {
//            return i;
//        }
//    }
//
//}
