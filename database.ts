import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

type  DataBaseConfig =  {connectionString: string, ssl:{rejectUnauthorized:boolean}}

const databaseConfig = {
    connectionString: process.env.DATABASE_URL
} as DataBaseConfig;
    
if(process.env.MODE === 'DEV'){
    databaseConfig.ssl = {
        rejectUnauthorized : false
    }
}

if(process.env.MODE === 'PROD'){
    databaseConfig.ssl = {
        rejectUnauthorized: false
    }
}

export const connection = new Pool(databaseConfig);
