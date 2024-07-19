const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const { models, services } = fastify.messageCenter;
  // console.log('services\n', services);
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
      return {
        data: await services.template.addTemplate(
          Object.assign(
            {},
            {
              name: 'test-template',
              type: 'SMS',
              template: '【<%=companyName%>】您的验证码是：<%=code%>'
            },
            request.body
          )
        )
      };
    }
  );
});
