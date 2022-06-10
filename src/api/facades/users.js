import { httpClient } from '../httpClient';
export const getUsers = async () => {
  const { data } = await httpClient.get(`https://randomuser.me/api/?results=4`);
  return data;
};
