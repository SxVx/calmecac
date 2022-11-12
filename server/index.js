const util = require('util');
// Third
const bodyParser = require('body-parser');
const cors = require('cors');
const httpErrors = require('http-errors');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('dotenv').config();
const winston = require('./utils/third-parties/winston');

// Config
const PORT = process.env.PORT || 3000;
const rootPath = require('./routes');
const route = require('./routes/v1');

io.on('connection', () => {
  /*...*/
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Version api
app.use('/', rootPath);
app.use('/v1', route);

app.use((err, req, res, next) => {
  const INTERNAL_SERVER_ERROR = 500;
  if (httpErrors.isHttpError(err)) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || '',
    });

    // Logs for traceability
    err.statusCode == INTERNAL_SERVER_ERROR
      ? winston.error(util.format(err))
      : winston.info(util.format(err));

    return;
  }

  next();
});

server.listen(PORT, () => {
  console.log(`Server ready in port ${PORT}`);
});
