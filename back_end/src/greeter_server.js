// TODO: call back a function rather than inline.
// TODO: Add logging and metrics collection.
// TODO: Add light error handling
// TODO: Add linting (configure linting to fix end of line and line length rules)
// TODO: Tests to ensure environment vars are only used in development
// TODO: Tests to ensure environment vars are set
// TODO: Tests to ensure environment vars can be overridden

const PROTO_PATH = __dirname + '/../../protos/greeter.proto';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// grpc boilerplate code
// dynamic creation the services defined in the proto file
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

// maps to the proto file package definition
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
 */
function main() {
  const server = new grpc.Server();
  const testIt = `${process.env.GREETER_IP}:${process.env.GREETER_PORT}`;
  console.log(testIt);
  
  // maps to the proto file service definition
  server.addService(helloProto.Greeter.service, {sayHello: sayHello});
  server.bindAsync(testIt, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
