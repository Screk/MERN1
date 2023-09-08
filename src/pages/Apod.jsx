import { useState, useEffect } from "react"
import React from 'react'
import './Apod.css'

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
      <div className="container">
        <div className="title">
            <h2>Imagen astronómica del día</h2>
            <input type="date" value={date} max={date} onChange={handleInput} />
        </div>

        <div>
          {APODData ? (
            <>
            <div className="content">
              <img src={APODData.image} alt={APODData.title} />
              <h3>{APODData.title}</h3>
              <div>
                {APODData.date}, {APODData.copyright}
              </div>
              <p>{APODData.explanation}</p>
            </div>
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Apod