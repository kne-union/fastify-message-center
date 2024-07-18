const fp = require('fastify-plugin');

module.exports = fp(async fastify => {
  const { models, services } = fastify.messageCenter;

  const addRecord = async ({ messageType, type, channel }) => {
    return await models.record.create({
      messageType,
      type,
      channel
    });
  };

  const getRecord = async filter => {
    const record = await models.record.findOne({
      include: [
        {
          model: models.message
        }
      ],
      where: filter
    });
    return record;
  };

  const getRecordList = async ({ filter, currentPage, perPage }) => {
    const { count, rows } = await models.record.findAndCountAll({
      where: filter,
      offset: perPage * (currentPage - 1),
      limit: perPage
    });
    return { pageData: rows, totalCount: count };
  };

  services.record = {
    addRecord,
    getRecord,
    getRecordList
  };
});
