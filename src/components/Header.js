import React from "react";
import styled, { css } from "styled-components";

import WeatherIcon from "./WeatherIcon";
import { formatDescription } from "../util";
import search from "/assets/images/search.svg";
import settings from "/assets/images/settings.svg";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  background-color: #4c4f72;
  background-image: radial-gradient(
    ellipse at bottom,
    #4c4f72 0%,
    #343853 5%,
    #20222f 70%,
    #1b2735 90%
  );
`;

// #98d4dc,
// #7ac6d3,
// #75bfcc

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  padding: 30px 50px 5px;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 1px;
  border: none;
  background: #fff;
`;

const WeatherDataContainer = styled.div`
  display: grid;
  grid-template: repeat(3, 1fr) / 33% 33% 33%;
  padding: 10px 50px 30px;
`;
const TopLeft = styled.span`
  grid-column: 1 / 2;
  grid-row: 1;
`;
const TopRight = styled.span`
  display: flex;
  justify-content: flex-end;
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
  grid-column: 1 / 3;
  grid-row: 3;
`;

const Input = styled.input`
  padding: 4px 5px;
  font-size: 14px;
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
  transition: 0.3s ease-out;

  &:hover {
    background: #9e9e9e;
    border: 1px solid #9e9e9e;
  }
`;
const SearchButton = styled(StyledButton)`
  width: 40px;
  border-radius: 0 4px 4px 0;
`;
const SettingsButton = styled(StyledButton)`
  width: 40px;
  border-radius: 4px;
`;
const RefreshButton = styled(StyledButton)``;

const Text = styled.p`
  margin: 0;
  text-decoration: none;
`;

const Icon = styled(WeatherIcon)``;

const Header = (props) => {
  const formattedDescription = props.selectedDayData.weather
    ? formatDescription(props.selectedDayData.weather[0].description)
    : "";

  const temperature = props.selectedDayData.main
    ? props.selectedDayData.main.temp
    : "";

  const main = props.selectedDayData.weather
    ? props.selectedDayData.weather[0].main
    : null;

  return (
    <HeaderContainer>
      <FormContainer>
        <Input placeholder="Search Cities" />
        <SearchButton onClick={() => props.fetchWeatherData(props.url)}>
          <img src={search} alt="Search icon" />
        </SearchButton>
      </FormContainer>
      <HorizontalRule />
      <WeatherDataContainer>
        <TopLeft>{props.locationName}</TopLeft>
        <TopRight>
          <SettingsButton>
            <img src={settings} alt="Settings icon" />
          </SettingsButton>
          {/* <RefreshButton isIcon={true} iconName={"refresh"} /> */}
        </TopRight>
        <Center>
          <Icon main={main} headerIcon description={formattedDescription} />
        </Center>
        <Bottom>
          <Text>{temperature}</Text>
          <Text>
            {!props.loading &&
              props?.selectedDayData?.weather &&
              formattedDescription}
          </Text>
        </Bottom>
      </WeatherDataContainer>
    </HeaderContainer>
  );
};

export default Header;
