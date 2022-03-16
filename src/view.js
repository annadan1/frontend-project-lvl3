/* eslint-disable no-param-reassign */
import _ from 'lodash';
import * as yup from 'yup';

const schema = yup.object().shape({
  input: yup.string().url().required(),
});

const validate = async (inputValue, i18n) => {
  try {
    await schema.validate(inputValue);
    return '';
  } catch (e) {
    return i18n.t('errors.url');
  }
};

const isValid = (state) => {
  if (!_.isEmpty(state.feedback.valid) || !_.isEmpty(state.feedback.unique)) {
    return false;
  } return true;
};

const view = async (elements, state, i18n) => {
  elements.input.addEventListener('input', (e) => {
    e.preventDefault();
    state.form.input = e.target.value;
  });

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    state.feedback.success = '';
    state.feedback.valid = await validate(state.form, i18n);
    state.feedback.unique = state.feeds.includes(state.form.input) ? i18n.t('errors.double') : '';
    state.valid = isValid(state);
    if (state.valid === false) {
      return;
    }
    state.feedback.success = i18n.t('success');
    state.feeds.push(state.form.input);
    console.log(state);
  });
};

export default view;
