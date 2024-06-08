import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Box,
  IconButton,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WeatherCard from "./WeatherCard";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Today from "./Today";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Mumbai");
  const [searchInput, setSearchInput] = useState("");

  const fetchWeather = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(currentWeatherUrl),
        axios.get(forecastWeatherUrl)
      ]);

      setCurrentWeather(currentResponse.data);
      setForecast(forecastResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleSearch = () => {
    setCity(searchInput);
  };

  const getDailyForecasts = () => {
    const dailyForecasts = [];
    const uniqueDays = new Set();

    forecast.list.forEach((item) => {
      const date = new Date(item.dt_txt).getDate();
      if (!uniqueDays.has(date) && dailyForecasts.length < 5) {
        uniqueDays.add(date);
        dailyForecasts.push(item);
      }
    });

    return dailyForecasts;
  };

  const get24HourForecast = () => {
    return forecast.list.slice(0, 8);
  };

  const getChartData = () => {
    const labels = get24HourForecast().map((item) => {
      return new Date(item.dt_txt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
    });

    const data = get24HourForecast().map((item) => item.main.temp);

    return {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };
  };

  if (loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20%" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      style={{
        padding: "2rem 4.5rem 6rem 4.5rem",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "100%"
      }}>
      {/* Navigation bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}>
        <Typography
          variant="h5"
          component="div">
          <WbSunnyIcon style={{ verticalAlign: "middle", marginRight: 8 }} />{" "}
          weather
        </Typography>
        <Box
          display="flex"
          alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Search city"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { borderRadius: 8, paddingRight: 0 }
            }}
            color=""
            // focused
          />
          <IconButton
            color="primary"
            onClick={handleSearch}
            style={{ marginLeft: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Typography
        variant="h4"
        gutterBottom
        mt={3.5}>
        Today Overview
      </Typography>

      {/* Overview */}
      <Grid
        container
        spacing={2}
        mt={2.5}>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: 15,
              border: "1.5px solid",
              borderColor: "primary.main"
            }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={255}>
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                alt="image"
                style={{ color: "primary.main" }}
              />
            </Box>
            <Typography variant="h3">{currentWeather.main.temp}°C</Typography>
            <Typography
              variant="h6"
              gutterBottom>
              {currentWeather.weather[0].main}
            </Typography>
            <Typography variant="subtitle1">{currentWeather.name}</Typography>
            <Typography variant="subtitle2">
              {new Date().toDateString()}
            </Typography>
          </Paper>
        </Grid>

        {/* Graph */}

        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          maxHeight={460}>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: 15,
              height: "100%"
            }}>
            <Line data={getChartData()} />
          </Paper>
        </Grid>

        {/* Today's data */}
        <Grid
          container
          mt={4}
          spacing={2}
          ml={0.5}>
          <Today
            value={currentWeather.wind.speed}
            unit="km/h"
            name="Wind Speed"
            icon_name="wind"
          />
          <Today
            value={currentWeather.main.humidity}
            unit="%"
            name="Humidity"
            icon_name="humidity"
          />
          <Today
            value={currentWeather.main.pressure}
            unit="hPa"
            name="Pressure"
            icon_name="pressure"
          />
          <Today
            value={currentWeather.visibility / 1000}
            unit="km"
            name="Visibility"
            icon_name="visibility"
          />
          <Today
            value={new Date(
              currentWeather.sys.sunset * 1000
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
            unit=""
            name="Sunrise"
            icon_name="sunrise"
          />
          <Today
            value={new Date(
              currentWeather.sys.sunrise * 1000
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
            unit=""
            name="Sunset"
            icon_name="sunset"
          />
        </Grid>
      </Grid>

      <Typography
        variant="h4"
        gutterBottom
        mt={6}
        mb={4}>
        5-Day Forecast
      </Typography>

      {/* 5-Day Forecast */}

      <Grid
        container
        spacing={2}>
        {getDailyForecasts().map((forecast) => (
          <Grid
            item
            key={forecast.dt}
            xs={12}
            sm={6}
            md={2.4}>
            <WeatherCard forecast={forecast} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;