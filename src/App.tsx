import React, { lazy, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Header from "./components/Header";
const Snapshot = lazy(() => import("./components/Snapshot"));
import MultiDay from "./components/FutureForecast/MultiDay";
import { API_URL, RESPONSIVE_SIZES } from "./constants";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Backdrop = styled.div<ThemableElement>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #4c4f72;
  background-image: linear-gradient(
    to bottom,
    ${({ $isDarkTheme }) =>
      $isDarkTheme ? "#001b6f 0%, #001432 100%" : "#07f, #005bb5"}
  );
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 860px;
  padding: 20px 0;

  @media (max-width: ${RESPONSIVE_SIZES.DESKTOP}px) {
    padding: 20px;
  }

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    padding: 15px;
  }
`;

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMetric, setIsMetric] = useState(true);
  const [searchValue, setSearchValue] = useState("Toronto");
  const [location, setLocation] = useState("Toronto");
  const [viewportWidth, setViewportWidth] = useState(window.outerWidth);
  const [state, setState] = useState<AppState>({
    error: false,
    fiveDayData: [],
    loading: false,
    selectedDay: {
      index: 0,
      data: {},
    },
  });

  const url = new URL(
    `${API_URL}?location=42.3478,-71.0466&apikey=${
      process.env.WEATHER_API_KEY
    }&units=${isMetric ? "metric" : "imperial"}`
  );

  // location=${searchValue}

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.outerWidth);
    };

    (window.visualViewport as VisualViewport).addEventListener(
      "resize",
      handleResize
    );

    return () => {
      (window.visualViewport as VisualViewport).removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /**
   * Retains a passed value to be used later for comparison purposes.
   * @param value The value to save
   * @returns The current version of that value
   */
  const usePreviousLocation = (value: {
    location: string;
  }): { location: string } => {
    const ref = useRef<object>();

    useEffect(() => {
      ref.current = value;
    });
    return ref.current as { location: string };
  };

  const getPrevious = usePreviousLocation({ location });

  /**
   * API response parser called by `fetchWeatherData` upon successful weather data being received.
   * @param returnedData Weather data returned by the tomorrow.io API
   * @returns Filtered daily weather data for 5 days
   */
  const parseAPIResponse = (returnedData: APIData): SingleDayData[] => {
    const filteredData: SingleDayData[] = returnedData.timelines.daily.map(
      ({ time, values }) => ({
        humidity: values.humidityAvg,
        pop: values.precipitationProbabilityAvg,
        tempApparent: values.temperatureApparentAvg,
        tempAvg: values.temperatureAvg,
        tempHigh: values.temperatureMax,
        tempLow: values.temperatureMin,
        time,
        weatherCode: values.weatherCodeMax,
        wind: values.windSpeedAvg,
      })
    );

    return filteredData;
  };

  /**
   * Fetches the weather data from the Open Weather Map API based on the set location and sets the app state based on the fetched data. Upon receiving an error, loading is stopped and `state.error` is set to `true`.
   */
  const fetchWeatherData: FetchWeatherData = async (event) => {
    event?.preventDefault();

    if (!getPrevious) {
      setState({
        ...state,
        loading: true,
      });
    }

    try {
      const aPIResponse = await fetch(url);

      if (!aPIResponse.ok) {
        throw new Error(`HTTP error. Status: ${aPIResponse.status}`);
      }

      const jsonData = await aPIResponse.json();
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
    } catch (error) {
      console.error(error);

      return setState({
        ...state,
        error: true,
        loading: false,
      });
    }
  };

  const setSelectedDay: SetSelectedDay = (
    currentIndex: number,
    newIndex: number
  ) => {
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
    <AppContainer>
      <Backdrop $isDarkTheme={isDarkTheme}>
        <Layout>
          <Header
            fetchWeatherData={fetchWeatherData}
            isDarkTheme={isDarkTheme}
            isError={state.error}
            isMetric={isMetric}
            locationName={location}
            setIsDarkTheme={setIsDarkTheme}
            setIsMetric={setIsMetric}
            setSearchValue={setSearchValue}
          />

          <Snapshot
            isDarkTheme={isDarkTheme}
            isMetric={isMetric}
            loading={state.loading}
            dayData={state.selectedDay.data as SingleDayData}
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
