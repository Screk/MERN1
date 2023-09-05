import React, { useEffect, useState } from "react";

const NASA_URL = "https://api.nasa.gov/";
const NASA_API_KEY = "VFtdqUKrhdBQAahCZ6cqNaKdExIvJbDNtPICUlOv";

const FetchingInput = () => {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [APODData, setAPODData] = useState(null);
  const [marsData, setMarsData] = useState(null);
  const [select, setSelect] = useState('APOD');

  const handleInput = (ev) => setDate(ev.target.value.toString());
  const handleSelect = (ev) => setSelect(ev.target.value)



  useEffect(() => {
    const getMarsPhoto = async () => {
      try {
        const response = await fetch(
          `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`
        );
        if (response.ok) {
          const marsJson = await response.json();
          setMarsData({
            photo: marsJson.photo[0].img_src,
          });
        } else {
          console.error("Error al cargar la imagen de Marte.");
        }
      } catch (error) {
        console.error("Error al conectarse con la API de la NASA.", error);
      }
    };
    getMarsPhoto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);
  

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

  console.log(marsData)

  if(select==='APOD') {
    return (
      <>
        <h1>Imagen astronómica de día</h1>
        <h3>Esta imagen corresponde con la fecha {date}</h3>
        <input type="date" value={date} onChange={handleInput} />
        <select id='APIS' onChange={handleSelect}>
          <option value="APOD">APOD</option>
          <option value="Mars">Mars</option>
        </select>
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
    );
  } else if (select ==='Mars') {
    return (
      <>
      <h1>Imagen de Marte</h1>
      <h3>Esta imagen corresponde con la fecha {date}</h3>
      <input type="date" value={date} onChange={handleInput} />
      <select id='APIS' onChange={handleSelect}>
        <option value="APOD">APOD</option>
        <option value="Mars">Mars</option>
      </select>
      <img src={marsData} />
      </>
    )
  }

};

export default FetchingInput;
