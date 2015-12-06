import { Config } from '../core/config';
export interface HttpEngine {
    listening: boolean;
    isListening(): boolean;
    start(config: Config): void;
    close(): void;
}
