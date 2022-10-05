// import modules from helper
const helper = require('../src/helper');

/**
 * Initialize each test to the same state.
 * Otherwise the tests will keep the environmental state after each run.
 */
beforeEach(() => {
  delete process.env.GREETER_IP;
  delete process.env.GREETER_PORT;
});

/**
 * Test the execption occurs, and the exception message is populated
 * if GREETER_IP is not set, then there is never the chance to check for GREETER_PORT
 */
test("Test throws error when both GREETER_IP AND GREETER_PORT are not set", () => {
  expect(helper.initForGrpcServer).toThrow(Error);
  expect(helper.initForGrpcServer).toThrow('environment variable GREETER_IP not set');
});

/**
* Test the execption occurs, and the exception message is populated
 */
test("Test throws error when GREETER_IP is not set", () => {
  process.env['GREETER_PORT'] = '12345';

  expect(helper.initForGrpcServer).toThrow(Error);
  expect(helper.initForGrpcServer).toThrow('environment variable GREETER_IP not set');
});

/**
* Test that no execptions occur when both GREETER_IP and GREETER_PORT are populated message is populated
 */
test("Test throws error when GREETER_PORT is not set", () => {  
  process.env['GREETER_IP'] = '0.0.0.0';

  expect(helper.initForGrpcServer).toThrow(Error);
  expect(helper.initForGrpcServer).toThrow('environment variable GREETER_PORT not set');
});

/**
 * 
 */
test("Test succeeds when both GREETER_IP AND GREETER_PORT are set", () => {  
  process.env['GREETER_IP'] = '0.0.0.0';
  process.env['GREETER_PORT'] = '12345';

  let grpcServerBinding = helper.initForGrpcServer();

  expect(helper.initForGrpcServer).not.toThrow();
  expect(grpcServerBinding.bindHost).toBe('0.0.0.0')
  expect(grpcServerBinding.bindPort).toBe('12345')
});