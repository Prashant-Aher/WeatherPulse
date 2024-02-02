import './App.css';
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from './components/weather';
import Forecast from './components/forecast';


  function App() {

    const [data, setData] = useState([null]);
    const [lat, setLat] = useState([null]);
    const [long, setLong] = useState([null]);
    const [lastRefreshed] = useState(Date.now());
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);
    const [, setWeatherData] = useState([]);


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

      const intervalId = setInterval(fetchData, 30000);       
      return () => clearInterval(intervalId);               //cleanup function --> to clear interval when component unmounts

    }, [lastRefreshed]);          //run when last refreshed changes


    useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    
      getWeather(lat, long)
      .then(weather => {
        setWeatherData(weather);
        setError(null);     
      })
      .catch(err => {
        setError(err.message);
      });

      getForecast(lat, long)
        .then(data => {
          setForecast(data);
          setError(null);
        })
        .catch(err => {
          setError(err.message);
        });

    }, [lat, long, error])


    function getWeather(lat, long) {
      return fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then(res => handleResponse(res))
        .then(weather => {
          if (Object.entries(weather).length) {
            const mappedData = mapDataToWeatherInterface(weather);
            return mappedData;
          }
        });
    }
    


    
    function getForecast(lat, long) {
      return fetch(
        `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then(res => handleResponse(res))
        .then(forecastData => {
          if (Object.entries(forecastData).length) {
            return forecastData.list
              .filter(forecast => forecast.dt_txt.match(/09:00:00/))
              .map(mapDataToWeatherInterface);
          }
        });
    }



    function mapDataToWeatherInterface(data) {
      const mapped = {
        date: data.dt * 1000,                       // convert from seconds to milliseconds
        description: data.weather[0].main,
        temperature: Math.round(data.main.temp),
      };
    
      // Add extra properties for the five day forecast: dt_txt, icon, min, max
      if (data.dt_txt) {
        mapped.dt_txt = data.dt_txt;
      }
    
      return mapped;
    }



    useEffect(() => {
      console.log("Latitude is:", lat);
      console.log("Longitude is:", long);
    }, [lat, long]);            //whenever lat or long changes

    
    function handleResponse(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Please Enable your Location in your browser!");
      }
    }



    return (
      <div className="App">
        {error ? (
          <div>Error: {error}</div>
        ) : typeof data.main !== 'undefined' ? (
          <div >
            <Weather weatherData={data} lastRefreshed={lastRefreshed} />
            <Forecast weatherData={data} forecast={forecast} />
          </div>
        ) : data.cod === '404' ? (
          <div>City not found</div>
        ) : (
          <div className="App">
            <Dimmer active>
              <Loader>Loading..</Loader>
            </Dimmer>
          </div>
        )}
      </div>
    );
  }

  export default App;
