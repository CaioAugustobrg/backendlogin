const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
const router = require('../src/routes/routes');

app.use(router);



app.listen(port, () =>
	console.log(
		`Express started on http://localhost:${port}; ` +
      'press CRTL + C to terminate.'
	)
);
