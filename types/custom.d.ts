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

type Snapshot = {
  isDarkTheme: boolean;
  isMetric: boolean;
  loading: boolean;
  selectedDayData: SingleDayData;
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
  day: number;
  date: string;
  description: string;
  id: number;
  isDarkTheme: boolean;
  key: string;
  main: string;
  precipitationProbability: number;
  selectedDayId: number;
  setSelectedDay: SetSelectedDay;
  tempDayLow: number;
  tempDayHigh: number;
};

type WeatherIcon = {
  description: string;
  isHeaderImage?: boolean;
  iconName: string;
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

interface SingleDayData {
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  clouds: {};
  pop: number;
  visibility: number;
  wind: { speed: number };
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

interface StyledWeatherIcon {
  readonly $isHeaderImage: boolean;
  readonly $iconColor: string;
}

interface DayContainer {
  readonly $isDarkTheme: boolean;
  readonly selected: boolean;
}
