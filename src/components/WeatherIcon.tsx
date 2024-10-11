import React, { lazy, useMemo } from "react";
import styled from "styled-components";

const StyledIcon = styled.div<StyledWeatherIcon>`
  width: ${({ $isHeaderImage }) => ($isHeaderImage ? "70px" : "55px")};
  margin: ${({ $isHeaderImage }) => $isHeaderImage && "0 10px 0 0"};
  background: none;
  transition: 0.5s ease;

  filter: ${({ $iconColor }) =>
    $iconColor ? `drop-shadow(0 0 10px ${$iconColor})` : "none"};
`;

/**
 * Get the icon background filter colour based on a passed weather code
 * @param weatherCode - the weather code
 */
const getIconColour = (weatherCode: number): string => {
  switch (weatherCode) {
    // Clouds/mist/fog/dust
    case 1001:
    case 1101:
    case 1102:
    case 2000:
    case 2100:
      return "#dedfde";
    // Rain/freezing rain/storm
    case 4000:
    case 4001:
    case 4200:
    case 4201:
    case 6000:
    case 6001:
    case 6200:
    case 6201:
    case 8000:
      return "#3685f2";
    // Snow/ice
    case 5000:
    case 5001:
    case 5100:
    case 5101:
    case 7000:
    case 7101:
    case 7102:
      return "#e5f6fb";
    default:
      return "#fcd573";
  }
};

/**
 * Get the icon filename based on a passed weather code
 * @param weatherCode - the weather code
 */
const getIconName = (weatherCode: number): string => {
  switch (weatherCode) {
    case 1001:
    case 1101:
    case 1102:
      return "cloud";
    case 4000:
      return "cloud-drizzle";
    case 4001:
    case 4200:
    case 4201:
    case 6000:
    case 6001:
    case 6200:
    case 6201:
      return "cloud-rain";
    case 5000:
    case 5001:
    case 5100:
    case 5101:
    case 7000:
    case 7101:
    case 7102:
      return "cloud-snow";
    case 8000:
      return "cloud-lightning";
    case 2000:
    case 2100:
      return "mist";
    default:
      return "sun";
  }
};

const WeatherIcon: React.FC<WeatherIcon> = ({
  weatherCode,
  isHeaderImage,
  ...props
}) => {
  const iconColour = getIconColour(weatherCode);
  const IconComponent = useMemo(() => {
    return lazy(() =>
      import(`../images/icons/${getIconName(weatherCode)}.svg.js`).catch(
        () => import("../images/icons/cloud-rain.svg.js")
      )
    );
  }, [weatherCode]);

  return (
    <StyledIcon
      $iconColor={iconColour}
      $isHeaderImage={isHeaderImage ?? false}
      {...props}
    >
      <React.Suspense>
        <IconComponent stroke={iconColour} />
      </React.Suspense>
    </StyledIcon>
  );
};

export default WeatherIcon;
