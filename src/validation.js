import * as yup from 'yup';

const validate = async (link, feeds, i18n) => {
  const schema = yup.string().url(i18n.t('errors.link')).notOneOf(feeds, i18n.t('errors.unique')).required();
  try {
    await schema.validate(link);
    return null;
  } catch (e) {
    return e.message;
  }
};

export default validate;
