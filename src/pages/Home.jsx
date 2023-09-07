import { useState } from "react"
import React from 'react'

const Home = () => {

    const today = new Date(Date.now()).toISOString().slice(0, 10);
    const [date, setDate] = useState(today);


  return (
    <>
    <h3>Elige de donde ver la fotografia!</h3>
    
    </>
  )
}

export default Home