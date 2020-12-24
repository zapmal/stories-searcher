import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: ${props => props.padding};
  cursor: pointer;
  margin-left: 5px;

  transition: all 300ms ease-in;

  &:hover {
    border-radius: 10px;
  }

  ${({ active }) => active && `
    color: lime;
    border: 1px solid lime;
  `}
`;

export default StyledButton;