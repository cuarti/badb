
import * as http from 'http';
import {Server} from 'http';
import {join} from 'path';

import * as express from 'express';
import * as Debug from 'debug';
//import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import {Express, Request, Response} from 'express';

import {HttpConfig} from '../core/config';
import {HttpEngine} from '../http/http_engine';
import {StatusError} from './status_error';


const debug = Debug('express:server');


export class ExpressEngine implements HttpEngine {

    running: boolean = false;
    config: HttpConfig;

    private core: Express;
    private server: Server;

    public constructor(config: HttpConfig) {
        this.config = config;
        try {
            this.core = this.initExpress();
            this.server = http.createServer(this.core);
        } catch(e) {
            console.error(e);
        }
    }

    isRunning(): boolean {
        return this.running;
    }

    start(): void {

        this.core.set('port', this.config.port);
        this.server.listen(this.config.port);

        this.server.on('listening', () => {
            let addr = this.server.address();
            let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            debug('Listening on ' + bind);
        });

        this.server.on('error', (err) => {

            if(err.syscall !== 'listen') {
                throw err;
            }

            let bind = typeof this.config.port === 'string' ? 'Pipe ' + this.config.port : 'Port ' + this.config.port;

            // handle specific listen errors with friendly messages
            switch(err.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw err;
            }
        });

        this.server.on('checkContinue', () => {
            console.log('checkContinue');
        });

        this.server.on('clientError', () => {
            console.log('clientError');
        });

        this.server.on('close', () => {
            console.log('close');
        });

        this.server.on('connect', () => {
            console.log('connect');
        });

        this.server.on('connection', () => {
            console.log('connection');
        });

        this.server.on('request', () => {
            console.log('request');
        });

        this.server.on('upgrade', () => {
            console.log('upgrade');
        });

    }

    close(): void {

    }

    private initExpress(): Express {

        var app = express();

        // view engine setup
        app.set('views', join(__dirname, 'views'));
        app.set('view engine', 'jade');

        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(join(__dirname, 'public')));

        app.use('/', require('../../demo/simple/api/http/controllers/index'));
        //app.use('/users', users);

        // catch 404 and forward to error handler
        app.use((req: Request, res: Response, next: Function) => {
            var err: StatusError = <StatusError>new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers

        // development error handler
        // will print stacktrace
        if(app.get('env') === 'development') {
            app.use((err: StatusError, req: Request, res: Response) => {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                })
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use((err: StatusError, req: Request, res: Response) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });


        return app;
    }

}




