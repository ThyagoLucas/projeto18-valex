import  pg  from 'pg';
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const connection = new Pool({

  user:'postgres',
  password:'postgres',
  host: 'localhost',
  port:5432,
  database:'valex'

})


//export const connection = new Pool({
  //connectionString: process.env.DATABASE_URL,
//});
