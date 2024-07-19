const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const { models, services } = fastify.messageCenter;

  fastify.get(
    `${options.prefix}/record/get`,
    {
      onRequest: [],
      schema: {
        tags: ['消息记录'],
        description: '获取单条消息记录',
        summary: '获取单条消息记录',
        query: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        }
      }
    },
    async request => {
      return {
        data: await services.record.getRecord(request.query)
      };
    }
  );

  fastify.get(
    `${options.prefix}/record/list`,
    {
      onRequest: [],
      schema: {
        tags: ['消息记录'],
        summary: '获取消息记录列表',
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
