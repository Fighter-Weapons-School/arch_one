/**
 *
 */
function initForGrpcServer() {
  if (!process.env.GREETER_IP) {
    throw new Error('environment variable GREETER_IP not set');
  }
  
  if (!process.env.GREETER_PORT) {
    throw new Error('environment variable GREETER_PORT not set');
  }
}
exports.initForGrpcServer = initForGrpcServer;
