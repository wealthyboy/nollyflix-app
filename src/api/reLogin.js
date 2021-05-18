import client from './client';

const reLogin = (id) =>
  client.post('https://nollyflix.tv/api/auth/reLogin', { id });

export default {
  reLogin
};
