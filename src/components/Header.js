import React, { useState } from "react";
import styled, { css } from "styled-components";
import _ from "lodash";

import WeatherIcon from "./WeatherIcon";
import { capitalizePhrase, getWindScale } from "../util";
import search from "/assets/images/search.svg";
import moon from "/assets/images/moon.svg";
import sun from "/assets/images/sun.svg";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
  background-color: #4c4f72;
  background-image: radial-gradient(
    ellipse at bottom,
    ${(props) =>
      props.darkTheme
        ? css`
          #343853 0%,
          #2c2e43 10%,
          #20222f 30%,
          #1a1a24 50%`
        : css`
          #b7e2e8 0%,
          #98d4dc 10%,
          #7ac6d3 30%,
          #75bfcc 50%
          `}
  );
  border-radius: 10px 10px 0 0;
  transition: all 0.3s ease;
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  padding: 30px 50px 5px;
`;

const WeatherDataContainer = styled.div`
  display: grid;
  grid-template: repeat(3, 0.5fr) / 33% 33% 33%;
  padding: 10px 50px;
`;
const TopLeft = styled.span`
  display: flex;
  align-items: center;
  grid-column: 1 / 2;
  grid-row: 1;
  font-size: 1.4em;
`;
const TopRight = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-column: 3 / 3;
  grid-row: 1;
`;
const Center = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / 4;
  grid-row: 2;
`;
const Bottom = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 1 / 4;
  grid-row: 3;
  margin-top: 10px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: 0.15s ease-out;

  &:hover {
    background: radial-gradient(
      ellipse at top,
      ${(props) =>
        props.darkTheme
          ? "#4c4f72 10%, #343853 80%"
          : "#7ac6d3 10%,#67979f 90%"}
    );
  }
`;
const SearchButton = styled(StyledButton)`
  border-radius: 0 10px 10px 0;
`;
const MeasurementUnitToggleButton = styled(StyledButton)`
  margin-right: 10px;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.3em;

  ${(props) => props.darkTheme && `border: 1px solid #9e9e9e;`}
`;
const DarkModeToggleButton = styled(StyledButton)`
  width: 40px;
  border-radius: 10px;

  ${(props) => props.darkTheme && `border: 1px solid #9e9e9e;`}
`;

const Title = styled.h3`
  margin: 0;
  color: ${(props) => (props.darkTheme ? "#c2dbfa" : "#fdd87d")};
  font-size: 5em;
  font-weight: bold;
  line-height: 1;
`;

const Subtitle = styled.h4`
  margin: 0 0 10px;
  font-size: 1.2em;
  font-weight: normal;
`;

const Input = styled.input`
  padding: 4px 10px;
  color: #1a1a24;
  font-size: 14px;
  background-color: #f5f5f5;
  border: 1px solid white;
  border-radius: 10px 0 0 10px;
  transition: 0.15s ease-out;
`;

const Text = styled.p`
  margin: 8px 0 0;
  color: ${(props) => (props.darkTheme ? "#9e9e9e" : "#fffffd")};
  font-size: 1.1em;
  line-height: 1.3em;
  text-decoration: none;
`;

const ErrorText = styled.p`
  display: flex;
  justify-content: center;
  margin: 0;
  opacity: 0;
  transform: scaleY(0);
  transition: transform 0.1s ease, opacity 0.4s ease;

  ${(props) =>
    props.isError &&
    css`
      opacity: 1;
      transform: scaleY(1);
    `}
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 1px;
  border: none;
  background: #fff;
`;

const Image = styled(WeatherIcon)``;

const Header = (props) => {
  const [searchValue, setSearchValue] = useState({});

  const formattedDescription = props.selectedDayData.weather
    ? capitalizePhrase(props.selectedDayData.weather[0].description)
    : "";

  const temperature = props.selectedDayData.main
    ? props.selectedDayData.main.temp
    : "";

  const main = props.selectedDayData.weather
    ? props.selectedDayData.weather[0].main
    : null;

  return (
    <HeaderContainer darkTheme={props.darkTheme}>
      <FormContainer onSubmit={(e) => e.preventDefault()}>
        <Input
          placeholder="Search Locations"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton
          darkTheme={props.darkTheme}
          disabled={!searchValue.length}
          onClick={() => {
            props.fetchWeatherData(searchValue);
          }}
          type="submit"
        >
          <img src={search} alt="Search icon" />
        </SearchButton>
      </FormContainer>
      <ErrorText isError={props.isError}>
        Please select a different location.
      </ErrorText>

      <HorizontalRule />

      <WeatherDataContainer>
        <TopLeft>{capitalizePhrase(props.locationName)}</TopLeft>
        <TopRight>
          <MeasurementUnitToggleButton
            onClick={() => {
              props.setIsMetric(!props.isMetric);
            }}
            darkTheme={props.darkTheme}
          >
            &#176;{props.isMetric ? "C" : "F"}
          </MeasurementUnitToggleButton>
          <DarkModeToggleButton
            onClick={() => {
              props.setDarkTheme(!props.darkTheme);
            }}
            darkTheme={props.darkTheme}
          >
            <img src={props.darkTheme ? sun : moon} alt="Toggle dark mode - moon icon" />
          </DarkModeToggleButton>
        </TopRight>
        {!props.loading && (
          <>
            <Center>
              <Image
                main={main}
                headerImage
                description={formattedDescription}
              />
              <Title darkTheme={props.darkTheme}>
                {_.round(temperature)}&#176;
              </Title>
            </Center>
            <Bottom>
              <Subtitle>
                {props?.selectedDayData?.weather && formattedDescription}, Feels
                like{" "}
                {props?.selectedDayData?.main &&
                  _.round(props.selectedDayData.main.feels_like)}
                &#176;
              </Subtitle>
              <Text darkTheme={props.darkTheme}>
                {props?.selectedDayData?.pop && props.selectedDayData.pop * 100}
                &#x25; chance of rain
              </Text>
              <Text darkTheme={props.darkTheme}>
                {props?.selectedDayData?.wind &&
                  getWindScale(
                    props.selectedDayData.wind.speed,
                    props.isMetric
                  )}
              </Text>
              <Text darkTheme={props.darkTheme}>
                {props?.selectedDayData?.main &&
                  props.selectedDayData.main.humidity}
                &#x25; Humidity
              </Text>
            </Bottom>
          </>
        )}
      </WeatherDataContainer>
    </HeaderContainer>
  );
};

export default Header;
