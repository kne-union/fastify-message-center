const fastify = require('fastify')({
  logger: true, querystringParser: str => require('qs').parse(str)
});

const path = require('path');
const fastifyEnv = require('@fastify/env');

const sqliteStorage = path.resolve('./tests/database.sqlite');
const createServer = async () => {
  fastify.register(fastifyEnv, {
    dotenv: true,
    data: process.env,
    schema: {
      type: 'object', required: ['DB_HOST', 'DB_EMAIL', 'DB_PASS', 'DB_ACCOUNT_SID',
        'DB_AUTH_TOKEN'], properties: {
        DB_HOST: {type: 'string'},
        DB_EMAIL: {type: 'string'},
        DB_PASS: {type: 'string'},
        DB_ACCOUNT_SID: {type: 'string'},
        DB_AUTH_TOKEN: {type: 'string'},
        ENV: {type: 'string'},
        PORT: {type: 'number'}
      }
    }
  });
  await fastify.after();

  fastify.register(require('fastify-plugin')(async (fastify) => {
    fastify.register(require('@kne/fastify-sequelize'), {
      db: {
        storage: sqliteStorage,
        // dialect: 'mysql',
        host: fastify.config.DB_HOST,
        email: fastify.config.DB_EMAIL,
        pass: fastify.config.DB_PASS
      }, modelsGlobOptions: {
        syncOptions: {}
      }
    });
  }));

  fastify.register(require('../index'), {
    host: "smtp.163.com",
    port: 465,
    auth: {
      username: "System",
      user: fastify.config.DB_EMAIL,
      pass: fastify.config.DB_PASS,
    },
    templates: {
      REGISTER_VERIFY: {
        EMAIL: {
          subject: '注册验证码',
          type: 'text',
          content: '<%=name%>，您好 \n您的注册验证码是：<%=code%>'
        },
        SMS: {
          type: 'text',
          content: '<%=name%>，您好 \n您的注册验证码是：<%=code%>'
        }
      },
      LOGIN_VERIFY: {
        EMAIL: {
          subject: '登录验证码',
          type: 'text',
          content: '<%=name%>，您好 \n您的登录验证码是：<%=code%>'
        },
        SMS: {
          type: 'text',
          content: '<%=name%>，您好 \n您的登录验证码是：<%=code%>'
        }
      },
      FORGET_VERIFY: {
        EMAIL: {
          subject: '忘记密码验证码',
          type: 'text',
          content: '<%=name%>，您好 \n忘记密码验证码：<%=code%>'
        },
        SMS: {
          type: 'text',
          content: '<%=name%>，您好 \n忘记密码验证码：<%=code%>'
        }
      }
    }
  });
  fastify.register(require('fastify-plugin')(async (fastify) => {
    await fastify.sequelize.sync();
  }));

}

module.exports = {
  fastify, createServer, start: async () => {
    await createServer();
    return fastify.then(() => {
      fastify.listen({ port: fastify.config.PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) throw err;
        // Server is now listening on ${address}
      });
    });
  }
};
