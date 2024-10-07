declare module "*.svg" {
  import * as React from "react";
  const content:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | string;
  export default content;
}

// ==================
// === Components ===
// ==================
type Header = {
  fetchWeatherData: FetchWeatherData;
  isDarkTheme: boolean;
  isError: boolean;
  isMetric: boolean;
  locationName: string;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMetric: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

type Icon = {
  iconColor?: string;
  iconName: string;
};

type Snapshot = {
  isDarkTheme: boolean;
  isMetric: boolean;
  loading: boolean;
  dayData: SingleDayData;
};

type MultiDay = {
  loading: boolean;
  isDarkTheme: boolean;
  fiveDayData: SingleDayData[];
  selectedDayId: number;
  setSelectedDay: SetSelectedDay;
  viewportWidth: number;
};

type SingleDay = {
  dayData: SingleDayData;
  id: number;
  isDarkTheme: boolean;
  key: string;
  selectedDayId: number;
  setSelectedDay: SetSelectedDay;
  viewportWidth: number;
};

type WeatherIcon = {
  isHeaderImage?: boolean;
  weatherCode: number;
};

// ===================
// === React State ===
// ===================
type AppState = {
  error: boolean;
  fiveDayData: [] | SingleDayData[];
  loading: boolean;
  selectedDay: {
    index: number;
    data: {} | SingleDayData;
  };
};

// =================
// === Functions ===
// =================
type FetchWeatherData = (event?: React.FormEvent<HTMLFormElement>) => {};
type SetSelectedDay = (currentIndex: number, newIndex: number) => void;

interface APIData {
  location: {};
  timelines: {
    daily: {
      values: {
        humidityAvg: number;
        precipitationProbabilityAvg: number;
        temperatureApparentAvg: number;
        temperatureAvg: number;
        temperatureMax: number;
        temperatureMin: number;
        windSpeedAvg: number;
        weatherCodeMax: number;
      };
      time: string;
    }[];
  };
}

interface SingleDayData {
  pop: number;
  humidity: number;
  tempApparent: number;
  tempAvg: number;
  tempHigh: number;
  tempLow: number;
  weatherCode: number;
  wind: number;
  time: string;
}

interface SelectedDayData {
  main: { temp: number; feels_like: number; humidity: number };
  weather: { main: {}; description: string }[];
  wind: { speed: number };
  pop: number;
}

// =========================
// === Styled Components ===
// =========================
interface ThemableElement {
  readonly $isDarkTheme: boolean;
}

interface ErrorText {
  readonly $isError: boolean;
}

interface StyledIcon {
  readonly $iconColor: string;
}

interface StyledWeatherIcon {
  readonly $isHeaderImage: boolean;
  readonly $iconColor: string;
}

interface DayContainer {
  readonly $isDarkTheme: boolean;
  readonly selected: boolean;
}
