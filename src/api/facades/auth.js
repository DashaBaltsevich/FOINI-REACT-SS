import { httpClient } from '../httpClient';
import axios from 'axios';

export const signUp = async (body) => {
  const { data } = await httpClient.post(`sign-up`, body);
  return data;
}

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

export const getUsers = async (body) => {
  const { data } = await axios.get(`https://randomuser.me/api/?results=4`);
  return data;
}
