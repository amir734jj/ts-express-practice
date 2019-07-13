import * as express from 'express';
import { Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as connectSessionSequelize from 'connect-session-sequelize';
import * as path from 'path';
import { container } from 'tsyringe';
import { populateIoC } from './configs/RegisterIoC';
import UserRouter from './controllers/UserController';
import UserLogic from './logic/UserLogic';
import { normalizePort } from './utilities/port';

let sequelizeSessionStore = connectSessionSequelize(expressSession.Store);
let sequelize = new Sequelize({
    host: 'localhost',
    database: 'ts_express',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false,
    pool: {
        min: 0,
        max: 1,
        idle: 10000,
    },
});

sequelize.addModels([User]);

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.locals.pretty = true;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    saveUninitialized: true,
    secret: 'keyboard cat',
    store: new sequelizeSessionStore({
        db: sequelize,
    }),
    resave: false,  // we support the touch method so per the express-session docs this should be set to false
    proxy: true,     // if you do SSL outside of node.
}));

app.get('/', async (req: Request, res: Response) => {
    // TODO:
    // @ts-ignore
    if (req.session.user) {
        res.send('logged in');
    } else {
        res.send('invalid');
    }
});

app.get('/logout', async (req: Request, res: Response) => {
    req.session.destroy(() => {
    });
    res.send('logged out');
});

app.post('/login', async (req: Request, res: Response) => {
    let userLogic = container.resolve<UserLogic>('UserLogic');

    let users = await userLogic.getAll();
    let userInfo: { username: string, password: string } = req.body;

    let user = users.find(x => x.username === userInfo.username && x.password === userInfo.password);
    let flag = user != null;

    if (flag) {
        req.session.user = user;
    }

    res.redirect('');
});

// Register user controller
app.use('/user', UserRouter(container));

sequelize.sync({ force: true }).then();

// Populate the IoC container
populateIoC(container);

app.listen(port, () => console.log(`app listening on port ${port}!`));
