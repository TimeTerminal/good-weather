import React, { lazy } from "react";
import styled from "styled-components";

const Fallback = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledIcon = styled.div<StyledIcon>`
  width: 100%;
  height: 100%;
  margin: 0;
  background: none;
  transition: 0.5s ease;

  filter: ${({ $iconColor }) =>
    $iconColor ? `drop-shadow(0 0 10px ${$iconColor})` : "none"};
`;

const Icon: React.FC<Icon> = ({ iconColor = "#fff", iconName }) => {
  const IconComponent = lazy(() =>
    import(`../images/icons/${iconName}.svg.js`).catch(
      () => import("../images/icons/cloud-rain.svg.js")
    )
  );

  return (
    <StyledIcon $iconColor={iconColor}>
      <React.Suspense fallback={<Fallback />}>
        <IconComponent stroke={iconColor} />
      </React.Suspense>
    </StyledIcon>
  );
};

export default Icon;
