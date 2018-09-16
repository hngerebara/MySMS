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
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Contact, { 
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    })
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
    })
  };

  return Message;
};