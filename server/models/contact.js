module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 30],
          msg: 'fullname must be at least 5 characters in length'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Phone number already exists'
      },
      validate: {
        notEmpty: true
      }
    }
  })
  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId'
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId'
    });
  };

  return Contact;
};