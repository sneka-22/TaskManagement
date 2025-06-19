const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const authConfig = require('../config');
const Configpool=require('../dbconfig').pool;
const signupservice= async function(body:{username:string,password:string,email:string,phoneNumber:string})
{
      try{
      const response= await Configpool.query('SELECT * FROM users WHERE username = $1', [body.username]);
    const user = response.rows;
    if(user.length) return ({fails:'username already exists' });
    const hashed = await bcrypt.hash(body?.password, 10);
    const result = await Configpool.query(
      'INSERT INTO users (username, password,email,phone_number) VALUES ($1, $2,$3,$4) RETURNING id, username',
      [body?.username, hashed,body?.email,body?.phoneNumber]);
         return result;
  }catch(err:any)
    {
        throw new Error(err.message);
    }
}
module.exports.signupservice=signupservice;
const loginService=async function(body:{username:string,password:string})
{
  try{
  const result = await Configpool.query('SELECT * FROM users WHERE username = $1', [body.username]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return ({fails:'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, authConfig.CONFIG.JWT_SECRET, { expiresIn:authConfig.CONFIG.JWT_EXPIRATION });
    return token ;
  }catch(err:any)
  {
      throw new Error(err.message);
  }
}
module.exports.loginService=loginService;