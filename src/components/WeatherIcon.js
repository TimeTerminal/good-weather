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

const Icon = styled.img`
  width: ${({ $headerImage }) => ($headerImage ? "70px" : "55px")};
  margin: ${({ $headerImage }) => ($headerImage ? "0 15px 0 0" : "5px 0 20px")};
  background: none;
  transition: 0.5s ease;

  ${({ $headerImage, $main }) =>
    $main &&
    css`
      filter: drop-shadow(
        0 ${$headerImage ? "0" : "10px"} 10px
          rgb(${handleIconColour($main)}, 0.8)
      );
    `}
`;

const handleIconColour = (main) => {
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

const WeatherIcon = ({ description, headerImage, main, ...props }) => {
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
  const weatherIconPath = iconDict[getIconName(main)];

  return (
    <Icon
      src={weatherIconPath}
      alt={`Weather icon - ${description}`}
      $main={main}
      $headerImage={headerImage}
      {...props}
    />
  );
};

export default WeatherIcon;
