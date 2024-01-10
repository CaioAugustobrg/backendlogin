import { NextFunction, Request, Response } from "express";
import app from "./main/config/app";
import env from "./main/config/env";
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
	next();
});
app.use(cors({
	credentials: true,
	origin: true
}));

app.listen(env.port, () => console.log(`Server running at: http://localhost:${env.port}`))

