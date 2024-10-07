import { KM_TO_MILES_MULTIPLIER, RESPONSIVE_SIZES } from "./constants";

/**
 * Capitalizes each word within a given phrase
 * @param phrase The phrase to capitalize
 * @returns The formatted phrase
 */
export const capitalizePhrase = (phrase: string) => {
  const [city, region] = phrase.split(",");

  const formattedCity = city
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      (_, $2, $3) => ` ${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());

  let output = formattedCity;

  if (region) {
    output += `, ${region.toUpperCase()}`;
  }

  return output;
};

// =====================
// === Date and time ===
// =====================
export const createDate = (
  apiDate: string,
  viewportWidth: number
): { date: string; day: number } => {
  const dateObj = new Date(apiDate);

  const day = dateObj.getDay();
  const date = dateObj.toLocaleString("en-US", {
    month: viewportWidth > RESPONSIVE_SIZES.MOBILE ? "short" : "2-digit",
    day: "numeric",
  });

  return { date, day };
};

// ===================
// === Temperature ===
// ===================
/**
 * Round a given floating-point temperature to the nearest integer
 * @param temperature
 * @returns Rounded integer
 */
export const formatTemperature = (temperature: number): number => {
  return Math.round(temperature);
};

export const getTemperatureUnits = (isMetric: boolean) =>
  `°${isMetric ? "C" : "F"}`;

/**
 * Returns the corresponding day name associated with its number in the week (starting at index 0 for Sunday)
 */
export const getDayName = (dayNum: number): string => {
  switch (dayNum) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    default:
      return "Sat";
  }
};

// ============
// === Wind ===
// ============
/**
 * Return the corresponding wind category for a given wind speed
 * @param windSpeed The speed to compare against
 * @param isMetric Used to check whether the passed wind speed is in Metric or Imperial units
 * @returns Wind category, eg. "Light breeze", "Strong gale", etc
 */
export const getWindSpeed = (windSpeed: number, isMetric: boolean): string => {
  const windInMetersPerSecond = isMetric
    ? windSpeed
    : windSpeed * KM_TO_MILES_MULTIPLIER;

  const units = isMetric ? "m/s" : "mph";

  return `${windInMetersPerSecond} ${units}`;
};

/**
 * Return the corresponding wind category for a given wind speed
 * @param windSpeed The speed to compare against
 * @param isMetric Used to check whether the passed wind speed is in Metric or Imperial units
 * @returns Wind category, eg. "Light breeze", "Strong gale", etc
 */
export const getWindCategory = (
  windSpeed: number,
  isMetric: boolean
): string => {
  const windInMetersPerSecond = isMetric
    ? windSpeed
    : windSpeed * KM_TO_MILES_MULTIPLIER;

  switch (true) {
    case windInMetersPerSecond <= 2:
      return "Calm";
    case windInMetersPerSecond > 2 && windInMetersPerSecond <= 6:
      return "Light air";
    case windInMetersPerSecond > 6 && windInMetersPerSecond <= 11:
      return "Light breeze";
    case windInMetersPerSecond > 11 && windInMetersPerSecond <= 19:
      return "Gentle breeze";
    case windInMetersPerSecond > 19 && windInMetersPerSecond <= 30:
      return "Moderate breeze";
    case windInMetersPerSecond > 30 && windInMetersPerSecond <= 39:
      return "Fresh breeze";
    case windInMetersPerSecond > 39 && windInMetersPerSecond <= 50:
      return "Strong breeze";
    case windInMetersPerSecond > 50 && windInMetersPerSecond <= 61:
      return "Moderate gale";
    case windInMetersPerSecond > 61 && windInMetersPerSecond <= 74:
      return "Fresh gale";
    case windInMetersPerSecond > 74 && windInMetersPerSecond <= 87:
      return "Strong gale";
    case windInMetersPerSecond > 87 && windInMetersPerSecond <= 102:
      return "Whole gale";
    case windInMetersPerSecond > 102 && windInMetersPerSecond <= 117:
      return "Storm";
    case windInMetersPerSecond > 117 && windInMetersPerSecond <= 1000:
      return "Hurricane";
  }

  return "";
};
