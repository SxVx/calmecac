// Third
const bodyParser = require('body-parser');
const cors = require('cors');
const httpErrors = require('http-errors');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('dotenv').config();

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
  if (httpErrors.isHttpError(err)) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || '',
    });
    return;
  }
  next();
});

server.listen(PORT, () => {
  console.log(`Server ready in port ${PORT}`);
});
