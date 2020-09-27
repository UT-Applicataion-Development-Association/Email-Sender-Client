# Email-Sender-Client
Online Mailing Service (Client) for University of Toronto Application Development Association

## Setup & Installation
Please ensure your local environment has Node.js installed. Version 12 or higher is required.

At the root level of project directory, run the following command
```
$ npm install
```

## Quick Start
For development, this project is pre-configured with webpack-dev-server and supports hot-reload on changed code. 

Run the following command to start the server, then visit the site via localhost:8080
```
$ npm run dev
```

For production, this project should be built before deployment, and the final build is also accessible in the local environment. 

Run the following command to build the project, then find the build under dist folder
```
$ npm run build
```

## Documentation
- Task assignments are saved in [Github Project Board](https://github.com/orgs/UT-Applicataion-Development-Association/projects/1)
- Guide and tutorial are saved in [Repository Wiki](https://github.com/UT-Applicataion-Development-Association/Email-Sender-Client/wiki)

## Contributing
Before committing the code, please run the following command to ensure that the format and the code style meet the requirement
```
$ npm run prettier && npm run lint
```

For other details, please refer to [UTADA’s contribution guideline](https://github.com/UT-Applicataion-Development-Association/Contribution-Guidelines).
