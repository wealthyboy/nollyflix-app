import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = 'authToken';

const ukey = 'user';

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Error getting the auth token', error);
  }
};

const getUser = async () => {
  const user = await getToken();
  return user ? user : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
};

const storeUser = async (user) => {
  try {
    await SecureStore.setItemAsync(ukey, JSON.stringify(user));
  } catch (error) {
    console.log('Error storing the user token', error);
  }
};

const getUserObj = async () => {
  try {
    return await SecureStore.getItemAsync(ukey);
  } catch (error) {
    console.log('Error getting the user object', error);
  }
};

const getUserOb = async () => {
  const user = await getUserObj();
  return user ? user : null;
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(ukey);
  } catch (error) {
    console.log('Error removing the user token', error);
  }
};

export default {
  getToken,
  getUser,
  removeToken,
  storeToken,
  storeUser,
  getUserOb,
  removeUser,
  getUserObj
};
