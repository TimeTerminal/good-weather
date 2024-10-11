import React from "react";
import styled, { css } from "styled-components";

import Icon from "./Icon";
import { getTemperatureUnits } from "../helpers";

const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.95);
  color: var(--text);
  padding: 20px;
`;

const ModalLayout = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const SettingsList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  box-shadow: rgba(1, 22, 66, 0) 10px 0.07em 0.07em,
    rgba(1, 22, 66, 0.25) 0px 0.125em 0.5em,
    rgba(1, 22, 66, 0) 0px 0px 0px 1px inset;
  border-radius: 8px;
  list-style: none;
  margin: 10px 0 0;
  padding: 20px;
`;

const Setting = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;

const SearchSetting = styled(Setting)`
  justify-content: center;
`;

const Label = styled.p`
  margin: 0 10px 0 0;
  font-size: 1em;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  background-color: var(--cardBg);
  border-radius: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 4px 10px;
  background-color: var(--background);
  color: var(--text);
  border: 1px solid #ffffff;
  border-radius: 8px 0 0 8px;
  outline: none;
  transition: all 0.15s ease;
  font-size: 0.9em;

  &::placeholder {
    font-weight: 300;
  }
`;

const StyledButton = styled.button<ThemableElement>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  border-color: #ffffff;
  background: var(--background);
  cursor: pointer;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 8px;
  color: var(--text);
  font-size: 1.5em;
  font-weight: 100;
  cursor: pointer;

  &:hover {
    background-color: #1c1c1c;
  }
`;

const SearchButton = styled(StyledButton)`
  padding: 7px;
  border-width: 1px 1px 1px 0;
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

const TemperatureUnitToggle = styled(StyledButton)`
  color: #ffffff;
  font-size: 1.3em;
`;

const DarkModeToggleButton = styled(StyledButton)`
  padding: 7px;
`;

const Settings: React.FC<SettingsProps> = ({
  fetchWeatherData,
  isDarkTheme,
  isError,
  isSettingsOpen,
  isMetric,
  setIsDarkTheme,
  setIsMetric,
  setSearchValue,
  toggleSettings,
}) => {
  if (!isSettingsOpen) return null;

  return (
    <Container role="dialog" aria-modal="true">
      <ModalLayout>
        <HeaderRow>
          <Title>Settings</Title>
          <CloseButton onClick={toggleSettings}>X</CloseButton>
        </HeaderRow>
        <SettingsList>
          <SearchSetting>
            <Form onSubmit={(e) => fetchWeatherData(e)}>
              <SearchInput
                placeholder="Enter Location"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <SearchButton $isDarkTheme={isDarkTheme}>
                <Icon iconName="search" />
              </SearchButton>
            </Form>
          </SearchSetting>
          <Setting>
            <Label>Units</Label>
            <TemperatureUnitToggle
              onClick={() => {
                setIsMetric(!isMetric);
              }}
              $isDarkTheme={isDarkTheme}
            >
              {getTemperatureUnits(!isMetric)}
            </TemperatureUnitToggle>
          </Setting>
          <Setting>
            <Label>Theme</Label>
            <DarkModeToggleButton
              onClick={() => {
                setIsDarkTheme(!isDarkTheme);
              }}
              $isDarkTheme={isDarkTheme}
            >
              <Icon iconName={isDarkTheme ? "sun" : "moon"} />
            </DarkModeToggleButton>
          </Setting>
        </SettingsList>
        <ErrorText $isError={isError}>Please select a valid location</ErrorText>
      </ModalLayout>
    </Container>
  );
};

export default Settings;
