import crpto from 'crypto';

const SECRET = 'NITISHAHUJA_REST_API'

export const random=()=>crpto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string)=> {
    return crpto.createHmac('sha256',[salt,password].join('/')).update(SECRET).digest('hex');
}