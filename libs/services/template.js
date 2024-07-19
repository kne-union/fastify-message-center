const fp = require('fastify-plugin');

module.exports = fp(async fastify => {
  const { models, services } = fastify.messageCenter;

  const addTemplate = async ({ name, type, template }) => {
    return await models.template.create({
      name,
      type,
      template
    });
  };

  services.template = {
    addTemplate
  };
});
