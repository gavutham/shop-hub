import React from "react";
import styled from "styled-components";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({height: "45vh"})}
`;

const Title = styled.h1`
  font-size: 60px;
  margin-bottom: 30px;
  font-weight: 500;
  ${mobile({fontSize: "45px"})}
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({textAlign: 'center', padding: "15px", fontSize: "20px"})}

`;

const Inputcontainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border: 1px solid gray;
  ${mobile({width: '80%'})}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding: 20px;
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Get instant update on upcoming sale and offers, Subscribe to our
        Newsletter with your email now
      </Description>
      <Inputcontainer>
        <Input placeholder="Your Email" />
        <Button>
          <SendRoundedIcon />
        </Button>
      </Inputcontainer>
    </Container>
  );
};

export default Newsletter;
