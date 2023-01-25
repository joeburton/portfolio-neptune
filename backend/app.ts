import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import path from 'path';
import cors from 'cors';
import 'dotenv/config';

import routes from './routes';
import setCookie from './utils/setCookie';

const app: Application = express();
const port: number = 3001;

const rootDirectory = path.resolve();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET || 'something-random-here',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay, httpOnly: false },
  })
);

const requestLogger = (req: Request, res: Response, next: Function) => {
  console.log(`${req.method} url:: ${req.url}`);
  console.log(`Cookies`, req.cookies);
  next();
};

app.use(requestLogger);

// set a cookie
app.use(setCookie);

app.use(express.static(path.join(rootDirectory, 'frontend/build')));

app.use('/api', routes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(rootDirectory, 'frontend/build', 'index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log(`App is listening on port ${process.env.PORT || port} !`);
});
