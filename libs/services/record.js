const fp = require('fastify-plugin');

module.exports = fp(async fastify => {
  const { models, services } = fastify.messageCenter;

  const addRecord = async ({ messageType, type, channel, belongToMessageId }) => {
    return await models.record.create({
      messageType,
      type,
      channel,
      belongToMessageId
    });
  };

  const getRecordList = async ({ filter, currentPage, perPage }) => {
    const { count, rows } = await models.record.findAndCountAll({
      include: [
        {
          model: models.message
        }
      ],
      where: filter,
      offset: perPage * (currentPage - 1),
      limit: perPage
    });
    return { pageData: rows, totalCount: count };
  };

  services.record = {
    addRecord,
    getRecordList
  };
});
