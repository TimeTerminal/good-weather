export const capitalizePhrase = (phrase) => {
  return phrase
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => ` ${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

export const formatTemperature = (temperature) => {
  return Math.round10(temperature.round);
};

export const getDayName = (dayNum) => {
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
    case 6:
      return "Sat";
  }
};

export const getWindScale = (windSpeed, isMetric = true) => {
  const windInKmPH = isMetric && (windSpeed / 1000) * 3600;

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
};
