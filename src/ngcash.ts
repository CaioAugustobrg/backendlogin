const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
	next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
	credentials: true,
	origin: true
}));
const router = require('../src/routes/routes');

app.use(router);

app.listen(port, () =>
	console.log(
		`Express started on http://127.0.0.1:${port}; ` +
      'press CRTL + C to terminate.'
	)
);
