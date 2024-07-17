module.exports = ({ DataTypes }) => {
  return {
    model: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '0:未验证,1:已验证,2:已过期'
      },
      fromEmail: DataTypes.STRING, // 发送人邮箱
      email: DataTypes.STRING, // 收件人邮箱
      formPhone: DataTypes.STRING, // 发送人电话号
      pone: DataTypes.STRING, // 收件人电话号
      messageType: DataTypes.STRING, // 渠道模板类型
      channel: DataTypes.STRING, // 发送渠道
      content: DataTypes.STRING, // 发送内容
      template: DataTypes.STRING // 发送模板
    },
    options: {
      indexes: [
        {
          unique: true,
          fields: ['uuid', 'deleted_at']
        }
      ]
    }
  };
};
