const fastify = require('fastify')({
  logger: true, querystringParser: str => require('qs').parse(str)
});
const {promises: fs} = require('fs');
const path = require('path');
const packageJson = require('./package.json');

fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: {
      title: 'fastify-message-center', description: '消息中心', version: packageJson.version
    }, components: {}
  }
});

const sqliteStorage = path.resolve('./tests/database.sqlite');

fastify.register(require('@kne/fastify-sequelize'), {
  db: {
    storage: sqliteStorage
  }, modelsGlobOptions: {
    syncOptions: {}
  }
});

fastify.register(require('./index'), {
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

fastify.register(require('@kne/fastify-response-data-format'));

fastify.ready().then(async () => {
  const api = fastify.swagger();
  await fs.writeFile(path.resolve(__dirname, './open-api.json'), JSON.stringify(api, null, 2));
  const converter = require('widdershins');
  const md = await converter.convert(api, {});
  await fs.writeFile(path.resolve(__dirname, './doc/api.md'), md);
});
