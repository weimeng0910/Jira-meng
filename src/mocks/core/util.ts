import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

import { SECRET_KEY, expiresIn } from './config';

interface SampleClass {
  uid: string
}

/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 生成token
 */
export const generteToken = (uid: string, scope: number) => {
  const token = jwt.sign(
    {
      uid,
      scope
    },
    SECRET_KEY,
    //设置过期时间
    { expiresIn }
  );

  return token;
};

/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 解构token中需要的ID
 */
export function jwtDecodeGetId(token: string) {

  const { uid } = jwt_decode(token) as SampleClass;
  return uid;
}
