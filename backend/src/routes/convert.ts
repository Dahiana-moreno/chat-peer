import express from "express";
import { convertMoney, getAllConvert } from "../controllers/controllerconvert";
import { createUser, getUserId, loginUser } from "../controllers/controllerUser";

const router = express.Router();

router.get('/convertserve',convertMoney);
//http://localhost:3000/convert/convertserve?amount=5&from=USD&to=COP&user_id=1
//router.get('/convertserve',convertMoney);

router.get('/converts',getAllConvert) 
//http://localhost:3000/convert/converts?user_id=4
router.post('/register', createUser); 
//https://chat-peer2-production.up.railway.app/convert/register?password_user=securepassword&email=johndov@example.com
router.post('/login', loginUser); 
https://chat-peer2-production.up.railway.app/convert/login?password_user=12345&email=ema@example.com
//http://localhost:3000/convert/login?password_user=securepassword&email=johndov@example.com
router.post('/userId',getUserId); 
//https://chat-peer2-production.up.railway.app/convert/userId?userId=1
//http://localhost:3000/convert/userId?userId=2



export default router   