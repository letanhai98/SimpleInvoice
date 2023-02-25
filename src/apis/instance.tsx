import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://sandbox.101digital.io',
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000, // 30 seconds
});

const getUrl = (config: any) => {
  if (config?.baseURL) {
    return config?.url.replace(config?.baseURL, '');
  }
  return config?.url;
};

// Intercept all responses
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    // Phản hồi rồi mà bị lỗi từ phía server ...
    if (error?.response) {
      console.log('====== WRONG FROM SERVER =====', error?.response?.status);
    }

    console.log(
      `%c ${error?.response?.status} - ${getUrl(error?.response?.config)}:`,
      'color: #a71d5d; font-weight: bold',
      error?.response,
    );
    return error?.response;
  },
);

export default instance;
