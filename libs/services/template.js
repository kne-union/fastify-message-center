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

  const getTemplate = async ({ id }) => {
    return await models.template.findByPk(id);
  };

  const updateTemplate = async ({ id, name, type, template }) => {
    const curTemplate = getTemplate({ id });
    return await curTemplate.update({
      name,
      type,
      template
    });
  };

  services.template = {
    addTemplate,
    getTemplate,
    updateTemplate
  };
});
