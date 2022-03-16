/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { validateUrl, validateUnique } from './validation.js';

const isValid = (state) => {
  const errorMessages = [state.feedback.valid, state.feedback.unique];
  return errorMessages.every(_.isEmpty);
};

const view = async (elements, state, i18n) => {
  elements.input.addEventListener('input', (e) => {
    e.preventDefault();
    state.form.input = e.target.value;
  });

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    state.feedback.success = '';
    state.feedback.valid = await validateUrl(state.form.input, i18n);
    state.feedback.unique = await validateUnique(state.form.input, state.feeds, i18n);
    state.valid = isValid(state);
    if (state.valid === false) {
      return;
    }
    state.feedback.success = i18n.t('success');
    state.feeds.push(state.form.input);
  });
};

export default view;
