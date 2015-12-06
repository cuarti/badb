import { Config } from './config';
import { HttpEngine } from '../http/http_engine';
export declare class Badb {
    private static instance;
    config: Config;
    server: HttpEngine;
    constructor();
    static start(): void;
}
