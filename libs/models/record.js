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
      sendTimes: {
        // 发送次数
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0 // 0:发送成功; 10:发送失败;
      },
      messageType: DataTypes.STRING, // 渠道模板类型
      channel: DataTypes.STRING, // 发送渠道
      content: DataTypes.STRING // 发送内容
    },
    options: {
      indexes: [
        {
          unique: true,
          fields: ['uuid']
        }
      ]
    }
  };
};
