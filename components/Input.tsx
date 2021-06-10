import styled from "styled-components";

interface StyledProps {
  eckig?: boolean;
}

export const StyledInput = styled.input<StyledProps>`
  padding: 5px 10px;
  border-radius: ${({ eckig }) => (eckig ? "0px" : "50px")};
  border: 2px solid var(--primary-400);
  color: var(--primary-400);
  font-size: 1.15rem;
`;
