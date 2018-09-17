const contactsController = require('../controllers').contacts,
    messagesController = require('../controllers').messages;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Contact API!',
    }));

    app
        .route('/api/contacts')
        .post(contactsController.createContact)
        .get(contactsController.listContacts);
  
    app
        .route('/api/contacts/:contactId',)
        .get(contactsController.retrieveContact)
        .put(contactsController.updateContact)
        .delete(contactsController.destroyContact);

    app
        .route('/api/contacts/:contactId/sms')
        .post(messagesController.createMessage);

    app
        .route('/api/contacts/:contactId/sms/:messageId')
        .delete(messagesController.destroyMessage);
};