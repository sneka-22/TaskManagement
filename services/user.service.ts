const userpool=require('../dbconfig').pool;
const getUserDetails = async function ( userId: number) {
console.log('userId :', userId);
  try {
    const result = await userpool.query('SELECT id,username,email,phone_number FROM users WHERE id = $1', [userId]);
    if(!result.rows.length) return ({fails:'user not exists' });
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
}
module.exports.getUserDetails = getUserDetails;