import styled from "styled-components";
const BoltBackground = styled.div`
  background-image:url("victory.png"); 
  background-size: 70px;
  position: absolute;
  z-index: 0;
  top: -100%;
  left: 0;
  right: 0;
  height: 200%;
  width: 200%;
`;
const PurpleBackground = () => {
  return(
    <BoltBackground />
  );
}
export default PurpleBackground