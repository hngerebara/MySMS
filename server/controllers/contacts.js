const Contact = require('../models').Contact,
    Message = require('../models').Message;


module.exports = {
    async createContact(req, res) {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: 'Body cannot be empty'
            });
        };
        try{
            let contact = await Contact.create({
                fullName: req.body.fullName,
                phoneNumber: phoneNumber
            });

            return res.status(201).json({
                success: true,
                data: contact,
                message: 'Successfuly created contact'
            });

        }catch(ex){
            return res.status(400).json({
                success: false,
                error: ex
            });
        }  
    },

    async listContacts(req, res) {
        try{
            let contacts = await Contact.findAll({
                include: [{
                    model: Message,
                    as: 'Messages',
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Message, as: 'Messages' }, 'createdAt', 'DESC'],
                ],
            });
            if (!contacts) { 
                return res.status(404).json({
                    success: false,
                    message: 'No contacts found'
                }); 
            }
            res.status(200).json({
                success: true,
                data: contacts,
                message: 'Successfuly retrieved all contacts'
            });
        } catch(ex) {
             return res.status(400).json({
                success: false,
                error: ex
             });
        }
    },

    async retrieveContact(req, res) {
        try{
            let contact = await Contact.findOne({
                where: {
                    id: req.params.contactId
                }, include: [{
                    model: Message
                }]
            });

            if (!contact) return res.status(404).json({
                success: false,
                message: 'Contact Not Found'
            });
            
            return res.status(200).json({
                success: true,
                data: contact,
                message: 'Successfuly retrieved contact'
            });

        }catch(ex){
            return res.status(400).json({
                success: false,
                error: ex
            });
        }
    },

    async updateContact(req, res) {
        try {
            let contact = await Contact.findById(req.params.contactId);
               
            if (!contact) return res.status(404).json({
                success: false,
                message: 'Contact Not Found'
            });
            
            let updatedContact = await contact.update({
                    fullName: req.body.fullName || contact.fullName,
                  })
            return res.status(200).json({
                success: true,
                data: updatedContact,
                message: 'Successfuly updated contact'
            });
        
        }catch(ex) {
            return res.status(400).json({
                success: false,
                error: ex
            })
        };
    },

    async destroyContact(req, res) {
        try{
            let contact =  await Contact.findById(req.params.contactId);
            
            if (!contact) return res.status(404).json({
                success: false,
                message: 'Contact Not Found'
            });
            await contact.destroy()
            return res.status(200).json({
                success: true,
                message: `Successfully deleted contact with id ${req.params.contactId}`
            });
        
        }catch(ex){
            return res.status(400).json({
                success: false,
                error: ex
            });
        } 
    },   
};
