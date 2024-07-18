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

  const getRecordList = async ({ filter, currentPage, perPage }) => {
    const { rows } = await models.message.findAndCountAll({
      include: [
        {
          model: models.record
        }
      ],
      where: filter,
      offset: perPage * (currentPage - 1),
      limit: perPage
    });
    return { pageData: rows, totalCount: rows.length };
  };

  services.record = {
    addRecord,
    getRecordList
  };
});
