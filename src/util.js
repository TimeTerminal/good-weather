const formatDescription = (phrase) => {
  return phrase
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => ` ${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

const getDayName = (dayNum) => {
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

const getIconName = (description) => {
  switch (description) {
    case "Clear":
      return "sun";
    case "Clouds":
      return "cloud";
    case "Drizzle":
      return "cloudDrizzle";
    case "Rain":
      return "cloudRain";
    case "Snow":
      return "cloudSnow";
    case "Thunderstorm":
      return "cloudLightning";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Dust":
    case "Ash":
    case "Squall":
    case "Tornado":
      return "mist";
    default:
      return "sun";
  }
};

module.exports = {
  formatDescription,
  getDayName,
  getIconName,
};
