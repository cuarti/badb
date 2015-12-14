
import {Router, Request, Response} from 'express';


export let router = new Router();

router.get('/', (req: Request, res: Response) => {
    res.send('foo');
    //res.render('index', {title: 'Express'});
});
