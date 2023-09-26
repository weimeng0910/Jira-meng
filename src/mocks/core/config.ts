import { nanoid } from 'nanoid';

// 加密的key,为字符串
// export const SECRET_KEY = 'jira_MW_jk123uu_s$!';
export const SECRET_KEY = nanoid();
// token的有效期时间
export const expiresIn = 24 * 60 * 60;
