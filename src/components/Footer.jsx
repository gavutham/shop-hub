import React from "react";
import styled from "styled-components";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  ${mobile({flexDirection: "column"})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  ${mobile({justifyContent: "space-between"})}
`;

const SocialMediaIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #${(props) => props.icolor};
  background-color: #ccd0cf;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 10px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 10px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>ShopHub</Logo>
        <Desc>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Desc>
        <SocialMediaContainer>
          <SocialMediaIcon icolor="4267B2">
            <FacebookRoundedIcon />
          </SocialMediaIcon>
          <SocialMediaIcon icolor="E4405F">
            <InstagramIcon />
          </SocialMediaIcon>
          <SocialMediaIcon icolor="00acee">
            <TwitterIcon />
          </SocialMediaIcon>
          <SocialMediaIcon icolor="FF0000">
            <YouTubeIcon />
          </SocialMediaIcon>
        </SocialMediaContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Men Fashion</ListItem>
          <ListItem>Women Fahshion</ListItem>
          <ListItem>Wishlist</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <HomeWorkIcon style={{marginRight: "10px"}}/> 32, asdflasdkhfa street, Chennai 600001
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{marginRight: "10px"}}/> +910987654321
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{marginRight: "10px"}}/> Shop@Hub.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
