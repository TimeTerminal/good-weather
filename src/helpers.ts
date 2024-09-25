import {
  HOURS_TO_SECONDS_MULTIPLIER,
  METER_TO_KM_MULTIPLIER,
  KM_TO_MILES_MULTIPLIER,
} from "./constants";

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

/**
 * Round a given floating-point temperature to the nearest integer
 * @param temperature
 * @returns Rounded integer
 */
export const formatTemperature = (temperature: number): number => {
  return Math.round(temperature);
};

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

export const getTemperatureUnits = (isMetric: boolean) => `°${isMetric ? "C" : "F"}`;

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
  const windInKmPH = isMetric
    ? windSpeed * METER_TO_KM_MULTIPLIER * HOURS_TO_SECONDS_MULTIPLIER
    : windSpeed * KM_TO_MILES_MULTIPLIER;

  switch (true) {
    case windInKmPH <= 2:
      return "Calm";
    case windInKmPH > 2 && windInKmPH <= 6:
      return "Light air";
    case windInKmPH > 6 && windInKmPH <= 11:
      return "Light breeze";
    case windInKmPH > 11 && windInKmPH <= 19:
      return "Gentle breeze";
    case windInKmPH > 19 && windInKmPH <= 30:
      return "Moderate breeze";
    case windInKmPH > 30 && windInKmPH <= 39:
      return "Fresh breeze";
    case windInKmPH > 39 && windInKmPH <= 50:
      return "Strong breeze";
    case windInKmPH > 50 && windInKmPH <= 61:
      return "Moderate gale";
    case windInKmPH > 61 && windInKmPH <= 74:
      return "Fresh gale";
    case windInKmPH > 74 && windInKmPH <= 87:
      return "Strong gale";
    case windInKmPH > 87 && windInKmPH <= 102:
      return "Whole gale";
    case windInKmPH > 102 && windInKmPH <= 117:
      return "Storm";
    case windInKmPH > 117 && windInKmPH <= 1000:
      return "Hurricane";
  }

  return "";
};
