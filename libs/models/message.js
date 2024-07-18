module.exports = ({ DataTypes }) => {
  return {
    model: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '0:发送成功,10:发送失败'
      },
      email: DataTypes.STRING, // 收件人邮箱
      phone: DataTypes.STRING, // 收件人电话号
      content: DataTypes.STRING, // 发送内容
      messageId: DataTypes.STRING // 发送信息ID
    },
    options: {
      indexes: [
        {
          unique: true,
          fields: ['deleted_at']
        }
      ]
    },
    associate: ({ record, message }) => {
      message.hasMany(record, {
        targetKey: 'messageId',
        constraints: false
      });
    }
  };
};
