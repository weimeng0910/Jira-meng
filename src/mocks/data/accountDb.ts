/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 模拟一个处理用户数据的后端
 * 本地存储中的数据备份
 */
import CryptoJS from 'crypto-js';// 加密

import { localStorageKey } from '../../config';// 定义写入localStorageKey
// 导入生成token的函数
import { generteToken } from '../core/util';
import { ResponseError, RequestBody, User } from '../type/handlersType';


type Users = User[];

/**
 *  @function loadUsers
 *  @description 加载存在 localStorage里的用户数据
 *  @returns users
 */
const loadUsers = (): Users => {

  const users = JSON.parse(window.localStorage.getItem(localStorageKey)!); // 非空断言运算符告诉 typescript 您知道自己在做什么

  return users ?? []; // ??在value1和value2之间，只有当value1为null或者 undefined 时取value2，否则取value1
};

/**
 *  @function clean
 *  @param user
 *  @description 检查并清除用户存在的passwordHash
 *  @returns users
 */
const clean = (user: User) => {
  let result;
  // 如果用户存在passwordHash
  if (user.passwordHash) {
    //解构其他参数并返回
    const { passwordHash, ...rest } = user;
    result = rest;
  }
  return result;
};


/**
 *  @function loadUserById
 *  @param id
 *  @description 检查用户的ID存在
 *  @returns users
 *  @async user
 */
async function loadUserById(id: string, cleanFields = false) {

  //调用 loadUsers函数来检查是否存在相同的ID,如果返回true，则搜索停止。
  const users = loadUsers();
  const userNew = users.find((item: User) => item.id === id);
  // 两个 & 符号表示 && 与运算符：
  return cleanFields && userNew ? clean(userNew) : userNew;
}


/**
 *  @function saveUsers
 *  @param users
 *  @description  保存用户
 */
const saveUsers = (users: Users) => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(users));
};

/**
 *  @function saveUser
 *  @param user
 *  @description 把新用户写入用户数组
 */
async function saveUser(user: User) {
  const users = loadUsers();
  users.push(user);
  saveUsers(users);
}

/**
 *  @function validateUser
 *  @param params
 *  @description 检查用户名和密码是否存在
 */

const validateUser = (params: RequestBody) => {
  const { username, password } = params;


  if (!username) {
    const error: ResponseError = new Error('用户名是必须的');
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error: ResponseError = new Error('密码是必须的');
    error.status = 400;
    throw error;
  }
};

/**
 *  @function hashcode
 *  @param data
 *  @description 加密数据
 */

function hashcode(data: string) {
  // 生成随机的key ,不能生成随机key,要不然无法判断用户是否存在
  // const keyStr = CryptoJS.lib.WordArray.random(16).toString();
  const keyStr = '01234567890123456789012345678901';
  // 字符串类型的key用之前需要用uft8先parse一下才能用
  const SECRET_KEY = CryptoJS.enc.Utf8.parse(keyStr);
  // 十六位十六进制数作为密钥偏移量
  const SECRET_IV = CryptoJS.enc.Utf8.parse(keyStr);

  const dataHex = CryptoJS.enc.Utf8.parse(data);
  // 使用生成的密钥加密消息
  const encryptedData = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.ciphertext.toString();
};

/**
 *  @function createUser
 *  @param data
 *  @description 创建用户,组装数据
 */

async function createUser(data: { username: string, password: string }) {
  // 解构传进来的参数
  const { username, password } = data;
  // 检查用户是否为空
  validateUser({ username, password });
  // 加密用户名生成ID
  const id = hashcode(username);
  const passwordHash = hashcode(password);
  // 读取用户Id,判卷用户ID是否存在
  const uid = await loadUserById(id);
  if (uid) {
    const error: ResponseError = new Error(`无法创建用户，因为 '${username}' 存在 `);
    error.status = 400;
    throw error;
  }

  // 组装新的用户数据
  const user = { id, username, passwordHash };
  // 何存用户
  saveUser(user);
  return loadUserById(id);
}

/**
 *  @function authenticate
 *  @param params
 *  @description 客户登陆时返回用户的信息,生成token
 */
async function authenticate(params: RequestBody) {
  const { username, password } = params;
  // 检查用户是否为空
  validateUser({ username, password });
  // 根据用户名，生成唯一ID
  const id = hashcode(username);
  // 根据ID读取相关用户数据
  const user = (await loadUserById(id)) as User;
  if (!user) {
    const error: ResponseError = new Error(`请注册，因为 '${username}' 不存在 `);
    error.status = 500;
    throw error;
  }

  /**
   *  @function generteToken
   *  @param id
   *  @description 定义令牌
   */
  const token = generteToken(id, 2);
  if (user.passwordHash === hashcode(password)) {

    return { ...clean(user), token };
  }
  const error: ResponseError = new Error('用户名或者密码不正确');
  error.status = 400;
  throw error;
}

/**
 *  @function loadScreensData
 *  @param storageKey
 *  @description 加载存在 localStorage里的项目数据
 */

const loadScreensData = (storageKey: string) => {

  const screensData = JSON.parse(window.localStorage.getItem(storageKey)!) || []; // 非空断言运算符告诉 typescript 您知道自己在做什么

  return screensData ?? []; // ??在value1和value2之间，只有当value1为null或者 undefined 时取value2，否则取value1
};
/**
 *  @function ScreensUserData
 *  @param storageKey
 *  @description 加载项目管理用户数据
 */

async function ScreensUserData(storageKey: string) {

  // 加载localStorage里的项目数据
  const userData = loadScreensData(storageKey);
  return userData;

}

// 导出注册方法createUser，登陆方法authenticate
export {
  createUser,
  authenticate,
  loadUserById,
  loadScreensData,
  ScreensUserData,
};
