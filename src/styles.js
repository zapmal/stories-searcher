import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  }
`;
const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;

  background: linear-gradient(90deg, rgba(56,137,156,1) 39%, rgba(0,212,255,1) 100%); 
  color: #ffffff;
`;

const StyledHeadlinePrimary = styled.h1`
  color: #ffffff;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
`;


export {
  GlobalStyle,
  StyledContainer,
  StyledHeadlinePrimary,
};