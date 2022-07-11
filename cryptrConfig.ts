import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const cryptr = new Cryptr(process.env.ENCRYPT_KEY);

export default cryptr;