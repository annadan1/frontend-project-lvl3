/* eslint-disable no-param-reassign */
const clear = (elements) => {
  elements.input.classList.remove('is-invalid');
  elements.input.classList.remove('text-success');
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.remove('text-success');
};

const renderError = (elements, value) => {
  if (value === null) {
    return;
  }
  clear(elements);
  elements.feedback.textContent = value;
  elements.input.classList.add('is-invalid');
  elements.feedback.classList.add('text-danger');
};

const renderSuccess = (elements, value) => {
  if (value === null) {
    return;
  }
  clear(elements);
  elements.feedback.textContent = value;
  elements.feedback.classList.add('text-success');
  elements.input.value = '';
  elements.input.focus();
};

const render = (elements) => (path, value) => {
  if (path === 'feedback.error') {
    renderError(elements, value);
  }
  if (path === 'feedback.success') {
    renderSuccess(elements, value);
  }
};

export default render;
