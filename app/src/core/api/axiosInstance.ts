import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

import Config from 'react-native-config';

export const instance = Axios.create({
  baseURL: 'https://9a96-2806-262-487-140d-3d09-79eb-5b1-644f.ngrok.io',
});

export const axiosInstance = async <T>(
  config: AxiosRequestConfig = {},
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = (await instance({ ...config, cancelToken: source.token }))
    .data;

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export default axiosInstance;
