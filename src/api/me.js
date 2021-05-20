import client from './client';

const me = () => client.get('https://nollyflix.tv/api/auth/me');

export default {
  me
};
