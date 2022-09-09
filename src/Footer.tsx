import styled from "styled-components"

const StyledFooter = styled.footer`
  font-size: 15px;
  text-align: center;
  color: #b4b0a4;
  margin-bottom: 20px;
`;
const SiteLink = styled.a`
  text-decoration: none;
  color: #b4b0a4;
  font-weight: bold;
`
const Footer = () => {
  return (
    <StyledFooter>
      <SiteLink href="https://bjornmann.com">Bjørn Mann</SiteLink> made this for you
    </StyledFooter>
  )
}

export default Footer