import React from "react";
import styled, { css } from "styled-components";

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
    #1b2735,
    #20222f,
    #343853,
    #4c4f72
  );
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  padding: 10px 50px;
`;

const WeatherDataContainer = styled.div`
  display: grid;
  grid-template: repeat(3, 1fr) / 33% 33% 33%;
  padding: 10px 50px;
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
const BottomLeft = styled.span`
  display: flex;
  align-items: flex-end;
  grid-column: 1 / 2;
  grid-row: 3;
`;
const BottomRight = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  grid-column: 3 / 3;
  grid-row: 3;
`;

const StyledButton = styled.button`
  width: 50px;
  height: 40px;
  cursor: pointer;
`;
const SettingsButton = styled(StyledButton)`
  width: 40px;
  padding: 0;
`;
const RefreshButton = styled(StyledButton)``;

const Header = (props) => {
  console.log("props.selectedDayData :>> ", props.selectedDayData);

  const formattedDescription = props.selectedDayData.weather
    ? formatDescription(props.selectedDayData.weather[0].description)
    : "";

  const temperature = props.selectedDayData.main
    ? props.selectedDayData.main.temp
    : "";

  return (
    <HeaderContainer>
      <FormContainer>
        <input placeholder="Search Cities" />
        <StyledButton onClick={() => props.fetchWeatherData(props.url)}>
          <img src={search} alt="Search icon" />
        </StyledButton>
      </FormContainer>
      <WeatherDataContainer>
        <TopLeft>{props.locationName}</TopLeft>
        <TopRight>
          <SettingsButton>
            {" "}
            <img src={settings} alt="Settings icon" />
          </SettingsButton>
          {/* <RefreshButton isIcon={true} iconName={"refresh"} /> */}
        </TopRight>
        <Center>Weather Icon - center</Center>
        <BottomLeft>{temperature}</BottomLeft>
        <BottomRight>
          {!props.loading &&
            props?.selectedDayData?.weather &&
            formattedDescription}
        </BottomRight>
      </WeatherDataContainer>
    </HeaderContainer>
  );
};

export default Header;
