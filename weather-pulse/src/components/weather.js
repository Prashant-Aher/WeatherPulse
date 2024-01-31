import React, { useState } from 'react';
import moment from 'moment';                //for time formatting
import '../css/styles.css';
import { Button } from 'semantic-ui-react';

const WeatherReport  = ({ weatherData }) => {

  const [lastRefreshed, setLastRefreshed] = useState(moment());     //for tracking last refreshed time
       
  const handleRefresh = () => {
    window.location.reload();               //refreshing/reload page
    setLastRefreshed(moment());             // updating last refreshed time
  };

  return (
    <div className="main">
      <div className="top">
        <p className="header">{weatherData.name}</p>
        <Button className="button" inverted color='red' circular icon='refresh' onClick={handleRefresh} />
      </div>

      <div className="flex">
        <p className="day">{moment().format('LLLL')}</p>
        <p className="description">{weatherData.weather[0].main}</p>
      </div>

      <div className="flex">
        <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sun-time">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="sun-time">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
      </div>

      <div className="flex">
        <p> </p>
        <p className="last-refreshed">Last Updated at:  {lastRefreshed.fromNow()}</p>
      </div>
    </div>    
  );
}

export default WeatherReport ;