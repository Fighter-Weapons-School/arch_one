// TODO: add version and host information
// TODO: make logging better?
// TODO: call back a function rather than inline.
// TODO: add logging and metrics collection.
// TODO: add better code comments

// define "proper" constants
const PROTO_PATH = __dirname + '/../../protos/greeter.proto';
// const LOGS_PATH = __dirname + '/../logs/';

const helper = require('./helper');

// define winston logging
const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
      // winston.format.json()
      winston.format.splat(),
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

logger.info('applicaiton startup in mode: %s', {process: process.env.NODE_ENV});
logger.info('applicaiton startup ', {process: process.env.NODE_ENV});

logger.silly('grpc dynamically create the services defined in the proto file');
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
logger.silly('grpc map to the proto file package definition');
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implementation of the proto 'SayHello' method
 * @param {*} call
 * @param {*} callback
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the sample server port
 * @param {*} serverIpAndPort 
 */
function runGrpcServer(serverIpAndPort) {
  const server = new grpc.Server();
  
  logger.log('info', 'starting grpc server @ %s', serverIpAndPort);
  server.addService(helloProto.Greeter.service, {sayHello: sayHello});
  server.bindAsync(serverIpAndPort, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

/**
 *
 */
function main() {
  let grpcServerBinding;

  try {
    grpcServerBinding = helper.initForGrpcServer();
  } catch (error) {
    logger.error(error);
  }
  const environmentIpAndPortCombined = `${grpcServerBinding.bindHost}:${grpcServerBinding.bindPort}`;

  runGrpcServer(environmentIpAndPortCombined);
}

main();
