/* eslint-disable no-param-reassign */
import validate from './validation.js';

const runValidation = async (state, i18n, link) => {
  state.feedback.error = await validate(link, state.feeds, i18n);
  if (state.feedback.error !== null) {
    state.feedback.success = null;
    return;
  }
  state.feeds.push(link);
  state.feedback.success = i18n.t('success');
};

const view = (elements, state, i18n) => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    runValidation(state, i18n, elements.input.value);
  });
};

export default view;
