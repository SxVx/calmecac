import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const instance = axios.create({
  baseURL: 'https://aa3c-2806-262-487-140d-3d09-79eb-5b1-644f.ngrok.io',
});

export const axiosInstance = <T>(
  config: AxiosRequestConfig = {},
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = instance({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export default axiosInstance;
