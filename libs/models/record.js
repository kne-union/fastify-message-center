module.exports = ({ DataTypes }) => {
  return {
    model: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      messageType: DataTypes.STRING, // 模板类型
      type: {
        type: DataTypes.ENUM,
        values: ['EMAIL', 'SMS']
      }, // 发送类型 EMAIL,SMS
      channel: DataTypes.STRING, // 发送渠道,
      messageId: DataTypes.INTEGER // 字段用于记录这个记录是属于哪个消息的
    },
    associate: ({ record, message }) => {
      record.belongsTo(message, {
        targetKey: 'id',
        constraints: false
      });
    }
  };
};
