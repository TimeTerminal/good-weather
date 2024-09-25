import React, { Suspense } from "react";
import styled from "styled-components";
import { round } from "lodash";

import WeatherIcon from "./WeatherIcon";

import { RESPONSIVE_SIZES } from "../constants";
import {
  capitalizePhrase,
  getTemperatureUnits,
  getWindCategory,
} from "../helpers";

const SnapshotSection = styled.section`
  margin-top: 20px;

  @media (max-width: ${RESPONSIVE_SIZES.TABLET}px) {
    margin-top: 15px;
  }

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    margin-top: 10px;
  }
`;

const Row1 = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / 4;
  grid-row: 2;
`;

const Row2 = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 1 / 4;
  grid-row: 3;
  margin-top: 10px;
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

const HeaderText = styled.span<ThemableElement>`
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
  font-size: 1.1em;
  font-weight: 200;
  line-height: 1.3em;
  text-decoration: none;

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    font-size: 1em;
  }
`;

const TemperatureUnits = styled.sup`
  font-size: 0.5em;
`;

const Snapshot: React.FC<Snapshot> = ({
  isDarkTheme,
  isMetric,
  loading,
  selectedDayData,
}) => {
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
          <TemperatureUnits>{getTemperatureUnits(isMetric)}</TemperatureUnits>
        </>
      );
    }

    return <></>;
  };

  return (
    <Suspense>
      {!loading && (
        <SnapshotSection>
          <Row1>
            <WeatherIcon
              iconName={main as string}
              isHeaderImage
              description={formattedDescription}
            />
            <Title $isDarkTheme={isDarkTheme}>
              {round(temperature)}
              <TemperatureUnits>
                {getTemperatureUnits(isMetric)}
              </TemperatureUnits>
            </Title>
          </Row1>
          <Row2>
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
          </Row2>
        </SnapshotSection>
      )}
    </Suspense>
  );
};

export default Snapshot;
