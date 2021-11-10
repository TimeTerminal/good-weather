import React, { useState } from "react";
import styled, { css } from "styled-components";
import _ from "lodash";

import WeatherIcon from "./WeatherIcon";
import { capitalizePhrase } from "../util";
import search from "/assets/images/search.svg";
import moon from "/assets/images/moon.svg";

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
  padding: 10px 50px 30px;
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
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
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
  width: 40px;
  border-radius: 0 4px 4px 0;
`;
const DarkModeToggleButton = styled(StyledButton)`
  width: 40px;
  border-radius: 4px;

  ${(props) =>
    props.darkTheme &&
    css`
      background: #9e9e9e;
      border: 1px solid #9e9e9e;
    `}
`;

const Title = styled.h3`
  margin: 0;
  font-size: 3.5em;
  font-weight: bold;
  color: #f5f5f5;
`;

const Subtitle = styled.h4`
  margin: 0 0 10px;
  color: ${(props) => (props.darkTheme ? "#9e9e9e" : "#fffffd")};
  font-size: 1.2em;
  font-weight: normal;
`;

const Input = styled.input`
  padding: 4px 5px;
  font-size: 14px;
  border: 1px solid white;
  border-radius: 4px 0 0 4px;
  transition: 0.15s ease-out;
`;

const Text = styled.p`
  margin: 0;
  font-size: 18px;
  text-decoration: none;
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
          placeholder="Search Cities"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton
          darkTheme={props.darkTheme}
          disabled={!searchValue.length}
          onClick={() => {
            props.fetchWeatherData(searchValue);
          }}
        >
          <img src={search} alt="Search icon" />
        </SearchButton>
      </FormContainer>
      <HorizontalRule />
      <WeatherDataContainer>
        <TopLeft>{capitalizePhrase(props.locationName)}</TopLeft>
        <TopRight>
          <DarkModeToggleButton
            onClick={() => {
              props.setDarkTheme(!props.darkTheme);
            }}
            darkTheme={props.darkTheme}
          >
            <img src={moon} alt="Toggle dark mode - moon icon" />
          </DarkModeToggleButton>
        </TopRight>
        <Center>
          <Image main={main} headerImage description={formattedDescription} />
        </Center>
        <Bottom>
          <Title>{_.round(temperature)}&#176;</Title>
          <Subtitle darkTheme={props.darkTheme}>
            {!props.loading &&
              props?.selectedDayData?.weather &&
              formattedDescription}
            , Feels like
          </Subtitle>
        </Bottom>
      </WeatherDataContainer>
    </HeaderContainer>
  );
};

export default Header;
