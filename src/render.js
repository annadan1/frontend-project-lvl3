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

const createTitle = (field, title) => {
  field.textContent = '';
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  field.appendChild(div);
  field.appendChild(ul);
  div.classList.add('card', 'border-0');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const card = document.createElement('div');
  div.appendChild(card);
  card.classList.add('card-body');
  const h2 = document.createElement('h2');
  card.appendChild(h2);
  h2.classList.add('card-title', 'h4');
  h2.textContent = title;
};

const renderPosts = (fieldPost, posts) => {
  const ul = fieldPost.querySelector('.list-group');
  posts.forEach((post) => {
    const {
      postTitle, postDescription, postLink, postId,
    } = post;
    const li = document.createElement('li');
    const link = document.createElement('a');
    const button = document.createElement('button');
    ul.appendChild(li);
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    li.prepend(link);
    link.setAttribute('href', postLink);
    link.classList.add('fw-bold');
    link.setAttribute('data-id', postId);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.textContent = postTitle;
    li.appendChild(button);
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', postId);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = 'Просмотр';
  });
};

const renderFeeds = (elements, feeds) => {
  const fieldFeed = elements.feeds;
  const fieldPost = elements.posts;
  createTitle(fieldFeed, 'Фиды');
  createTitle(elements.posts, 'Посты');
  const ul = fieldFeed.querySelector('.list-group');
  feeds.forEach((feed) => {
    const { feedDescription, feedItems, feedTitle } = feed;
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('h3');
    ul.appendChild(li);
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    li.appendChild(h3);
    h3.classList.add('h6', 'm-0');
    h3.textContent = feedTitle;
    li.appendChild(p);
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feedDescription;
    renderPosts(fieldPost, feedItems);
  });
};

const render = (elements) => (path, value) => {
  if (path === 'feedback.error') {
    renderError(elements, value);
  }
  if (path === 'feedback.success') {
    renderSuccess(elements, value);
  }
  if (path === 'feeds') {
    const feeds = value.reverse();
    renderFeeds(elements, feeds);
  }
};

export default render;
