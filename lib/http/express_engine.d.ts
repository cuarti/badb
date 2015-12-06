import { Config } from '../core/config';
import { HttpEngine } from './http_engine';
export declare class ExpressEngine implements HttpEngine {
    listening: boolean;
    private core;
    constructor();
    isListening(): boolean;
    start(config: Config): void;
    close(): void;
}
