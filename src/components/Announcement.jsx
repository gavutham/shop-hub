import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bolder;
`;

const Announcement = () => {
  return <Container>Grab the offer soon. Offer gonna end today.</Container>;
};

export default Announcement;
