import { useState, useEffect } from "react"
import React from 'react'

const NASA_URL = "https://api.nasa.gov/";
const NASA_API_KEY = "VFtdqUKrhdBQAahCZ6cqNaKdExIvJbDNtPICUlOv";


const Mars = () => {

    const today = new Date(Date.now()).toISOString().slice(0, 10);
    const [date, setDate] = useState(today);
    const [marsData, setMarsData] = useState([]);


    useEffect(() => {
        const getMarsPhoto = async () => {
          try {
            let data = await fetch(`${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`).then((res) => res.json());
            console.log(data.photos);
            setMarsData(data.photos)
          } catch (error) {
            console.log(error)
          }
        };
        getMarsPhoto();
      }, [date])

      const handleInput = (ev) => setDate(ev.target.value.toString());

      console.log(marsData)

      if(marsData.length === 0|| marsData.code === 404) {
        return (
            <>
            <h3>No se ha podido mostrar la imagen</h3>
            <input type="date" value={date} onChange={handleInput} />
            <img src={marsData[0]} />
            </>
        )
      } else {

  return (
    <>  
        <h3>Imagen de Marte</h3>
        <h3>Esta imagen fue tomada en la fecha: {date}</h3>
        <input type="date" value={date} onChange={handleInput} />
        <img src={marsData[0].img_src} />
    </>
  )
      }
}

export default Mars