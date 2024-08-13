import { useResponseInterceptors } from "./apiInterceptors";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
interface IRequest extends AxiosRequestConfig {
  url: string;
}

export const axiosInstance = axios.create();

const request = async (params: IRequest): Promise<AxiosResponse> => {
  try {
    axiosInstance.interceptors.response.use(useResponseInterceptors);

    return await axiosInstance(params);
  } catch (error: any) {
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors?.length &&
        error?.response?.data?.errors[0]) ||
      (error?.response?.data?.errors?.length &&
        error?.response?.data?.errors[0]) ||
      error?.response?.statusText ||
      error?.message ||
      "Something went wrong"
    );
  }
};

export default request;
