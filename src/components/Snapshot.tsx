import React, { Suspense } from "react";
import styled from "styled-components";
import { round } from "lodash";

import WeatherIcon from "./WeatherIcon";

import { RESPONSIVE_SIZES } from "../constants";
import {
  capitalizePhrase,
  getTemperatureUnits,
  getWindSpeed,
} from "../helpers";

const SnapshotSection = styled.section`
  margin-top: 20px;
  width: 100%;
  max-width: 750px;

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
  min-height: 160px;
`;

const Title = styled.h1<ThemableElement>`
  margin: 0;
  color: ${({ $isDarkTheme }) =>
    $isDarkTheme ? "var(--title)" : "var(--lightModeTitle)"};
  font-size: 8em;
  font-weight: bold;
  line-height: 1;

  @media (max-width: ${RESPONSIVE_SIZES.MOBILE}px) {
    font-size: 6em;
  }
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  max-width: 350px;
  background: linear-gradient(
    to right,
    rgba(243, 243, 243, 0.55),
    rgba(243, 243, 243, 0.6),
    rgba(243, 243, 243, 0.55)
  );
  border: none;
`;

const Row2 = styled.span`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const SnapshotColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MetricText = styled.p<ThemableElement>`
  margin: 0;
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "title" : "lightModeTitle")}
  );
  font-size: 1.2em;
  font-weight: normal;
`;

const MetricLabel = styled.p<ThemableElement>`
  margin: 0;
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
  font-size: 1.1em;
  font-weight: 200;
  line-height: 1.3em;

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

          <Divider />

          <Row2>
            <SnapshotColumn>
              <MetricText $isDarkTheme={isDarkTheme}>
                {feelsLike && (
                  <>
                    {round(feelsLike)}
                    <TemperatureUnits>
                      {getTemperatureUnits(isMetric)}
                    </TemperatureUnits>
                  </>
                )}
              </MetricText>
              <MetricLabel $isDarkTheme={isDarkTheme}>Feels like</MetricLabel>
            </SnapshotColumn>

            <SnapshotColumn>
              <MetricText $isDarkTheme={isDarkTheme}>
                {`${selectedDayData?.pop && round(selectedDayData.pop * 100)}%`}
              </MetricText>
              <MetricLabel $isDarkTheme={isDarkTheme}>
                Chance of rain
              </MetricLabel>
            </SnapshotColumn>

            <SnapshotColumn>
              <MetricText $isDarkTheme={isDarkTheme}>
                {selectedDayData.wind &&
                  getWindSpeed(selectedDayData.wind.speed, isMetric)}
              </MetricText>
              <MetricLabel $isDarkTheme={isDarkTheme}>Wind</MetricLabel>
            </SnapshotColumn>

            <SnapshotColumn>
              <MetricText $isDarkTheme={isDarkTheme}>
                {`${selectedDayData?.main?.humidity}%`}
              </MetricText>
              <MetricLabel $isDarkTheme={isDarkTheme}>Humidity</MetricLabel>
            </SnapshotColumn>
          </Row2>
        </SnapshotSection>
      )}
    </Suspense>
  );
};

export default Snapshot;
