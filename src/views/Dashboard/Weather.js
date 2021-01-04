import ReactWeather, { useOpenWeather } from "react-open-weather";
import React from "react";

export default function App() {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "da43e5a05add0280baaa518281c26cba",
    lat: "49.403307",
    lon: "6.973625",
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });
  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Eppelborn"
      unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      showForecast
    />
  );
}
