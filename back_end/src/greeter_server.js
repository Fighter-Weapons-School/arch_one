// TODO: call back a function rather than inline.
// TODO: Add logging and metrics collection.
// TODO: Add light error handling
// TODO: Tests to ensure environment vars are only used in development
// TODO: Tests to ensure environment vars are set
// TODO: Tests to ensure environment vars can be overridden

// define "proper" constants
const PROTO_PATH = __dirname + '/../../protos/greeter.proto';
const LOGS_PATH = __dirname + '/../logs/';

// define winston logging
const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  // format: winston.format.json(),
  format: winston.format.combine(
      // winston.format.json()
      winston.format.colorize({all: true}),
      winston.format.label({
        label: '[LOGGER]',
      }),
      winston.format.timestamp(),
      winston.format.printf(
          (info) => {
            return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
          }),
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({filename: LOGS_PATH + 'error.log', level: 'error'}),
    // new winston.transports.File({filename: LOGS_PATH + 'combined.log'}),
  ],
});

logger.info('grpc dynamically create the services defined in the proto file');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
logger.info('grpc map to the proto file package definition');
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

logger.info('applicaiton setup targeting', {process: process.env.NODE_ENV});
if (process.env.NODE_ENV !== 'production') {
  // ignore any envrionment variables stored in .env file in production
  let text= __dirname+'\\.env';
  
  logger.info('loading environmental variables from %s', text);
  require('dotenv').config({path: text});
}

/**
 * Implementation of the proto 'SayHello' method
 * @param {*} call
 * @param {*} callback
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

/**
 *
 */
function initForGrpcServer() {
  if (!process.env.GREETER_IP) {
    logger.error('Environment variable must be set', {'ENVIRONMENT VARIABLE': 'GREETER_IP'});
    throw new Error('environment variable GREETER_IP not set');
  }

  if (!process.env.GREETER_PORT) {
    logger.error('Environment variable must be set', {'ENVIRONMENT VARIABLE': 'GREETER_PORT'});
    throw new Error('environment variable GREETER_PORT not set');
  }
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the sample server port
 * @param {*} serverIpAndPort 
 */
function runGrpcServer(serverIpAndPort) {
  const server = new grpc.Server();

  logger.info('starting grpc server @ %s', serverIpAndPort);
  server.addService(helloProto.Greeter.service, {sayHello: sayHello});
  server.bindAsync(serverIpAndPort, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

/**
 *
 */
function main() {
  initForGrpcServer();
  const environmentIpAndPort = `${process.env.GREETER_IP}:${process.env.GREETER_PORT}`;

  runGrpcServer(environmentIpAndPort);
}

main();
