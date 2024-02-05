
![image](https://github.com/Prashant-Aher/WeatherPulse/assets/131543229/5013aabd-35c2-4a5d-bf20-f3334eace5ca)




# WeatherPulse
Welcome to **WeatherPulse**, a powerful and user-friendly **weather application** that provides real-time weather updates and forecasts. With intuitive features and a sleek design, WeatherPulse offers a seamless experience for staying informed about the current and upcoming weather conditions.

# Getting Started:

1. **Clone the repository:**

    `git clone https://github.com/Prashant-Aher/WeatherPulse.git`
   
2. **Install dependencies:**

    `npm install`
   
3. **Set up your .env file with API keys and configurations.**
   
4. **Run the app:**
  
   `npm start`

# Steps to Obtain the OpenWeatherMap API Key

1. **Sign Up for OpenWeatherMap Account:**
   
     Go to https://home.openweathermap.org/users/sign_up and create your own account.

2. **Navigate to API Section:**
   
     After creating your account, navigate to the API section on the Navigation bar.

3. **Explore API Endpoints:**
   
     In the API section, explore different options such as Current Weather Data, Hourly 4 hour forecasts, 16 day forecasts, etc. These are the API endpoints you'll use to fetch weather data.

4. **Get API Key:**
   
     To access the APIs, you need an API key. Click on your username in the top right corner and then select "my API keys."

5. **Create API Key if Necessary:**
   
     If you don't have an API key, create one. This key will be used to authenticate your requests to the OpenWeatherMap API.

6. **Create .env File:**
    
     In your main app folder, create a file called .env. This file will store your environment variables, including API endpoints and keys.

7. **Define Environment Variables:**
    
     Inside the .env file, set up the following environment variables:
   
```
  REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5'
  REACT_APP_API_KEY = [Paste your API key here]
  REACT_APP_ICON_URL = 'https://openweathermap.org/img/w'
```

8. **Paste API Key:**
    
     Replace `[Paste your API key here]` in the `REACT_APP_API_KEY` variable with the API key you obtained from OpenWeatherMap. This step ensures your application can authenticate and access weather data.
