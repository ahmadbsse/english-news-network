import { AxiosRequestConfig, AxiosResponse } from "axios";

const validateResponse = (response: AxiosResponse): AxiosResponse => {
  if (!response.status || response.status < 200 || response.status >= 400) {
    throw response;
  }

  return response;
};

export const useResponseInterceptors = (
  response: AxiosResponse
): Promise<AxiosResponse> => {
  response = validateResponse(response);

  return Promise.resolve(response);
};

export const useRequestInterceptors = async (
  request: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  return request;
};
