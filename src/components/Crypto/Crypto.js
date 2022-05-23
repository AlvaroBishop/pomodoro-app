import React, { useState } from 'react'
import './Crypto.css'

export default function Crypto() {
    const [invest, setInvest] = useState(0);

    const handleChange = e => ( e.target.value % 10 === 0) ? setInvest(e.target.value/10) : setInvest(0);
        

  return (
    <div className='Crypto'>
        <h1>Crypto Coins B-Shop</h1>
        <form>
            <div>
                <label>Dólares a Invertir</label>
                <input 
                    type = 'number'
                    onChange={handleChange}
                />
            </div>
        </form>

        <p>Precio de Crypto Moneda: <span>$10</span></p>
        <h3>Puedes comprar <span>{invest}</span> monedas</h3>
    </div>
  )
}
