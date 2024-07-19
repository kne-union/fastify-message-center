module.exports = ({ DataTypes }) => {
  return {
    model: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: DataTypes.STRING, // 模板名称
      type: DataTypes.STRING, // 模板类型 EMAIL,SMS
      template: DataTypes.STRING // 发送模板
    },
    options: {
      indexes: [
        {
          unique: true,
          fields: ['deleted_at']
        }
      ]
    }
  };
};
