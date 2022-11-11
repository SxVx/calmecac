// Third
const bodyParser = require('body-parser');
const cors = require('cors');
const httpErrors = require('http-errors');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const route = require('./routes');

io.on('connection', () => {
  /*...*/
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', route);

app.use((err, req, res, next) => {
  if (httpErrors.isHttpError(err)) {
    res.status(404).json({
      success: false,
      message: err.message,
      errors: err.errors || '',
    });
    return;
  }
  // if (err instanceof multer.MulterError) {
  //   res.status(statusCode.UNPROCESSABLE_ENTITY).json({
  //     success: false,
  //     message: err.message,
  //     errors: err.field || '',
  //   })
  //   return
  // }
  next();
});

server.listen(PORT, () => {
  console.log(`Server ready in port ${PORT}`);
});
