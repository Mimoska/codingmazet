import "./App.css";
import { useState, useEffect } from "react";
import finan from "./finan.png";

function App() {
  const [color, setColor] = useState("white");

  const [cityInput, setCityInput] = useState("Sofia");

  const [cityData, setCityData] = useState(null);

  const toggleColor = () => {
    setColor(color === "white" ? "lightgreen" : "white");
  };

  useEffect(() => {
    getData(cityInput);
  }, [cityInput]);

  const getData = async (city) => {
    const params = new URLSearchParams();
    params.append("city", city);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const data = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population/cities",
      {
        method: "POST",
        headers: myHeaders,
        body: params,
      }
    );

    const response = await data.json();
    console.log(response);
    setCityData(response);
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);
  return (
    <div className="App" style={{ backgroundColor: color }}>
      <h1 className="ts">The Money Maze</h1>
      <button className="button" onClick={toggleColor}>
        COLOR
      </button>
      <h2 className="heading"> Financial literacy </h2>
      <p className="text">Blue</p>
      <p className="text">Red</p>
      <input type="text" onChange={(e) => setCityInput(e.target.value)} />
      <pre>
        {cityData?.msg} {cityData?.data?.populationCounts.pop()?.value}
      </pre>
      <h3 className="inf">
        Finance is a term for matters regarding the management, creation, and
        study of money and investments.{" "}
      </h3>
      <img src={finan} />
    </div>
  );
}

export default App;
