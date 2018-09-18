module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 160],
          msg: 'Message content description must be between 3 and 160 characters in length'
        }
      },
    },
    
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      as: 'sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    })
    Message.belongsTo(models.Contact, {
      as: 'reciever',
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
    })
  };

  return Message;
};