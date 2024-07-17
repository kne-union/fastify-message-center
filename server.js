const fastify = require('fastify')({
  logger: true, querystringParser: str => require('qs').parse(str)
});

const fastifyEnv = require('@fastify/env');
const packageJson = require('./package.json');
const path = require('path');

const version = `v${packageJson.version.split('.')[0]}`;

const createServer = () => {
  fastify.register(fastifyEnv, {
    dotenv: true, schema: {
      type: 'object', properties: {
        DB_DIALECT: {type: 'string', default: 'sqlite'},
        DB_HOST: {type: 'string', default: 'data.db'},
        DB_USERNAME: {type: 'string'},
        DB_PASSWORD: {type: 'string'},
        DB_DATABASE: {type: 'string'},
        ENV: {type: 'string', default: 'local'},
        PORT: {type: 'number', default: 8046}
      }
    }
  });

  fastify.register(require('fastify-plugin')(async (fastify) => {
    fastify.register(require('@kne/fastify-sequelize'), {
      db: {
        dialect: fastify.config.DB_DIALECT,
        host: fastify.config.DB_HOST,
        database: fastify.config.DB_DATABASE,
        username: fastify.config.DB_USERNAME,
        password: fastify.config.DB_PASSWORD
      }, modelsGlobOptions: {
        syncOptions: {}
      }
    });
  }));

  fastify.register(require('fastify-plugin')(async (fastify) => {
    fastify.register(require('@kne/fastify-namespace'), {
      options: {
        prefix: `/api/${version}`
      },
      name: 'messageCenter',
      modules: [['controllers', path.resolve(__dirname, './libs/controllers.js')], ['models', await fastify.sequelize.addModels(path.resolve(__dirname, './libs/models'), {
        prefix: 't_message_center_'
      })], ['services', path.resolve(__dirname, './libs/services.js')]]
    });
    await fastify.sequelize.sync();
  }));

  fastify.register(require('@kne/fastify-response-data-format'));
};

module.exports = {
  fastify, createServer, start: () => {
    createServer();
    return fastify.then(() => {
      fastify.listen({port: fastify.config.PORT, host: '0.0.0.0'}, (err, address) => {
        if (err) throw err;
        console.log(`Server is now listening on ${address}`);
      });
    });
  }
};
