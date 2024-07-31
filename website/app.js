const WeatherApp = (() => {
  const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
  const apiKey = ",&appid=41c06ea42f988c2b952663fd2dd491b0&units=imperial";
  const serverURL = "http://127.0.0.1:4000";
  
  const init = () => {
    document.getElementById("generate").addEventListener("click", generateData);
  };

  const getCurrentDate = () => new Date().toDateString();

  const fetchWeather = async (zip) => {
    try {
      const response = await fetch(`${baseURL}${zip}${apiKey}`);
      const data = await response.json();
      if (data.cod !== 200) {
        DisplayError("Sorry, we could not find weather data for this zip code. Please try again"); 
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const POST = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const DisplayError = (message) => {
    const errorElement = document.getElementById("error");
    errorElement.innerHTML = message;
    setTimeout(() => (errorElement.innerHTML = ""), 2000);
  };

  const update = (savedData) => {
    document.getElementById("date").innerHTML = `Date: ${savedData.date}`;
    document.getElementById("city").innerHTML = `City: ${savedData.city}`;
    document.getElementById("temp").innerHTML = `Temperature: ${savedData.temp}&deg;F`;
    document.getElementById("description").innerHTML = `Description: ${savedData.description}`;
    document.getElementById("content").innerHTML = savedData.feelings;
  };

  const retrieveData = async () => {
    try {
      const response = await fetch(`${serverURL}/all`);
      const savedData = await response.json();
      update(savedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateData = async () => {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    try {
      const weatherData = await fetchWeather(zip);
      const { main: { temp }, name: city, weather: [{ description }] } = weatherData;

      const info = {
        date: getCurrentDate(),
        city,
        temp: Math.round(temp),
        description,
        feelings,
      };

      await POST(`${serverURL}/ADD`, info);
      await retrieveData();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return { init };
})();

WeatherApp.init();


