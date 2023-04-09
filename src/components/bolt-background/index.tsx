import styled from "styled-components";
const BoltBackground = styled.div`
  background-image:url("victory.png"); 
  background-size: 70px;
  z-index: 0;
  height: 50%;
  width: 200%;
`;
const PurpleBackground = () => {
  return (
    <BoltBackground />
  );
}
export default PurpleBackground
