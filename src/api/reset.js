import client from './client';

const resetPassword = (code, password) =>
  client.post('https://nollyflix.tv/api/reset/password', {
    code,
    password
  });

export default {
  resetPassword
};
