const Contact = require('../models').Contact,
    Message = require('../models').Message;


module.exports = {
    async createContact(req, res) {
        try{
            let contact = await Contact.create({
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber
            })
            return res.status(201).send(contact);

        }catch(ex){
            return res.status(400).send(ex);
        } 
    },

    async listContacts(req, res) {
        try{
            let contacts = await Contact.findAll({
                // include: [{
                //     model: Message,
                //     as: 'Messages',
                // }],
            });
            if (!contacts) { 
                return res.status(404).json({
                    message: 'No contacts found'
                }); 
            }
            res.status(200).send(contacts);
        } catch(ex) {
             return res.status(400).send(ex);
        }
    },

    async retrieveContact(req, res) {
        try{
            let contact = await Contact.findById(req.params.contactId, {
                // include: [{
                //     model: Messages,
                //     as: 'Messages',
                // }],
            });

            if (!contact) return res.status(404).send({message: 'Contact Not Found', });
            
            return res.status(200).send(contact);

        }catch(ex){
            return res.status(400).send(ex);
        }
    },

    async updateContact(req, res) {
        try {
            let contact =  Contact.findById(req.params.contactId, {});
               
            if (!contact) return res.status(404).send({message: 'Contact Not Found', });
            
            let updatedCotact = await contact.update({
                    fullName: req.body.fullName || contact.fullName,
                  })
            return res.status(200).send(updatedCotact);
        
        }catch(ex) {
            return res.status(400).send(ex)
        };
    },

    async destroyContact(req, res) {
        try{
            let contact =  await Contact.findById(req.params.contactId)
            
            if (!contact) return res.status(404).send({message: 'Contact Not Found', });
            await contact.destroy()
            return res.status(200).json({message: `Successfully deleted contact with id ${req.params.contactId}`});
        
        }catch(ex){
            return res.status(400).send(ex);
        } 
    },   
};
