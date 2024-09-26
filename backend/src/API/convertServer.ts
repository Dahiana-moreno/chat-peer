import axios from "axios";
import dotenv from "dotenv"
import { response } from "express";
//se realiza llamo dpara que lea las variables de entorno
dotenv.config();

//clase dedicada para las coversiones a traves de la API
export class ConvertServe{
   private apiKey: string;
   private apiUrl: string
//asignamos las variables que contendra las Varibles .env y usamos el operador ?? para manejar el undefined
constructor( ){
  this.apiKey = process.env.API_ACCESS_KEY ?? ' ';
  this.apiUrl = process.env.API_ACCESS_URL ?? '';
}
/*
  const [count, setCount] = useState(0)

& currencies = EUR,GBP,CAD,PLN
& source = USD
& format = 1 
return
*/
//como es un array de divisas se utiliza corchetes
// se convierte cada divisa o moneda en una cadena separada por comas 
async getConvert( currencies: string[], source: string[]) {
  try {
    const res = await axios.get(this.apiUrl,{
      params: {
        access_key: this.apiKey,
         currencies: currencies.join(','),
         source: source.join(','),
         format: 1
      }
    });
    if (res.data.success) {
      //quotes objecto que contiene las tasa de conversion en la API
      return res.data.quotes;
    } else {
      throw new Error(`Error en lasolicitud`)
    }
  } catch (error) {
      throw new Error(`Error en la solicitud a la API: ${(error as Error).message}`);
      
  }

}
/*
& currencies = EUR,GBP,CAD,PLN to
& source = USD from
& format = 1  amount
return
*/

async convertBadge (to: string, from: string, amount: number){
  const fee = await this.getConvert([to], [from]);
  console.log(fee)
  const convertFee = fee[`${from}${to}`];
  console.log(fee[`${from}${to}`])
  const resultConvert = amount * convertFee;
  console.log(resultConvert)
  return resultConvert;
 // response.json({ resultConvert}) 

}

}
