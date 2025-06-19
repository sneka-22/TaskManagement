const pg = require('pg');
const Pool = pg.Pool;
const appConfig = require('./config');

const pool = new Pool({
  host: appConfig.CONFIG.DB_HOST,
  port: appConfig.CONFIG.DB_PORT,
  user: appConfig.CONFIG.DB_USER,
  password: appConfig.CONFIG.DB_PASSWORD,
  database: appConfig.CONFIG.DB_NAME
});

   (async () => {
  try {
    // Use await to acquire a client
    const client = await pool.connect();

    try {
      const res = await client.query('SELECT NOW()');
      console.log('Database connection successful:', appConfig.CONFIG.DB_NAME);
    }
    catch(err:any)
    {
        throw new Error(err.message);
    }
  } catch (err: any) {
    console.error('Database connection failed:', err.message);
  }
})();
module.exports.pool=pool;