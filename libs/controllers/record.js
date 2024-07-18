const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const { models, services } = fastify.messageCenter;
  fastify.get(
    `${options.prefix}/recordList`,
    {
      onRequest: [],
      schema: {
        tags: ['消息纪录'],
        summary: '获取消息纪录列表',
        query: {
          type: 'object',
          properties: {
            filter: {
              type: 'object',
              properties: {
                id: { type: 'string' }
              }
            },
            currentPage: { type: 'number' },
            perPage: { type: 'number' }
          }
        }
      }
    },
    async request => {
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
    }
  );
});
