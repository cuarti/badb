
const systemjs = require('systemjs');


export class Loader {

    private static instance: Loader;
    private config;

    public constructor(config) {
        systemjs.config(this.config = config);
    }

    public interpret(module: string): void {
        systemjs.import(module).catch(err => {
            console.error('Loader error: ' + err)
        });
    }

    public static init(config: Object) {
        return Loader.instance = new Loader(config);
    }

}
