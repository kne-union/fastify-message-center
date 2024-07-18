module.exports = ({ DataTypes }) => {
  return {
    model: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      messageType: DataTypes.STRING, // 模板类型
      type: DataTypes.STRING, // 发送类型 EMAIL,SMS
      channel: DataTypes.STRING, // 发送渠道,
      belongToMessageId: {
        type: DataTypes.INTEGER // 用户重新发送时再生成一条数据，该字段用于记录这个记录是属于哪个消息的
      }
    },
    associate: ({ record, message }) => {
      record.belongsTo(message, {
        targetKey: 'id',
        constraints: false
      });
    }
  };
};
