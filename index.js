const fp = require('fastify-plugin');
const path = require('path');
const packageJson = require('./package.json');

const version = `v${packageJson.version.split('.')[0]}`;

module.exports = fp(async (fastify, options) => {
  options = Object.assign(
    {
      prefix: `/api/${version}`,
      dbTableNamePrefix: 't_message_center_'
    },
    options
  );
  fastify.register(require('@kne/fastify-namespace'), {
    options,
    name: 'messageCenter',
    modules: [
      ['controllers', path.resolve(__dirname, './libs/controllers.js')],
      [
        'models',
        await fastify.sequelize.addModels(path.resolve(__dirname, './libs/models'), {
          prefix: options.dbTableNamePrefix
        })
      ],
      ['services', path.resolve(__dirname, './libs/services.js')]
    ]
  });
});
