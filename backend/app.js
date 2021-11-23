const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db/index');
const dbHelpers = require('./helpers/dbHelpers')(db);

const PORT = 3001;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: ['http://localhost:3000/'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24
    }
  })
)

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter(dbHelpers));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = app;
