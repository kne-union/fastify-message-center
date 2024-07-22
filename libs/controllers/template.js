const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const { models, services } = fastify.messageCenter;
  fastify.post(
    `${options.prefix}/template/add`,
    {
      onRequest: [],
      schema: {
        tags: ['模板'],
        description: '添加模板',
        summary: '添加模板',
        body: {
          type: 'object',
          required: ['name', 'type', 'template'],
          properties: {
            name: { type: 'string' },
            type: { type: 'string' },
            template: { type: 'string' }
          }
        }
      }
    },
    async request => {
      return await services.template.addTemplate(
        Object.assign(
          {},
          {
            name: 'test-template',
            type: 'SMS',
            template: '【<%=companyName%>】您的验证码是：<%=code%>'
          },
          request.body
        )
      );
    }
  );

  fastify.get(
    `${options.prefix}/template/get`,
    {
      onRequest: [],
      schema: {
        tags: ['模板'],
        description: '获取单条模板',
        summary: '获取单条模板',
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
      return await services.template.getTemplate(request.query);
    }
  );

  fastify.post(
    `${options.prefix}/template/update`,
    {
      onRequest: [],
      schema: {
        tags: ['模板'],
        description: '修改模板',
        summary: '修改模板',
        body: {
          type: 'object',
          required: ['id', 'name', 'type', 'template'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string' },
            template: { type: 'string' }
          }
        }
      }
    },
    async request => {
      return await services.template.updateTemplate(request.body);
    }
  );

  fastify.get(
    `${options.prefix}/template/list`,
    {
      onRequest: [],
      schema: {
        tags: ['模板'],
        description: '获取模板列表',
        summary: '获取模板列表',
        query: {
          type: 'object',
          properties: {
            filter: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                type: { type: 'string' }
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
      return await services.template.getTemplateList({ filter, perPage, currentPage });
    }
  );

  fastify.post(
    `${options.prefix}/template/delete`,
    {
      onRequest: [],
      schema: {
        tags: ['模板'],
        summary: '删除模板',
        body: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        }
      }
    },
    async request => {
      await services.template.deleteTemplate(request.body);
      return '模板删除成功';
    }
  );
});
