const fp = require('fastify-plugin');

module.exports = fp(async (fastify, options) => {
  const welcome = async () => {
    return 'welcome';
  };

  Object.assign(fastify.messageCenter.services, { welcome });
});
