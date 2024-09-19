import React from "react";
import styled, { css } from "styled-components";

import cloud from "/assets/images/cloud.svg";
import cloudDrizzle from "/assets/images/cloud-drizzle.svg";
import cloudLightning from "/assets/images/cloud-lightning.svg";
import cloudRain from "/assets/images/cloud-rain.svg";
import cloudSnow from "/assets/images/cloud-snow.svg";
import mist from "/assets/images/mist.svg";
import sun from "/assets/images/sun.svg";
import wind from "/assets/images/wind.svg";

const Icon = styled.img`
  width: ${({ $headerImage }) => ($headerImage ? "70px" : "55px")};
  margin: ${({ $headerImage }) => ($headerImage ? "0 15px 0 0" : "5px 0 20px")};
  background: none;
  transition: 1.5s ease;

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

const WeatherIcon = ({ description, headerImage, main }) => {
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
    />
  );
};

export default WeatherIcon;
