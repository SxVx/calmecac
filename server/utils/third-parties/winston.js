const { createLogger, format, transports } = require('winston');
const { fullFormatDate } = require('../date');

const logger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      (info) => `[${fullFormatDate(info.timestamp)}] [LEVEL: ${info.level}] ${info.message}`,
    ),
  ),

  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `./logs/logs.log`,
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
});

module.exports = logger;
