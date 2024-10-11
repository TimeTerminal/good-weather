import React from "react";
import styled, { css } from "styled-components";
import { round } from "lodash";

import WeatherIcon from "../WeatherIcon";
import { RESPONSIVE_SIZES } from "../../constants";
import { createDate, getDayName } from "../../helpers";

const DayContainer = styled.button<DayContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  min-width: 150px;
  min-height: 230px;
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

  @media (max-width: 950px) {
    margin: 0;
    padding: 10px;
    min-width: 100px;
    min-height: auto;
    border-radius: 0;
    border-width: 0;

    &:not(:first-of-type) {
      border-width: 0 0 0 1px;
    }
  }

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    min-width: 95px;
    padding: 10px 5px;
  }
`;

const Day = styled.p`
  margin: 0;
  font-size: 2.1em;
  font-weight: normal;
  color: #f5f5f5;

  @media (max-width: ${RESPONSIVE_SIZES.TABLET}px) {
    font-size: 1.2em;
  }
`;

const Date = styled.p`
  margin: 0;
  font-size: 1.2em;
  font-weight: lighter;
  color: #f5f5f5;
`;

const Divider = styled.hr`
  width: 30%;
  height: 1px;
  max-width: 350px;
  background: linear-gradient(
    to right,
    rgba(243, 243, 243, 0.55),
    rgba(243, 243, 243, 0.6),
    rgba(243, 243, 243, 0.55)
  );
  border: none;

  @media (max-width: ${RESPONSIVE_SIZES.DESKTOP}px) {
    width: 80%;
  }
`;

const StyledIcon = styled(WeatherIcon)<WeatherIcon>`
  margin: 0 0 10px;
`;

const DayDetail = styled.span`
  display: inline-flex;
  font-size: 1.2em;
`;

const Text = styled.p`
  margin: 0;
  color: #efefef;
`;

const LightText = styled.p`
  margin: 0;
  font-weight: 200;
  color: #efefef;
`;

const SingleDay: React.FC<SingleDay> = ({
  dayData,
  id,
  isDarkTheme,
  selectedDayId,
  setSelectedDay,
  viewportWidth,
}) => {
  const { pop, tempHigh, tempLow, time, weatherCode } = dayData;
  const { date, day } = createDate(time, viewportWidth);

  return (
    <DayContainer
      $isDarkTheme={isDarkTheme}
      selected={selectedDayId === id}
      onClick={() => setSelectedDay(selectedDayId, id)}
    >
      <Day>{id === 0 ? "Today" : getDayName(day)}</Day>
      <Date>{date}</Date>
      <Divider />
      <StyledIcon weatherCode={weatherCode} />
      <DayDetail>
        <LightText>H:&nbsp;</LightText>
        <Text>{round(tempHigh)}&deg;</Text>
      </DayDetail>
      <DayDetail>
        <LightText>L:&nbsp;</LightText>
        <Text>{round(tempLow)}&deg;</Text>
      </DayDetail>
      {pop ? (
        <DayDetail>
          <LightText>POP:&nbsp;</LightText>
          <Text>{round(pop)}%</Text>
        </DayDetail>
      ) : (
        ""
      )}
    </DayContainer>
  );
};

export default SingleDay;
