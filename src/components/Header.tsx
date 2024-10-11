import React from "react";
import styled from "styled-components";

import Icon from "./Icon";

import { capitalizePhrase } from "../helpers";

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
`;

const SettingsButton = styled.button`
  display: flex;
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const City = styled.h3<ThemableElement>`
  margin: 0;
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
  font-size: 1.4em;
`;

const Header: React.FC<Header> = ({
  isDarkTheme,
  locationName,
  toggleSettings,
}) => {
  return (
    <Container>
      <City $isDarkTheme={isDarkTheme}>{capitalizePhrase(locationName)}</City>
      <SettingsButton onClick={toggleSettings}>
        <Icon iconName="settings" />
      </SettingsButton>
    </Container>
  );
};

export default Header;
