<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>RealTime-Weather-Forecast-App</h1>
  <p align="center">
<img src="https://www.htmlhints.com/image/react/reactWeatherApp.png" width="100%">
</p>
  <p>
    This is a Real-Time Weather Forecast App built using <strong>React.js</strong>. The app displays the weather of your <strong>current location</strong> and also allows you to <strong>search for a specific city's weather</strong>.
  </p>

  <p>
    In this article, I’ll demonstrate how to build a weather application that performs two tasks:
    <ol>
      <li>Displaying the real-time weather for your current location.</li>
      <li>Showing the weather conditions of a particular city when you search for it.</li>
    </ol>
  </p>

  <p>
    While building this app, you will learn the basics of React.js such as <strong>Hooks</strong>, <strong>States</strong>, <strong>Props</strong>, <strong>Components</strong>, <strong>Effects</strong>, <strong>API Calls</strong>, <strong>Dynamic Data Display</strong>, <strong>Dynamic Fetch Data</strong>, and much more.
  </p>

  <h2>Setting up React</h2>
  <p>To get started, create a new React project:</p>
  <pre><code>
mkdir weather
cd weather
npx create-react-app weather
  </code></pre>
  <p>
    Once the installation is completed, the React setup will be successfully completed, and the app will automatically open on <strong>localhost:3000</strong> in your browser.
  </p>

  <h2>Install Packages</h2>
  <p>You need to install the following packages to build the app:</p>
  <ul>
    <li><strong>react-animated-weather</strong> – For animated weather icons.</li>
    <li><strong>react-live-clock</strong> – To display a live clock.</li>
    <li><strong>axios</strong> – For making API requests.</li>
  </ul>

  <p>To install the required packages, run:</p>
  <pre><code>npm install react-animated-weather react-live-clock axios</code></pre>

  <h2>Get Your API Keys</h2>
  <p>The weather data is fetched from the <strong>Open Weather Map API</strong>. It’s free to use and provides accurate weather data.</p>

  <h3>Steps to Get API Key:</h3>
  <ol>
    <li>Sign up on <a href="https://openweathermap.org/">Open Weather Map</a>.</li>
    <li>Confirm your email address.</li>
    <li>Once confirmed, you will receive your API key in your email.</li>
    <li>You can also find the API key in your dashboard.</li>
  </ol>

  <h3>Add API Key to the App:</h3>
  <p>Create a new file <strong>apiKeys.js</strong> and add your API key and base URL as follows:</p>
  <pre><code>
module.exports = {
  key: "{Your API Key Here}",
  base: "https://api.openweathermap.org/data/2.5/",
};
  </code></pre>

  <h2>App Phase-1 (Current Location Weather Data)</h2>
  <h3>Detecting User's Current Location:</h3>
  <p>You can use the <code>navigator.geolocation</code> API to get the user’s current location (latitude and longitude). In the <strong>currentLocation.js</strong> file, use the following code to get the coordinates and fetch the weather data.</p>
  <pre><code>
if (navigator.geolocation) {
  this.getPosition()
    .then((position) => {
      this.getWeather(position.coords.latitude, position.coords.longitude);
    });
} else {
  alert("Geolocation not available");
}
  </code></pre>
  <p>If the user denies location access, you can handle it with a fallback:</p>
  <pre><code>
if (navigator.geolocation) {
  this.getPosition()
    .then((position) => {
      this.getWeather(position.coords.latitude, position.coords.longitude);
    })
    .catch((err) => {
      this.getWeather(28.67, 77.22); // Random coordinates
      alert("You have disabled location service.");
    });
} else {
  alert("Geolocation not available");
}
  </code></pre>

  <h3>Fetching Weather Data:</h3>
  <p>Pass the latitude and longitude to the OpenWeather API to get the weather data for the user’s location:</p>
  <pre><code>
getWeather = async (lat, lon) => {
  const api_call = await fetch(
    \`\${apiKeys.base}weather?lat=\${lat}&lon=\${lon}&units=metric&APPID=\${apiKeys.key}\`
  );
  const data = await api_call.json();
  this.setState({
    lat: lat,
    lon: lon,
    city: data.name,
    temperatureC: Math.round(data.main.temp),
    temperatureF: Math.round(data.main.temp * 1.8 + 32),
    humidity: data.main.humidity,
    main: data.weather[0].main,
    country: data.sys.country,
  });
};
  </code></pre>

  <h2>App Phase-2 (Weather Conditions of a Particular City)</h2>
  <h3>Searching for Weather Data by City:</h3>
  <p>Using <strong>React Hooks</strong>, we can fetch weather data based on a city name entered by the user. Use the following code to handle input and trigger the search:</p>
  <pre><code>
const [query, setQuery] = useState("");
const [error, setError] = useState("");
const [weather, setWeather] = useState({});
  </code></pre>

  <h3>Search Form:</h3>
  <p>Create an input form for users to enter the city name:</p>
  <pre><code>
<input
  type="text"
  className="search-bar"
  placeholder="Search any city"
  onChange={(e) => setQuery(e.target.value)}
  value={query}
/>
  </code></pre>

  <h3>Search Function:</h3>
  <p>When the user clicks the search icon, the following function is triggered to fetch weather data:</p>
  <pre><code>
const search = (city) => {
  axios
    .get(
      \`\${apiKeys.base}weather?q=\${city != "[object Object]" ? city : query}&units=metric&APPID=\${apiKeys.key}\`
    )
    .then((response) => {
      setWeather(response.data);
      setQuery("");
    })
    .catch(function (error) {
      console.log(error);
      setWeather("");
      setQuery("");
      setError({ message: "Not Found", query: query });
    });
};
  </code></pre>

  <h2>Animated Weather Icons</h2>
  <p>For displaying dynamic weather icons based on the weather condition, we use the <strong>react-animated-weather</strong> package.</p>

  <h3>Dynamic Weather Icon:</h3>
  <p>You can change the icon dynamically based on the weather condition using a <code>switch</code> statement:</p>
  <pre><code>
switch (this.state.main) {
  case "Haze":
    this.setState({ icon: "CLEAR_DAY" });
    break;
  case "Clouds":
    this.setState({ icon: "CLOUDY" });
    break;
  case "Rain":
    this.setState({ icon: "RAIN" });
    break;
  case "Snow":
    this.setState({ icon: "SNOW" });
    break;
  case "Dust":
    this.setState({ icon: "WIND" });
    break;
  case "Drizzle":
    this.setState({ icon: "SLEET" });
    break;
  case "Fog":
    this.setState({ icon: "FOG" });
    break;
  case "Smoke":
    this.setState({ icon: "FOG" });
    break;
  case "Tornado":
    this.setState({ icon: "WIND" });
    break;
  default:
    this.setState({ icon: "CLEAR_DAY" });
}
  </code></pre>
  <h2>Conclusion</h2>
<p>Thank you for checking out the <strong>Real-Time Weather Forecast App</strong>. I hope this guide helped you understand how to build a weather application using <strong>React.js</strong> with dynamic data fetching and location-based features. If you have any questions or suggestions, feel free to reach out or contribute to the project.</p>

<p><strong>Happy Coding! 🚀</strong></p>

</body>
</html>
