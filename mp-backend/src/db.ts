
import { ConnectionPool, config  } from "mssql";

export const dbConfig: config = {
    user: "sa",
    password: "YourStrong!Passw0rd",
    server: "localhost",
    database: "MinisterioPublicoDB",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

export const pool = new ConnectionPool(dbConfig);