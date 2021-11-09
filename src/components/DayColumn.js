import React from "react";
import styled, { css } from "styled-components";

import { formatDescription, getDayName, getIconName } from "../util";
import cloud from "/assets/images/cloud.svg";
import cloudDrizzle from "/assets/images/cloud-drizzle.svg";
import cloudLightning from "/assets/images/cloud-lightning.svg";
import cloudRain from "/assets/images/cloud-rain.svg";
import cloudSnow from "/assets/images/cloud-snow.svg";
import mist from "/assets/images/mist.svg";
import sun from "/assets/images/sun.svg";
import wind from "/assets/images/wind.svg";

const DayColumnContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  min-width: 200px;
  margin: 10px 0;
  padding: 20px 0 15px;
  background: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: margin 0.2s ease-out, background 0.1s ease-in;

  &:hover {
    margin-top: 0;
    background: radial-gradient(ellipse at top, #4c4f72 10%, #343853 80%);
  }
  &:active {
    margin-top: 0;
  }
`;

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: normal;
  color: #f5f5f5;
`;

const Subtitle = styled.h4`
  margin: 0 0 10px;
  color: #9e9e9e;
  font-size: 18px;
  font-weight: normal;
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
      return "#fff";
  }
};

const Icon = styled.img`
  width: 55px;
  margin: 5px 0 20px;
  background: none;

  ${(props) =>
    props.main &&
    css`
      filter: drop-shadow(
        0 10px 10px rgb(${handleIconColour(props.main)}, 0.8)
      );
    `}
`;

const Text = styled.p`
  margin: 0 0 5px;
  color: #efefef;
`;

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

const DayColumn = (props) => {
  const { date, day, dayHigh, dayLow, description, main } = props;
  const weatherIconPath = iconDict[getIconName(main)];
  const formattedDescription = formatDescription(description);

  return (
    <DayColumnContainer>
      <Title>{getDayName(day)}</Title>
      <Subtitle>{date}</Subtitle>
      <Icon
        src={weatherIconPath}
        alt={`Weather icon - ${formattedDescription}`}
        main={main}
      />
      <Subtitle>{formattedDescription}</Subtitle>
      <Text>Low: {dayLow}</Text>
      <Text>High: {dayHigh}</Text>
    </DayColumnContainer>
  );
};

export default DayColumn;
