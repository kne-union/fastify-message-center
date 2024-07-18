const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const { models, services } = fastify.messageCenter;
  fastify.get(`${options.prefix}/recordList`, async request => {
    const { perPage, currentPage, ...filter } = Object.assign(
      {
        perPage: 20,
        currentPage: 1
      },
      request.query
    );
    return {
      data: await services.record.getRecordList({ filter, perPage, currentPage })
    };
  });
});
