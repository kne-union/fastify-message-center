const fp = require('fastify-plugin');
const get = require('lodash/get');

module.exports = fp(async fastify => {
  const { models, services } = fastify.messageCenter;

  const templateIsExists = async ({ name }, currentUser) => {
    const query = [];
    if (name && name !== get(currentUser, 'name')) {
      query.push({ name });
    }

    return (
      (await models.template.count({
        where: {
          [fastify.sequelize.Sequelize.Op.or]: query
        }
      })) > 0
    );
  };

  const addTemplate = async ({ name, type, template }) => {
    if ((await templateIsExists({ name })) > 0) {
      throw new Error('模板名称不能重复');
    }

    return await models.template.create({
      name,
      type,
      template
    });
  };

  const getTemplate = async ({ id }) => {
    const curTemplate = await models.template.findByPk(id);

    if (!curTemplate) {
      throw new Error('模板不存在');
    }
    return curTemplate;
  };

  const updateTemplate = async ({ id, name, type, template }) => {
    const curTemplate = await getTemplate({ id });

    if ((await templateIsExists({ name }, curTemplate)) > 0) {
      throw new Error('模板名称不能重复');
    }
    return await curTemplate.update({
      name,
      type,
      template
    });
  };

  const getTemplateList = async ({ filter, currentPage, perPage }) => {
    const { rows } = await models.template.findAndCountAll({
      where: filter,
      offset: perPage * (currentPage - 1),
      limit: perPage
    });
    return { pageData: rows, totalCount: rows.length };
  };

  const deleteTemplate = async ({ id }) => {
    const curTemplate = await getTemplate({ id });
    await curTemplate.destroy();
    return '模板已删除';
  };

  services.template = {
    templateIsExists,
    addTemplate,
    getTemplate,
    updateTemplate,
    getTemplateList,
    deleteTemplate
  };
});
