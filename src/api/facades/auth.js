import { httpClient } from '../httpClient';

export const signIn = async (body) => {
  const { data } = await httpClient.post(`sign-in`, body);
  return data;
}

// export const signOut = async ...