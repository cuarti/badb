
import * as express from 'express';
import {Express} from 'express';

import {Config} from '../core/config';
import {HttpEngine} from './http_engine';


export class ExpressEngine implements HttpEngine {

    listening: boolean = false;
    private core: Express;

    public constructor() {
        try {
            this.core = express();
        } catch(e) {
            console.error(e);
        }
    }

    isListening(): boolean {
        return this.listening;
    }

    start(config:Config): void {

    }

    close(): void {

    }

}
