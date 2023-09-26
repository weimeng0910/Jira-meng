/**
 * @author meng
 * @version 1.0
 * @date 2022/11/24
 * API解藕，接口配置列表
 * 为了同一个接品多次使用，为了API的统一管理
 */
import { AxiosRequestConfig } from 'axios';

import { User } from '@/types/user';
import { Project } from '@/types/Project';
import { http } from './http';

// 返回res.data的interface
export interface IResponse<T = any, D = any> {
  code: number | string;
  data: T;
  msg: string;
  status: string;
  config: AxiosRequestConfig<D>;
  request?: any;
}
export interface ILogin {
  username: string;
  password: string;
}
export interface IUser {
  name?: string;
  personId?: number;
}

/**
 * @description: 用户登录或者注册
 * @params {String} url
 * @params {ILogin} params
 * @return {Promise}
 */
export const clientApi = async (url: string, params: ILogin): Promise<IResponse> => {


  const config = {
    headers: { 'Content-Type': 'application/json' },

  };
  let resp;
  try {
    resp = await http({
      method: 'post',
      url,
      params,
      config


    });
  } catch (error) {
    console.error(error);

  }
  return resp;
};

/**
 * @description: 获取负责人列表
 * @params {IUser} params
 * @return {Promise}
 */

export const getUsersList = async (): Promise<User[]> => {
  let resp;
  try {
    resp = await http({
      url: 'users',
      method: 'post'
    });

  } catch (error) {
    console.error(error);
  }
  return resp;
};
/**
 * @description: 获取项目列表
 * @params {IUser} params
 * @return {Promise}
 */
export const getProjectsList = async (params: IUser): Promise<Project[]> => {
  let resp;
  try {
    resp = await http({
      url: 'projects',
      data: params,
      method: 'get'
    });
  } catch (error) {

    console.log(error);

  }
  return resp;
};
/**
 * @description: 获取项目列表
 * @params {IUser} params
 * @return {Promise}
 */
export const getProjectsPin = async (params: IUser): Promise<Project[]> => {
  let resp;
  try {
    resp = await http({
      url: `projects/${params.personId}`,
      data: params,
      method: 'put'
    });
  } catch (error) {

    console.log(error);

  }
  return resp;
};
