
import {HttpConfig} from '../core/config';

export interface HttpEngine {

    running: boolean;
    config: HttpConfig;

    isRunning(): boolean;
    start(): void;
    close(): void;

}
