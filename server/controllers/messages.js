const Message = require('../models').Message;

module.exports = {
    async createMessage(req, res) {

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: 'Body cannot be empty'
            });
        }
        if(req.body.receiverId == undefined){
            res.status(400).json({message: 'Receiver Id cannot be null'})
        }
        const { content, receiverId } = req.body;
        try{
            let message = await Message.create({
                content,
                senderId: req.params.contactId,
                receiverId,
                status: true
            })
            return res.status(201).json({
                success: true,
                data: message,
                message: `Successfully sent message to ${receiverId} from ${req.params.contactId}`
            });

        }catch(ex){
            switch(ex.name){
                case 'SequelizeForeignKeyConstraintError':
                    return res.status(404).json({success: false, error: "Receiver does not exist"});
                default:
                    return res.status(400).json({
                        success: false,
                        error: ex
                    });
            }
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
            if (!message) return res.status(404).json({
                success: false,
                message: 'Message Not Found'
            });
            await message.destroy()
            return res.status(200).json({
                success: true,
                message: `Successfully deleted message with id ${req.params.messageId}`
            });
        
        }catch(ex){
            return res.status(400).json({
                success: false,
                error: ex
            });
        } 
    },   

};