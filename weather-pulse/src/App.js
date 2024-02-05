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
    const [forecast, setForecast] = useState([null]);
    const [error, setError] = useState(null);
    const [, setWeatherData] = useState([null]);


    useEffect(() => {
      /**
       * Asynchronously fetches data and sets latitude, longitude, and weather data based on user's geolocation.
       */
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


    /**
     * Fetches weather data based on the provided latitude and longitude.
     *
     * @param {number} lat - The latitude of the location
     * @param {number} long - The longitude of the location
     * @return {Promise} A promise that resolves to the weather data
     */
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
    


    
    /**
     * Retrieves the forecast data for the given latitude and longitude.
     *
     * @param {number} lat - The latitude.
     * @param {number} long - The longitude.
     * @return {Promise} A Promise that resolves to the forecast data in a specific format.
     */
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



    /**
     * Maps the given data to the weather interface format.
     *
     * @param {Object} data - The data to be mapped to the weather interface.
     * @return {Object} The mapped weather interface data.
     */
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

    
    /**
     * Handle the response from the API request.
     *
     * @param {object } response - the response object from the API
     * @return {Parsed JSON} the parsed JSON data from the response
     */
    function handleResponse(response) {
      if (response.ok) {
        return response.json();
       } else {
        throw new Error("Make sure to Enable Location access in your Browser !");
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
          <div className="body">
            <Dimmer active>
              <Loader>Loading..</Loader>
            </Dimmer>
          </div>
        )}
      </div>
    );
  }

  export default App;
