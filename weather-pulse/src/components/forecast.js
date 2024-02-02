import React from "react";
import { List } from 'antd';
import moment from 'moment';
import '../css/styles.css';
import { faCloud, faBolt, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake, faSun, faSmog } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const WeatherIcon = styled.div `color: whitesmoke;`;        //styling for weather icons


function Forecast(props, data) {

  
    const { forecast } = props;             //destructuring forecast from props
  
    console.log("Forecast", forecast);
  
    //mapping forecast data to create forecast elements...
    const results = forecast.map((item, index) => {
       
        let weatherIcon = null

        weatherIcon =
        item.description === 'Thunderstorm' ? <FontAwesomeIcon icon={faBolt} /> :
        item.description === 'Drizzle' ? <FontAwesomeIcon icon={faCloudRain} /> :
        item.description === 'Rain' ? <FontAwesomeIcon icon={faCloudShowersHeavy} /> :
        item.description === 'Snow' ? <FontAwesomeIcon icon={faSnowflake} /> :
        item.description === 'Clear' ? <FontAwesomeIcon icon={faSun} /> :
        item.description === 'Clouds' ? <FontAwesomeIcon icon={faCloud} /> :
        <FontAwesomeIcon icon={faSmog} />;
  
      return (
        <div key={index} className="forecast">
          <div className="flex-forecast">
            <p className="forecast-text"> { moment(item.dt_txt).format("dddd, D MMM") } </p>           {/* Displaying full day name */}        

            <WeatherIcon style={{fontSize:20,marginTop:6}}> { weatherIcon }    {item.description}</WeatherIcon> 
            <p> {item.temperature} &deg;C </p>
          </div>
        </div>
      )
    })
    
    return(
      <div className="main">
        <List aria-label="forecast data">{results}</List>        {/* Displaying the forecast list */}
      </div>
    );
    
  }
  export default Forecast;