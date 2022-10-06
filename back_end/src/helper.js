/**
 * Method to abstract away the environment variables away from the main application.
 * @return {string}
 */
function initForGrpcServer() {
  if (!process.env.GREETER_IP) {
    throw new Error('environment variable GREETER_IP not set');
  }
  
  if (!process.env.GREETER_PORT) {
    throw new Error('environment variable GREETER_PORT not set');
  }

  return {
    'bindHost': process.env.GREETER_IP,
    'bindPort': process.env.GREETER_PORT,
  };
}
exports.initForGrpcServer = initForGrpcServer;
