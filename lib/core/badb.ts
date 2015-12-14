
import {Config} from './config';
import {HttpEngine} from '../http/http_engine';
import {ExpressEngine} from '../_express/express_engine';
import {Loader} from '../core/loader';


/**
 *
 */
export class Badb {

    public config: Config;
    public server: HttpEngine;

    //public serve(config?: Config): void {
    public serve(): void {

        this.config = Config.init();

        console.log(this.config);

        //let loader = Loader.init({
        //    baseURL: Config.ROOT + '/api',
        //    transpiler: 'typescript',
        //    typescriptOptions: {
        //        emitDecoratorMetadata: true,
        //        experimentalDecorators: true
        //    },
        //    packages: {
        //        '/': {defaultExtension: 'ts'}
        //    }
        //});
        //
        //loader.interpret('http/controllers/foo');

        this.server = new ExpressEngine(this.config.http);

        try {
            this.server.start();
        } catch(e) {
            console.error(e);
        }

    }

}
