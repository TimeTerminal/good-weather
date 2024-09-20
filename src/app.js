import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import Header from "./components/Header";
import MultiDay from "./components/FutureForecast/MultiDay";
import { API_URL, DAYS_TO_SHOW } from "./constants";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  background: ${({ $isDarkTheme }) => ($isDarkTheme ? "#1a1a24" : "#75bfcc")};
  border: 2px ${({ $isDarkTheme }) => ($isDarkTheme ? "#2e2e2e" : "#f5f5f5")}
    solid;
`;

const Backdrop = styled.div`
  width: 100%;
  background-color: #4c4f72;
  background-image: radial-gradient(
    ellipse at bottom,
    ${({ $isDarkTheme }) =>
      $isDarkTheme
        ? css`
          #343853 0%,
          #2c2e43 10%,
          #20222f 30%,
          #1a1a24 50%`
        : css`
          #b7e2e8 0%,
          #98d4dc 10%,
          #7ac6d3 30%,
          #75bfcc 50%
          `}
  );
`;

const Layout = styled.div`
  width: 100%;
  padding: 20px 40px;

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMetric, setIsMetric] = useState(true);
  const [searchValue, setSearchValue] = useState("Toronto");
  const [location, setLocation] = useState("Toronto");
  const [viewportWidth, setViewportWidth] = useState(window.outerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.outerWidth);
    };

    window.visualViewport.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport.removeEventListener("resize", handleResize);
    };
  }, []);

  const [state, setState] = useState({
    error: false,
    fiveDayData: [],
    loading: false,
    selectedDay: {
      index: 0,
      data: {},
    },
  });

  const url = new URL(
    `${API_URL}?q=${searchValue}&appid=${
      process.env.OPEN_WEATHER_API_KEY
    }&units=${isMetric ? "metric" : "imperial"}`
  );

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

  const getPrevious = usePreviousLocation({ location });

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

  /**
   * Fetches the weather data from the Open Weather Map API based on a passed location and sets the app state based on the fetched data. Upon receiving an error, loading is stopped and `state.error` is set to `true`.
   * @param {string} location eg. "Moscow", "New York", "Hawaii", etc
   */
  const fetchWeatherData = async (event, newLocation = null) => {
    event?.preventDefault();

    if (!getPrevious) {
      setState({
        ...state,
        loading: true,
      });
    }

    const openWeatherResponse = await fetch(url);
    const jsonData = await openWeatherResponse.json();

    if (jsonData.cod !== "200") {
      return setState({
        ...state,
        error: true,
        loading: false,
      });
    }

    const fiveDayData = parseAPIResponse(jsonData);

    setLocation(searchValue);

    setState({
      ...state,
      error: false,
      fiveDayData,
      loading: false,
      selectedDay: {
        index: 0,
        data: fiveDayData[0],
      },
    });
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

  useEffect(() => {
    fetchWeatherData();
  }, [isMetric]);

  return (
    <AppContainer $isDarkTheme={isDarkTheme}>
      <Backdrop $isDarkTheme={isDarkTheme}>
        <Layout>
          <Header
            isDarkTheme={isDarkTheme}
            fetchWeatherData={fetchWeatherData}
            isMetric={isMetric}
            isError={state.error}
            loading={state.loading}
            locationName={location}
            selectedDayData={state.selectedDay.data}
            setIsDarkTheme={setIsDarkTheme}
            setIsMetric={setIsMetric}
            setSearchValue={setSearchValue}
          />
          <MultiDay
            isDarkTheme={isDarkTheme}
            fiveDayData={state.fiveDayData}
            loading={state.loading}
            selectedDayId={state.selectedDay.index}
            setSelectedDay={setSelectedDay}
            viewportWidth={viewportWidth}
          />
        </Layout>
      </Backdrop>
    </AppContainer>
  );
};

export default App;
