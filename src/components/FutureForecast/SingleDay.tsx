import React from "react";
import styled, { css } from "styled-components";
import { round } from "lodash";

import { RESPONSIVE_SIZES } from "../../constants";
import WeatherIcon from "../WeatherIcon";
import { capitalizePhrase, getDayName } from "../../helpers";

const DayContainer = styled.button<DayContainer>`
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

  &:hover {
    margin-top: 0;
    background: linear-gradient(
      to bottom,
      ${({ $isDarkTheme }) =>
        $isDarkTheme ? "#005bc1 0%, #004186 100%" : "#032045 0%, #011127 100%"}
    );
  }

  ${({ $isDarkTheme, selected }) =>
    selected &&
    css`
      margin-top: 0;
      background: linear-gradient(
        to bottom,
        ${$isDarkTheme
          ? "#005bc1 0%, #004186 100%"
          : "#032045 0%, #011127 100%"}
      );
    `}

  @media (max-width: ${RESPONSIVE_SIZES.DESKTOP}px) {
    margin: 0;
    padding: 10px;
    min-width: 100px;
    border-radius: 0;
    border-width: 0;

    &:not(:first-of-type) {
      border-width: 0 0 0 1px;
    }
  }
`;

const Title = styled.h3`
  margin: 0 0 5px;
  font-size: 28px;
  font-weight: normal;
  color: #f5f5f5;
`;

const Subtitle = styled.h4<ThemableElement>`
  margin: 0 0 10px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#9e9e9e" : "#f5f5f5")};
  font-size: 1.5em;
  font-weight: lighter;
`;

const Icon = styled(WeatherIcon)<WeatherIcon>`
  width: 4em;

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    width: 2em;
  }
`;

const Text = styled.p`
  margin: 0 0 5px;
  font-size: 1.2em;
  color: #efefef;
`;

const SingleDay: React.FC<SingleDay> = ({
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
      <Subtitle $isDarkTheme={isDarkTheme}>{date}</Subtitle>
      <Icon iconName={main} description={formattedDescription} />
      <Text>Low: {round(tempDayLow)}&#176;</Text>
      <Text>High: {round(tempDayHigh)}&#176;</Text>
      <Text>POP: {round(precipitationProbability * 100)}%</Text>
    </DayContainer>
  );
};

export default SingleDay;
