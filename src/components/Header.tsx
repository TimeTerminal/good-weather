import React from "react";
import styled, { css } from "styled-components";
import { round } from "lodash";

import { RESPONSIVE_SIZES } from "../constants";
import { capitalizePhrase, getWindCategory } from "../helpers";
import WeatherIcon from "./WeatherIcon";
import search from "../images/icons/search.svg";
import moon from "../images/icons/moon.svg";
import sun from "../images/icons/sun.svg";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
`;

const StyledButton = styled.button<ThemableElement>`
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
        $isDarkTheme ? "#4c4f72 10%, #343853 80%" : "#7ac6d3 10%, #67979f 90%"}
    );
  }
`;

const Form = styled.form`
  display: flex;
  background-color: var(--cardBg);
  border-radius: 8px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SearchInput = styled.input<ThemableElement>`
  padding: 4px 10px;
  background: none;
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
  font-size: 14px;
  border: 1px solid white;
  border-right: 0;
  border-radius: 8px 0 0 8px;
  transition: 0.15s ease-out;

  &::placeholder {
    font-weight: 200;
  }
`;

const SearchButton = styled(StyledButton)`
  border-radius: 0 8px 8px 0;
`;

const ErrorText = styled.p<ErrorText>`
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

const Divider = styled.hr`
  width: 100%;
  border: 0.5px solid #f5f5f5;
`;

// ====================
// === Weather Data ===
// ====================
const WeatherDataContainer = styled.div`
  display: grid;
  grid-template: repeat(3, 0.5fr) / 33% 33% 33%;
`;
const TopLeft = styled.span`
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

const TemperatureUnitToggle = styled(StyledButton)`
  margin-right: 10px;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1.3em;

  ${({ $isDarkTheme }) => $isDarkTheme && `border: 1px solid #9e9e9e;`}
`;
const DarkModeToggleButton = styled(StyledButton)`
  width: 40px;
  border-radius: 8px;

  ${({ $isDarkTheme }) => $isDarkTheme && `border: 1px solid #9e9e9e;`}
`;

const City = styled.h3<ThemableElement>`
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
`;

const Title = styled.h1<ThemableElement>`
  margin: 0;
  color: ${({ $isDarkTheme }) =>
    $isDarkTheme ? "var(--title)" : "var(--lightModeTitle)"};
  font-size: 5em;
  font-weight: bold;
  line-height: 1;

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    font-size: 6em;
  }
`;

const Subtitle = styled.h2<ThemableElement>`
  margin: 0;
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
  font-size: 1.2em;
  font-weight: normal;
`;

const HeaderText = styled.p<ThemableElement>`
  margin: 10px 0 0;
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
  font-size: 1.1em;
  font-weight: 200;
  line-height: 1.3em;
  text-decoration: none;

  &:first-of-type {
    margin: 20px 0 0;
  }

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    font-size: 1em;
  }
`;

const TemperatureUnits = styled.sup`
  font-size: 0.5em;
`;

const Header: React.FC<Header> = ({
  isDarkTheme,
  fetchWeatherData,
  isError,
  isMetric,
  locationName,
  loading,
  selectedDayData,
  setIsDarkTheme,
  setIsMetric,
  setSearchValue,
}) => {
  const getTemperatureUnits = () => `°${isMetric ? "C" : "F"}`;

  const temperature = selectedDayData.main?.temp ?? "";
  const feelsLike = selectedDayData.main?.feels_like ?? "";
  let formattedDescription = "";
  let main = null;

  if (selectedDayData.weather) {
    formattedDescription = capitalizePhrase(
      selectedDayData.weather[0].description
    );

    main = selectedDayData.weather[0].main;
  }

  const renderFeelsLike = () => {
    if (feelsLike && feelsLike !== temperature) {
      return (
        <>
          Feels like {round(selectedDayData.main.feels_like)}
          <TemperatureUnits>{getTemperatureUnits()}</TemperatureUnits>
        </>
      );
    }

    return <></>;
  };

  return (
    <HeaderContainer>
      <SearchContainer>
        <Form onSubmit={(e) => fetchWeatherData(e)}>
          <SearchInput
            $isDarkTheme={isDarkTheme}
            placeholder="Enter Location"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchButton $isDarkTheme={isDarkTheme}>
            <img src={search as string} alt="Search icon" />
          </SearchButton>
        </Form>
      </SearchContainer>
      <ErrorText $isError={isError}>
        Please select a different location.
      </ErrorText>

      <Divider />

      <WeatherDataContainer>
        <TopLeft>
          <City $isDarkTheme={isDarkTheme}>
            {capitalizePhrase(locationName)}
          </City>
        </TopLeft>
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
              src={(isDarkTheme ? sun : moon) as string}
              alt="Toggle dark mode - moon icon"
            />
          </DarkModeToggleButton>
        </TopRight>
        {!loading && (
          <>
            <Center>
              <WeatherIcon
                iconName={main as string}
                isHeaderImage
                description={formattedDescription}
              />
              <Title $isDarkTheme={isDarkTheme}>
                {round(temperature)}
                <TemperatureUnits>{getTemperatureUnits()}</TemperatureUnits>
              </Title>
            </Center>
            <Bottom>
              <Subtitle $isDarkTheme={isDarkTheme}>
                {renderFeelsLike()}
                {selectedDayData?.weather && `, ${formattedDescription}`}
              </Subtitle>
              <HeaderText $isDarkTheme={isDarkTheme}>
                {`${
                  selectedDayData?.pop && round(selectedDayData.pop * 100)
                }% chance of rain`}
              </HeaderText>
              <HeaderText $isDarkTheme={isDarkTheme}>
                {selectedDayData.wind &&
                  getWindCategory(selectedDayData.wind.speed, isMetric)}
              </HeaderText>
              <HeaderText $isDarkTheme={isDarkTheme}>
                {`${selectedDayData?.main?.humidity}% Humidity`}
              </HeaderText>
            </Bottom>
          </>
        )}
      </WeatherDataContainer>
    </HeaderContainer>
  );
};

export default Header;
