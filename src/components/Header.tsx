import React from "react";
import styled, { css } from "styled-components";

import { capitalizePhrase, getTemperatureUnits } from "../helpers";
import search from "../images/icons/search.svg";
import moon from "../images/icons/moon.svg";
import sun from "../images/icons/sun.svg";

const HeaderContainer = styled.section`
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
  font-size: 0.9em;
  border: 1px solid white;
  border-right: 0;
  border-radius: 8px 0 0 8px;
  outline: none;
  transition: all 0.15s ease;

  &::placeholder {
    font-weight: 300;
  }

  &:focus-visible {
    border-color: var(
      --${({ $isDarkTheme }) => ($isDarkTheme ? "title" : "lightModeTitle")}
    );
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

const Row2 = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const City = styled.h3<ThemableElement>`
  margin: 0;
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
  font-size: 1.4em;
`;

const Toggles = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-column: 3 / 3;
  grid-row: 1;
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

const Header: React.FC<Header> = ({
  fetchWeatherData,
  isDarkTheme,
  isError,
  isMetric,
  locationName,
  setIsDarkTheme,
  setIsMetric,
  setSearchValue,
}) => {
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

      <Row2>
        <City $isDarkTheme={isDarkTheme}>{capitalizePhrase(locationName)}</City>
        <Toggles>
          <TemperatureUnitToggle
            onClick={() => {
              setIsMetric(!isMetric);
            }}
            $isDarkTheme={isDarkTheme}
          >
            {getTemperatureUnits(!isMetric)}
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
        </Toggles>
      </Row2>
    </HeaderContainer>
  );
};

export default Header;
