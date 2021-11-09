import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "./components/Header";
import DayColumns from "./components/DayColumns";
import { API_URL, DAYS_TO_SHOW } from "./constants";

const AppContainer = styled.div`
  margin: 20px;
`;

const apiKey = process.env.OPEN_WEATHER_API_KEY;

const getResponse = async (url) => {
  const weatherResponse = await fetch(url);
  return weatherResponse.json();
};

const App = () => {
  const [location, setLocation] = useState("Toronto");
  const [state, setState] = useState({
    fiveDayData: [],
    loading: false,
    selectedDay: {
      index: 0,
      data: {},
    },
  });
  const url = new URL(`${API_URL}?q=${location}&appid=${apiKey}`);

  const fetchWeatherData = (url) => {
    setState({
      ...state,
      loading: true,
    });

    getResponse(url).then((apiResponse) => {
      // TODO - check for errors: https://openweathermap.org/faq#error401
      const fiveDayData = parseAPIResponse(apiResponse);

      setState({
        ...state,
        fiveDayData,
        loading: false,
      });
    });
  };

  // Filter out the rest of the data and only retain 5-day data without the timestamp increments
  const parseAPIResponse = (returnedData) => {
    const filteredData = [];
    let currentDay = null;

    // Only set data once per day. Using a for loop to use break functionality
    for (let i = 0; i < returnedData.list.length; i++) {
      const tempDay = returnedData.list[i]?.dt_txt.substring(0, 10);
      if (currentDay !== tempDay) {
        currentDay = tempDay;
        filteredData.push(returnedData.list[i]);
      }

      if (filteredData.length === DAYS_TO_SHOW) {
        break;
      }
    }

    return filteredData;
  };

  const setSelectedDay = (index) => {};

  useEffect(() => fetchWeatherData(url), []);

  return (
    <AppContainer>
      <Header
        fetchWeatherData={fetchWeatherData}
        setLocation={setLocation}
        url={url}
        selectedDayData={state.selectedDay.data}
      />
      <DayColumns
        fiveDayData={state.fiveDayData}
        selectedDayId={state.selectedDay.index}
        setSelectedDay={setSelectedDay}
      />
    </AppContainer>
  );
};

export default App;
