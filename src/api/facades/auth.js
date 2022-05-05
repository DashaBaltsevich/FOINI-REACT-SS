import { httpClient } from '../httpClient';

export const signIn = async (body) => {
  const { data } = await httpClient.post(`sign-in`, body);
  return data;
}

export const signOut = async () => {
  const { data } = await httpClient.post(`sign-out`, {});
  return data;
}

export const getUserData = async () => {
  const { data } = await httpClient.get('user');
  return data;
}

export const updateUserData = async (body) => {
  const { data } = await httpClient.patch(`user`, body);
  return data;
}
