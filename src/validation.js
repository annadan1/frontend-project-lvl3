import * as yup from 'yup';

const validateUrl = async (link, i18n) => {
  const schema = yup.string().url().required();
  try {
    await schema.validate(link);
    return null;
  } catch (e) {
    return i18n.t('errors.link');
  }
};

const validateUnique = async (link, feeds, i18n) => {
  const schema = yup.string().notOneOf(feeds);
  try {
    await schema.validate(link);
    return null;
  } catch (e) {
    return i18n.t('errors.unique');
  }
};

export { validateUrl, validateUnique };
