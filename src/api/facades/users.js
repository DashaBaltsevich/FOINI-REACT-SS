import axios from 'axios';
export const getUsers = async () => {
  const { data } = await axios.get(`https://randomuser.me/api/?results=4`);
  return data;
};
