import { useState } from 'react' 
import './index.css';

import searchIcon from "./assets/search.gif";
import clearIcon from "./assets/clear-sky.png";
import cloudIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/windy.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humid.png";
import { useEffect } from 'react';





const WeatherDets = ({icon,temp,city,country,lat,log,humidity,wind}) => {
  return(
    <>
  <div className='image'>
     <img src={icon} alt="Image" className='weatherimage cloudy'/>
  </div>
  <div className='temp data'>{temp}°C</div>
  <div className='location data'>{city}</div>
  <div className='country data'>{country}</div>
  <div className='cord'>
   <div>
   <span className="lat">Latitude</span> 
   <span>{lat}</span>
   </div>  
   <div>
   <span className="lat">Longitude</span> 
   <span>{log}</span>
   </div> 
  </div> 
  
  <div className='data-container'>
    <div className="element">
      <img src={humidityIcon} alt="Humidity" className='icon' />
      <div className="humiditydata">
        <div className="humidity-percent">{humidity}%</div>
        <div className="text">Humidity</div>
      </div>
    </div>

    <div className="element">
      <img src={windIcon} alt="Humidity" className='icon' />
      <div className="humiditydata">
        <div className="wind-percent">{wind}Km/h</div>
        <div className="text">Wind Speed</div>
      </div>
    </div>
  </div>
  </>
);};




function App() {

  const[icon,setIcon]=useState(clearIcon);
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState("Chennai");
  const[text,setText]=useState("Chennai");
  const[country,setCountry]=useState("IN");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[citynotfound,setCitynotfound]=useState(false);
  const[loading,setLoading]=useState(false);

  const Weathermap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  };

  const search=async ()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=839bd62d2bce8a2efe5a4ef4b5012df7&units=Metric`;  

    try{
      let res=await fetch(url);
      let data = await res.json();
      console.log(data);
      if(data.cod === "404")
      {
        alert("404! City not found");
        setCitynotfound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weathercode=data.weather[0].icon;
      console.log(weathercode);
      setIcon(Weathermap[weathercode] || clearIcon);
      console.log(Weathermap[weathercode]);
      setCitynotfound(false);

    }catch(error){
      console.error("An error occurred :",error.message);
    }finally{
      setLoading(false);
    }
  };

  const handleKeyDown=(e)=>{
    if(e.key === "Enter")
    {
      search();
    }
  };

  const handleCity = (e) =>{
    setText(e.target.value);
  };

  useEffect(()=>{
    search();
  },[]);

  return (
    <>
      <div className='container'>
        <div className='input--container'>
          <input type="text" className='cityinput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className='search--icon'>
            <img className='searchicon' src={searchIcon} alt="search" onClick={()=>search()}/>
          </div>
        </div>
         <WeatherDets icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
         <div className="branding">Designed by <span className='namestyle'>Thirumavalavan</span></div>
      </div>
      
    </>
  );
}

export default App;
