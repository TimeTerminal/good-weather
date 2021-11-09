import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 20px;
  height: 30px;
  cursor: pointer;
`;

const Button = (icon) => {
  return <StyledButton icon={icon} />;
};

export default Button;
