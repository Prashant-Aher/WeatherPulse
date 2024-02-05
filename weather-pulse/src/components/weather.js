import React, { useState } from 'react';
import moment from 'moment';                //for time formatting
import '../css/styles.css';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faBolt, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudShowersHeavy, faWind } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake, faSun, faSmog } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';


const WeatherIcon = styled.div `color: whitesmoke;`; 

/**
 * Generates the appropriate weather icon based on the provided weather description.
 *
 * @param {string} item - description of the weather as a string
 * @return {JSX.Element} Icon based on the weather
 */
const WeatherReport  = ({ weatherData }) => {

  const [lastRefreshed, setLastRefreshed] = useState(moment());     //for tracking last refreshed time
       

  const handleRefresh = () => {
    window.location.reload();               //refreshing/reload page
    setLastRefreshed(moment());             // updating last refreshed time
  };

  const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  
  const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });


  /**
   * Generates the appropriate weather icon based on the provided weather description.
   *
   * @param {string} item - description of the weather as a string item 
   * @return {JSXElement} Icon based on the weather
   */
  function  getCurrentWeatherIcon(item){
       
    let weatherIcon = null;

    weatherIcon =
    item === 'Thunderstorm' ? <FontAwesomeIcon icon={faBolt} /> :
    item === 'Drizzle' ? <FontAwesomeIcon icon={faCloudRain} /> :
    item === 'Rain' ? <FontAwesomeIcon icon={faCloudShowersHeavy} /> :
    item === 'Snow' ? <FontAwesomeIcon icon={faSnowflake} /> :
    item === 'Clear' ? <FontAwesomeIcon icon={faSun} /> :
    item === 'Clouds' ? <FontAwesomeIcon icon={faCloud} /> :
    <FontAwesomeIcon icon={faSmog} />;

    return (   
          <p className=""><WeatherIcon style={{fontSize:50,marginTop:20}}> { weatherIcon } </WeatherIcon> </p>        
    )
  }


  /**
   * A function to convert a degree to a textual description of the wind direction.
   *
   * @param {number} degree - The degree to be converted to textual description
   * @return {string} The textual description of the direction based on the metereological degree
   */
  function  toTextualDescription(degree){
    if ((degree>337.5 && degree<360)|| (degree>22.5 && degree<22.5)){return 'Northerly';}
    else if(degree>22.5 && degree<67.5){return 'North Easterly';}
    else if(degree>67.5 && degree<112.5){return 'Easterly';}
    else if(degree>122.5 && degree<157.5){return 'South Easterly';} 
    else if(degree>157.5 && degree<202.5){return 'Southerly';}
    else if(degree>202.5 && degree<247.5){return 'South Westerly';}
    else if(degree>247.5 && degree<292.5){return 'Westerly';}
    else if(degree>292.5 && degree<337.5){return 'North Westerly';}
  }



  return (
    <div className="main">
      <div className="top">
        <p className="header">{weatherData.name}, {weatherData.sys.country}</p>
        <Button className="button" inverted color='red' circular icon='refresh' onClick={handleRefresh} />
      </div>

      <div className="flex-weather">
        <p className="day">{moment().format('LLLL')}</p>
        <p className="icon">{getCurrentWeatherIcon(weatherData.weather[0].description)}</p>
        <p className="description">{weatherData.weather[0].description}</p>
      </div>

      <div className="flex-weather">
        <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex-weather">
        <p className="maxmintemp">Max / Min Temp.: {weatherData.main.temp_max} / {weatherData.main.temp_min} &deg;C </p>
        <p className="maxmintemp"><FontAwesomeIcon icon={faWind} />   {Math.round((weatherData.wind.speed)*3600/1000)} Km/Hr  {toTextualDescription(weatherData.wind.deg)}</p>
      </div>

      <div className="flex-weather">
        <p className="sun-time">Sunrise: {sunriseTime}</p>
        <p className="sun-time">Sunset: {sunsetTime}</p>
      </div>

      <div className="flex-weather">
        <p className="last-refreshed"> </p>
        <p className="last-refreshed">Last Updated at:  {lastRefreshed.fromNow()}</p>
      </div>
    </div>    
  );
}

export default WeatherReport;