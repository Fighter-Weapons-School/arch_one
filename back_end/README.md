# greeter_server.js

## Environment Variables
|Name           | Description                                                                                              | Optional                     |Value(s)                   |
|---------------|----------------------------------------------------------------------------------------------------------|------------------------------|---------------------------|
| NODE_ENV      | Flag used to determine the environment greeter_server is running                                         |  Mandatory                   | `development`,`production`|
| GREETER_IP    | Port used by the greeter_server grpc service                                                             |  Mandatory                   | ex. `0.0.0.0`             |
| GREETER_PORT  | IP Address used by the greeter_server grpc servcice                                                      |  Mandatory                   | ex. `50051`               |
| GRPC_VERBOSITY| Flag to enable additional logging of the grpc internals                                                  |  Optional                    | `DEBUG`,`INFO`,`ERROR`    |
| GRPC_TRACE    | Flag to enable additional logging of the grpc internals (must be used in conjunction with GRPC_VERBOSITY)|  Optional                    | `all`                     |

[Additioanl GRPC Environment Variables](https://github.com/grpc/grpc/blob/master/doc/environment_variables.md)
[Debug GRPC Environment Variables](https://github.com/grpc/grpc-node/blob/master/TROUBLESHOOTING.md)

## Environment Installation

### Install NodeJs
[Nodejs downlaod](https://nodejs.org/en/download/)

### Clone Git Repository
Clone into the git repository
```bat
git clone git@github.com:Fighter-Weapons-School/arch_one.git
```

### Installing Node Modules
For every successful nodejs project, apparently several hundred modules need to be installed. Start this process and make an espresso.
```bat
:: navigate to the directory with the package.json file
cd back_end

:: execute npm command to install required dependencies
npm install
```
## Running the Application

### Running in Development
Running the application using the development profile sets key environment variables. 
```bat
:: Easy way
:: execute npm command to run application with development profile
npm run dev

:: Less easy way
SET NODE_ENV=development
SET GREETER_PORT=50051
SET GREETER_IP=0.0.0.0
SET GRPC_VERBOSITY=DEBUG
SET GRPC_TRACE=all
node src/greeter_server.js
```

### Running in Production
Running the application using the production profile purposfully omits the environment variables for the IP address and the port for the grpc servce. This is in preparation for running on containers.
```bat
:: Following environment variable must be set prior to launch
SET GREETER_PORT=50051
SET GREETER_IP=0.0.0.0

:: execute npm command to run application with production profile
npm run start
```

### Running Unit Tests
```bat
:: execute npm command to run unit tests assoiated with the project
:: unit test results are stored in arch_one\back_end\coverage
npm test
```

### Generating jsdoc Documentation
```bat
:: execute npm command to generate the js2doc documentation
:: documentation results are stored in arch_one\back_end\docs
npm run doc
```

## Container Operations
T.B.D