const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const { models, services } = fastify.messageCenter;
  fastify.get(
    `${options.prefix}/sendEmail`,
    {
      onRequest: [],
      schema: {
        description: '发送邮件',
        summary: '发送邮件',
        query: {},
        response: {
          200: {
            description: '返回值说明',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'string', description: '信息' }
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
        data: await services.message.sendEmail(
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
        description: '发送信息',
        summary: '发送信息',
        query: {},
        response: {
          200: {
            description: '返回值说明',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'string', description: '信息' }
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
        data: await services.message.sendMessage(
          Object.assign(
            {},
            {
              messageType: 'LOGIN_VERIFY',
              type: 'EMAIL',
              to: '228ssss25@qq.com',
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
  fastify.get(
    `${options.prefix}/resendMessage`,
    {
      onRequest: [],
      schema: {
        description: '重新发送信息',
        summary: '重新发送信息',
        query: {},
        response: {
          200: {
            description: '返回值说明',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'string', description: '信息' }
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
        data: await services.message.resendMessage(request.query)
      };
    }
  );
});
