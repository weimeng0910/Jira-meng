/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 网络请求配置,axios二次封装
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import qs from 'qs';
// 引入antd 提示框，这个项目里用什么组件库这里引什么
import { message } from 'antd';

// 引入状态码文件
import { showMessage } from './status';
// 引入请求地址
import { API_URL } from '../config';
// 定义写入localStorageKey
import { authProviderToken } from '../config';
// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}
//基础URL，axios将会自动拼接在url前
const BASE_URL = API_URL;
//默认请求超时时间
const timeout = 30_000;


/**
 * 创建 axios一个实例
 */

const serviceAxios: AxiosInstance = axios.create({
  //url: '/',// `url` 是用于请求的服务器 URL
  timeout,// 请求超时设置
  baseURL: `${BASE_URL}`,// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  //useTokenAuthorization: true,
  //表示跨域请求时是否需要使用凭证，如需要携带cookie 该值需设为true
  withCredentials: false,// 跨域请求是否需要携带 cookie

  // `headers` 是即将被发送的自定义请求头
  headers: {

    Accept: 'application/json',
    'Content-Type': 'application/json'// 传参方式表单
  },

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  //transformRequest: [
  //  function (data) {
  //    console.log(data.Authorization, '发送服务器前1');

  //    //由于使用的 form-data传数据所以要格式化
  //    delete data.Authorization;
  //    data = qs.stringify(data);
  //    return data;
  //  }
  //]
});

/**
 * http request 拦截器
 * 统一请求拦截===>前端给后端的参数 可配置自定义headers 例如 language、token等
 */

serviceAxios.interceptors.request.use(


  (config: AxiosRequestConfig) => {
    // 1.发送网络请求时，在界面中间位置显示Loading的组件
    //......loading代码
    //2.请求要求用户必须携带token,如果没有携带直接跳转到登陆页面
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    config.headers = config.headers ?? {};
    //每次发送请求前判断是否存在Token，如果存在，则无统一在HTTP请求的header都加上token
    const token = localStorage.getItem(authProviderToken);

    // 會員系統需驗證身份時
    if (token) {
      config.headers.Authorization = token;
    }
    //3.params/data序列化操作
    if (config.method?.toUpperCase() === 'POST') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  // 请求失败
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);

    }
    return Promise.reject(response?.data);

  }
);

/**
 * http response 拦截器
 * 后台响应数据格式===》后端给前端
 */

serviceAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 开启 token 认证
    if (response.headers.authorization) {
      //console.log(response.headers.authorization, '后面接收的token');

      localStorage.setItem(authProviderToken, response.headers.authorization);
    } else if (response.data && response.data.token) {
      localStorage.setItem(authProviderToken, response.data.token);
    }

    if (response.status === 200) {
      return response.data;
    }
    console.log('请求被拦截');

    showMessage(response.status);
    return response.status;

  },
  // 请求失败
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);
      return Promise.reject(response.data);
    }
    return message.error('网络连接异常,请稍后再试!');

  }

);

// 导出至外层，方便统一使用
export { serviceAxios };
