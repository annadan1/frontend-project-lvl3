import onChange from 'on-change';
import * as yup from 'yup';
import _ from 'lodash';

const schema = yup.object().shape({
  input: yup.string().url().required(),
});

const validate = async (inputValue) => {
  try {
    await schema.validate(inputValue);
    return '';
  } catch (e) {
    return e.message;
  }
};

const render = (elements) => (path, value, prevValue) => {
  if (path === 'feedback.error') {
    elements.feedback.textContent = value;
    elements.input.classList.remove('is-invalid');
    elements.input.classList.remove('text-success');
    value === "" ? elements.input.classList.remove('is-invalid') :
      elements.input.classList.add('is-invalid');
  } if (path === 'feedback.success') {
    elements.feedback.textContent = value;
    elements.input.classList.remove('is-invalid');
    elements.input.classList.remove('text-success');
    value === '' ? elements.input.classList.add('text-success') :
      elements.input.classList.add('is-invalid')
  }
};

const modelView = () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    submitButton: document.querySelector('button[type="submit"]'),
    feedback: document.querySelector('.feedback'),
  };

  const state = onChange({
    valid: true,
    form: {
      input: '',
    },
    feedback: {
      error: '',
      success: '',
    },
    feed: [],
  }, render(elements));

  elements.input.addEventListener('input', (e) => {
    e.preventDefault();
    state.form.input = e.target.value;
  });

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    state.feedback.error = await validate(state.form);
    state.valid = _.isEmpty(state.feedback.error);
    if (state.valid === true) {
      state.feed.push(state.form.input);
      console.log(state);
    }
  });
};

export default modelView;
