# MySMS

[![Build Status](https://travis-ci.com/hngerebara/SMS-Management-Api.svg?token=qbBk8baJpsNJr5Dz8G6p&branch=master)](https://travis-ci.com/hngerebara/SMS-Management-Api)

MySMS is an sms management system that enables one send an sms from one contact to another.

### Features!

- Contacts can be created with the following fields:
- - Full name
- - Phone number
- Contact can send an sms to another existing contact
- Contact cannot send message to self
- The status of the message is set as true when a message has been sent
- All sms sent by a contact is displayed when the contact is retrieved
- All messages received is displayed when a contact is retrieved(pending)
- When a contact is deleted, all messages associated with that contact are also deleted

### Tools and Modules Required
* [NodeJs](https://nodejs.org/en) - 
*  Express - fast node.js network app framework
* [PostgreSQL](https://www.postgresql.org/)- The Relational database
* [Sequelize.js](http://docs.sequelizejs.com/manual/installation/getting-started.html) - An ORM to interface with PostgresQL
* [Postman](https://www.getpostman.com/) - To test APi's
* Terminal or Command Line
* Text Editor or IDE

### Installation
MySMS requires you have [Node.js](https://nodejs.org/) v7+. Check your node version by typing `node -v`

```sh
$ git clone https://github.com/hngerebara/MySMS.git
$ cd <into folder>
$ npm install
```

If you have postgres db already online, then copy the db url and add it to the `env file` as as `DATABASE_URL= '<link from dashboard>'` else if you are using postgres locally, then you need to do the following:
1. Create a db: Type `creadtedb <db name>` in your terminal
 2. Add an example of the following to your .env file

   ```
   DEV_USERNAME=<your username>
   DEV_PASSWORD=<this can be `null`>
   DEV_DB=<The created dev db name>
   TEST_USERNAME=<your username>
   TEST_PASSWORD=null
   TEST_DB=<The created test db name>
   HOST=127.0.0.1
   DB_PORT=5432
   ```
Start the server.

```sh
$ npm start
```
To run Tests locally, 

```sh
$ npm test
```

### Endpoints

| VERB | URL | ACTION |
| ------ | ------ | ------ |
| GET | /api/contacts | Retrieves all contacts |
| POST | /contacts | Creates a new contact |
| PUT | /contacts/:contactId | Finds matching instance of a contact |
| DELETE | /contacts/:contactId | Updates contact |
| POST | /contacts/:contactId/sms/:messageId | Create a message |
| DELETE | /contacts/<id>/sms/<id> | Deletes a message |


### Development

Want to contribute? Great!

### Future Improvements

 - Write MORE Tests
 - Allow messgae to be sent to multiple recipients
 - Enable messgaes to be saved as draft so it can be editted
 - Add UI

License
----

MIT
