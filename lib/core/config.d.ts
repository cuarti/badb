export declare enum Environment {
    DEVELOPMENT = 0,
    PRODUCTION = 1,
}
export interface RunConfig {
    ENV: Environment;
}
export declare const defaultRunConfig: RunConfig;
export interface HttpConfig {
    port: number;
}
export declare const defaultHttpConfig: HttpConfig;
export declare class Config {
    static RC_FILENAME: string;
    static CONFIG_DIR: string;
    private env;
    rc: RunConfig;
    http: HttpConfig;
    constructor(rcFilename?: string);
    private initRC(filename);
    private getConfig<T>(name, defaultConfig);
    private getEnvConfig();
    private static getPath(paths);
}
