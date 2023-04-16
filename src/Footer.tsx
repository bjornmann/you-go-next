import styled from "styled-components"
import Logo from "./components/logo";

const StyledFooter = styled.footer`
  font-size: 15px;
  text-align: center;
  position: relative;
  margin-top: 20px;
  align-self: end;
  align-items: flex-end;
  color: #8a6c93;
  background: rgb(204 165 218);
`;
const SiteLink = styled.a`
  text-decoration: none;
  color: #8a6c93;
  font-weight: bold;
  margin-right: 2px;
`
const FooterContent = styled.div`
    padding: 30px 0;
    z-index: 1;
    background: rgb(204 165 218);
    width: 100%;
`;
const StyledLogo = styled(Logo)`
  display: block;
  margin: 5px auto;
`;
const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <StyledLogo size={10} />
        <SiteLink href="https://bjornmann.com">Bjørn Mann</SiteLink> made this for <i>you</i>
      </FooterContent>
    </StyledFooter>
  )
}

export default Footer
