import styled from 'styled-components';

const StyledLabel = styled.label`
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;

  font-size: 24px;
  color: #ffffff;
  margin-right: 20px;
`;

const StyledCurrentSearchTerm = styled.p`
  padding-top: 25px;
  display: block;
`;

export {
  StyledLabel,
  StyledInput,
  StyledCurrentSearchTerm,
};