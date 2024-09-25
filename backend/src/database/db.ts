import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'
import { User } from '../models/userModel';
import { Convert } from '../models/ConvertModel';

dotenv.config();
const db = process.env.DB_NAME || 'convert_db'
const username =process.env.DB_USER || 'root'
const password = process.env.DB_PASSWORD || ''
const host = process.env.DB_HOST || 'localhost'

console.log(db)
export const sequelize = new Sequelize(db, username, password, {
  dialect: 'mysql',
  host: host,
  models: [User,Convert],
});

//sequelize.authenticate()