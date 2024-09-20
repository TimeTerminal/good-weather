import React from "react";
import styled, { css } from "styled-components";
import { round } from "lodash";

import WeatherIcon from "../WeatherIcon";
import { capitalizePhrase, getDayName } from "../../helpers";

const DayContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  min-width: 150px;
  margin: 10px 0 0;
  padding: 20px 0 15px;
  background: none;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  transition: margin 0.15s ease-out, background 0.15s ease;

  ${({ $isDarkTheme, selected }) =>
    selected
      ? css`
          margin-top: 0;
          background: radial-gradient(
            ellipse at top,
            ${$isDarkTheme
              ? "#4c4f72 10%, #343853 80%"
              : "#7ac6d3 10%, #67979f 90%"}
          );
        `
      : css`
          &:hover {
            margin-top: 0;
            background: radial-gradient(
              ellipse at top,
              ${$isDarkTheme
                ? "#4c4f72 10%, #343853 80%"
                : "#7ac6d3 10%, #67979f 90%"}
            );
          }
        `}
`;

const Title = styled.h3`
  margin: 0 0 5px;
  font-size: 28px;
  font-weight: normal;
  color: #f5f5f5;
`;

const Subtitle = styled.h4`
  margin: 0 0 10px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#9e9e9e" : "#f5f5f5")};
  font-size: 1.5em;
  font-weight: lighter;
`;

const Icon = styled(WeatherIcon)`
  width: 55px;
  margin: 5px 0 20px;
  background: none;
`;

const Text = styled.p`
  margin: 0 0 5px;
  font-size: 1.2em;
  color: #efefef;
`;

const SingleDay = ({
  day,
  date,
  description,
  id,
  isDarkTheme,
  main,
  precipitationProbability,
  selectedDayId,
  setSelectedDay,
  tempDayLow,
  tempDayHigh,
}) => {
  const formattedDescription = capitalizePhrase(description);

  return (
    <DayContainer
      $isDarkTheme={isDarkTheme}
      selected={selectedDayId === id}
      onClick={() => setSelectedDay(selectedDayId, id)}
    >
      <Title>{getDayName(day)}</Title>
      <Subtitle $darkTheme={isDarkTheme}>{date}</Subtitle>
      <Icon main={main} description={formattedDescription} />
      <Text>Low: {round(tempDayLow)}&#176;</Text>
      <Text>High: {round(tempDayHigh)}&#176;</Text>
      <Text>POP: {precipitationProbability * 100}%</Text>
    </DayContainer>
  );
};

export default SingleDay;
