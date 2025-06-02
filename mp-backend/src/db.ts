import sql, {ConnectionPool} from "mssql";

const sqlConfig = {
    user: "sa",
    password: "YourStrong!Passw0rd",
    server: "sqlserver",
    database: "MinisterioPublicoDB",
    port: 1433,
    options: {
        encrypt: false,
    }
};

export const pool = new ConnectionPool(sqlConfig);

export const poolConnect = pool.connect();