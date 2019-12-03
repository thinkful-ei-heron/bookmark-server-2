const winston = require('winston');

const { NODE_ENV } = require('./config'); //pulling from node env. 

//sets up winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'info.log' })
    ]
  });

  if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

  module.exports = logger; 

  //t is important to log all failures so we can set up a logger
  // for this application before we start writing the code. For
  // this example, we will use the Winston logging library.
   //This is a popular and robust logging library for Node.