const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const { models, services } = fastify.messageCenter;
  fastify.get(
    `${options.prefix}/sendEmail`,
    {
      onRequest: [],
      schema: {
        tags: ['消息'],
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
    `${options.prefix}/message/send`,
    {
      onRequest: [],
      schema: {
        tags: ['消息'],
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
    `${options.prefix}/message/resend`,
    {
      onRequest: [],
      schema: {
        tags: ['消息'],
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

  fastify.get(
    `${options.prefix}/message/get`,
    {
      onRequest: [],
      schema: {
        tags: ['消息'],
        description: '获取单条消息',
        summary: '获取单条消息',
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
        data: await services.message.getMessage(request.query)
      };
    }
  );

  fastify.get(
    `${options.prefix}/message/list`,
    {
      onRequest: [],
      schema: {
        tags: ['消息'],
        description: '获取消息列表',
        summary: '获取消息列表',
        query: {}
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
        data: await services.message.getMessageList({ filter, perPage, currentPage })
      };
    }
  );
});
