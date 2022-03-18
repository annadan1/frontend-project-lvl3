/* eslint-disable no-param-reassign */
import axios from 'axios';
import validate from './validation.js';
import parser from './parser.js';

const makeRequest = async (state, i18n, link) => {
  try {
    return await (await axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(link)}`)).data;
  } catch (e) {
    state.error = i18n('errors.netError');
    return i18n('errors.netError');
  }
};

const runValidation = async (state, i18n, link) => {
  state.feedback.error = await validate(link, state.links, i18n);
  if (state.feedback.error !== null) {
    state.feedback.success = null;
    return;
  }
  const response = await makeRequest(state, i18n, link);
  state.feeds.push(parser(state.feedback, response.contents, i18n));
  state.links.push(link);
  state.feedback.success = i18n.t('success');
};

const view = (elements, state, i18n) => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    runValidation(state, i18n, elements.input.value);
  });
};

export default view;
