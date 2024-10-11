import React, { lazy, useMemo } from "react";
import styled, { css } from "styled-components";

const StyledIcon = styled.div<StyledIcon>`
  width: 55px;
  margin: 0;
  background: none;
  transition: 0.5s ease;

  ${({ $hasDropShadow, $iconColor }) =>
    $hasDropShadow &&
    css`
      filter: $iconColor ? drop-shadow(0 0 10px ${$iconColor}) : "none";
   `}
`;

const Icon: React.FC<IconType> = ({
  hasDropShadow = false,
  iconColor = "#fff",
  iconName,
}) => {
  const IconComponent = useMemo(() => {
    return lazy(() =>
      import(`../images/icons/${iconName}.svg.js`).catch(
        () => import("../images/icons/cloud-rain.svg.js")
      )
    );
  }, [iconName]);

  return (
    <StyledIcon $iconColor={iconColor} $hasDropShadow={hasDropShadow}>
      <React.Suspense>
        <IconComponent stroke={iconColor} />
      </React.Suspense>
    </StyledIcon>
  );
};

export default Icon;
