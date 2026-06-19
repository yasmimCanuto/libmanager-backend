const mysql = require("mysql2/promise");
const env = require("./env");

const sslConfig = env.dbSsl
  ? {
      rejectUnauthorized: env.dbSslRejectUnauthorized,
      ...(env.dbSslCa ? { ca: env.dbSslCa } : {}),
    }
  : undefined;

const pool = mysql.createPool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
