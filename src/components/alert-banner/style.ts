import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background-color: #983f3f;
  color: ${({theme}) => theme.backgroundColor};
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
  strong{
    font-size: 20px;
  }
  p{
    font-size: 16px;
  }
`;
