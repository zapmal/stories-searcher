import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: ${props => props.padding};
  cursor: pointer;

  transition: all 300ms ease-in;

  &:hover {
    border-radius: 10px;
  }
`;

export default StyledButton;