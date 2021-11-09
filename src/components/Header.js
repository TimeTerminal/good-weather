import React from "react";
import styled, { css } from "styled-components";

import Button from "./Button";
const StyledButton = styled(Button)``;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WeatherDataContainer = styled.div`
  display: grid;
  grid-template: repeat(3, 1fr) / 33% 33% 33%;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SettingsButton = styled(StyledButton)`
  ${(props) =>
    props.isIcon &&
    props.iconName &&
    css`
      background: none;
      background-image: url("/assets/images/${props.iconName}.svg");
    `}
`;

const RefreshButton = styled(Button)``;

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

const Header = (props) => {

  console.log('props.selectedDayData :>> ', props.selectedDayData);
  return (
    <HeaderContainer>
      <FormContainer>
        <input placeholder="Search Cities" />
        <button onClick={() => props.getWeatherData(props.url)}>Search</button>
      </FormContainer>
      <WeatherDataContainer>
        <TopLeft>{props.selectedDayData?.city?.name}</TopLeft>
        <TopRight>
          <SettingsButton isIcon={true} iconName={"settings"} />
          {/* <RefreshButton isIcon={true} iconName={"refresh"} /> */}
        </TopRight>
        <Center>Weather Icon - center</Center>
        <BottomLeft>Temperature - bottom left</BottomLeft>
        <BottomRight>Weather Description - bottom right</BottomRight>
      </WeatherDataContainer>
    </HeaderContainer>
  );
};

export default Header;
