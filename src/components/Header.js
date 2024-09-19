import React, { useState } from "react";
import styled, { css } from "styled-components";
import { round } from "lodash";

import WeatherIcon from "./WeatherIcon";
import { capitalizePhrase, getWindCategory } from "../util";
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
    ${({ $isDarkTheme }) =>
      $isDarkTheme
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
      ${({ $isDarkTheme }) =>
        $isDarkTheme ? "#4c4f72 10%, #343853 80%" : "#7ac6d3 10%,#67979f 90%"}
    );
  }
`;

const Search = styled.input`
  padding: 4px 10px;
  background-color: ${({ $isDarkTheme }) =>
    $isDarkTheme ? "#2d2e2f" : "#f5f5f5"};
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#f5f5f5" : "#1a1a24")};
  font-size: 14px;
  border: 1px solid white;
  border-radius: 10px 0 0 10px;
  transition: 0.15s ease-out;
`;

const SearchButton = styled(StyledButton)`
  border-radius: 0 10px 10px 0;
`;

const TemperatureUnitToggle = styled(StyledButton)`
  margin-right: 10px;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.3em;

  ${({ $isDarkTheme }) => $isDarkTheme && `border: 1px solid #9e9e9e;`}
`;
const DarkModeToggleButton = styled(StyledButton)`
  width: 40px;
  border-radius: 10px;

  ${({ $isDarkTheme }) => $isDarkTheme && `border: 1px solid #9e9e9e;`}
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#c2dbfa" : "#fdd87d")};
  font-size: 5em;
  font-weight: bold;
  line-height: 1;
`;

const Subtitle = styled.h4`
  margin: 0 0 10px;
  font-size: 1.2em;
  font-weight: normal;
`;

const Text = styled.p`
  margin: 8px 0 0;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#9e9e9e" : "#fffffd")};
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

  ${({ $isError }) =>
    $isError &&
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

const Temperature = styled.sup`
  font-size: 0.5em;
`;

const Header = ({
  isDarkTheme,
  fetchWeatherData,
  isError,
  isMetric,
  loading,
  locationName,
  selectedDayData,
  setIsMetric,
  setIsDarkTheme,
}) => {
  const getTemperatureUnits = () => `°${isMetric ? "C" : "F"}`;

  const [searchValue, setSearchValue] = useState({});

  const temperature = selectedDayData.main?.temp ?? "";
  let formattedDescription = "";
  let main = null;

  if (selectedDayData.weather) {
    formattedDescription = capitalizePhrase(
      selectedDayData.weather[0].description
    );

    main = selectedDayData.weather[0].main;
  }

  return (
    <HeaderContainer $isDarkTheme={isDarkTheme}>
      <FormContainer onSubmit={(e) => e.preventDefault()}>
        <Search
          $isDarkTheme={isDarkTheme}
          placeholder="Search Locations"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton
          disabled={!searchValue.length}
          onClick={() => {
            fetchWeatherData(searchValue);
          }}
          type="submit"
        >
          <img src={search} alt="Search icon" />
        </SearchButton>
      </FormContainer>
      <ErrorText $isError={isError}>
        Please select a different location.
      </ErrorText>

      <HorizontalRule />

      <WeatherDataContainer>
        <TopLeft>{capitalizePhrase(locationName)}</TopLeft>
        <TopRight>
          <TemperatureUnitToggle
            onClick={() => {
              setIsMetric(!isMetric);
            }}
            $isDarkTheme={isDarkTheme}
          >
            {getTemperatureUnits()}
          </TemperatureUnitToggle>
          <DarkModeToggleButton
            onClick={() => {
              setIsDarkTheme(!isDarkTheme);
            }}
            $isDarkTheme={isDarkTheme}
          >
            <img
              src={isDarkTheme ? sun : moon}
              alt="Toggle dark mode - moon icon"
            />
          </DarkModeToggleButton>
        </TopRight>
        {!loading && (
          <>
            <Center>
              <WeatherIcon
                main={main}
                headerImage
                description={formattedDescription}
              />
              <Title $isDarkTheme={isDarkTheme}>
                {round(temperature)}
                <Temperature>{getTemperatureUnits()}</Temperature>
              </Title>
            </Center>
            <Bottom>
              <Subtitle>
                {selectedDayData?.weather && formattedDescription}, Feels like{" "}
                {selectedDayData.main && round(selectedDayData.main.feels_like)}
                <Temperature>{getTemperatureUnits()}</Temperature>
              </Subtitle>
              <Text $isDarkTheme={isDarkTheme}>
                {`${
                  selectedDayData?.pop && selectedDayData.pop * 100
                }% chance of rain`}
              </Text>
              <Text $isDarkTheme={isDarkTheme}>
                {selectedDayData.wind &&
                  getWindCategory(selectedDayData.wind.speed, isMetric)}
              </Text>
              <Text $isDarkTheme={isDarkTheme}>
                {`${selectedDayData?.main?.humidity}% Humidity`}
              </Text>
            </Bottom>
          </>
        )}
      </WeatherDataContainer>
    </HeaderContainer>
  );
};

export default Header;
