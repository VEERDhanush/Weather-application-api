import React, { useState, useEffect } from 'react';
import './weatherapp.css';
import UserLogin from './UserLogin';
import UserDashboard from './UserDashboard';
import AdminLogin from './AdminLogin'; 
import AdminPanel from './AdminPanel'; 

const App = () => {
  const [userLoginInfo, setUserLoginInfo] = useState(null);
  const [adminLoginInfo, setAdminLoginInfo] = useState(null);
  const [location, setLocation] = useState('');
  const [apiKey, setApiKey] = useState('72dec6f1bbfac77118c0c35172e499a4');
  const [tempUnit, setTempUnit] = useState('imperial');
  const [weatherData, setWeatherData] = useState({});
  const [adminMode, setAdminMode] = useState(false);

  const handleUserLogin = (userInfo) => {
    setUserLoginInfo(userInfo);
    setAdminMode(false);
  };

  const handleAdminLogin = (adminInfo) => {
    setAdminLoginInfo(adminInfo);
    setAdminMode(true);
  };

  const handleUserLogout = () => {
    setUserLoginInfo(null);
    setAdminMode(false);
  };

  const handleResetApiKey = (newApiKey) => {
    setApiKey(newApiKey);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${tempUnit}&appid=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error('Error fetching weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchBackgroundImage = async () => {
    if (location && apiKey) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${location}&orientation=landscape&client_id=kJcjw9odKyM62nAeSR6VqzJBTVPhOZVFQL081rRSWXA`
        );

        if (response.ok) {
          const data = await response.json();
          document.body.style.backgroundImage = `url(${data.urls.full})`;
        } else {
          console.error('Error fetching background image');
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    }
  };

  const handleSearch = async () => {
    document.body.style.backgroundImage = '';
    await fetchWeatherData();
    await fetchBackgroundImage();

    if (weatherData.main) {
      try {
        const response = await fetch('https://localhost:5000/saveWeather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: weatherData.name,
            temperature: tempUnit === 'imperial' ? `${weatherData.main.temp}°F` : `${weatherData.main.temp}°C`,
            weather: weatherData.weather[0].description,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
        } else {
          console.error('Error saving weather data');
        }
      } catch (error) {
        console.error('Error saving weather data:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      {adminMode ? (
        adminLoginInfo ? (
          <div>
            <AdminPanel
              onLogout={() => {
                setAdminLoginInfo(null);
                setAdminMode(false);
              }}
              onResetApiKey={handleResetApiKey}
              userLoginInfo={userLoginInfo}
            />
          </div>
        ) : (
          <AdminLogin onLogin={(adminInfo) => setAdminLoginInfo(adminInfo)} />
        )
        ) : userLoginInfo ? (
          <div>
            <UserDashboard onLogout={handleUserLogout} />
          </div>
        ) : (
          <UserLogin onLogin={handleUserLogin} onAdminLogin={() => setAdminMode(true)} />
        )}
  
      {userLoginInfo && (
        <div className="container">
          <input
            type="text"
            className="cityInput"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <div className="unitButtons">
            <button onClick={() => setTempUnit('imperial')} disabled={userLoginInfo}>°F</button>
            <button onClick={() => setTempUnit('metric')} disabled={userLoginInfo}>°C</button>
          </div>
          {weatherData.main && (
            <div className="result">
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <p>Temperature: {tempUnit === 'imperial' ? `${weatherData.main.temp}°F` : `${weatherData.main.temp}°C`}</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
