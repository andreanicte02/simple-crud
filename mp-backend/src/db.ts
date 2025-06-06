import dotenv from "dotenv";
dotenv.config();

import sql, { ConnectionPool } from "mssql";

const sqlConfig = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    server: process.env.DB_HOST || '',
    database: process.env.DB_NAME || '',
    port: parseInt(process.env.DB_PORT || "1433", 10),
    options: {
        encrypt: false,
    }
};

export const pool = new ConnectionPool(sqlConfig);
export const poolConnect = pool.connect();