document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cityForm");
    const input = form.firstElementChild.firstElementChild;
    let flag = false;
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const cityName = input.value;
        const key = "4bd3ee05ace6ebc940a1a9601ed80f26";
        try {
            let res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`);
            let data = await res.json();
            const { lat, lon } = data[0];

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
            const weatherData = await response.json();
            const city = weatherData.name;
            const temperature = weatherData.main.temp;
            const tempMin = weatherData.main.temp_min;
            const tempMax = weatherData.main.temp_max;
            const weatherDescription = weatherData.weather[0].description;

            // Set data on web
            document.getElementById("location").textContent = `${city}`;
            document.getElementById("temperature").textContent = `${temperature.toFixed(1)}°C`;
            document.getElementById("tempMinMax").textContent = `Min ${tempMin.toFixed(1)}°C | Max ${tempMax.toFixed(1)}°C`;
            updateDateTime();

            // Change weather icon according to weather
            const weatherIcon = document.getElementById("weather-icon");
            weatherIcon.style.display = "block";
            if (weatherDescription.includes('cloud')) {
                weatherIcon.className = "fa-solid fa-cloud";
                weatherIcon.style.color = "gray";
            } else if (weatherDescription.includes("rain")) {
                weatherIcon.className = "fa-solid fa-cloud-showers-heavy";
                weatherIcon.style.color = "blue";
            } else if (weatherDescription.includes("clear")) {
                weatherIcon.className = "fa-solid fa-sun";
                weatherIcon.style.color = "yellow";
            }

            flag = true; // for updating data time after display weather info

        } catch (err) {
            console.log("Fetch Error - ", err);
        }

    })
    input.focus();
    if (flag) {
        setTimeout(() => {
            updateDateTime();
        }, 1000);
    }
});

function updateDateTime() {
    const now = new Date();
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedDate = `${day} | ${month} ${date}, ${year} | ${hours}:${minutes}`;
    document.getElementById("date").textContent = formattedDate;
}