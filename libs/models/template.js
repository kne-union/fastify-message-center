module.exports = ({ DataTypes }) => {
  return {
    model: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: DataTypes.STRING, // 模板名称
      type: {
        type: DataTypes.ENUM,
        values: ['EMAIL', 'SMS']
      }, // 模板类型
      template: DataTypes.STRING // 发送模板
    },
    options: {
      indexes: [
        {
          unique: true,
          fields: ['name', 'deleted_at']
        }
      ]
    }
  };
};
