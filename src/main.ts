import * as express from 'express';
import { Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import {Sequelize} from 'sequelize-typescript';
import { User } from './models/user';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as connectSessionSequelize from 'connect-session-sequelize';

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
        idle: 10000
    }
});

sequelize.addModels([User]);

const app = express();
const port = 3000;
app.locals.pretty = true;

app.set('views', 'views');
app.set('view engine', 'pug');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    store: new sequelizeSessionStore({
        db: sequelize
    }),
    resave: false,  // we support the touch method so per the express-session docs this should be set to false
    proxy: true     // if you do SSL outside of node.
}));

app.get('/', async (_: Request, res: Response) => {
    // const person = User.build({
    //     name: 'boo',
    //     username: 'bar',
    //     password: 'baz'
    // } as User);
    //
    // await person.save();

    res.render('index');
});

sequelize.sync({ force: true }).then();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
