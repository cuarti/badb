
import {Config} from './config';
import {HttpEngine} from '../http/http_engine';
import {ExpressEngine} from '../http/express_engine';


export class Badb {

    private static instance: Badb;

    public config: Config;
    public server: HttpEngine;

    constructor() {

        if(Badb.instance) {
            throw new Error('Error: Instantiation failed: Use Badb.getInstance() instead of new.');
        }

        this.config = new Config();
        this.server = new ExpressEngine();
    }

    //public static start(config?): void {
    public static start(): void {

        var badb = this.instance = new Badb();

        try {
            badb.server.start(badb.config);
        } catch(e) {
            console.error(e);
        }

    }

}
