// Weather API Implementation for Cumbayá Chamber
// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const currentCondition = document.querySelector('#current-condition');
const tempHigh = document.querySelector('#temp-high');
const tempLow = document.querySelector('#temp-low');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const weatherIcon = document.querySelector('.weather-icon');

// API Configuration - Cumbayá, Ecuador coordinates
const myKey = "__OPENWEATHER_API_KEY__";
const myLat = "-0.2065082";
const myLon = "-78.4355379";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

async function apiFetch() {
  try {
    // Fetch current weather
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log('Weather API Error:', error);
  }
}

// Fetch weather when page loads
apiFetch();