const fastify = require('fastify')({
  logger: true, querystringParser: str => require('qs').parse(str)
});

const path = require('path');

const sqliteStorage = path.resolve('./tests/database.sqlite');

fastify.register(require('@kne/fastify-sequelize'), {
  db: {
    storage: sqliteStorage
  }, modelsGlobOptions: {
    syncOptions: {}
  }
});

fastify.register(require('../index'), {
  host: "smtp.163.com",
  port: 465,
  auth: {
    username: "System",
    user: "uhey888@163.com",
    pass: "CUUYASPVSSHWMWCT",
  },
  templates: {
    LOGIN_VERIFY: {
      EMAIL: {
        subject: '登录验证码',
        type: 'text',
        content: '<%=name%>，您好 \n登录验证码：<%=code%>'
      },
      SMS: {
        type: 'text',
        content: '<%=name%>，您好 \n登录验证码：<%=code%>'
      }
    }
  }
});

fastify.register(require('fastify-plugin')(async (fastify) => {
  await fastify.sequelize.sync();
}));


fastify.listen({port: 8046}, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});