const Message = require('../models').Message;

module.exports = {
    async createMessage(req, res) {
        const { content, senderId, receiverId } = req.body;
        try{
            let message = await Message.create({
                content,
                senderId,
                receiverId,
                status: true
            })
            return res.status(201).send(message);

        }catch(ex){
            return res.status(400).send(ex);
        } 
    },

    async listMessages(req, res) {
        try{
            let messages = await Message.findAll();
            if (!messages) return res.status(404).json({message: 'No Messages found'}); 
            
            return res.status(200).send(messages);
        } catch(ex) {
            return res.status(400).send(ex);
        }
    },

    async retrieveMessage(req, res) {
        try{
            let message = await Message.findById(req.params.messageId, {});

            if (!message) return res.status(404).send({message: 'Message Not Found', });
            
            return res.status(200).send(message);

        }catch(ex){
            return res.status(400).send(ex);
        }
    },

    async destroyMessage(req, res) {
        try{
            let message =  await Message.find({
                where: {
                  id: req.params.messageId,
                  senderId: req.params.contactId,
                },
              });
            if (!message) return res.status(404).send({message: 'Message Not Found', });
            await message.destroy()
            return res.status(200).json({message: `Successfully deleted message with id ${req.params.messageId}`});
        
        }catch(ex){
            return res.status(400).send(ex);
        } 
    },   

};