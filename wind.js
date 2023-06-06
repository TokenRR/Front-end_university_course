function Weather() {
    const [wind, setWind] = React.useState(null);
  
    React.useEffect(() => {
      const apiKey = '6a700a1e919dc96b0a98901c9f4bec47'; // Замініть на свій API-ключ OpenWeatherMap
      // const apiKey = '02dd36826b460f1c66592a782c0e355b';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}`;
  
      const fetchWeather = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setWind(data.wind);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
  
      // Отримання даних про погоду при завантаженні компоненту
      fetchWeather();
  
      // Оновлення даних про погоду кожні 5 хвилин
      const interval = setInterval(fetchWeather, 300000);
  
      // Очистка інтервалу при розмонтуванні компоненту
      return () => clearInterval(interval);
    }, []);
  
    if (!wind) {
      return <div>Завантаження...</div>;
    }
  
    const { speed, deg } = wind;
    const direction = degToCompass(deg);
    const windString = `У Києві<br>
                        Швидкість вітру: ${speed} м/с<br>
                        Напрям: ${direction}`;
  
    console.log(windString);
  
    return <div dangerouslySetInnerHTML={{ __html: windString }}></div>;
  }
  
  function degToCompass(num) {
    const val = Math.floor((num / 22.5) + 0.5);
    const arr = ['Північ', 'Північно-північно-схід', 'Північний схід', 'Східно-північно-схід', 'Схід', 
    'Східно-південно-схід', 'Південний схід', 'Південно-південно-схід', 'Південь', 'Південно-південно-захід', 
    'Південний захід', 'Західно-південно-захід', 'Захід', 'Західно-північно-захід', 'Північний захід', 
    'Північно-північно-захід'];
    return arr[(val % 16)];
  }
  
  ReactDOM.createRoot(document.getElementById('wind')).render(<Weather />);
  

