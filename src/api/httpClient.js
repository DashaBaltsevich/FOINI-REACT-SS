import axios from 'axios';

const httpClient = axios.create({
    baseURL: `https://infinite-woodland-61407.herokuapp.com/api/v1/`,
    timeout: 0,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.accessToken}`,
    },
  });

const resetTokens = async () => {
  const currentRefresh = localStorage.getItem('refreshToken');

  if (!currentRefresh) {
    return {
      err: new Error('No refresh token found!')
    }
  }

  try {
    const { data: { content }} = await httpClient.post('refresh', { refreshToken: currentRefresh });

    if (!content || !content.accessToken || !content.refreshToken) {
      throw new Error('Refresh failed!');
    }

    localStorage.setItem('accessToken', content.accessToken);
    localStorage.setItem('refreshToken', content.refreshToken);

    return content.accessToken

  } catch (err) {
    return { err };
  }
}

const resetTokenAndReattemptRequest = async (error) => {
  try {
    const { response: { errorResponse }} = error;
    const accessToken = await resetTokens();

    if (accessToken.err) {
      return Promise.reject(accessToken.err);
    }

    const retryOriginalRequest = new Promise((resolve) => {
      errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
      resolve(axios(errorResponse.config));
    });

    return retryOriginalRequest;

  } catch(err) {
    return Promise.reject(err);
  }
}

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
      const needRefresh = error.response.data.content?.needRefresh;

      if (needRefresh) {
        return resetTokenAndReattemptRequest(error);
      }
        
      return Promise.reject(error);
    },
);

export { httpClient }