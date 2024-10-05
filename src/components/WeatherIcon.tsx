import React, { lazy } from "react";
import styled from "styled-components";

const Fallback = styled.div<StyledWeatherIconFallback>`
  width: ${({ $isHeaderImage }) => ($isHeaderImage ? "70px" : "55px")};
  height: ${({ $isHeaderImage }) => ($isHeaderImage ? "70px" : "24px")};
`;

const StyledIcon = styled.div<StyledWeatherIcon>`
  width: ${({ $isHeaderImage }) => ($isHeaderImage ? "70px" : "55px")};
  margin: ${({ $isHeaderImage }) => $isHeaderImage && "0 15px 0 0"};
  background: none;
  transition: 0.5s ease;

  filter: ${({ $iconColor }) =>
    $iconColor ? `drop-shadow(0 0 10px ${$iconColor})` : "none"};
`;

const getIconColour = (main: string) => {
  switch (main) {
    case "Clouds":
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Dust":
    case "Ash":
    case "Squall":
    case "Tornado":
    case "Snow":
      return "#dedfde";
    case "Drizzle":
    case "Rain":
      return "#3685f2";
    default:
      return "#fcd573";
  }
};

const getIconName = (description: string) => {
  switch (description) {
    case "Clouds":
      return "cloud";
    case "Drizzle":
      return "cloud-drizzle";
    case "Rain":
      return "cloud-rain";
    case "Snow":
      return "cloud-snow";
    case "Thunderstorm":
      return "cloud-lightning";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Dust":
    case "Ash":
    case "Squall":
    case "Tornado":
      return "mist";
    default:
      return "sun";
  }
};

const WeatherIcon: React.FC<WeatherIcon> = ({
  description,
  iconName,
  isHeaderImage,
  ...props
}) => {
  const iconColour = getIconColour(iconName);
  const IconComponent = lazy(() =>
    import(`../images/icons/${getIconName(iconName)}.svg.js`).catch(
      () => import("../images/icons/cloud-rain.svg.js")
    )
  );

  return (
    <StyledIcon
      $iconColor={iconColour}
      $isHeaderImage={isHeaderImage ?? false}
      {...props}
    >
      <React.Suspense
        fallback={<Fallback $isHeaderImage={isHeaderImage ?? false} />}
      >
        <IconComponent stroke={iconColour} />
      </React.Suspense>
    </StyledIcon>
  );
};

export default WeatherIcon;
