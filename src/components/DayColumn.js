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
  transition: 0.2s ease-out;

  &:hover {
    transform: translateY(-10px);
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

const Icon = styled.img`
  width: 70px;
  height: 70px;
  margin: 5px 0 10px;
`;

/*
  ${(props) =>
    props.iconPath &&
    css`
      background: url(${props.iconPath}) no-repeat;
      background-size: cover;
    `}
*/

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
      />
      <Subtitle>{formattedDescription}</Subtitle>
      <Text>Low: {dayLow}</Text>
      <Text>High: {dayHigh}</Text>
    </DayColumnContainer>
  );
};

export default DayColumn;
