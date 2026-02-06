import { useState } from "react";
import "./index.css";

function App() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);

  const handleSubmit = async () => {
    if (!phone.trim()) return;
    try {
      locationWeather();
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      const body = await res.json();
      setStatus(res.ok ? `Saved as ${body.phoneNumber}` : body.error);
      alert("Thank you for your submission!")
    } catch (err) {
      console.error(err);
      setStatus("Network error");
    }
  };

  const locationWeather = async () => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current=temperature_2m&forecast_days=3&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`);
      const body = await res.json();
      console.log(body);
    } catch (err) {
      console.log(err)
    }
  }

  const x = document.getElementById("location")

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else { 
      alert("Error Geolocation is not supported by this browser.");
    }
  }

  function success(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
  }

  function error() {
    alert("Sorry, no position available.");
  }
  return (
    <>
      <h1><span>Defrost</span></h1>
      <div className="register">
        <div class="phone-input">
          <label htmlFor="phone-number" id="userPrompt">
            Enter a Phone Number:
            <input
              id="phone-number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
            />
          </label>
        </div>
        <button className="btn" onClick={getLocation}>
          Get Location
        </button>
        <p id="location">Location:</p>
        <button className="btn" onClick={handleSubmit}>
          Sign up
        </button>
        {status && <p>{status}</p>}
      </div>
    </>
  );
}

export default App