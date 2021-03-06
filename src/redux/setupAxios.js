export default function setupAxios(axios) {
  axios.interceptors.request.use(
    config => {

      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );
}
