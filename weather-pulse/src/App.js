import './App.css';
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from './components/weather';


function App() {

  const [data, setData] = useState([null]);
  const [lat, setLat] = useState([null]);
  const [long, setLong] = useState([null]);
  const [lastRefreshed] = useState(Date.now());


  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLat(position.coords.latitude);
        setLong(position.coords.longitude);

        const apiUrl = `${process.env.REACT_APP_API_URL}/weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

        const response = await fetch(apiUrl);
        const result = await response.json();

        setData(result);
        console.log(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30000);       //set interval to fetch data every 30 seconds

    return () => clearInterval(intervalId);       //cleanup function --> to clear interval when component unmounts

  }, [lastRefreshed]);          //run when last refreshed changes



  useEffect(() => {
    console.log("Latitude is:", lat);
    console.log("Longitude is:", long);
  }, [lat, long]);            //whenever lat or long changes



  return (
    <div className="App">
    {typeof data.main !== 'undefined' ? (<Weather weatherData={data} lastRefreshed={lastRefreshed} />
      ) : data.cod === '404' ? (
        <div>City not found</div>
      ) : (
        <div>
          <Dimmer active >
          <Loader>Loading..</Loader>
          </Dimmer>
        </div>
    )}
  </div>
  );
}

export default App;
