import React, { lazy, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Header from "./components/Header";
const Snapshot = lazy(() => import('./components/Snapshot'));
import MultiDay from "./components/FutureForecast/MultiDay";
import { API_URL, DAYS_TO_SHOW, RESPONSIVE_SIZES } from "./constants";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Backdrop = styled.div<ThemableElement>`
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
  padding: 20px 40px;

  @media (max-width: ${RESPONSIVE_SIZES.TABLET}px) {
    padding: 20px 20px;
  }

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    padding: 20px 10px;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: 0.5px solid #f5f5f5;
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
    `${API_URL}?q=${searchValue}&appid=${
      process.env.OPEN_WEATHER_API_KEY
    }&units=${isMetric ? "metric" : "imperial"}`
  );

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
   * @param returnedData Weather data returned by the Open Weather Map API
   * @returns Filtered weather data belonging to the first timestamp from each day
   */
  const parseAPIResponse = (returnedData: {
    list: SingleDayData[];
  }): SingleDayData[] => {
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

          <Divider />

          <Snapshot
            isDarkTheme={isDarkTheme}
            isMetric={isMetric}
            loading={state.loading}
            selectedDayData={state.selectedDay.data as SingleDayData}
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
