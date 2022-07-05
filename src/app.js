import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Header from "./components/Header";
import DayColumns from "./components/DayColumns";
import { API_URL, DAYS_TO_SHOW } from "./constants";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  padding-bottom: 30px;
  background: ${(props) => (props.darkTheme ? "#1a1a24" : "#75bfcc")};
  border: 20px ${(props) => (props.darkTheme ? "#2e2e2e" : "#f5f5f5")} solid;
`;

const apiKey = process.env.OPEN_WEATHER_API_KEY;

const getResponse = async (url) => {
  const weatherResponse = await fetch(url);
  return weatherResponse.json();
};

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isMetric, setIsMetric] = useState(true);

  const [state, setState] = useState({
    error: false,
    fiveDayData: [],
    loading: false,
    location: "Toronto",
    selectedDay: {
      index: 0,
      data: {},
    },
  });

  /**
   * Retains a passed value to be used later for comparison purposes.
   * @param {any} value The value to save
   * @returns {any} The current version of that value
   */
  const usePreviousLocation = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const getPrevious = usePreviousLocation({ location: state.location });

  /**
   * Fetches the weather data from the Open Weather Map API based on a passed location and sets the app state based on the fetched data. Upon receiving an error, loading is stopped and `state.error` is set to `true`.
   * @param {string} location eg. "Moscow", "New York", "Hawaii", etc
   */
  const fetchWeatherData = (location) => {
    if (!getPrevious) {
      setState({
        ...state,
        loading: true,
      });
    }

    const url = formURL(location);

    getResponse(url).then((apiResponse) => {
      if (apiResponse.cod !== "200") {
        if (apiResponse.cod === "404") {
          return setState({
            ...state,
            error: true,
            loading: false,
            location: getPrevious?.location,
          });
        }

        return setState({
          ...state,
          error: true,
          loading: false,
        });
      }

      const fiveDayData = parseAPIResponse(apiResponse);

      setState({
        ...state,
        error: false,
        fiveDayData,
        loading: false,
        location,
        selectedDay: {
          index: 0,
          data: fiveDayData[0],
        },
      });
    });
  };

  /**
   * API response parser called by `fetchWeatherData` upon successful weather data being received.
   * @param {object} returnedData Weather data returned by the Open Weather Map API
   * @returns {object} Filtered weather data belonging to the first timestamp from each day
   */
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

  const formURL = (location) => {
    return new URL(
      `${API_URL}?q=${location}&appid=${apiKey}&units=${
        isMetric ? "metric" : "imperial"
      }`
    );
  };

  const setSelectedDay = (currentIndex, newIndex) => {
    if (currentIndex !== newIndex) {
      setState({
        ...state,
        selectedDay: {
          index: newIndex,
          data: state.fiveDayData[newIndex],
        },
      });
    }
  };

  useEffect(() => fetchWeatherData(state.location), []);
  useEffect(() => fetchWeatherData(state.location), [isMetric]);
  const url = formURL(state.location);

  return (
    <AppContainer darkTheme={darkTheme}>
      <Header
        darkTheme={darkTheme}
        fetchWeatherData={fetchWeatherData}
        isMetric={isMetric}
        isError={state.error}
        loading={state.loading}
        locationName={state.location}
        selectedDayData={state.selectedDay.data}
        setDarkTheme={setDarkTheme}
        setIsMetric={setIsMetric}
        url={url}
      />
      
      <DayColumns
        darkTheme={darkTheme}
        fiveDayData={state.fiveDayData}
        loading={state.loading}
        selectedDayId={state.selectedDay.index}
        setSelectedDay={setSelectedDay}
      />
    </AppContainer>
  );
};

export default App;
