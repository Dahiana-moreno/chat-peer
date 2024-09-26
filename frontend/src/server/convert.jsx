import React, { useEffect } from 'react'
import { useState } from 'react'
import '../App.css'
import '../Style.css'
import axios from "axios";
import envio from "../img/enviar(2).png"
import flechas from "../img/dos-flechas.png"
import { useAuth } from '../authentication/AuthContext';
import imgCurrent from "../img/currency.jpg"


const Convert = () => {
  const { userId} = useAuth();

  const uriBack = import.meta.env.VITE_URL_BACK;
  //se establece valores predertminados Cop USD 
  // se el usuario no cambia el formato se imprime la conversion de USD a COP
  const [amount, setAmount] = useState('')
  const [to, setTo] = useState('COP')
  const [from, setFrom] = useState('USD')
  const [result, setResult] = useState(null)
  const [convertions, setConvertions] = useState([]);
  
 
 useEffect( ()=>{
  ConvertServe()
 },[userId])
 // console.log(import.meta.env); // verifica imprime todas las variables de entorno existentes

const ConvertServe = async () => {
 
try {

  const res = await axios.get(`${uriBack}/converts?user_id=${userId}`);
  const respuesta = res.data
  if (!respuesta.ok) {
   // console.log('error al obtener los datos')
  }
  setConvertions(res.data)

     //enviamos los datos de la conversion
     const response = await axios.get(`${uriBack}/convertserve?amount=${amount}&from=${from}&to=${to}&user_id=${userId}`);
     const resultConvert = response.data
   //  console.log(response.data)
   // extremos todos los datos del usuario unas vez validado que haya iniciado se sion

   if (!response.ok) {
   // console.log('Error en la conevrsion Intentelo nuevamente')
  } 
  setResult(resultConvert)


  
const updateConverts = await axios.get(`${uriBack}/converts?user_id=${userId}`);
const resultUpdate = updateConverts.data

if (updateConverts) {
  setConvertions(resultUpdate)
} else{
  console.log('Error al actualizar las conversiones')
}
  
} catch (error) {
  setResult(null)
  console.log(error.message);
}

}


  return (
    <>

      <div className='columns'>
        <div className=' conversation'>
        <div className='containerSearch'> 
            { convertions.length > 0 ? (
                convertions.map((convertion) => (
                <div className='resultSearch' key={convertion.id}>
                  <p>
                    El resultado de: {convertion.amount}{convertion.from} = {convertion.resultado}{convertion.to}
                  </p>
                </div>
                ))
            ):(
              <p>No hay conversiones</p>
            )

            }
</div>
        </div>


          <div className='conversation'>
            <div className='bane'>Bienvenido</div>
            <img className='currentImg' src={imgCurrent} alt="" />

            <div className='data'>
          <input className='contenInput' type="number" name="amount" id="amount"  placeholder='amount' onChange={(e) => setAmount(e.target.value)} /> </div>
    <div className='data divisas'>
      
       <div className='divisas'>
       <select className='contenInput ' type="number" name="from" id="from" placeholder='from' onChange={(e) => setFrom(e.target.value)}>
         <option value="USD">USD</option>
         <option value="COP">COP</option>
         <option value="EUR">EUR</option>
         <option value="GBP">GBP</option>
         <option value="CAD">CAD</option>
         <option value="JPY">JPY</option>
         <option value="CHF">CHF</option>
         <option value="MXN">MXN</option>
         <option value="PLN">PLN</option>
       </select>
       <img  className='iconsInput' src={flechas} alt="" />
       <select className='contenInput ' type="number" name="to" id="to" placeholder='to' onChange={(e) =>setTo(e.target.value)}>
         <option value="COP">COP</option>
         <option value="USD">USD</option>
         <option value="EUR">EUR</option>
         <option value="GBP">GBP</option>
         <option value="CAD">CAD</option>
         <option value="JPY">JPY</option>
         <option value="CHF">CHF</option>
         <option value="MXN">MXN</option>
         <option value="PLN">PLN</option>
       </select>
</div>
     <br />
     </div>
     <div className='data'>
     <button className='envio' onClick={ConvertServe} ><img src={envio} alt="Enviar" title='Enviar'/></button>
     </div>
  
          </div>
        
          </div>

    
    </> 
  )
}
export default Convert;