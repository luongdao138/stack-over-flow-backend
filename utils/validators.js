const registerValidator = (username, password) => {
  let errors = {};

  if (username.trim() === '') errors.username = 'Username is cannot be empty!';
  else if (username.trim().length > 30 || username.trim().length < 3)
    errors.username = 'Username must be in range 3-30 characters length!';

  if (password.trim() === '') errors.password = 'Password is cannot be empty!';
  else if (password.trim().length < 6)
    errors.password = 'Password must be at least 6 characters length!';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const loginValidator = (username, password) => {
  let errors = {};

  if (username.trim() === '') errors.username = 'Username cannot be empty!';
  if (password.trim() === '') errors.password = 'Password cannot be empty!';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const questionValidator = (title, body, tags) => {
  let errors = {};

  if (title.trim() === '') errors.title = 'Title must be provided!';

  if (body.trim() === '') errors.body = 'Body must be provided!';

  if (!Array.isArray(tags) || tags.length === 0 || tags.length > 5)
    errors.tags = '1-5 tags must be added!';
  else if (tags.some((tag) => !/^[a-zA-Z0-9-]*$/.test(tag)))
    errors.tags = 'Tags must have alphanumeric characters only!';
  else if (
    tags.some(
      (tag, index) => tags.filter((x, i) => x === tag && i !== index).length > 0
    )
  )
    errors.tags = 'Duplicate tags cannot be added!';
  else if (tags.some((tag) => tag.length > 20))
    errors.tags = 'A single tag cannot have more than 20 characters!';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = { registerValidator, loginValidator, questionValidator };
