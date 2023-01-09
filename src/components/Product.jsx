import React from "react";
import styled from "styled-components";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 380px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f7f7;
  position: relative;
  ${mobile({ margin: 0, width: "100vw", minWidth: "100vw" })}
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  background-color: white;
  border-radius: 50%;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Info = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;

  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const Product = (props) => {
  return (
    <Container>
      <Circle />
      <Image src={props.item.img} />
      <Info>
        {/* <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon> */}
        <Link to={"/product/" + props.item._id} style={{textDecoration: "none", color:"inherit"}}>
          <Icon>
            <SearchOutlinedIcon />
          </Icon>
        </Link>
        {/* <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon> */}
      </Info>
    </Container>
  );
};

export default Product;
