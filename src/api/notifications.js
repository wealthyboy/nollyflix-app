import client from './client';

const notifications = (pushToken, notificationStatus) =>
  client.post('https://nollyflix.tv/api/auth/notifications', {
    pushToken,
    notificationStatus
  });

export default {
  notifications
};
