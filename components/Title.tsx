import React from "react";
import styled from "styled-components";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

const StyledTitle = styled.h2`
  color: var(--primary-400);
`;

export default Title;
