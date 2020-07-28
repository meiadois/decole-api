# Decole Api
Decole is a company focused on inserting people in the online sales market, teaching them how to use social networks and sales platforms.

This repository holds our App.

## Installation

Follow these three simple steps:

1) Create a file called .env at "path/to/this/project/"containing the following information (You will need a MySql database)
    ```bash
    ML_CLIENT_ID=5569930784321344
    ML_CLIENT_SECRET=CLAeyqRWGsU0apha4XAXFSFugod6uOeH
    DB_SEQUELIZE_DIALECT=mysql
    DB_SEQUELIZE_HOST=$HOST
    DB_SEQUELIZE_USERNAME=$USER
    DB_SEQUELIZE_PASSWORD=$USERPASSWORD
    DB_SEQUELIZE_DATABASE=$DBNAME
    DB_SEQUELIZE_PORT=$PORT
    ```

2) Install the dependencies:
    ```bash
    yarn
    ```
    or
    ```bash
    npm i
    ```
3) Run the project:
    ```bash
    yarn start
    ```
    or
    ```bash
    npm start
    ```
## Routes
Our Endpoint: https://decoleapi.herokuapp.com/
To see where and how to make requests, import our [workspace](https://support.insomnia.rest/article/50-workspaces) contained [here](https://github.com/meiadois/DecoleAPI/blob/master/docs/Workspace.json) for your [INSOMNIA](https://insomnia.rest/).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<!--Please make sure to update tests as appropriate-->

## License
[All Rights Reserved](https://github.com/meiadois/decole-api/blob/TS/LICENSE.md)

<sub>Checked at Hackathon SEBRAE by [@ARGOLO](https://github.com/argolo)</sub>


