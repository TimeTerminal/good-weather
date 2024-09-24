import React from "react";
import styled, { css } from "styled-components";

import cloud from "../images/icons/cloud.svg";
import cloudDrizzle from "../images/icons/cloud-drizzle.svg";
import cloudLightning from "../images/icons/cloud-lightning.svg";
import cloudRain from "../images/icons/cloud-rain.svg";
import cloudSnow from "../images/icons/cloud-snow.svg";
import mist from "../images/icons/mist.svg";
import sun from "../images/icons/sun.svg";
import wind from "../images/icons/wind.svg";

const Icon = styled.img<StyledWeatherIcon>`
  width: ${({ $isHeaderImage }) => ($isHeaderImage ? "70px" : "55px")};
  margin: ${({ $isHeaderImage }) =>
    $isHeaderImage ? "0 15px 0 0" : "5px 0 20px"};
  background: none;
  transition: 0.5s ease;

  ${({ $isHeaderImage, $iconName }) =>
    $iconName &&
    css`
      filter: drop-shadow(
        0 ${$isHeaderImage ? "0" : "10px"} 10px
          rgb(${handleIconColour($iconName)}, 0.8)
      );
    `}
`;

const handleIconColour = (main: string) => {
  switch (main) {
    case "Clear":
    case "Thunderstorm":
      return "252, 213, 115";
    case "Clouds":
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
    case "Snow":
      return "222, 223, 222";
    case "Drizzle":
    case "Rain":
      return "54, 133, 242";
    default:
      return "252, 213, 115";
  }
};

const getIconName = (description: string) => {
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

const WeatherIcon: React.FC<WeatherIcon> = ({
  description,
  isHeaderImage,
  iconName,
  ...props
}) => {
  const iconDict = {
    sun,
    cloud,
    cloudDrizzle,
    cloudRain,
    cloudSnow,
    cloudLightning,
    mist,
    wind,
  };
  const weatherIconPath = iconDict[getIconName(iconName)];

  return (
    <Icon
      src={weatherIconPath as string}
      alt={`Weather icon - ${description}`}
      $iconName={iconName}
      $isHeaderImage={isHeaderImage ?? false}
      {...props}
    />
  );
};

export default WeatherIcon;
