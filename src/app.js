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
  background: #2e2e2e;
  border: 20px #2e2e2e solid;
`;

const apiKey = process.env.OPEN_WEATHER_API_KEY;

const getResponse = async (url) => {
  const weatherResponse = await fetch(url);
  return weatherResponse.json();
};

const App = () => {
  const [state, setState] = useState({
    location: "Toronto",
    fiveDayData: [],
    loading: false,
    selectedDay: {
      index: 0,
      data: {},
    },
  });

  const usePreviousLocation = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const getPrevious = usePreviousLocation({ location: state.location });

  const url = new URL(
    `${API_URL}?q=${state.location}&appid=${apiKey}&units=metric`
  );

  const fetchWeatherData = (location) => {
    if (!getPrevious) {
      setState({
        ...state,
        loading: true,
      });
    }

    const url = new URL(
      `${API_URL}?q=${location}&appid=${apiKey}&units=metric`
    );

    getResponse(url).then((apiResponse) => {
      if (apiResponse.cod !== "200") {
        if (apiResponse.cod === "404") {
          return setState({
            ...state,
            loading: false,
            location: getPrevious?.location,
          });
        }

        return setState({
          ...state,
          loading: false,
        });
      }

      const fiveDayData = parseAPIResponse(apiResponse);

      setState({
        ...state,
        fiveDayData,
        loading: false,
        location,
        selectedDay: {
          ...state.selectedDay,
          data: fiveDayData[0],
        },
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

  return (
    <AppContainer>
      <Header
        loading={state.loading}
        locationName={state.location}
        selectedDayData={state.selectedDay.data}
        fetchWeatherData={fetchWeatherData}
        url={url}
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
