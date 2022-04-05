<h1 align="center">
  <img src="./src/assets/imgs/device.png" alt="Postman Task Board Server public documentation" width="256">
  <br>Device Management Service<br>
</h1>

## Basic overview

A NodeJS and Express Api to create, retrieve, update and delete devices and categories entities. In the next sections, you'll be guided through a step by step explanation of how to have a local development environment. But, if you prefer, the api endpoints are available through this [public url](https://device-management-be.herokuapp.com).

## Tech and frameworks used

- [Docker](https://docker.com/)
- [Postman](https://www.postman.com/)
- [Express](https://expressjs.com/)
- [MySql2](https://github.com/sidorares/node-mysql2)

## Features

1. CRUD operations for Devices
2. CRUD operations for Categories

## Up and running

To get a development env running, follow these next steps, and next continue to "How to use section to have a complete developement environment running:

1. Clone the repo: `git clone git@github.com:dhfuzari/device-management-be.git`
2. Navigate to root folder: `cd device-management-be`
3. Then, run `npm i` to install all required packages and wait a few minutes to complete the process
4. This project uses MySQL as a database in a docker container for development mode, so if you're runing this project locally in a Microsoft Windows or Mac OS system, you need to start Docker Desktop before performing the next step. Then, you need to pull the mysql official image from docker hub. This command will create and up a mysql server docker container.
   `docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:8.0.28-oracle`
   ... where "some-mysql" is the name you want to assign to your container, "my-secret-pw" is the password to be set for the MySQL root user. Don't forget this values, you'll need then to configure the .env vars file
5. Next, through your database manager, you need to access your mysql instance of the container created and create the database that will be used by our API. This is the script:

```
-- MySQL Workbench Synchronization

-- Generated: 2022-04-04 18:40
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Daniel Henrique Fuzari

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `device-management` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `device-management`.`devices` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`color` VARCHAR(16) NOT NULL,
`partNumber` INT(11) NOT NULL,
`categories_id` INT(11) NOT NULL,
PRIMARY KEY (`id`),
INDEX `fk_devices_categories_idx` (`categories_id` ASC),
CONSTRAINT `fk_devices_categories`
FOREIGN KEY (`categories_id`)
REFERENCES `device-management`.`categories` (`id`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `device-management`.`categories` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`name` VARCHAR(128) NOT NULL,
PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

6. Next, you need to create an .env file containning the follow variables. The values of this variables need to match according the values you have been choosed when you create the mysql image container and could be different from the example:

```
MYSQL_USER: "root"
MYSQL_PASSWORD: "P@ssw0rd"
MYSQL_DATABASE: "device-management"
MYSQL_HOST: "localhost"
MYSQL_PORT: "3306"
```

7. Now, to start a server listing the door number 3000, run `npm run dev`
8. That's it, the server is ready and now you can send requests trought [Postman](https://www.postman.com/) to access the
   endpoints described below in the next section "How to use?"

## How to use?

To test the API locally I like to use [Postman](https://www.postman.com/). It offers a sleek user interface with which to make HTML requests, without the hassle of writing a bunch of code just to test an API's functionality.

9. First of all, access our [Postman Device Management public documentation](https://documenter.getpostman.com/view/2364800/UVyuSvK2).
10. Now, you can see all availables endpoints. The `{{base_url}}` var is `http://localhost:3000` for development mode. For production mode, the value is `https://device-management-be.herokuapp.com`
11. Click at `Run in Postman` button, at the top right of the page, and open this collection in your [Postman](https://www.postman.com/).
12. Now, you can send requests to register devices and categories, and perform CRUD operations at this entities.
13. That's it.

## License

TODO
