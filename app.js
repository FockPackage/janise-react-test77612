const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');

// const session = require(express-session);
const path = require('path');
const config = require('./config');
const routes = require('./server/routes');
const api = require('./server/routes/api');
const remoteControl = require('./server/routes/remoteControl');
const checkVersion = require('./server/routes/checkVersion');

const app = express();
// const env = process.env.NODE_ENV || 'development';

// view engine setup
const template = require('art-template');

template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'server/views'));
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(compress());
app.use(express.static(path.join(__dirname, 'client')));
app.use(methodOverride());

// socket.io
const io = require('socket.io').listen(8080);

io.sockets.on('connection', socket => {
  app.socket = socket;
  app.socket.emit('news', { hello: 'world' });
  app.socket.on('my other event', data => {
    console.log(data);
  });
});

app.use('/api', api);
app.use('/remote', remoteControl);
app.use('/version', checkVersion);
app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error',
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error',
  });
});


app.set('port', config.port);
const server = app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${server.address().port}`);
});

