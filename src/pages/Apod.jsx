import { useState, useEffect } from "react"
import React from 'react'

const NASA_URL = "https://api.nasa.gov/";
const NASA_API_KEY = "VFtdqUKrhdBQAahCZ6cqNaKdExIvJbDNtPICUlOv";

const Apod = () => {
    const today = new Date(Date.now()).toISOString().slice(0, 10);
    const [date, setDate] = useState(today);
    const [APODData, setAPODData] = useState(null);

    useEffect(() => {
        const getAPOD = async () => {
          try {
            const response = await fetch(
              `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
            );
            if (response.ok) {
              const APODJson = await response.json();
              setAPODData({
                title: APODJson.title,
                image: APODJson.url,
                date: APODJson.date,
                copyright: APODJson.copyright,
                explanation: APODJson.explanation,
              });
            } else {
              console.error("Error al cargar la imagen APOD.");
            }
          } catch (error) {
            console.error("Error al conectarse con la API de la NASA.", error);
          }
        };
    
        getAPOD();
      }, [date]);

      const handleInput = (ev) => setDate(ev.target.value.toString());

  return (
    <>
        <div>
            <h2>Imagen astronómica del día</h2>
            <h3>Esta imagen corresponde con la fecha {date}</h3>
            <input type="date" value={date} onChange={handleInput} />
        </div>

        <div>
          {APODData ? (
            <>
              <img src={APODData.image} alt={APODData.title} />
              <h3>{APODData.title}</h3>
              <div>
                {APODData.date}, {APODData.copyright}
              </div>
              <p>{APODData.explanation}</p>
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
    </>
  )
}

export default Apod