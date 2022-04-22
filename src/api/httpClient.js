import axios from "axios";

const httpClient = axios.create({
    baseURL: `https://infinite-woodland-61407.herokuapp.com/api/v1/`,
    timeout: 0,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.accessToken}`,
    },
  });

const resetTokenAndReattemptRequest = (error) => {

  const body = {
    refreshToken: localStorage.getItem('refreshToken'),
  };

  return httpClient.post(`refresh`, body)
    .then(({ data }) => {
      localStorage.setItem('refreshToken', data?.content.refreshToken);
      localStorage.setItem('accessToken', data?.content.accessToken);

      httpClient.defaults.headers.common['Authorization'] = `Bearer ${data?.content.accessToken}`;
      error.config.headers['Authorization'] = `Bearer ${data?.content.accessToken}`;

      return httpClient(error.config)
    })
}

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
      const needRefresh = error?.response?.data?.content?.needRefresh;
      if (needRefresh) {
        return resetTokenAndReattemptRequest(error);
      }
        
      return Promise.reject(error);
    },
);

export { httpClient }