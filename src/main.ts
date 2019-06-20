import * as express from 'express';
import { Request, Response } from 'express';
let bodyParser = require('body-parser');
// import cookieParser from 'cookie-parser';
// import expressSession from 'express-session';
// import connectSessionSequelize from 'connect-session-sequelize';
import {Sequelize} from 'sequelize-typescript';
import { User } from './models/user';
// connectSessionSequelize(expressSession.Store);

const app = express();
const port = 3000;
app.locals.pretty = true;

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());


let sequelize = new Sequelize({
    database: 'some_db',
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

sequelize.addModels([User]);

sequelize.sync({ force: true }).then();

app.get('/', (_: Request, res: Response) => {
    const person = User.build({
        name: 'boo',
        username: 'bar',
        password: 'baz'
    } as User);
    person.save().then();

    res.send('Hello world!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
