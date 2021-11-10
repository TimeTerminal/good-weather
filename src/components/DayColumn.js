import React from "react";
import styled, { css } from "styled-components";
import _ from "lodash";

import WeatherIcon from "./WeatherIcon";
import { capitalizePhrase, getDayName, getIconName } from "../util";

const DayColumnContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  min-width: 200px;
  margin: 10px 0 0;
  padding: 20px 0 15px;
  background: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: margin 0.15s ease-out, background 0.15s ease;

  ${(props) =>
    props.selected &&
    css`
      margin-top: 0;
      background: radial-gradient(ellipse at top, #4c4f72 10%, #343853 80%);
    `}

  ${(props) =>
    !props.selected &&
    css`
      &:hover {
        margin-top: 0;
        background: radial-gradient(ellipse at top, #4c4f72 10%, #343853 80%);
      }
    `}
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

const Icon = styled(WeatherIcon)`
  width: 55px;
  margin: 5px 0 20px;
  background: none;
`;

const Text = styled.p`
  margin: 0 0 5px;
  color: #efefef;
`;

const DayColumn = (props) => {
  const { id, selectedDayId } = props;
  const formattedDescription = capitalizePhrase(props.description);

  return (
    <DayColumnContainer
      selected={selectedDayId === id}
      onClick={() => props.setSelectedDay(selectedDayId, id)}
    >
      <Title>{getDayName(props.day)}</Title>
      <Subtitle>{props.date}</Subtitle>
      <Icon main={props.main} description={formattedDescription} />
      <Text>Low: {_.round(props.tempDayLow)}&#176;</Text>
      <Text>High: {_.round(props.tempDayHigh)}&#176;</Text>
    </DayColumnContainer>
  );
};

export default DayColumn;
