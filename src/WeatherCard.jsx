import React from "react";
import { Paper, Typography } from "@mui/material";

const WeatherCard = ({ forecast }) => {
  const { dt_txt, main, weather } = forecast;
  const date = new Date(dt_txt);

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        borderRadius: 15,
        textAlign: "center"
      }}>
      <Typography variant="h6">
        {date.toLocaleDateString("en-US", {
          weekday: "short"
        })}
      </Typography>
      <Typography variant="subtitle1">
        {date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        })}
      </Typography>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt="weather icon"
        style={{ margin: "10px 0" }}
      />
      <Typography variant="h5">{Number(main.temp.toFixed(1))}°C</Typography>
      <Typography
        variant="subtitle2"
        style={{ textTransform: "capitalize" }}>
        {weather[0].description}
      </Typography>
    </Paper>
  );
};

export default WeatherCard;
