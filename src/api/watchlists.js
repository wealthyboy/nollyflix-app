import client from './client';

const watchlists = () => client.get('https://nollyflix.tv/api/profile/videos');
export default {
  watchlists
};
