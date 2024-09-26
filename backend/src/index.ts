import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import convertRoutes from "./routes/convert"
import { sequelize } from "./database/db"

dotenv.config();

const port = process.env.PORT || 3000;
const back = process.env.DB_HOST || '  http://localhost'
const app = express()

app.use(cors())
app.use('/convert', convertRoutes)

app.get("/", (req: Request, res: Response) =>{
  res.send("hello, Type!");
});
//console.log('API Access URL:', process.env.API_ACCESS_URL);

app.listen(port, () => {
  console.log(`Server is runnin on the port ${back}:${port} `)
})



const serveDb = async () => {

try {
  await sequelize.authenticate();
  await sequelize.sync()
} catch (error) {
  console.log(`Error en la conexion a la base de datos ${error}`)
}
}
serveDb();
