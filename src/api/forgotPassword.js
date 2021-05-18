import client from './client';

const ForgotPassword = (email) =>
  client.post('https://nollyflix.tv/api/forgot/password', { email });

export default {
  ForgotPassword
};
