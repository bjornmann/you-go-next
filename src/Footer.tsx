import { useContext } from "react";
import styled from "styled-components"
import FooterBackground from "./components/bolt-background";
interface IFooter {
  backgroundActive: boolean
}
const StyledFooter = styled.footer`
  font-size: 15px;
  text-align: center;
  position: relative;
  height: 230px;
  margin-top: 140px;
  display: flex;
  overflow: hidden;
  position: relative;
  justify-content: center;
  color: #fff;
  align-items: center;
  background: radial-gradient(#3102c1, #542bd3);
`;
const SiteLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  margin-right: 4px;
`
const FooterContent = styled.div`
    padding: 30px;
    z-index: 1;
    background: rgb(63 18 200);
    border-radius: 90px;
`;
const Footer = ({backgroundActive}: IFooter) => {
  return (
    <StyledFooter>
      <FooterContent>
        <SiteLink href="https://bjornmann.com">Bjørn Mann</SiteLink> made this for you
      </FooterContent>
      {backgroundActive && <FooterBackground />}
    </StyledFooter>
  )
}

export default Footer