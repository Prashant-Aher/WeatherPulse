import './App.css';
import React, { useEffect, useState } from "react";


function App() {

  const [data, setData] = useState([null]);
  const [lat, setLat] = useState([null]);
  const [long, setLong] = useState([null]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });


      if (lat !== null && long !== null) {
        const apiUrl = `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
        console.log(apiUrl);
        console.log("Latitude is:", lat);
        console.log("Longitude is:", long);
        console.log(result);
      }
    };
    fetchData();
  }, [lat,long])


  return (
    <div className="App">

    </div>
  );
}

export default App;
