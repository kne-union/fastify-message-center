const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const { services } = fastify.messageCenter;
  fastify.get(
    `${options.prefix}/sendEmail`,
    {
      onRequest: [],
      schema: {
        description: '接口说明',
        summary: '接口主题',
        query: {},
        response: {
          200: {
            description: '返回值说明',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', description: '信息' }
                  }
                }
              }
            }
          }
        }
      }
    },
    async request => {
      return {
        message: await services.sendEmail(
          Object.assign(
            {},
            {
              to: '2283785225@qq.com',
              subject: '登录验证码',
              text: 'Hi, the code is 999000'
            },
            request.params
          )
        )
      };
    }
  );
  fastify.get(
    `${options.prefix}/sendMessage`,
    {
      onRequest: [],
      schema: {
        description: '接口说明',
        summary: '接口主题',
        query: {},
        response: {
          200: {
            description: '返回值说明',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', description: '信息' }
                  }
                }
              }
            }
          }
        }
      }
    },
    async request => {
      return {
        message: await services.sendMessage(
          Object.assign(
            {},
            {
              messageType: 'LOGIN_VERIFY',
              type: 'EMAIL',
              to: '2283785225@qq.com',
              props: {
                name: 'Meetacoo',
                code: '888888'
              }
            },
            request.params
          )
        )
      };
    }
  );
});
